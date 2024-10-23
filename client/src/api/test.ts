import axios from "axios";
import { assistantConfig } from "@data/assistantConfig";
import { DEV_API_KEY } from "./key";
import { IapiRequest } from "@pages/user/TestPage/TestPage";
import { TserviceDataKey } from "@data/serviceData";

// OpenAI API 호출 함수
export const makeComponentText = async (
  componentData: IapiRequest<TserviceDataKey>
) => {
  const { service, serviceTitle, serviceDesc, depth1, depth2, structure } =
    componentData;

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
            content: `generate text for the ${depth1} menu ${depth2} page component of the ${service} web page name ${serviceTitle}, according to the ${structure} structure. Refer to the description of the web page created by the client: ${serviceDesc}. and Don't put any explanations other than the structure you set. answer with JSON format only. value must be korean`,
          },
        ],
        temperature: 1,
        top_p: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${DEV_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error("API 요청 중 오류가 발생했습니다: ", error);
    throw error;
  }
};
