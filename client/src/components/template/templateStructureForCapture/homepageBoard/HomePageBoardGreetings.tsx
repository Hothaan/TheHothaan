/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/* component */
import Header, { Iheader } from "@components/template/common/header/Header";
import Greetings from "@components/template/companyIntoduce/Greetings";
import Footer from "@components/template/common/footer/Footer";
import Loading from "@components/common/ui/Loading/loading";

/* data */
import { IfetchedfeatureResponseData } from "@components/template/types";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";

/* css */
import {
  greetings_full_desc_css_,
  greetings_full_title_css_,
  greetings_half_desc_css_,
  greetings_half_title_css_,
} from "@components/template/companyIntoduce/Greetings";

interface IhomePageBoardGreetingsContent {
  greetingsHalfTitle?: string;
  greetingsHalfDesc?: string;
  greetingsFullTitle?: string;
  greetingsFullDesc?: string;
}
interface IhomePageBoardGreetingsStyle {
  greetingsHalfTitle?: CSSObject;
  greetingsHalfDesc?: CSSObject;
  greetingsFullTitle?: CSSObject;
  greetingsFullDesc?: CSSObject;
}

export default function HomePageBoardGreetings() {
  const feature = "인사말";
  const featureKey = "homepageBoardGreetings";

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

  const [pageContent, setPageContent] =
    useState<IhomePageBoardGreetingsContent>(
      {} as IhomePageBoardGreetingsContent
    );
  const [pageStyle, setPageStyle] = useState<IhomePageBoardGreetingsStyle>(
    {} as IhomePageBoardGreetingsStyle
  );

  function updateInitialContent() {
    if (generatedText && generatedText.content) {
      const initialContent = {
        greetingsHalfTitle:
          generatedText.content.greetingsHalfTitle || undefined,
        greetingsHalfDesc: generatedText.content.greetingsHalfDesc || undefined,
        greetingsFullTitle:
          generatedText.content.greetingsFullTitle || undefined,
        greetingsFullDesc: generatedText.content.greetingsFullDesc || undefined,
      };
      setPageContent({ ...initialContent });
    }
  }

  //페이지에 적용될 초기 스타일 저장
  function updateInitialStyle() {
    const initialStyle = {
      greetingsHalfTitle: greetings_half_title_css_ || undefined,
      greetingsHalfDesc: greetings_half_desc_css_ || undefined,
      greetingsFullTitle: greetings_full_title_css_ || undefined,
      greetingsFullDesc: greetings_full_desc_css_ || undefined,
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
      <Greetings
        content={{
          greetingsHalfTitle: pageContent?.greetingsHalfTitle,
          greetingsHalfDesc: pageContent?.greetingsHalfDesc,
          greetingsFullTitle: pageContent?.greetingsFullTitle,
          greetingsFullDesc: pageContent?.greetingsFullDesc,
        }}
        style={{
          greetingsHalfTitle: pageStyle?.greetingsHalfTitle,
          greetingsHalfDesc: pageStyle?.greetingsHalfDesc,
          greetingsFullTitle: pageStyle?.greetingsFullTitle,
          greetingsFullDesc: pageStyle?.greetingsFullDesc,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
      />
      <Footer serviceType="홈페이지·게시판" />
    </div>
  );
}
