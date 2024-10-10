import axios from "axios";
import { DEV_API_KEY } from "./key";
import { componentStructure } from "@data/componentStructure";

// OpenAI API 호출 함수
export const generateComponentText = async (componentData: IcomponentData) => {
  const { character, role } = componentData;
  const structure = (
    componentStructure[character] as Record<typeof role, string[]>
  )[role];

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `웹 페이지 성격: ${character}, 컴포넌트 역할: ${role}, 필요한 텍스트 구조: ${JSON.stringify(
              structure
            )}`,
          },
          {
            role: "user",
            content: "이에 맞는 문구를 JSON 형식으로 생성해 주세요.",
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${DEV_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.choices[0].message.content);
    // console.log(typeof response.data.choices[0].message.content);
    return JSON.parse(response.data.choices[0].message.content)[role];
  } catch (error) {
    console.error("API 요청 중 오류가 발생했습니다: ", error);
    throw error;
  }
};
