require('dotenv').config();

const express = require('express');
const axios = require('axios');
const router = express.Router();
const apiKey = process.env.API_KEY_DEV;
const logger = require('../config/logger');
const { assistantConfig } = require('../shared/assistantconfig');

/**
 * @swagger
 * /api/openai:
 *   post:
 *     summary: OpenAI API 호출
 *     description: OpenAI API를 호출하여 텍스트를 생성합니다.
 *     tags:
 *       - AI(gpt)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *                 example: "shoppingMall"
 *               serviceTitle:
 *                 type: string
 *                 example: "더핫한"
 *               serviceDesc:
 *                 type: string
 *                 example: "기획안 생성 플랫폼"
 *               depth1:
 *                 type: string
 *                 example: "main"
 *               depth2:
 *                 type: string
 *                 example: "main"
 *               component:
 *                 type: string
 *                 example: "mainBanner"
 *               structure:
 *                 type: string
 *                 example: "{title: string; desc: string; }"
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: "더핫한 쇼핑몰에 오신 것을 환영합니다"
 *                 desc:
 *                   type: string
 *                   example: "당신의 기획안 생성 플랫폼, 더핫한에서 필요한 모든 상품을 찾아보세요"
 *       500:
 *         description: 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.post('/', async (req, res) => {
  const { service, serviceTitle, serviceDesc, depth1, depth2, structure, component } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `${assistantConfig[service]}`,
          },
          {
            role: 'user',
            content: `generate text for the ${depth1} menu ${depth2} page ${component} component of the ${service} web page name ${serviceTitle}, according to the ${structure} structure. Refer to the description of the web page created by the client: ${serviceDesc}. Don't put any explanations other than the structure you set. answer with JSON format only. value must be korean`,
          },
        ],
        temperature: 1,
        top_p: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    // OpenAI 응답에서 JSON 형식 파싱
    const content = response.data.choices[0].message.content;
    const responseData = JSON.parse(content);

    // 응답 데이터의 유효성 확인 (title과 desc 필드가 있는지)
    const isValidResponse =
      responseData && typeof responseData.title === 'string' && typeof responseData.desc === 'string';

    if (isValidResponse) {
      // 요약 텍스트 요청
      const summaryResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'Summarize the following content in a natural, concise Korean sentence:',
            },
            {
              role: 'user',
              content: `Title: ${responseData.title}, Description: ${responseData.desc}`,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const summaryContent = summaryResponse.data.choices[0].message.content;

      // 성공 로그 기록 (요약 포함, 사용자가 입력한 데이터 포함)
      const summaryLog = {
        userInput: {
          service,
          serviceTitle,
          serviceDesc,
          depth1,
          depth2,
          component,
          structure,
        },
        generatedResponse: responseData,
        summaryContent,
      };
      logger.info('OpenAI API 성공 요약: ', summaryLog);

      // 클라이언트에는 요약 제외한 응답만 반환
      res.json(responseData);
    } else {
      logger.error('OpenAI API 실패 - 예상치 못한 응답 형식', { responseData });
      res.status(500).json({ error: 'OpenAI API가 예상한 JSON 형식을 반환하지 않았습니다.' });
    }
  } catch (error) {
    console.error('API 요청 중 오류가 발생했습니다: ', error);
    logger.error('API 요청 중 오류 발생: ', error);
    res.status(500).json({ error: 'OpenAI API 요청 실패' });
  }
});

module.exports = router;
