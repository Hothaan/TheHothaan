// server/routes/user.js
const express = require("express");
const router = express.Router();
const { register } = require("../controllers/authController"); // authController에서 register 함수를 가져옴

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: 회원가입 API
 *     description: 새로운 사용자를 등록합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/register", register); // 회원가입 요청을 처리하는 라우터

module.exports = router;