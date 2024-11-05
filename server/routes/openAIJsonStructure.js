require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();
const apiKey = process.env.API_KEY_DEV;
const { assistantConfig } = require("../shared/assistantconfig.js");

import { z } from "zod";

const CalendarEvent = z.object({
  name: z.string(),
  date: z.string(),
  participants: z.array(z.string()),
});

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

    // JSON 파싱 및 Zod 검증
    try {
      const parsedData = JSON.parse(response.data.choices[0].message.content);
      const validatedData = CalendarEvent.parse(parsedData);

      res.json(validatedData);
    } catch (parseError) {
      console.error("응답 검증 중 오류가 발생했습니다: ", parseError);
      res
        .status(400)
        .json({ error: "응답 데이터 검증 실패", details: parseError });
    }
  } catch (error) {
    console.error("API 요청 중 오류가 발생했습니다: ", error);
    res.status(500).json({ error: "OpenAI API 요청 실패" });
  }
});

module.exports = router;
