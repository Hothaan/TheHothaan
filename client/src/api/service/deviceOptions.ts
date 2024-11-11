import axios from "axios";

export interface IdeviceOptions {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export const getDeviceOptions = async (isProduction: boolean) => {
  try {
    const response = await axios.get(
      `http://${
        isProduction ? "dolllpitoxic3.mycafe24.com" : "localhost:5001"
      }/api/service/device-options`
    );
    return response;
  } catch (error) {
    console.error("서버 요청 중 오류가 발생했습니다: ", error);
    throw error;
  }
};
