/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { componentMap } from "@components/template/mapping";
import { makeComponentTextTest } from "@api/test";
import { IapiRequest } from "@pages/user/TestPage/TestPage";
import { TserviceDataKey } from "@data/service/serviceData";
import Loading from "@components/common/ui/Loading/loading";

export default function GenerateComponent(prop: IapiRequest<TserviceDataKey>) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ComponentToRender = componentMap[prop.component];

  async function fetchData(request: IapiRequest<TserviceDataKey>) {
    if (!loading) {
      if (
        prop.service &&
        prop.serviceTitle !== "" &&
        prop.serviceDesc !== "" &&
        prop.depth1 &&
        prop.depth2 &&
        prop.component !== "" &&
        prop.structure !== ""
      ) {
        setLoading(true);
        setError(null);
        try {
          const response = await makeComponentTextTest(prop);
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
    fetchData(prop);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  if (loading) {
    return <Loading />;
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
