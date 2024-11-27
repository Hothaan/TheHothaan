const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

/**
 * @swagger
 * /api/project/create:
 *   post:
 *     summary: 새로운 프로젝트 생성
 *     description: 사용자 입력값을 바탕으로 새로운 프로젝트와 선택 항목들을 생성합니다. (device, service, menu, feature)
 *     tags:
 *       - Project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_email:
 *                 type: string
 *                 description: 유저의 이메일(ID)
 *                 example: "test@test.com"
 *               project_name:
 *                 type: string
 *                 description: 프로젝트 이름
 *                 example: "내 쇼핑몰 프로젝트"
 *               project_description:
 *                 type: string
 *                 description: 프로젝트 설명
 *                 example: "AI가 생성한 쇼핑몰 템플릿입니다."
 *               selections:
 *                 type: array
 *                 description: 사용자가 선택한 항목들 (menu와 연결된 feature 항목 포함)
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       description: 선택 항목의 유형 (device, service, menu)
 *                       example: "menu"
 *                     value:
 *                       type: string
 *                       description: 선택 항목의 값
 *                       example: "메인"
 *                     option:
 *                       type: string
 *                       description: 선택 항목의 옵션 (추가 정보)
 *                       example: "옵션 정보"
 *                     features:
 *                       type: array
 *                       description: menu에 연결된 feature 항목들
 *                       items:
 *                         type: object
 *                         properties:
 *                           value:
 *                             type: string
 *                             description: feature의 값
 *                             example: "로그인"
 *                           option:
 *                             type: string
 *                             description: feature의 옵션 (추가 정보)
 *                             example: "소셜 로그인"
 *                 example: [
 *                   { "type": "device", "value": "PC" },
 *                   { "type": "service", "value": "쇼핑몰" },
 *                   { 
 *                     "type": "menu", 
 *                     "value": "메인", 
 *                     "features": [
 *                       { "value": "메인" }
 *                     ]
 *                   },
 *                   { 
 *                     "type": "menu", 
 *                     "value": "상품", 
 *                     "features": [
 *                       { "value": "상품 목록" },
 *                       { "value": "상품 상세" }
 *                     ]
 *                   },
 *                   { 
 *                     "type": "menu", 
 *                     "value": "유틸리티", 
 *                     "features": [
 *                       { "value": "로그인", "option": "소셜 로그인" }
 *                     ]
 *                   }
 *                 ]
 *     responses:
 *       201:
 *         description: 프로젝트 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project created successfully"
 *                 projectId:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: 프로젝트 생성 실패
 */
router.post('/create', projectController.createProject);

/**
 * @swagger
 * /api/project/{projectId}/generate-text:
 *   get:
 *     summary: 프로젝트의 선택값을 기반으로 텍스트 생성
 *     description: 저장된 프로젝트 선택값을 기반으로 OpenAI API를 호출하여 텍스트를 생성하고 프로젝트의 기본 정보와 함께 반환합니다.
 *     tags:
 *       - Project
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 텍스트 생성을 위한 프로젝트 ID
 *     responses:
 *       200:
 *         description: 텍스트 생성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projectId:
 *                   type: integer
 *                   example: 1
 *                 project_name:
 *                   type: string
 *                   example: "내 쇼핑몰 프로젝트"
 *                 project_description:
 *                   type: string
 *                   example: "AI가 생성한 쇼핑몰 템플릿입니다."
 *                 project_device:
 *                   type: string
 *                   example: "PC"
 *                 project_type:
 *                   type: string
 *                   example: "쇼핑몰"
 *                 responses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       menu:
 *                         type: string
 *                         example: "메인"
 *                       feature:
 *                         type: string
 *                         example: "메인"
 *                       content:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             example: "내 쇼핑몰 프로젝트 메인 화면에 오신 것을 환영합니다."
 *                           desc:
 *                             type: string
 *                             example: "AI가 추천하는 상품을 둘러보세요."
 *       404:
 *         description: 프로젝트를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "해당 프로젝트를 찾을 수 없습니다."
 *       500:
 *         description: 텍스트 생성 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "텍스트 생성 실패"
 */
router.get('/:projectId/generate-text', projectController.generateProjectText);

/**
 * @swagger
 * /api/project/{projectId}/features:
 *   get:
 *     summary: 특정 프로젝트의 모든 feature 정보 가져오기
 *     description: 프로젝트 ID에 해당하는 모든 메뉴 및 feature 정보를 가져옵니다.
 *     tags:
 *       - Project
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 프로젝트 ID
 *     responses:
 *       200:
 *         description: 성공적으로 프로젝트 feature 정보를 가져옴
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projectId:
 *                   type: integer
 *                   example: 1
 *                 featureResponseData:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       feature_id:
 *                         type: integer
 *                         example: 1
 *                       menu:
 *                         type: string
 *                         example: "메인"
 *                       feature:
 *                         type: string
 *                         example: "메인"
 *                       content:
 *                         type: object
 *                         example: { "title": "Welcome", "desc": "Description" }
 *       404:
 *         description: 프로젝트 또는 feature 정보가 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "해당 프로젝트를 찾을 수 없습니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "프로젝트 feature 정보를 가져오는 데 실패했습니다."
 */
router.get('/:projectId/features', projectController.getAllFeaturesForProject);

/**
 * @swagger
 * /api/project/features/update/{featureId}:
 *   put:
 *     summary: feature content 수정
 *     description: 특정 feature의 content 값을 수정합니다.
 *     tags:
 *       - Project
 *     parameters:
 *       - in: path
 *         name: featureId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 feature의 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: object
 *                 description: 수정할 content 값
 *                 example: 
 *                   title: "새로운 제목"
 *                   desc: "새로운 설명"
 *     responses:
 *       200:
 *         description: 업데이트 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "feature content가 성공적으로 업데이트되었습니다."
 *       400:
 *         description: 요청 값이 잘못됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "featureId와 content는 필수입니다."
 *       404:
 *         description: 해당 feature를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "해당 feature를 찾을 수 없습니다."
 *       500:
 *         description: 업데이트 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "feature content 업데이트 중 오류가 발생했습니다."
 */
router.put('/features/update/:featureId', projectController.updateFeatureContent);


module.exports = router;
