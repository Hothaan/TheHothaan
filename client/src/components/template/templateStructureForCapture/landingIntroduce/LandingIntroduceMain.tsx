/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/* component */
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import Mainbanner from "@components/template/main/Mainbanner";
import ServiceIntroduce from "@components/template/main/ServiceIntroduceMain";
import ProductIntroduceMain from "@components/template/main/ProductIntroduceMain";
import NoticeMain from "@components/template/main/NoticeMain";
import RecruitMain from "@components/template/main/RecruitMain";
import NewsMain from "@components/template/main/NewsMain";
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

import { price_main_item_desc_css_ } from "@components/template/main/PriceMain";

import {
  explore_service_button_css_,
  explore_service_explore_button_css_,
  explore_service_explore_title_css_,
  explore_service_title_css_,
} from "@components/template/main/ExploreServiceMain";

import {
  product_list_option_list_desc_css,
  product_list_option_list_title_css,
  product_list_option_main_desc_css,
  product_list_option_main_title_css,
} from "@components/template/main/ProductListMain";

import {
  review_item_caption_name_css,
  review_item_caption_role_css,
  review_item_desc_css,
  review_item_title_css,
} from "@components/template/product/Review";

import {
  service_introduction_desc_css_,
  service_introduction_title_css_,
} from "@components/template/service/ServiceIntroduction";

import { service_contact_title_css_ } from "@components/template/service/ServiceContact";

interface IlandingIntroduceMainContent {
  mainBannerTitle?: string;
  mainBannerDesc?: string;
  mainBannerButton?: string;

  serviceIntroduceTitle?: string;
  serviceIntroduceDesc?: string;

  productIntroduceImageDesc?: string;
  productIntroduceTitle?: string;
  productIntroduceDesc?: string;

  noticeTitle?: string;
  noticeDesc?: string;

  recruitTitle?: string;
  recruitDesc?: string;

  newsTitle?: string;

  exploreServiceTitle?: string;
  exploreServiceButton?: string;
  exploreServiceExploreTitle?: string;
  exploreServiceExploreButton?: string;
}

interface IlandingIntroduceMainStyle {
  mainBannerTitle?: CSSObject;
  mainBannerDesc?: CSSObject;
  mainBannerButton?: CSSObject;
  serviceIntroduceTitle?: CSSObject;
  serviceIntroduceDesc?: CSSObject;
  productIntroduceImageDesc?: CSSObject;
  productIntroduceTitle?: CSSObject;
  productIntroduceDesc?: CSSObject;
  noticeTitle?: CSSObject;
  noticeDesc?: CSSObject;
  recruitTitle?: CSSObject;
  recruitDesc?: CSSObject;
  newsTitle?: CSSObject;
  exploreServiceTitle?: CSSObject;
  exploreServiceButton?: CSSObject;
  exploreServiceExploreTitle?: CSSObject;
  exploreServiceExploreButton?: CSSObject;
}

export default function LandingIntroduceMain() {
  const feature = "메인";
  const featureKey = "landingIntroduceMain";

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

  const [pageContent, setPageContent] = useState<IlandingIntroduceMainContent>(
    {} as IlandingIntroduceMainContent
  );
  const [pageStyle, setPageStyle] = useState<IlandingIntroduceMainStyle>(
    {} as IlandingIntroduceMainStyle
  );

  function updateInitialContent() {
    if (generatedText && generatedText.content) {
      const initialContent = {
        mainBannerTitle: generatedText.content.mainBannerTitle || undefined,
        mainBannerDesc: generatedText.content.mainBannerDesc || undefined,
        mainBannerButton: generatedText.content.mainBannerButton || undefined,

        serviceIntroduceTitle:
          generatedText.content.serviceIntroduceTitle || undefined,
        serviceIntroduceDesc:
          generatedText.content.serviceIntroduceDesc || undefined,

        productIntroduceImageDesc:
          generatedText.content.productIntroduceImageDesc || undefined,
        productIntroduceTitle:
          generatedText.content.productIntroduceTitle || undefined,
        productIntroduceDesc:
          generatedText.content.productIntroduceDesc || undefined,

        noticeTitle: generatedText.content.noticeTitle || undefined,
        noticeDesc: generatedText.content.noticeDesc || undefined,

        recruitTitle: generatedText.content.recruitTitle || undefined,
        recruitDesc: generatedText.content.recruitDesc || undefined,

        newsTitle: generatedText.content.newsTitle || undefined,

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

      serviceIntroductionTitle: service_introduction_title_css_ || undefined,
      serviceIntroductionDesc: service_introduction_desc_css_ || undefined,

      productIntroduceImageDesc: undefined,
      productIntroduceTitle: undefined,
      productIntroduceDesc: undefined,

      noticeTitle: undefined,
      noticeDesc: undefined,

      recruitTitle: undefined,
      recruitDesc: undefined,

      newsTitle: undefined,

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
          shoppingMallMain: {
            featureId: generatedText?.feature_id,
            content: {
              ...pageContent,
            },
          },
        };
        localStorage.setItem("changedContent", JSON.stringify(updatedData));
      } else {
        const data = {
          shoppingMallMain: {
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
      <Header serviceType="랜딩·소개" />
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
      <ServiceIntroduce />
      <ProductIntroduceMain />
      <NoticeMain />
      <RecruitMain />
      <NewsMain />
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
      <Footer serviceType="랜딩·소개" />
    </div>
  );
}
