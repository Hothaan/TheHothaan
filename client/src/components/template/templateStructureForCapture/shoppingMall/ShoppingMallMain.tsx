/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/* component */
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import Mainbanner from "@components/template/main/Mainbanner";
import ProductListMain from "@components/template/main/ProductListMain";
import Review from "@components/template/product/Review";
import ServiceIntroduction from "@components/template/service/ServiceIntroduction";
import ServiceContact from "@components/template/service/ServiceContact";
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

interface IshoppingMallMainContent {
  mainBannerTitle?: string;
  mainBannerDesc?: string;
  mainBannerButton?: string;
  productListTitle?: string;
  productListDesc?: string;
  reviewTitle?: string;
  reviewDesc?: string;
  reviewName?: string;
  reviewRole?: string;
  serviceIntroductionTitle?: string;
  serviceIntroductionDesc?: string;
  serviceContactTitle?: string;
  serviceContactButton?: string;
}

interface IshoppingMallMainStyle {
  mainBannerTitle?: CSSObject;
  mainBannerDesc?: CSSObject;
  mainBannerButton?: CSSObject;
  productListTitle?: CSSObject;
  productListDesc?: CSSObject;
  reviewTitle?: CSSObject;
  reviewDesc?: CSSObject;
  reviewName?: CSSObject;
  reviewRole?: CSSObject;
  serviceIntroductionTitle?: CSSObject;
  serviceIntroductionDesc?: CSSObject;
  serviceContactTitle?: CSSObject;
  serviceContactButton?: CSSObject;
}

export default function ShoppingMallMain() {
  const feature = "메인";
  const featureKey = "shoppingMallMain";

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

  const [pageContent, setPageContent] = useState<IshoppingMallMainContent>(
    {} as IshoppingMallMainContent
  );
  const [pageStyle, setPageStyle] = useState<IshoppingMallMainStyle>(
    {} as IshoppingMallMainStyle
  );

  function updateInitialContent() {
    if (generatedText && generatedText.content) {
      const initialContent = {
        mainBannerTitle: generatedText.content.mainBannerTitle || undefined,
        mainBannerDesc: generatedText.content.mainBannerDesc || undefined,
        mainBannerButton: generatedText.content.mainBannerButton || undefined,
        productListTitle: generatedText.content.productListTitle || undefined,
        productListDesc: generatedText.content.productListDesc || undefined,
        reviewTitle: generatedText.content.reviewTitle || undefined,
        reviewDesc: generatedText.content.reviewDesc || undefined,
        reviewName: generatedText.content.reviewName || undefined,
        reviewRole: generatedText.content.reviewRole || undefined,
        serviceIntroductionTitle:
          generatedText.content.serviceIntroductionTitle || undefined,
        serviceIntroductionDesc:
          generatedText.content.serviceIntroductionDesc || undefined,
        serviceContactTitle:
          generatedText.content.serviceContactTitle || undefined,
        serviceContactButton:
          generatedText.content.serviceContactButton || undefined,
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

      productListTitle: product_list_option_main_title_css || undefined,
      productListDesc: product_list_option_main_desc_css || undefined,

      reviewTitle: review_item_title_css || undefined,
      reviewDesc: review_item_desc_css || undefined,
      reviewName: review_item_caption_name_css || undefined,
      reviewRole: review_item_caption_role_css || undefined,

      serviceIntroductionTitle: service_introduction_title_css_ || undefined,
      serviceIntroductionDesc: service_introduction_desc_css_ || undefined,

      serviceContactTitle: service_contact_title_css_ || undefined,
      serviceContactButton: undefined,
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
      <ProductListMain
        content={{
          productListTitle: pageContent?.productListTitle,
          productListDesc: pageContent?.productListDesc,
        }}
        style={{
          productListTitle: pageStyle?.productListTitle,
          productListDesc: pageStyle?.productListDesc,
        }}
        option="main"
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
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
      />
      <ServiceIntroduction
        content={{
          serviceIntroductionTitle: pageContent?.serviceIntroductionTitle,
          serviceIntroductionDesc: pageContent?.serviceIntroductionDesc,
        }}
        style={{
          serviceIntroductionTitle: pageStyle?.serviceIntroductionTitle,
          serviceIntroductionDesc: pageStyle?.serviceIntroductionDesc,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
      />
      <ProductListMain
        content={{
          productListTitle: pageContent?.productListTitle,
          productListDesc: pageContent?.productListDesc,
        }}
        style={{
          productListTitle: product_list_option_list_title_css,
          productListDesc: product_list_option_list_desc_css,
        }}
        option="list"
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
      />
      <ServiceContact
        content={{
          serviceContactTitle: pageContent?.serviceContactButton,
          serviceContactButton: pageContent?.serviceContactButton,
        }}
        style={{
          serviceContactTitle: pageStyle?.serviceContactButton,
          serviceContactButton: pageStyle?.serviceContactButton,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
      />
      <Footer logo={headerData.logo} serviceType="쇼핑몰" />
    </div>
  );
}
