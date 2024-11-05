require("dotenv").config();

const express = require("express");
const axios = require("axios");
const router = express.Router();
const apiKey = process.env.API_KEY_DEV;
const { assistantConfig } = require("../../shared/assistantconfig.js");

/**
 * @swagger
 * /api/openai:
 *   post:
 *     summary: OpenAI API 호출
 *     description: OpenAI API를 호출하여 텍스트를 생성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service:
 *                 type: string
 *               serviceTitle:
 *                 type: string
 *               serviceDesc:
 *                 type: string
 *               depth1:
 *                 type: string
 *               depth2:
 *                 type: string
 *               structure:
 *                 type: string
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post("/", async (req, res) => {
  const {
    service,
    serviceTitle,
    serviceDesc,
    depth1,
    depth2,
    structure,
    component,
  } = req.body;

  console.log(apiKey);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `${assistantConfig[service]}`,
          },
          {
            role: "user",
            content: `generate text for the ${depth1} menu ${depth2} page ${component} component of the ${service} web page name ${serviceTitle}, according to the ${structure} structure. Refer to the description of the web page created by the client: ${serviceDesc}. Don't put any explanations other than the structure you set. answer with JSON format only. value must be korean`,
          },
        ],
        temperature: 1,
        top_p: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    // res.response;
    res.json(JSON.parse(response.data.choices[0].message.content));
  } catch (error) {
    console.error("API 요청 중 오류가 발생했습니다: ", error);
    // res.status(500).json({ error: "OpenAI API 요청 실패" });
  }
});

module.exports = router;
