import axios from "axios";

export const saveImage = async (
  isProduction: boolean,
  url: string,
  projectId: string
  // data: string,
  // headerData: string
) => {
  try {
    const response = await axios.post(
      `http://${
        isProduction ? "dolllpitoxic3.mycafe24.com" : "localhost:5001"
      }/api/image/save`,
      {
        url: `http://${
          isProduction ? "dolllpitoxic3.mycafe24.com" : "localhost:3000"
        }/template/${url}/${projectId}`,
        // }/template/${url}/${data}/${headerData}`,
      }
    );

    console.log(response);
    return response;
  } catch (error) {
    console.error("서버 요청 중 오류가 발생했습니다: ", error);
    throw error;
  }
};
