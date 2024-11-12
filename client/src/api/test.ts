import axios from "axios";
import { IapiRequest } from "@pages/user/TestPage/TestPage";
import { TserviceDataKey } from "@data/service/serviceData";

export const makeComponentTextTest = async (
  componentData: IapiRequest<TserviceDataKey>
) => {
  try {
    const response = await axios.post(
      "http://localhost:5001/api/openai",
      componentData
    );

    return response.data;
  } catch (error) {
    console.error("서버 요청 중 오류가 발생했습니다: ", error);
    throw error;
  }
};

export const makeComponentTextTestWithUrl = async (
  componentData: IapiRequest<TserviceDataKey>,
  isProduction: boolean
) => {
  try {
    const response = await axios.post(
      `http://${
        isProduction ? "dolllpitoxic3.mycafe24.com" : "localhost:5001"
      }/api/openai`,
      componentData
    );

    return response.data;
  } catch (error) {
    console.error("서버 요청 중 오류가 발생했습니다: ", error);
    throw error;
  }
};
