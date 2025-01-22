/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
  matching_service_introduce_main_banner_desc_css_,
  matching_service_introduce_main_banner_title_css_,
  matching_service_introduce_main_item_desc_css_,
  matching_service_introduce_main_item_title_css_,
} from "@components/template/main/MatchingServiceIntroduceMain";

import {
  product_introduce_desc_css_,
  product_introduce_image_desc_css_,
  product_introduce_title_css_,
} from "@components/template/main/ProductIntroduceMain";

import {
  review_item_caption_name_css,
  review_item_caption_role_css,
  review_item_desc_css,
  review_item_title_css,
} from "@components/template/product/Review";

import { price_main_item_desc_css_ } from "@components/template/main/PriceMain";

import {
  explore_service_button_css_,
  explore_service_explore_button_css_,
  explore_service_explore_title_css_,
  explore_service_title_css_,
} from "@components/template/main/ExploreServiceMain";

interface IntermediaryMatchMainContent {
  mainBannerTitle?: string;
  mainBannerDesc?: string;
  mainBannerButton: string;
  MatchingServiceIntroduceMainBannerTitle?: string;
  MatchingServiceIntroduceMainBannerDesc?: string;
  MatchingServiceIntroduceMainItemTitle?: string;
  MatchingServiceIntroduceMainItemDesc?: string;
  productIntroduceImageDesc?: string; //수정요청
  productIntroduceTitle?: string; //수정요청
  productIntroduceDesc?: string; //수정요청청
  ReviewTitle?: string;
  ReviewDesc?: string;
  ReviewName?: string;
  ReviewRole?: string;
  PriceMainDesc?: string;
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
  productIntroduceImageDesc?: CSSObject; //수정요청
  productIntroduceTitle?: CSSObject; //수정요청
  productIntroduceDesc?: CSSObject; //수정요청
  ReviewTitle?: CSSObject;
  ReviewDesc?: CSSObject;
  ReviewName?: CSSObject;
  ReviewRole?: CSSObject;
  PriceMainDesc?: CSSObject;
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

  const [pageContent, setPageContent] = useState<IntermediaryMatchMainContent>(
    {} as IntermediaryMatchMainContent
  );
  const [pageStyle, setPageStyle] = useState<IntermediaryMatchMainStyle>(
    {} as IntermediaryMatchMainStyle
  );

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
          generatedText.content.productIntroduceImageDesc || undefined,
        productIntroduceDesc:
          generatedText.content.productIntroduceImageDesc || undefined,

        ReviewTitle: generatedText.content.ReviewTitle || undefined,
        ReviewDesc: generatedText.content.ReviewDesc || undefined,
        ReviewName: generatedText.content.ReviewName || undefined,
        ReviewRole: generatedText.content.ReviewRole || undefined,

        PriceMainDesc: generatedText.content.PriceMainDesc || undefined,

        exploreServiceTitle:
          generatedText.content.exploreServiceTitle || undefined,
        exploreServiceButton:
          generatedText.content.exploreServiceButton || undefined,
        exploreServiceExploreTitle:
          generatedText.content.exploreServiceExploreTitle || undefined,
        exploreServiceExploreButton:
          generatedText.content.exploreServiceExploreButton || undefined,
      };
      setPageContent({ ...initialContent });
    }
  }

  //페이지에 적용될 초기 스타일 저장
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

      ReviewTitle: review_item_title_css || undefined,
      ReviewDesc: review_item_desc_css || undefined,
      ReviewName: review_item_caption_name_css || undefined,
      ReviewRole: review_item_caption_role_css || undefined,

      PriceMainDesc: price_main_item_desc_css_ || undefined,

      exploreServiceTitle: explore_service_title_css_ || undefined,
      exploreServiceButton: explore_service_button_css_ || undefined,
      exploreServiceExploreTitle:
        explore_service_explore_title_css_ || undefined,
      exploreServiceExploreButton:
        explore_service_explore_button_css_ || undefined,
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

  if (!generatedText || !headerData) {
    return <Loading />;
  }

  return (
    <div className="templateImage">
      <Header serviceType="중개·매칭" />
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
      />
      <Review
        content={{
          reviewTitle: pageContent?.ReviewTitle,
          reviewDesc: pageContent?.ReviewDesc,
          reviewName: pageContent?.ReviewName,
          reviewRole: pageContent?.ReviewRole,
        }}
        style={{
          reviewTitle: pageStyle?.ReviewTitle,
          reviewDesc: pageStyle?.ReviewDesc,
          reviewName: pageStyle?.ReviewName,
          reviewRole: pageStyle?.ReviewRole,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
      />
      <PriceMain
        content={{ priceMainDesc: pageContent?.PriceMainDesc }}
        style={{ priceMainDesc: pageStyle?.PriceMainDesc }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
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
      />
      <Footer serviceType="중개·매칭" />
    </div>
  );
}
