/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/* component */
import Header, { Iheader } from "@components/template/common/header/Header";
import History from "@components/template/companyIntoduce/History";
import Footer from "@components/template/common/footer/Footer";
import Loading from "@components/common/ui/Loading/loading";

/* data */
import { IfetchedfeatureResponseData } from "@components/template/types";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";

/* css */
import { history_desc_css_ } from "@components/template/companyIntoduce/History";

interface IhomePageBoardHistoryContent {
  historyDesc?: string;
}
interface IhomePageBoardHistoryStyle {
  historyDesc?: CSSObject;
}

export default function HomePageBoardHistory() {
  const feature = "연혁";
  const featureKey = "homePageBoardHistory";

  /* only projectId */
  const { isProduction } = useIsProduction();
  const { projectId } = useParams();
  const [projectIdValue, setProjectIdValue] = useState<string | null>(null);

  const [headerData, setHeaderData] = useState<Iheader | null>(null);
  const [generatedText, setGeneratedText] =
    useState<IfetchedfeatureResponseData | null>(null);

  async function fetchFeatureData(isProduction: boolean, projectId: string) {
    try {
      const response = await getFeatureData(isProduction, projectId);
      if (response.status === 200) {
        const categoryArr: string[] = response.data.featureResponseData
          .filter(
            (item: IfetchedfeatureResponseData) =>
              item.menu !== "메인" &&
              item.menu !== "유틸리티" &&
              item.menu !== "마이페이지"
          )
          .map((item: IfetchedfeatureResponseData) => item.menu);
        setHeaderData({
          logo: response.data.projectName,
          categories: [...new Set(categoryArr)],
        });
        setGeneratedText(
          response.data.featureResponseData.find(
            (item: IfetchedfeatureResponseData) => item.feature === feature
          )
        );
      } else {
        console.error("getFeatureData error", response.status);
      }
    } catch (error) {
      console.error(error);
      // window.location.href = "/error";
    }
  }

  useEffect(() => {
    if (projectId === undefined) {
      setProjectIdValue(sessionStorage.getItem("projectId"));
    } else {
      setProjectIdValue(projectId);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectIdValue) {
      fetchFeatureData(isProduction, projectIdValue);
    }
  }, [projectIdValue]);

  useEffect(() => {
    if (projectId === undefined) {
      setProjectIdValue(sessionStorage.getItem("projectId"));
    } else {
      setProjectIdValue(projectId);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectIdValue) {
      fetchFeatureData(isProduction, projectIdValue);
    }
  }, [projectIdValue]);

  const [pageContent, setPageContent] = useState<IhomePageBoardHistoryContent>(
    {} as IhomePageBoardHistoryContent
  );
  const [pageStyle, setPageStyle] = useState<IhomePageBoardHistoryStyle>(
    {} as IhomePageBoardHistoryStyle
  );

  function updateInitialContent() {
    if (generatedText && generatedText.content) {
      const initialContent = {
        historyDesc: generatedText.content.historyDesc || undefined,
      };
      setPageContent({ ...initialContent });
    }
  }

  //페이지에 적용될 초기 스타일 저장
  function updateInitialStyle() {
    const initialStyle = {
      historyDesc: history_desc_css_ || undefined,
    };
    setPageStyle({ ...initialStyle });
  }

  //featureData가 들어오면 초기 콘텐츠와 스타일 업데이트
  useEffect(() => {
    if (generatedText) {
      updateInitialContent();
      updateInitialStyle();
    }
  }, [generatedText]);

  //pageContent가 변경될 때마다 localStorage에 업데이트
  useEffect(() => {
    if (pageContent) {
      const localContent = localStorage.getItem("changedContent");

      if (localContent) {
        const parsed = JSON.parse(localContent);
        const updatedData = {
          ...parsed,
          [featureKey]: {
            featureId: generatedText?.feature_id,
            content: {
              ...pageContent,
            },
          },
        };
        localStorage.setItem("changedContent", JSON.stringify(updatedData));
      } else {
        const data = {
          [featureKey]: {
            featureId: generatedText?.feature_id,
            content: {
              ...pageContent,
            },
          },
        };
        localStorage.setItem("changedContent", JSON.stringify(data));
      }
    }
  }, [pageContent]);

  function handleChangeContent(key: string, value: string) {
    setPageContent({ ...pageContent, [key]: value });
  }

  function handleChangeStyle(key: string, value: CSSObject) {
    setPageStyle({ ...pageStyle, [key]: value });
  }

  useEffect(() => {
    if (pageStyle) {
      const localStyle = localStorage.getItem("changedStyle");

      if (localStyle) {
        const parsed = JSON.parse(localStyle);
        const updatedData = {
          ...parsed,
          [featureKey]: {
            featureId: generatedText?.feature_id,
            style: {
              ...pageStyle,
            },
          },
        };
        localStorage.setItem("changedStyle", JSON.stringify(updatedData));
      } else {
        const data = {
          [featureKey]: {
            featureId: generatedText?.feature_id,
            style: {
              ...pageContent,
            },
          },
        };
        localStorage.setItem("changedStyle", JSON.stringify(data));
      }
    }
  }, [pageStyle]);

  if (!generatedText || !headerData || Object.keys(pageContent).length === 0) {
    return <Loading />;
  }

  return (
    <div className="templateImage">
      <Header serviceType="홈페이지·게시판" />
      <History
        content={{
          historyDesc: pageContent?.historyDesc,
        }}
        style={{
          historyDesc: pageStyle?.historyDesc,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
      />
      <Footer serviceType="홈페이지·게시판" />
    </div>
  );
}
