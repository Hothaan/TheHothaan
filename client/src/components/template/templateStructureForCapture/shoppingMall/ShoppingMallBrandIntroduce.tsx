/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/* component */
import Header, { Iheader } from "@components/template/common/header/Header";
import BrandIntroduce from "@components/template/brandIntroduce/BrandIntroduce";
import Footer from "@components/template/common/footer/Footer";
import Loading from "@components/common/ui/Loading/loading";

/* data */
import { IfetchedfeatureResponseData } from "@components/template/types";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";

/* css  */
import {
  brandIntroduce_banner_title_css,
  brandIntroduce_banner_desc_css,
  brandIntroduce_item_title_css,
  brandIntroduce_item_desc_css,
} from "@components/template/brandIntroduce/BrandIntroduce";

interface IshoppingMallBrandIntroduceContent {
  brandIntroduceBannerTitle?: string;
  brandIntroduceBannerDesc?: string;
  brandIntroduceItemTitle?: string;
  brandIntroduceItemDesc?: string;
}

interface IshoppingMallBrandIntroduceStyle {
  brandIntroduceBannerTitle?: CSSObject;
  brandIntroduceBannerDesc?: CSSObject;
  brandIntroduceItemTitle?: CSSObject;
  brandIntroduceItemDesc?: CSSObject;
}

export default function ShoppingMallBrandIntroduce() {
  const feature = "브랜드 소개";
  const featureKey = "shoppingMallBrandIntroduce";

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

  function getLocalContent() {
    const localContent = localStorage.getItem("changedContent");
    if (localContent) {
      const parsed = JSON.parse(localContent);
      if (parsed[featureKey]?.content) {
        return parsed[featureKey].content;
      }
    }
    return null;
  }

  function getLocalStyle() {
    const localContent = localStorage.getItem("changedStyle");
    if (localContent) {
      const parsed = JSON.parse(localContent);
      if (parsed[featureKey]?.style) {
        return parsed[featureKey].style;
      }
    }
    return null;
  }

  const [pageContent, setPageContent] =
    useState<IshoppingMallBrandIntroduceContent | null>(getLocalContent());
  const [pageStyle, setPageStyle] =
    useState<IshoppingMallBrandIntroduceStyle | null>(getLocalStyle());

  function updateInitialContent() {
    if (generatedText && generatedText.content) {
      const initialContent = {
        brandIntroduceBannerTitle:
          generatedText.content.brandIntroduceBannerTitle || undefined,
        brandIntroduceBannerDesc:
          generatedText.content.brandIntroduceBannerDesc || undefined,
        brandIntroduceItemTitle:
          generatedText.content.brandIntroduceItemTitle || undefined,
        brandIntroduceItemDesc:
          generatedText.content.brandIntroduceItemDesc || undefined,
      };
      setPageContent(initialContent);
    }
  }

  //페이지에 적용될 초기 스타일 저장
  function updateInitialStyle() {
    const initialStyle = {
      brandIntroduceBannerTitle: brandIntroduce_banner_title_css || undefined,
      brandIntroduceBannerDesc: brandIntroduce_banner_desc_css || undefined,
      brandIntroduceItemTitle: brandIntroduce_item_title_css || undefined,
      brandIntroduceItemDesc: brandIntroduce_item_desc_css || undefined,
    };
    setPageStyle({ ...initialStyle });
  }

  //featureData가 들어오면 초기 콘텐츠와 스타일 업데이트
  useEffect(() => {
    if (generatedText) {
      const localContent = localStorage.getItem("changedContent");
      const hasLocalContent = localContent
        ? JSON.parse(localContent)?.[featureKey]?.content
        : null;

      if (!hasLocalContent) {
        updateInitialContent();
      }

      const localStyle = localStorage.getItem("changedStyle");
      const hasLocalStyle = localStyle
        ? JSON.parse(localStyle)?.[featureKey]?.style
        : null;

      if (!hasLocalStyle) {
        updateInitialStyle();
      }
    }
  }, [generatedText]);

  useEffect(() => {
    if (pageContent) {
      const localContent = localStorage.getItem("changedContent");
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

  if (!generatedText || !headerData) {
    return <Loading />;
  }

  return (
    <div className="templateImage">
      <Header
        categories={headerData.categories}
        logo={headerData.logo}
        serviceType="쇼핑몰"
      />
      <BrandIntroduce
        content={{
          brandIntroduceBannerTitle: pageContent?.brandIntroduceBannerTitle,
          brandIntroduceBannerDesc: pageContent?.brandIntroduceBannerDesc,
          brandIntroduceItemTitle: pageContent?.brandIntroduceItemTitle,
          brandIntroduceItemDesc: pageContent?.brandIntroduceItemDesc,
        }}
        style={{
          brandIntroduceBannerTitle: pageStyle?.brandIntroduceBannerTitle,
          brandIntroduceBannerDesc: pageStyle?.brandIntroduceBannerDesc,
          brandIntroduceItemTitle: pageStyle?.brandIntroduceItemTitle,
          brandIntroduceItemDesc: pageStyle?.brandIntroduceItemDesc,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
      />
      <Footer logo={headerData.logo} serviceType="쇼핑몰" />
    </div>
  );
}
