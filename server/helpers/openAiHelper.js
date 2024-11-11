require("dotenv").config();
const axios = require("axios");
const apiKey = process.env.API_KEY_DEV;
const { assistantConfig } = require("../shared/assistantconfig.js");
const logger = require('../config/logger');

async function generateOpenAiText(service, serviceTitle, serviceDesc, depth1, depth2, component, structure) {
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

    // OpenAI 응답에서 JSON 형식 파싱
    const content = response.data.choices[0].message.content;
    const responseData = JSON.parse(content);

    // 응답 데이터의 유효성 확인 (title과 desc 필드가 있는지)
    const isValidResponse = responseData && typeof responseData.title === 'string' && typeof responseData.desc === 'string';

    if (isValidResponse) {
      // 요약 텍스트 요청
      const summaryResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "Summarize the following content in a natural, concise Korean sentence:",
            },
            {
              role: "user",
              content: `Title: ${responseData.title}, Description: ${responseData.desc}`,
            },
          ],
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
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

      // summaryContent를 포함하여 반환
    //   return { ...responseData, summary: summaryContent };
    return { ...responseData};
    } else {
      throw new Error("OpenAI API가 예상한 JSON 형식을 반환하지 않았습니다.");
    }
  } catch (error) {
    logger.error("OpenAI API 호출 중 오류 발생", error);
    throw error;
  }
}

module.exports = { generateOpenAiText };
