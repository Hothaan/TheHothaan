import axios from "axios";

export const generateText = async (
  isProduction: boolean,
  projectId: number
) => {
  try {
    const response = await axios.get(
      `http://${
        isProduction ? "dolllpitoxic3.mycafe24.com" : "localhost:5001"
      }/api/project/${projectId}/generate-text`
    );
    return response;
  } catch (error) {
    console.error("서버 요청 중 오류가 발생했습니다: ", error);
    throw error;
  }
};
