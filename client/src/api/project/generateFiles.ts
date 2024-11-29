import { Tformat } from "@pages/user/ServicePage/ServiceStep5Page";
import axios from "axios";

export const generateFiles = async (
  isProduction: boolean,
  projectId: string,
  format: Tformat
) => {
  try {
    const response = await axios.post(
      `http://${
        isProduction ? "dolllpitoxic3.mycafe24.com" : "localhost:5001"
      }/api/project/generate-files`,
      {
        project_id: projectId,
        format: format,
      }
    );
    return response;
  } catch (error) {
    console.error("서버 요청 중 오류가 발생했습니다: ", error);
    throw error;
  }
};
