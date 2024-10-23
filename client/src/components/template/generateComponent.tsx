/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { componentMap } from "@components/template/mapping";
import { makeComponentText } from "@api/test";
import { IapiRequest } from "@pages/user/TestPage/TestPage";
import { TserviceDataKey } from "@data/serviceData";

export default function GenerateComponent(
  request: IapiRequest<TserviceDataKey>
) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ComponentToRender = componentMap[request.depth2];

  async function fetchData(request: IapiRequest<TserviceDataKey>) {
    if (!loading) {
      if (
        request.service &&
        request.serviceTitle !== "" &&
        request.serviceDesc !== "" &&
        request.depth1 &&
        request.depth2 &&
        request.structure !== ""
      ) {
        setLoading(true);
        setError(null);
        try {
          const response = await makeComponentText(request);
          setData(response);
        } catch (error) {
          console.error("API 요청 실패:", error);
          setError("API 요청에 실패했습니다.");
        } finally {
          setLoading(false);
        }
      }
    }
  }

  useEffect(() => {
    fetchData(request);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (loading) {
    return <div>loading component</div>;
  }

  return (
    <div>
      {ComponentToRender ? (
        <ComponentToRender {...data} />
      ) : (
        <div>make component file first! 🤔</div>
      )}
    </div>
  );
}
