// server/routes/user.js
const express = require("express");
const router = express.Router();
const controller = require('../controllers/authController');

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
router.post("/register", controller.register); // 회원가입 요청을 처리하는 라우터

/**
 * @swagger
 * /api/user/check-useremail:
 *   get:
 *     summary: 아이디 중복 확인 API
 *     description: 아이디가 이미 사용 중인지 확인합니다.
 *     parameters:
 *       - in: query
 *         name: useremail
 *         schema:
 *           type: string
 *         required: true
 *         description: 확인할 아이디(이메일)
 *     responses:
 *       200:
 *         description: 아이디 중복 여부를 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 available:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.get("/check-useremail", controller.checkUseremail); // 아이디 중복 확인 요청을 처리하는 라우터

/**
 * @swagger
 * /api/user/send-verification-code:
 *   post:
 *     summary: 이메일 인증 코드 전송 API
 *     description: 이메일로 인증 코드를 전송합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 인증 코드를 받을 이메일 주소
 *     responses:
 *       200:
 *         description: 인증 코드가 이메일로 전송됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/send-verification-code", controller.sendVerificationCode); // 이메일 인증 코드 전송 라우터

/**
 * @swagger
 * /api/user/verify-code:
 *   post:
 *     summary: 이메일 인증 코드 확인 API
 *     description: 이메일로 받은 인증 코드를 확인합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: 인증 코드를 받은 이메일 주소
 *               code:
 *                 type: string
 *                 description: 사용자에게 전송된 인증 코드
 *     responses:
 *       200:
 *         description: 이메일 인증 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: 잘못된 인증 코드
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post("/verify-code", controller.verifyCode); // 이메일 인증 코드 확인 라우터

module.exports = router;