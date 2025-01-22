import axios from "axios";

export const saveImageDb = async (
  isProduction: boolean,
  url: string,
  projectId: string,
  featureId: string
) => {
  try {
    const response = await axios.post(
      `http://${
        isProduction ? "dolllpitoxic3.mycafe24.com" : "localhost:5001"
      }/api/image/save-to-db`,
      {
        url: `http://${
          isProduction ? "dolllpitoxic3.mycafe24.com" : "localhost:3000"
        }/template/${url}/${projectId}`,
        project_id: projectId,
        feature_id: featureId,
      }
    );
    return response;
  } catch (error) {
    console.error("서버 요청 중 오류가 발생했습니다: ", error);
    throw error;
  }
};
