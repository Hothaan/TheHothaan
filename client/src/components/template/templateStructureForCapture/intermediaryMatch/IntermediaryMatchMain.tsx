/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
/* store */
import { projectIdStore } from "@store/projectIdStore";

/* component */
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import Mainbanner from "@components/template/main/Mainbanner";
import ProductIntroduceMain from "@components/template/main/ProductIntroduceMain";
import MatchingServiceIntroduceMain from "@components/template/main/MatchingServiceIntroduceMain";
import Review from "@components/template/product/Review";
import PriceMain from "@components/template/main/PriceMain";
import ExploreServiceMain from "@components/template/main/ExploreServiceMain";
import Loading from "@components/common/ui/Loading/loading";

/* data */
import { IfetchedfeatureResponseData } from "@components/template/types";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";

/* css */
import {
  mainBanner_title_css_,
  mainBanner_desc_css_,
  mainBanner_button_css_,
} from "@components/template/main/Mainbanner";

import {
  matching_service_introduce_main_banner_title_css_,
  matching_service_introduce_main_banner_desc_css_,
  matching_service_introduce_main_item_title_css_,
  matching_service_introduce_main_item_desc_css_,
} from "@components/template/main/MatchingServiceIntroduceMain";

import {
  product_introduce_image_desc_css_,
  product_introduce_title_css_,
  product_introduce_desc_css_,
} from "@components/template/main/ProductIntroduceMain";

import {
  review_item_title_css,
  review_item_desc_css,
  review_item_caption_name_css,
  review_item_caption_role_css,
} from "@components/template/product/Review";

import { price_main_item_desc_css_ } from "@components/template/main/PriceMain";

import {
  explore_service_title_css_,
  explore_service_button_css_,
  explore_service_explore_title_css_,
  explore_service_explore_button_css_,
} from "@components/template/main/ExploreServiceMain";

interface IntermediaryMatchMainContent {
  mainBannerTitle?: string;
  mainBannerDesc?: string;
  mainBannerButton?: string;
  MatchingServiceIntroduceMainBannerTitle?: string;
  MatchingServiceIntroduceMainBannerDesc?: string;
  MatchingServiceIntroduceMainItemTitle?: string;
  MatchingServiceIntroduceMainItemDesc?: string;
  productIntroduceImageDesc?: string;
  productIntroduceTitle?: string;
  productIntroduceDesc?: string;
  reviewTitle?: string; //수정 요청
  reviewDesc?: string; //수정 요청
  reviewName?: string; //수정 요청
  reviewRole?: string; //수정 요청
  priceMainDesc?: string; //수정 요청
  exploreServiceTitle?: string;
  exploreServiceButton?: string;
  exploreServiceExploreTitle?: string;
  exploreServiceExploreButton?: string;
}

interface IntermediaryMatchMainStyle {
  mainBannerTitle?: CSSObject;
  mainBannerDesc?: CSSObject;
  mainBannerButton?: CSSObject;
  MatchingServiceIntroduceMainBannerTitle?: CSSObject;
  MatchingServiceIntroduceMainBannerDesc?: CSSObject;
  MatchingServiceIntroduceMainItemTitle?: CSSObject;
  MatchingServiceIntroduceMainItemDesc?: CSSObject;
  productIntroduceImageDesc?: CSSObject;
  productIntroduceTitle?: CSSObject;
  productIntroduceDesc?: CSSObject;
  reviewTitle?: CSSObject; //수정 요청
  reviewDesc?: CSSObject; //수정 요청
  reviewName?: CSSObject; //수정 요청
  reviewRole?: CSSObject; //수정 요청
  priceMainDesc?: CSSObject; //수정 요청
  exploreServiceTitle?: CSSObject;
  exploreServiceButton?: CSSObject;
  exploreServiceExploreTitle?: CSSObject;
  exploreServiceExploreButton?: CSSObject;
}

export default function IntermediaryMatchMain() {
  const feature = "메인";
  const featureKey = "intermediaryMatchMain";

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
        mainBannerTitle: generatedText.content.mainBannerTitle || undefined,
        mainBannerDesc: generatedText.content.mainBannerDesc || undefined,
        mainBannerButton: generatedText.content.mainBannerButton || undefined,

        MatchingServiceIntroduceMainBannerTitle:
          generatedText.content.MatchingServiceIntroduceMainBannerTitle ||
          undefined,
        MatchingServiceIntroduceMainBannerDesc:
          generatedText.content.MatchingServiceIntroduceMainBannerDesc ||
          undefined,
        MatchingServiceIntroduceMainItemTitle:
          generatedText.content.MatchingServiceIntroduceMainItemTitle ||
          undefined,
        MatchingServiceIntroduceMainItemDesc:
          generatedText.content.MatchingServiceIntroduceMainItemDesc ||
          undefined,

        productIntroduceImageDesc:
          generatedText.content.productIntroduceImageDesc || undefined,
        productIntroduceTitle:
          generatedText.content.productIntroduceTitle || undefined,
        productIntroduceDesc:
          generatedText.content.productIntroduceDesc || undefined,

        reviewTitle: generatedText.content.reviewTitle || undefined,
        reviewDesc: generatedText.content.reviewDesc || undefined,
        reviewName: generatedText.content.reviewName || undefined,
        reviewRole: generatedText.content.reviewRole || undefined,

        priceMainDesc: generatedText.content.priceMainDesc || undefined,

        exploreServiceTitle:
          generatedText.content.exploreServiceTitle || undefined,
        exploreServiceButton:
          generatedText.content.exploreServiceButton || undefined,
        exploreServiceExploreTitle:
          generatedText.content.exploreServiceExploreTitle || undefined,
        exploreServiceExploreButton:
          generatedText.content.exploreServiceExploreButton || undefined,
      };
      setPageContent(initialContent);
    }
  }

  function updateInitialStyle() {
    const initialStyle = {
      mainBannerTitle: mainBanner_title_css_ || undefined,
      mainBannerDesc: mainBanner_desc_css_ || undefined,
      mainBannerButton: mainBanner_button_css_ || undefined,

      MatchingServiceIntroduceMainBannerTitle:
        matching_service_introduce_main_banner_title_css_ || undefined,
      MatchingServiceIntroduceMainBannerDesc:
        matching_service_introduce_main_banner_desc_css_ || undefined,
      MatchingServiceIntroduceMainItemTitle:
        matching_service_introduce_main_item_title_css_ || undefined,
      MatchingServiceIntroduceMainItemDesc:
        matching_service_introduce_main_item_desc_css_ || undefined,

      productIntroduceImageDesc: product_introduce_image_desc_css_ || undefined,
      productIntroduceTitle: product_introduce_title_css_ || undefined,
      productIntroduceDesc: product_introduce_desc_css_ || undefined,

      reviewTitle: review_item_title_css || undefined,
      reviewDesc: review_item_desc_css || undefined,
      reviewName: review_item_caption_name_css || undefined,
      reviewRole: review_item_caption_role_css || undefined,

      priceMainDesc: price_main_item_desc_css_ || undefined,

      exploreServiceTitle: explore_service_title_css_ || undefined,
      exploreServiceButton: explore_service_button_css_ || undefined,
      exploreServiceExploreTitle:
        explore_service_explore_title_css_ || undefined,
      exploreServiceExploreButton:
        explore_service_explore_button_css_ || undefined,
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
    useState<IntermediaryMatchMainContent | null>(getLocalContent());
  const [pageStyle, setPageStyle] = useState<IntermediaryMatchMainStyle | null>(
    getLocalStyle()
  );

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
      <Mainbanner
        content={{
          mainBannerTitle: pageContent?.mainBannerTitle,
          mainBannerDesc: pageContent?.mainBannerDesc,
          mainBannerButton: pageContent?.mainBannerButton,
        }}
        style={{
          mainBannerTitle: pageStyle?.mainBannerTitle,
          mainBannerDesc: pageStyle?.mainBannerDesc,
          mainBannerButton: pageStyle?.mainBannerButton,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <MatchingServiceIntroduceMain
        content={{
          MatchingServiceIntroduceMainBannerTitle:
            pageContent?.MatchingServiceIntroduceMainBannerTitle,
          MatchingServiceIntroduceMainBannerDesc:
            pageContent?.MatchingServiceIntroduceMainBannerDesc,
          MatchingServiceIntroduceMainItemTitle:
            pageContent?.MatchingServiceIntroduceMainItemTitle,
          MatchingServiceIntroduceMainItemDesc:
            pageContent?.MatchingServiceIntroduceMainItemDesc,
        }}
        style={{
          MatchingServiceIntroduceMainBannerTitle:
            pageStyle?.MatchingServiceIntroduceMainBannerTitle,
          MatchingServiceIntroduceMainBannerDesc:
            pageStyle?.MatchingServiceIntroduceMainBannerDesc,
          MatchingServiceIntroduceMainItemTitle:
            pageStyle?.MatchingServiceIntroduceMainItemTitle,
          MatchingServiceIntroduceMainItemDesc:
            pageStyle?.MatchingServiceIntroduceMainItemDesc,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <ProductIntroduceMain
        content={{
          productIntroduceImageDesc: pageContent?.productIntroduceImageDesc,
          productIntroduceTitle: pageContent?.productIntroduceTitle,
          productIntroduceDesc: pageContent?.productIntroduceDesc,
        }}
        style={{
          productIntroduceImageDesc: pageStyle?.productIntroduceImageDesc,
          productIntroduceTitle: pageStyle?.productIntroduceTitle,
          productIntroduceDesc: pageStyle?.productIntroduceDesc,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <Review
        content={{
          reviewTitle: pageContent?.reviewTitle,
          reviewDesc: pageContent?.reviewDesc,
          reviewName: pageContent?.reviewName,
          reviewRole: pageContent?.reviewRole,
        }}
        style={{
          reviewTitle: pageStyle?.reviewTitle,
          reviewDesc: pageStyle?.reviewDesc,
          reviewName: pageStyle?.reviewName,
          reviewRole: pageStyle?.reviewRole,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <PriceMain
        content={{ priceMainDesc: pageContent?.priceMainDesc }}
        style={{ priceMainDesc: pageStyle?.priceMainDesc }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <ExploreServiceMain
        content={{
          exploreServiceTitle: pageContent?.exploreServiceTitle,
          exploreServiceButton: pageContent?.exploreServiceButton,
          exploreServiceExploreTitle: pageContent?.exploreServiceExploreTitle,
          exploreServiceExploreButton: pageContent?.exploreServiceExploreButton,
        }}
        style={{
          exploreServiceTitle: pageStyle?.exploreServiceTitle,
          exploreServiceButton: pageStyle?.exploreServiceButton,
          exploreServiceExploreTitle: pageStyle?.exploreServiceExploreTitle,
          exploreServiceExploreButton: pageStyle?.exploreServiceExploreButton,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <Footer serviceType="중개·매칭" />
    </div>
  );
}
