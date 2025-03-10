/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
/* store */
import { projectIdStore } from "@store/projectIdStore";

/* component */
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import Mainbanner from "@components/template/main/Mainbanner";
import ProductListMain from "@components/template/main/ProductListMain";
import ProductListMainOptionList from "@components/template/main/ProductListMainList";
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
  review_info_css,
  review_item_caption_name_css,
  review_item_caption_role_css,
  review_item_desc_css,
  review_item_title_css,
} from "@components/template/product/Review";

import {
  service_introduction_desc_css_,
  service_introduction_title_css_,
} from "@components/template/service/ServiceIntroduction";

import {
  service_contact_title_css_,
  service_contact_button_css_,
} from "@components/template/service/ServiceContact";

interface IshoppingMallMainContent {
  mainBannerTitle?: string;
  mainBannerDesc?: string;
  mainBannerButton?: string;
  productListTitle?: string;
  productListDesc?: string;
  reviewInfo?: string; // 수정
  reviewTitle?: string;
  reviewDesc?: string;
  reviewName?: string;
  reviewRole?: string;
  productListItemTitle?: string;
  productListItemDesc?: string;
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
  reviewInfo?: CSSObject; // 수정
  reviewTitle?: CSSObject;
  reviewDesc?: CSSObject;
  reviewName?: CSSObject;
  reviewRole?: CSSObject;
  productListItemTitle?: CSSObject;
  productListItemDesc?: CSSObject;
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

  const prevProjectId = useRef<string | null>(null);

  useEffect(() => {
    if (projectIdValue && prevProjectId.current !== projectIdValue) {
      prevProjectId.current = projectIdValue; // 같은 값이면 실행하지 않음
      fetchFeatureData(isProduction, projectIdValue);
    }
  }, [projectIdValue]);

  function updateInitialContent() {
    if (generatedText && generatedText.content) {
      const initialContent = {
        mainBannerTitle: generatedText.content.mainBannerTitle || undefined,
        mainBannerDesc: generatedText.content.mainBannerDesc || undefined,
        mainBannerButton: generatedText.content.mainBannerButton || undefined,
        productListTitle: generatedText.content.productListTitle || undefined,
        productListDesc: generatedText.content.productListDesc || undefined,
        reviewInfo: generatedText.content.reviewInfo || undefined,
        reviewTitle: generatedText.content.reviewTitle || undefined,
        reviewDesc: generatedText.content.reviewDesc || undefined,
        reviewName: generatedText.content.reviewName || undefined,
        reviewRole: generatedText.content.reviewRole || undefined,
        productListItemTitle:
          generatedText.content.productListItemTitle || undefined,
        productListItemDesc:
          generatedText.content.productListItemDesc || undefined,
        serviceIntroductionTitle:
          generatedText.content.serviceIntroductionTitle || undefined,
        serviceIntroductionDesc:
          generatedText.content.serviceIntroductionDesc || undefined,
        serviceContactTitle:
          generatedText.content.serviceContactTitle || undefined,
        serviceContactButton:
          generatedText.content.serviceContactButton || undefined,
      };
      setPageContent(initialContent);
    }
  }

  function updateInitialStyle() {
    const initialStyle = {
      mainBannerTitle: mainBanner_title_css_ || undefined,
      mainBannerDesc: mainBanner_desc_css_ || undefined,
      mainBannerButton: mainBanner_button_css_ || undefined,

      productListTitle: product_list_option_main_title_css || undefined,
      productListDesc: product_list_option_main_desc_css || undefined,

      reviewInfo: review_info_css || undefined,
      reviewTitle: review_item_title_css || undefined,
      reviewDesc: review_item_desc_css || undefined,
      reviewName: review_item_caption_name_css || undefined,
      reviewRole: review_item_caption_role_css || undefined,

      productListItemTitle: product_list_option_list_title_css || undefined,
      productListItemDesc: product_list_option_list_desc_css || undefined,

      serviceIntroductionTitle: service_introduction_title_css_ || undefined,
      serviceIntroductionDesc: service_introduction_desc_css_ || undefined,

      serviceContactTitle: service_contact_title_css_ || undefined,
      serviceContactButton: service_contact_button_css_ || undefined,
    };
    setPageStyle({ ...initialStyle });
  }

  /* **** */

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
    useState<IshoppingMallMainContent | null>(getLocalContent());
  const [pageStyle, setPageStyle] = useState<IshoppingMallMainStyle | null>(
    getLocalStyle()
  );

  //featureData가 들어오면 초기 콘텐츠와 스타일 업데이트
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

  /* **** */

  return (
    <div className="templateImage">
      <Header
        categories={headerData.categories}
        logo={headerData.logo}
        serviceType="쇼핑몰"
      />
      {pageContent && pageStyle && (
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
      )}
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
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <Review
        content={{
          reviewInfo: pageContent?.reviewInfo,
          reviewTitle: pageContent?.reviewTitle,
          reviewDesc: pageContent?.reviewDesc,
          reviewName: pageContent?.reviewName,
          reviewRole: pageContent?.reviewRole,
        }}
        style={{
          reviewInfo: pageStyle?.reviewInfo,
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
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <ProductListMainOptionList
        content={{
          productListItemTitle: pageContent?.productListItemTitle,
          productListItemDesc: pageContent?.productListItemDesc,
        }}
        style={{
          productListItemTitle: pageStyle?.productListItemTitle,
          productListItemDesc: pageStyle?.productListItemDesc,
        }}
        isEditable={true}
        onChangeContent={handleChangeContent}
        onChangeStyle={handleChangeStyle}
        activeEditor={activeEditor}
        setActiveEditor={setActiveEditor}
      />
      <ServiceContact
        content={{
          serviceContactTitle: pageContent?.serviceContactTitle,
          serviceContactButton: pageContent?.serviceContactButton,
        }}
        style={{
          serviceContactTitle: pageStyle?.serviceContactTitle,
          serviceContactButton: pageStyle?.serviceContactButton,
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
