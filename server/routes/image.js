const express = require('express');
const router = express.Router();
const { saveImageFromURL, saveImageToDatabase } = require('../controllers/imageController');

/**
 * @swagger
 * /api/image/save:
 *   post:
 *     summary: URL 페이지를 이미지로 저장
 *     description: URL 페이지를 PNG 이미지로 변환하고 저장합니다.
 *     tags:
 *       - Image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: 변환할 url
 *     responses:
 *       200:
 *         description: 이미지 저장 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 path:
 *                   type: string
 */
router.post('/save', saveImageFromURL);

/**
 * @swagger
 * /api/image/save-to-db:
 *   post:
 *     summary: URL 페이지를 이미지로 저장하고 데이터베이스에 기록
 *     description: URL 페이지를 PNG 이미지로 변환하고 데이터베이스에 project_id 및 feature_id와 함께 저장합니다.
 *     tags:
 *       - Image
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: 변환할 url
 *               project_id:
 *                 type: integer
 *                 description: 프로젝트 ID
 *               feature_id:
 *                 type: integer
 *                 description: 피처 ID
 *               feature:
 *                 type: string
 *                 description: 페이지명
 *     responses:
 *       200:
 *         description: 이미지 저장 성공 및 데이터베이스 기록 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 project_id:
 *                   type: integer
 *                 feature_id:
 *                   type: integer
 *                 file_id:
 *                   type: integer
 *                 path:
 *                   type: string
 *                 url:
 *                   type: string
 *                 feature:
 *                   type: string
 *                   example: "메인"
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버 오류가 발생했습니다."
 *                 feature:
 *                   type: string
 *                   example: "메인"
 */
router.post('/save-to-db', saveImageToDatabase);

module.exports = router;
