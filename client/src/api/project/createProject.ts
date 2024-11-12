import { IsendData } from "@pages/user/ServicePage/ServiceStep3Page";
import axios from "axios";

export const createProject = async (
  isProduction: boolean,
  sendData: IsendData
) => {
  try {
    const response = await axios.post(
      `http://${
        isProduction ? "dolllpitoxic3.mycafe24.com" : "localhost:5001"
      }/api/project/create`,
      sendData
    );
    return response;
  } catch (error) {
    console.error("서버 요청 중 오류가 발생했습니다: ", error);
    throw error;
  }
};
