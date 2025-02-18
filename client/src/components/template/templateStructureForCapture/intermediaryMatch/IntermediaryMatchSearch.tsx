/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
/* store */
import { projectIdStore } from "@store/projectIdStore";

/* component */
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import Search from "@components/template/utility/Search";
import Loading from "@components/common/ui/Loading/loading";

/* data */
import { IfetchedfeatureResponseData } from "@components/template/types";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";

/* content */
import { IsearchContent } from "@components/template/utility/Search";

/* style */
import {
  search_result_item_title_css_,
  search_result_item_desc_css_,
} from "@components/template/utility/Search";

interface IntermediaryMatchSearchContent {
  SearchTitle?: string;
  SearchDesc?: string;
}

interface IntermediaryMatchSearchStyle {
  SearchTitle?: CSSObject;
  SearchDesc?: CSSObject;
}

export default function IntermediaryMatchSearch() {
  const feature = "검색";
  const featureKey = "intermediaryMatchSearch";

  /* only projectId */
  const { isProduction } = useIsProduction();
  const { projectId } = useParams();
  const { projectId: storedProjectId, setProjectId } = projectIdStore();
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
      setProjectIdValue(storedProjectId); // Zustand에서 가져온 값 사용
    } else {
      setProjectIdValue(projectId);
    }
  }, [projectId, storedProjectId]);

  useEffect(() => {
    if (projectIdValue) {
      fetchFeatureData(isProduction, projectIdValue);
    }
  }, [projectIdValue]);

  function updateInitialContent() {
    if (generatedText && generatedText.content) {
      const initialContent = {
        SearchTitle: generatedText.content.SearchTitle || undefined,
        SearchDesc: generatedText.content.SearchDesc || undefined,
      };
      setPageContent({ ...initialContent });
    }
  }

  function updateInitialStyle() {
    const initialStyle = {
      SearchTitle: search_result_item_title_css_ || undefined,
      SearchDesc: search_result_item_desc_css_ || undefined,
    };
    setPageStyle({ ...initialStyle });
  }

  /* ********** */

  function getLocalContent() {
    const localContent = localStorage.getItem("changedContent");
    if (localContent) {
      const parsed = JSON.parse(localContent);
      if (parsed[featureKey]?.content) {
        return parsed[featureKey]?.content;
      }
    }
    return null;
  }

  function getLocalStyle() {
    if (typeof window === "undefined") {
      return generatedText?.style || null;
    }

    const localContent = localStorage.getItem("changedStyle");
    if (localContent) {
      const parsed = JSON.parse(localContent);
      if (parsed[featureKey]?.style) {
        return parsed[featureKey].style; // 항상 changedStyle을 우선 반환
      }
    }

    return generatedText?.style || null; // changedStyle이 없을 경우에만 generatedText.style 사용
  }

  const [pageContent, setPageContent] =
    useState<IntermediaryMatchSearchContent | null>(getLocalContent());
  const [pageStyle, setPageStyle] =
    useState<IntermediaryMatchSearchStyle | null>(getLocalStyle());

  useEffect(() => {
    if (generatedText) {
      const localContent = localStorage.getItem("changedContent");
      const hasLocalContent = localContent
        ? JSON.parse(localContent)?.[featureKey]?.content
        : null;

      if (!hasLocalContent && !pageContent) {
        updateInitialContent();
      }
    }
  }, [generatedText]);

  useEffect(() => {
    if (generatedText) {
      const localStyle = localStorage.getItem("changedStyle");
      const hasLocalStyle = localStyle
        ? JSON.parse(localStyle)?.[featureKey]?.style
        : null;

      if (hasLocalStyle) {
        setPageStyle(hasLocalStyle); // 로컬 저장된 스타일이 있으면 항상 그것을 우선 적용
      } else if (generatedText.style) {
        setPageStyle(generatedText.style); // 없을 경우에만 DB 스타일 적용
      } else {
        updateInitialStyle(); // 둘 다 없으면 초기 스타일 적용
      }
    }
  }, [generatedText]);

  useEffect(() => {
    if (pageContent) {
      const localContent = localStorage.getItem("changedContent");
      const existingContent = localContent
        ? JSON.parse(localContent)?.[featureKey]?.content
        : null;

      if (JSON.stringify(existingContent) !== JSON.stringify(pageContent)) {
        const updatedContent = localContent
          ? {
              ...JSON.parse(localContent),
              [featureKey]: {
                featureId: generatedText?.feature_id,
                content: { ...pageContent },
              },
            }
          : {
              [featureKey]: {
                featureId: generatedText?.feature_id,
                content: { ...pageContent },
              },
            };
        localStorage.setItem("changedContent", JSON.stringify(updatedContent));
      }
    }
  }, [pageContent]);

  useEffect(() => {
    if (pageStyle) {
      const localStyle = localStorage.getItem("changedStyle");
      const updatedStyle = localStyle
        ? {
            ...JSON.parse(localStyle),
            [featureKey]: {
              featureId: generatedText?.feature_id,
              style: { ...pageStyle },
            },
          }
        : {
            [featureKey]: {
              featureId: generatedText?.feature_id,
              style: { ...pageStyle },
            },
          };
      localStorage.setItem("changedStyle", JSON.stringify(updatedStyle));
    }
  }, [pageStyle]);

  function handleChangeContent(key: string, value: string) {
    setPageContent({ ...pageContent, [key]: value });
  }

  function handleChangeStyle(key: string, value: CSSObject) {
    setPageStyle({ ...pageStyle, [key]: value });
  }

  const [activeEditor, setActiveEditor] = useState<string | undefined>(
    undefined
  );

  if (!generatedText || !headerData) {
    return <Loading />;
  }

  /* ********** */

  return (
    <div className="templateImage">
      <Header
        serviceType="중개·매칭"
        categories={headerData.categories}
        logo={headerData.logo}
      />
      <Search
        option="통합 검색"
        content={{
          SearchTitle: pageContent?.SearchTitle,
          SearchDesc: pageContent?.SearchDesc,
        }}
        style={{
          SearchTitle: pageStyle?.SearchTitle,
          SearchDesc: pageStyle?.SearchDesc,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <Footer logo={headerData.logo} serviceType="중개·매칭" />
    </div>
  );
}
