const express = require('express');
const router = express.Router();
const {
    createServiceHandler,
    addTemplateHandler,
    addMenuItemHandler
} = require('../controllers/serviceController');

/**
 * @swagger
 * /api/service/create:
 *   post:
 *     summary: 서비스 생성
 *     description: 새로운 서비스를 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: 사용자 ID
 *               name:
 *                 type: string
 *                 description: 서비스 이름
 *               description:
 *                 type: string
 *                 description: 서비스 설명
 *     responses:
 *       201:
 *         description: 서비스 생성 성공
 */
router.post('/create', createServiceHandler);

/**
 * @swagger
 * /api/service/template:
 *   post:
 *     summary: 템플릿 추가
 *     description: 특정 서비스에 템플릿을 추가합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceId:
 *                 type: integer
 *                 description: 서비스 ID
 *               menuName:
 *                 type: string
 *                 description: 메뉴 이름
 *               templateName:
 *                 type: string
 *                 description: 템플릿 이름
 *               generatedText:
 *                 type: string
 *                 description: 생성된 텍스트
 *     responses:
 *       201:
 *         description: 템플릿 추가 성공
 */
router.post('/template', addTemplateHandler);

/**
 * @swagger
 * /api/service/menu-item:
 *   post:
 *     summary: 메뉴 항목 추가
 *     description: 특정 서비스에 메뉴 항목을 추가합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceId:
 *                 type: integer
 *                 description: 서비스 ID
 *               menuName:
 *                 type: string
 *                 description: 메뉴 이름
 *               itemName:
 *                 type: string
 *                 description: 메뉴 항목 이름
 *     responses:
 *       201:
 *         description: 메뉴 항목 추가 성공
 */
router.post('/menu-item', addMenuItemHandler);

module.exports = router;
