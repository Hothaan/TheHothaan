/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
/* store */
import { projectIdStore } from "@store/projectIdStore";

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
  brandIntroduceItemTitle1?: string; // 수정
  brandIntroduceItemDesc1?: string; // 수정
  brandIntroduceItemTitle2?: string; // 수정
  brandIntroduceItemDesc2?: string; // 수정
}

interface IshoppingMallBrandIntroduceStyle {
  brandIntroduceBannerTitle?: CSSObject;
  brandIntroduceBannerDesc?: CSSObject;
  brandIntroduceItemTitle1?: CSSObject; // 수정
  brandIntroduceItemDesc1?: CSSObject; // 수정
  brandIntroduceItemTitle2?: CSSObject; // 수정
  brandIntroduceItemDesc2?: CSSObject; // 수정
}

export default function ShoppingMallBrandIntroduce() {
  const feature = "브랜드 소개";
  const featureKey = "shoppingMallBrandIntroduce";

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
      window.location.href = "/error";
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
        brandIntroduceItemTitle1:
          generatedText.content.brandIntroduceItemTitle1 || undefined,
        brandIntroduceItemDesc1:
          generatedText.content.brandIntroduceItemDesc1 || undefined,
        brandIntroduceItemTitle2:
          generatedText.content.brandIntroduceItemTitle2 || undefined,
        brandIntroduceItemDesc2:
          generatedText.content.brandIntroduceItemDesc2 || undefined,
      };
      setPageContent(initialContent);
    }
  }

  //페이지에 적용될 초기 스타일 저장
  function updateInitialStyle() {
    const initialStyle = {
      brandIntroduceBannerTitle: brandIntroduce_banner_title_css || undefined,
      brandIntroduceBannerDesc: brandIntroduce_banner_desc_css || undefined,
      brandIntroduceItemTitle1: brandIntroduce_item_title_css || undefined,
      brandIntroduceItemDesc1: brandIntroduce_item_desc_css || undefined,
      brandIntroduceItemTitle2: brandIntroduce_item_title_css || undefined,
      brandIntroduceItemDesc2: brandIntroduce_item_desc_css || undefined,
    };
    setPageStyle({ ...initialStyle });
  }

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

  const [activeEditor, setActiveEditor] = useState<string | undefined>(
    undefined
  );

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
          brandIntroduceItemTitle1: pageContent?.brandIntroduceItemTitle1,
          brandIntroduceItemDesc1: pageContent?.brandIntroduceItemDesc1,
          brandIntroduceItemTitle2: pageContent?.brandIntroduceItemTitle2,
          brandIntroduceItemDesc2: pageContent?.brandIntroduceItemDesc2,
        }}
        style={{
          brandIntroduceBannerTitle: pageStyle?.brandIntroduceBannerTitle,
          brandIntroduceBannerDesc: pageStyle?.brandIntroduceBannerDesc,
          brandIntroduceItemTitle1: pageStyle?.brandIntroduceItemTitle1,
          brandIntroduceItemDesc1: pageStyle?.brandIntroduceItemDesc1,
          brandIntroduceItemTitle2: pageStyle?.brandIntroduceItemTitle2,
          brandIntroduceItemDesc2: pageStyle?.brandIntroduceItemDesc2,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <Footer logo={headerData.logo} serviceType="쇼핑몰" />
    </div>
  );
}
