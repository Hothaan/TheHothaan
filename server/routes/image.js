const express = require("express");
const router = express.Router();
const { saveImageFromURL } = require("../controllers/imageController");

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
router.post("/save", saveImageFromURL);

module.exports = router;
