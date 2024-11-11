const projectModel = require('../models/project');
const componentModel = require('../models/components');
const { generateOpenAiText } = require('../helpers/openAiHelper');
const logger = require('../config/logger');

// 프로젝트 생성 함수
exports.createProject = async (req, res) => {
    const { user_email, project_name, project_description, selections } = req.body;

    try {
        // 1. 프로젝트 정보 저장
        const projectId = await projectModel.createProject(user_email, project_name, project_description);

        // 2. 선택된 값들 저장
        for (const selection of selections) {
            await projectModel.addProjectSelection(projectId, selection.type, selection.value);
        }

        res.status(201).json({ message: "Project created successfully", projectId });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Failed to create project" });
    }
};

// 프로젝트 선택값 기반으로 텍스트 생성
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
        // console.log("selections", selections);

        const serviceDevice = selections.find(sel => sel.selection_type === 'device')?.selection_value || '';
        const serviceType = selections.find(sel => sel.selection_type === 'service')?.selection_value || '';

        const groupedSelections = selections.reduce((acc, selection) => {
            if (selection.selection_type === 'menu') {
                acc.push({ menu: selection.selection_value, features: [] });
            } else if (selection.selection_type === 'feature') {
                const lastMenu = acc[acc.length - 1];
                if (lastMenu) {
                    lastMenu.features.push(selection.selection_value);
                }
            }
            return acc;
        }, []);
        console.log("groupedSelections", groupedSelections);

        const responses = [];

        // 각 메뉴와 그에 해당하는 feature에 대해서만 OpenAI API 호출
        for (const group of groupedSelections) {
            const { menu, features } = group;
            console.log("features", features);

            // 각 feature에 대해 OpenAI API 호출
            for (const feature of features) {
                const featureDetails = await componentModel.getComponentDetails(menu, feature);

                if (!featureDetails || featureDetails.length === 0) {
                    logger.warn(`해당 피처의 컴포넌트 정보를 찾을 수 없습니다: feature, ${feature}`);
                    continue;
                }

                const { depth1, depth2, structure } = featureDetails;

                // OpenAI API 호출하여 feature에 대한 텍스트 생성
                const featureResponseData = await generateOpenAiText('feature', serviceTitle, serviceDesc, depth1, depth2, feature, structure);
                responses.push({ menu, feature, content: featureResponseData });
            }
        }

        logger.info("프로젝트 텍스트 생성 성공", { projectId, responses });
        res.status(200).json({
            projectId, project_name: serviceTitle, project_description: serviceDesc, project_device: serviceDevice, project_type: serviceType, responses
        });
    } catch (error) {
        logger.error("프로젝트 텍스트 생성 오류", error);
        res.status(500).json({ error: "텍스트 생성 실패" });
    }
};