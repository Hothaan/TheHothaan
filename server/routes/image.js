const express = require("express");
const router = express.Router();
const { saveImageFromHTML } = require("../controllers/imageController");

/**
 * @swagger
 * /api/image/save:
 *   post:
 *     summary: HTML 코드를 이미지로 저장
 *     description: HTML 코드를 PNG 이미지로 변환하고 저장합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               htmlContent:
 *                 type: string
 *                 description: 변환할 HTML 코드
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
router.post("/save", saveImageFromHTML);

module.exports = router;
