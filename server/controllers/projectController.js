const projectModel = require('../models/project');
const componentModel = require('../models/components');
const { generateOpenAiText } = require('../helpers/openAiHelper');
const { mergePdfs } = require('../helpers/pdfMerge');
const logger = require('../config/logger');
const archiver = require("archiver");
const sharp = require("sharp"); // PNG -> JPG 변환용
const puppeteer = require("puppeteer");
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// 프로젝트 생성 함수
exports.createProject = async (req, res) => {
    const { user_email, project_name, project_description, selections } = req.body;

    try {
        // 1. 프로젝트 정보 저장
        const projectId = await projectModel.createProject(user_email, project_name, project_description);

        // 2. 선택된 값들 저장
        const menuSelections = {}; // menu 항목의 selection_id를 저장할 객체

        for (const selection of selections) {
            // console.log("Processing selection:", selection);

            if (selection.type === 'menu') {
                // menu 항목 저장 후 selection_id를 menuSelections에 저장
                const menuSelectionId = await projectModel.addProjectSelection(
                    projectId,
                    selection.type,
                    selection.value
                );
                menuSelections[selection.value] = menuSelectionId; // menu value 기준으로 selection_id 저장
                // console.log(`Stored menu selection: ${selection.value} with ID: ${menuSelectionId}`);

                // features가 존재할 경우, 해당 menu에 연결된 feature 항목들을 저장
                if (selection.features && Array.isArray(selection.features)) {
                    for (const feature of selection.features) {
                        // console.log(`Attempting to save feature with menuSelectionId: ${menuSelectionId} for feature value: ${feature.value}`);
                        await projectModel.addProjectFeature(
                            menuSelectionId,
                            feature.value,
                            feature.option || null
                        );
                    }
                }
            } else {
                // device, service 등의 일반 항목 저장
                await projectModel.addProjectSelection(
                    projectId,
                    selection.type,
                    selection.value
                );
            }
        }

        // console.log("Final Menu Selections Map:", menuSelections);

        res.status(201).json({ message: "Project created successfully", projectId });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Failed to create project" });
    }
};

// 프로젝트 선택값 기반으로 텍스트 생성
// exports.generateProjectText = async (req, res) => {
//     const { projectId } = req.params;

//     try {
//         // 프로젝트 기본 정보 가져오기
//         const projectInfo = await projectModel.getProjectById(projectId);
//         if (!projectInfo) {
//             return res.status(404).json({ error: "해당 프로젝트를 찾을 수 없습니다." });
//         }

//         const serviceTitle = projectInfo.project_name;
//         const serviceDesc = projectInfo.project_description;

//         // 프로젝트 선택값 불러오기
//         const selections = await projectModel.getProjectSelections(projectId) || [];
//         if (selections.length === 0) {
//             return res.status(404).json({ error: "선택된 항목이 없습니다." });
//         }

//         const serviceDevice = selections.find(sel => sel.selection_type === 'device')?.selection_value || '';
//         const serviceType = selections.find(sel => sel.selection_type === 'service')?.selection_value || '';

//         // 메뉴와 각 메뉴에 대한 features 정보를 가져오기
//         const groupedSelections = [];
//         for (const selection of selections) {
//             if (selection.selection_type === 'menu') {
//                 const menuSelection = { menu: selection.selection_value, features: [] };
//                 const features = await projectModel.getProjectFeatures(selection.selection_id);

//                 for (const feature of features) {
//                     menuSelection.features.push({
//                         feature: feature.feature_name,
//                         option: feature.feature_option || null
//                     });
//                 }

//                 groupedSelections.push(menuSelection);
//             }
//         }

//         const responses = [];
//         let successCount = 0;
//         let failureCount = 0;

//         // 각 메뉴와 그에 해당하는 feature에 대해 OpenAI API 호출
//         for (const group of groupedSelections) {
//             const { menu, features } = group;

//             for (const featureObj of features) {
//                 const { feature, option: featureOption } = featureObj;

//                 try {
//                     const featureDetails = await componentModel.getComponentDetails(menu, feature);

//                     if (!featureDetails || featureDetails.length === 0) {
//                         responses.push({
//                             menu,
//                             feature,
//                             content: null,
//                             success: false
//                         });
//                         failureCount++;
//                         continue;
//                     }

//                     const { depth1, depth2, structure, content, cnt } = featureDetails;

//                     const featureResponseData = await generateOpenAiText(
//                         serviceType, serviceTitle, serviceDesc, depth1, depth2, feature, structure, content, cnt
//                     );

//                     responses.push({
//                         menu,
//                         feature,
//                         content: featureResponseData.content, // 클라이언트가 기대하는 JSON 형식
//                         success: true
//                     });

//                     successCount++;
//                 } catch (error) {
//                     console.error(`Error processing feature '${feature}' in menu '${menu}':`, error);

//                     responses.push({
//                         menu,
//                         feature,
//                         content: null,
//                         success: false
//                     });

//                     failureCount++;
//                 }
//             }
//         }

//         // 최종 로그에 요약 정보 포함
//         logger.info("프로젝트 텍스트 생성 결과", {
//             projectId,
//             successCount,
//             failureCount,
//             responses: responses.map(r => ({
//                 menu: r.menu,
//                 feature: r.feature,
//                 success: r.success,
//                 summary: r.content ? generateSummary({ content: r.content }) : "No content available"
//             }))
//         });

//         // 최종 응답 데이터
//         res.status(200).json({
//             projectId,
//             project_name: serviceTitle,
//             project_description: serviceDesc,
//             project_device: serviceDevice,
//             project_type: serviceType,
//             successCount,
//             failureCount,
//             featureResponseData: responses
//         });
//     } catch (error) {
//         logger.error("프로젝트 텍스트 생성 오류", error);
//         res.status(500).json({ error: "텍스트 생성 실패" });
//     }
// };

// 요약 생성 함수
function generateSummary(featureResponseData) {
    if (!featureResponseData || !featureResponseData.content) {
        return "No content available";
    }
    const { content } = featureResponseData;
    return `${content.title || ""} ${content.desc || ""}`.trim();
}

exports.generateProjectText = async (req, res) => {
    const { projectId } = req.params;

    try {
        // 프로젝트 기본 정보 가져오기
        const projectInfo = await projectModel.getProjectById(projectId);
        if (!projectInfo) {
            return res.status(404).json({ error: "해당 프로젝트를 찾을 수 없습니다." });
        }

        const serviceTitle = projectInfo.project_name;
        const serviceDesc = projectInfo.project_description;

        // 프로젝트 선택값 불러오기
        const selections = await projectModel.getProjectSelections(projectId) || [];
        if (selections.length === 0) {
            return res.status(404).json({ error: "선택된 항목이 없습니다." });
        }

        const serviceDevice = selections.find(sel => sel.selection_type === 'device')?.selection_value || '';
        const serviceType = selections.find(sel => sel.selection_type === 'service')?.selection_value || '';

        // 메뉴와 각 메뉴에 대한 features 정보를 가져오기
        const groupedSelections = [];
        for (const selection of selections) {
            if (selection.selection_type === 'menu') {
                const menuSelection = { menu: selection.selection_value, features: [] };
                const features = await projectModel.getProjectFeatures(selection.selection_id);

                for (const feature of features) {
                    menuSelection.features.push({
                        feature_id: feature.feature_id,
                        feature: feature.feature_name,
                        option: feature.feature_option || null
                    });
                }

                groupedSelections.push(menuSelection);
            }
        }

        const responses = [];
        let successCount = 0;
        let failureCount = 0;

        // 각 메뉴와 그에 해당하는 feature에 대해 OpenAI API 호출
        for (const group of groupedSelections) {
            const { menu, features } = group;

            for (const featureObj of features) {
                const { feature, option: featureOption, feature_id } = featureObj; // feature_id 추가

                try {
                    const featureDetails = await componentModel.getComponentDetails(menu, feature);

                    if (!featureDetails || featureDetails.length === 0) {
                        responses.push({
                            menu,
                            feature,
                            content: null,
                            success: false
                        });
                        failureCount++;
                        continue;
                    }

                    const { depth1, depth2, structure, content, cnt } = featureDetails;

                    const featureResponseData = await generateOpenAiText(
                        serviceType, serviceTitle, serviceDesc, depth1, depth2, feature, structure, content, cnt
                    );

                    // DB에 결과 저장
                    if (feature_id) {
                        await projectModel.updateFeatureContent(feature_id, JSON.stringify(featureResponseData.content));
                    }

                    responses.push({
                        menu,
                        feature,
                        feature_id,
                        content: featureResponseData.content,
                        success: true
                    });

                    successCount++;
                } catch (error) {
                    console.error(`Error processing feature '${feature}' in menu '${menu}':`, error);

                    responses.push({
                        menu,
                        feature,
                        feature_id,
                        content: null,
                        success: false
                    });

                    failureCount++;
                }
            }
        }


        // 최종 로그에 요약 정보 포함
        logger.info("프로젝트 텍스트 생성 결과", {
            projectId,
            successCount,
            failureCount,
            responses: responses.map(r => ({
                menu: r.menu,
                feature: r.feature,
                success: r.success,
                summary: r.content ? generateSummary({ content: r.content }) : "No content available"
            }))
        });

        // 최종 응답 데이터
        res.status(200).json({
            projectId,
            project_name: serviceTitle,
            project_description: serviceDesc,
            project_device: serviceDevice,
            project_type: serviceType,
            successCount,
            failureCount,
            featureResponseData: responses
        });
    } catch (error) {
        logger.error("프로젝트 텍스트 생성 오류", error);
        res.status(500).json({ error: "텍스트 생성 실패" });
    }
};

exports.getAllFeaturesForProject = async (req, res) => {
    const { projectId } = req.params;

    try {
        // 프로젝트의 기본 정보 가져오기
        const projectInfo = await projectModel.getProjectById(projectId);

        if (!projectInfo || projectInfo.length === 0) {
            return res.status(404).json({ error: "Project 정보를 찾을 수 없습니다." });
        }

        const features = await projectModel.getProjectFeaturesWithId(projectId);

        if (!features || features.length === 0) {
            return res.status(404).json({ error: "Feature 정보를 찾을 수 없습니다." });
        }

        // 각 feature의 content를 처리
        const featureResponseData = features.map(feature => ({
            feature_id: feature.feature_id,
            menu: feature.menu,
            feature: feature.feature_name,
            content:
                typeof feature.content === "string"
                    ? feature.content === "none"
                        ? null
                        : JSON.parse(feature.content) // JSON 문자열인 경우 파싱
                    : feature.content, // 이미 객체인 경우 그대로 사용
        }));

        // 성공 응답
        res.status(200).json({
            projectId,
            projectName: projectInfo.project_name,
            projectDesc: projectInfo.project_description,
            featureResponseData,
        });
    } catch (error) {
        console.error("Error fetching features for project:", error);
        res.status(500).json({ error: "Feature 정보를 가져오는 중 오류가 발생했습니다." });
    }
};

// feature content 수정
exports.updateFeatureContent = async (req, res) => {
    const { featureId } = req.params;
    const { content } = req.body;

    try {
        // featureId와 content 유효성 검사
        if (!featureId || !content) {
            return res.status(400).json({ error: "featureId와 content는 필수입니다." });
        }

        // content를 JSON 문자열로 변환
        const contentString = typeof content === 'object' ? JSON.stringify(content) : content;

        // feature content 업데이트
        const isUpdated = await projectModel.updateFeatureContent(featureId, contentString);

        if (!isUpdated) {
            return res.status(404).json({ error: "해당 feature를 찾을 수 없습니다." });
        }

        // 성공 응답
        res.status(200).json({ message: "feature content가 성공적으로 업데이트되었습니다." });
    } catch (error) {
        console.error("Error updating feature content:", error);
        res.status(500).json({ error: "feature content 업데이트 중 오류가 발생했습니다." });
    }
};

exports.generateFilesForProject = async (req, res) => {
    const { project_id, format } = req.body;

    if (!project_id || !format) {
        return res.status(400).json({ message: "project_id와 format(png, jpg, pdf)이 필요합니다." });
    }

    try {
        // 1. DB에서 project_id에 해당하는 파일 가져오기
        const files = await projectModel.getFilesByProject(project_id);
        if (!files || files.length === 0) {
            return res.status(404).json({ message: "해당 프로젝트에 파일이 없습니다." });
        }

        // "메인" 파일을 먼저 가져오고 나머지 파일들로 배열을 나누기
        const mainFiles = files.filter(file => file.action_url.includes("메인"));
        const otherFiles = files.filter(file => !file.action_url.includes("메인"));

        // "메인" 파일을 맨 앞에 추가하고 나머지 파일들은 뒤에 추가
        const sortedFiles = [...mainFiles, ...otherFiles];

        // 작업 디렉토리 설정
        const outputDir = path.resolve(process.env.FILE_DIRECTORY);
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

        // 파일명 설정 (기본적으로 프로젝트 아이디와 현재 시간을 기반으로 파일명 설정)
        const zipFileName = `project-${project_id}-${Date.now()}.zip`;
        const zipFilePath = path.join(outputDir, zipFileName);

        const output = fs.createWriteStream(zipFilePath);
        const archive = archiver("zip");

        archive.pipe(output);  // 압축 파일 생성

        if (format.toLowerCase() === "png") {
            // PNG 파일을 압축에 추가
            for (const file of sortedFiles) {
                if (file.file_type === "image" && file.file_path.endsWith(".png")) {
                    archive.file(file.file_path, { name: path.basename(file.file_path) });
                }
            }

        } else if (format.toLowerCase() === "jpg") {
            // JPG 변환 후 압축 파일 생성
            for (const file of sortedFiles) {
                if (file.file_type === "image" && file.file_path.endsWith(".png")) {
                    const jpgFilePath = path.join(outputDir, `${path.basename(file.file_path, ".png")}.jpg`);
                    await sharp(file.file_path).jpeg().toFile(jpgFilePath); // PNG -> JPG 변환
                    archive.file(jpgFilePath, { name: path.basename(jpgFilePath) });
                }
            }

        } else if (format.toLowerCase() === "pdf") {
            // Puppeteer로 PDF 파일 생성
            const pdfFileName = `project-${project_id}-${Date.now()}.pdf`;
            const pdfFilePath = path.join(outputDir, pdfFileName);

            const isLocal = process.env.NODE_ENV === 'development';

            const browser = await puppeteer.launch({
                executablePath: isLocal
                    ? '/Users/hansong-i/.cache/puppeteer/chrome/mac_arm-131.0.6778.85/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'
                    : '/usr/bin/chromium-browser',  // 배포 서버에서 설치한 Chromium 경로
                args: ["--no-sandbox", "--disable-setuid-sandbox"],
            });

            const pdfPages = [];

            // 각 이미지에 대해 PDF 페이지를 생성
            for (const file of sortedFiles) {
                if (file.file_type === "image" && file.file_path.endsWith(".png")) {
                    const page = await browser.newPage();

                    // 각 이미지를 HTML 페이지로 불러오기
                    const fileUrl = file.action_url; // DB에서 이미지 URL 가져오기

                    await page.setContent(`
                        <html>
                            <body style="width: 100%; margin: 0; display: flex; justify-content: center;">
                                <img src="${fileUrl}" style="max-width: 100%; height: auto;" />  <!-- 이미지 크기 자동 조정 -->
                            </body>
                        </html>
                    `);

                    // 뷰포트를 A4 크기에 맞추기
                    await page.setViewport({
                        width: 595,  // A4 크기 (mm 기준으로 210mm -> 595px)
                        height: 842, // A4 크기 (mm 기준으로 297mm -> 842px)
                        deviceScaleFactor: 2, // 고해상도
                    });

                    await page.goto(fileUrl, { waitUntil: "networkidle0" });

                    // 페이지를 PDF로 변환
                    const pdfPath = path.join(outputDir, `page-${Date.now()}.pdf`);
                    await page.pdf({
                        path: pdfPath, // 각 페이지 PDF 저장
                        format: "A4",
                        printBackground: true,
                        scale: 0.5,
                    });

                    // PDF 파일 경로를 배열에 저장
                    pdfPages.push(pdfPath);
                    await page.close();
                }
            }

            await browser.close();

            // 디버깅을 위한 출력 (pdfPages 배열 확인)
            console.log('PDF Pages:', pdfPages);

            // PDF 병합
            if (pdfPages.length > 0) {
                const mergedPdfBytes = await mergePdfs(pdfPages); // 병합 함수 호출

                // 병합된 PDF 저장
                fs.writeFileSync(pdfFilePath, mergedPdfBytes);

                // 클라이언트에 PDF 파일 경로 반환
                return res.status(200).json({ downloadUrl: `/files/${pdfFileName}` });
            } else {
                return res.status(500).json({ message: "PDF 페이지를 생성하지 못했습니다." });
            }

        } else {
            return res.status(400).json({ message: "유효하지 않은 format입니다. png, jpg 또는 pdf만 가능합니다." });
        }

        await archive.finalize();
        output.close(); // 스트림 종료

        // 클라이언트에 ZIP 파일 경로 반환
        return res.status(200).json({ downloadUrl: `/files/${zipFileName}` });

    } catch (error) {
        console.error("파일 처리 중 오류:", error);
        return res.status(500).json({ message: "파일 처리 중 오류가 발생했습니다." });
    }
};


