/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { componentMap } from "@components/template/mapping";
import { makeComponentTextTestWithUrl } from "@api/test";
import { IapiRequest } from "@pages/user/TestPage/TestPage";
import { TserviceDataKey } from "@data/service/serviceData";
import Loading from "@components/common/ui/Loading/loading";

export default function GenerateComponent(prop: IapiRequest<TserviceDataKey>) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ComponentToRender = componentMap[prop.component];

  function getIsProcduction(): boolean {
    if (window.location.host === "localhost:3000") {
      return false;
    } else if (window.location.host === "dolllpitoxic3.mycafe24.com") {
      return true;
    } else {
      return false;
    }
  }

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

        const isProduction: boolean = getIsProcduction();

        try {
          // const response = await makeComponentTextTest(prop);
          const response = await makeComponentTextTestWithUrl(
            prop,
            isProduction
          );
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
