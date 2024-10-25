// import axios from "axios";
// import { assistantConfig } from "@data/assistantConfig";
// // import { DEV_API_KEY } from "./key";
// import { IapiRequest } from "@pages/user/TestPage/TestPage";
// import { TserviceDataKey } from "@data/serviceData";

// // OpenAI API 호출 함수
// export const makeComponentText = async (
//   componentData: IapiRequest<TserviceDataKey>
// ) => {
//   const { service, serviceTitle, serviceDesc, depth1, depth2, structure } =
//     componentData;

//   const DEV_API_KEY = process.env.REACT_APP_API_KEY_DEV;
//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-4",
//         messages: [
//           {
//             role: "system",
//             content: `${assistantConfig[service]}`,
//           },
//           {
//             role: "user",
//             content: `generate text for the ${depth1} menu ${depth2} page component of the ${service} web page name ${serviceTitle}, according to the ${structure} structure. Refer to the description of the web page created by the client: ${serviceDesc}. and Don't put any explanations other than the structure you set. answer with JSON format only. value must be korean`,
//           },
//         ],
//         temperature: 1,
//         top_p: 1,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${DEV_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     return JSON.parse(response.data.choices[0].message.content);
//   } catch (error) {
//     console.error("API 요청 중 오류가 발생했습니다: ", error);
//     throw error;
//   }
// };

import axios from "axios";
import { IapiRequest } from "@pages/user/TestPage/TestPage";
import { TserviceDataKey } from "@data/service/serviceData";

// 서버를 통해 OpenAI API 호출 함수
export const makeComponentText = async (
  componentData: IapiRequest<TserviceDataKey>
) => {
  try {
    // 클라이언트에서 서버로 POST 요청 보내기
    const response = await axios.post(
      "http://localhost:5001/api/openai",
      componentData
    );

    // 서버에서 받은 응답 처리
    return response.data;
  } catch (error) {
    console.error("서버 요청 중 오류가 발생했습니다: ", error);
    throw error;
  }
};
