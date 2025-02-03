import axios from "axios";

export const updateFeatureData = async (
  isProduction: boolean,
  featureId: string,
  changedContent: any,
  changedStyle: any
) => {
  try {
    const response = await axios.put(
      `http://${
        isProduction ? "dolllpitoxic3.mycafe24.com" : "localhost:5001"
      }/api/project/features/update/${featureId}`,
      {
        content: changedContent,
        style: changedStyle,
      }
    );
    return response;
  } catch (error) {
    console.error("서버 요청 중 오류가 발생했습니다: ", error);
    throw error;
  }
};
