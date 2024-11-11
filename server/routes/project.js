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
 *                 description: 사용자가 선택한 항목들
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       description: 선택 항목의 유형 (device, service, menu, feature)
 *                       example: "menu"
 *                     value:
 *                       type: string
 *                       description: 선택 항목의 값
 *                       example: "메인"
 *                 example: [
 *                   { "type": "device", "value": "PC" },
 *                   { "type": "service", "value": "쇼핑몰" },
 *                   { "type": "menu", "value": "메인" },
 *                   { "type": "feature", "value": "메인" },
 *                   { "type": "menu", "value": "상품" },
 *                   { "type": "feature", "value": "상품 목록" },
 *                   { "type": "feature", "value": "상품 상세" },
 *                   { "type": "menu", "value": "고객센터" },
 *                   { "type": "feature", "value": "공지사항" },
 *                   { "type": "menu", "value": "마이페이지" },
 *                   { "type": "feature", "value": "주문 목록" },
 *                   { "type": "feature", "value": "장바구니" },
 *                   { "type": "menu", "value": "유틸리티" },
 *                   { "type": "feature", "value": "로그인" },
 *                   { "type": "feature", "value": "회원가입" },
 *                   { "type": "feature", "value": "아이디 찾기" },
 *                   { "type": "feature", "value": "비밀번호 찾기" }
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

module.exports = router;
