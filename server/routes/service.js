// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

/**
 * @swagger
 * /api/service/device-options:
 *   get:
 *     summary: 디바이스 환경 옵션 가져오기
 *     description: 디바이스 환경을 선택하기 위한 옵션 리스트를 반환합니다.
 *     tags:
 *       - Service
 *     responses:
 *       200:
 *         description: 디바이스 환경 옵션 리스트
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get('/device-options', serviceController.getDeviceOptions);

/**
 * @swagger
 * /api/service/service-types:
 *   get:
 *     summary: 서비스 타입 가져오기
 *     description: 사용자에게 보여줄 수 있는 서비스 타입 리스트를 반환합니다.
 *     tags:
 *       - Service
 *     responses:
 *       200:
 *         description: 서비스 타입 옵션 리스트
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get('/service-types', serviceController.getServiceTypes);

/**
 * @swagger
 * /api/service/{serviceTypeId}/menus:
 *   get:
 *     summary: 특정 서비스 타입의 메뉴 가져오기
 *     description: 서비스 타입 ID를 기반으로 해당하는 메뉴 리스트를 반환합니다.
 *     tags:
 *       - Service
 *     parameters:
 *       - in: path
 *         name: serviceTypeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 가져올 서비스 타입의 ID
 *     responses:
 *       200:
 *         description: 서비스 타입별 메뉴 리스트
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   menu_id:
 *                     type: integer
 *                   menu_name:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         item_id:
 *                           type: integer
 *                         item_name:
 *                           type: string
 *                         is_default:
 *                           type: boolean
 */
router.get('/:serviceTypeId/menus', serviceController.getMenusWithItems);


module.exports = router;
