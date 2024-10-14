/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useTemplateInfoStore } from "@store/templateInfoStore";
import { componentMap } from "@components/template/mapping";
import { rolesData } from "@data/componentRolsData";
import { makeComponentText } from "@api/test";

interface Irequest {
  title: string;
  character: keyof typeof rolesData;
  isCommon: boolean;
  role: string;
  structure: string;
  desc: string;
}

export default function GenerateComponent(request: Irequest) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ComponentToRender = componentMap[request.role];

  async function fetchData(request: Irequest) {
    if (!loading) {
      if (
        request.title !== "" &&
        request.character !== "common" &&
        request.role !== "" &&
        request.structure !== "" &&
        request.desc !== ""
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
