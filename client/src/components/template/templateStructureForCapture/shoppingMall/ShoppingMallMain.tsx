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

interface IshoppingMallMainContent {
  mainBannerTitle: string;
  mainBannerDesc: string;
  mainBannerButton: string;
  productListTitle: string;
  productListDesc: string;
  reviewTitle: string;
  reviewDesc: string;
  reviewName: string;
  reviewRole: string;
  serviceIntroductionTitle: string;
  serviceIntroductionDesc: string;
  serviceContactTitle: string;
  serviceContactButton: string;
}

interface IshoppingMallMainStyle {
  mainBannerTitle: CSSObject;
  mainBannerDesc: CSSObject;
  mainBannerButton: CSSObject;
  productListTitle: CSSObject;
  productListDesc: CSSObject;
  reviewTitle: CSSObject;
  reviewDesc: CSSObject;
  reviewName: CSSObject;
  reviewRole: CSSObject;
  serviceIntroductionTitle: CSSObject;
  serviceIntroductionDesc: CSSObject;
  serviceContactTitle: CSSObject;
  serviceContactButton: CSSObject;
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

  // const [changedContent, setChangedContent] = useState(null);
  const [pageContent, setPageContent] = useState<IshoppingMallMainContent>(
    {} as IshoppingMallMainContent
  );
  // const [pageStyle, setPageStyle] = useState<IshoppingMallMainStyle>(
  //   {} as IshoppingMallMainStyle
  // );

  function updateInitial() {
    if (generatedText && generatedText.content) {
      const initialContent = {
        mainBannerTitle: generatedText.content.mainBannerTitle,
        mainBannerDesc: generatedText.content.mainBannerDesc,
        mainBannerButton: generatedText.content.mainBannerButton,
      };

      localStorage.setItem(
        "changedContent",
        JSON.stringify({ [featureKey]: initialContent })
      );
      setPageContent({ ...pageContent, ...initialContent });
    }
  }

  useEffect(() => {
    const localData = localStorage.getItem("changedContent"); //변경된 콘텐츠
    let parsedData: any = null;

    if (localData) {
      try {
        parsedData = JSON.parse(localData); //변경된 콘텐츠 파싱
      } catch (e) {
        localStorage.removeItem("changedContent");
        return;
      }

      if (featureKey in parsedData) {
        //변경된 콘텐츠 중 현재 페이지 featureKey가 있다면
        // setChangedContent(parsedData[featureKey]); //changedContent 의 값을 변경된 현재 페이지 값으로 변경
        setPageContent((prev) => ({
          ...prev,
          ...parsedData[featureKey].structure,
        })); //페이지 콘텐츠에 변경된 현재 페이지 값을 저장
      } else {
        updateInitial(); //변경된 부분이 없다면 기존 값으로 업데이트
      }
    } else {
      updateInitial(); //로컬 데이터가 없다면 (최초 렌더링이라면)최초 generatedText에서 가져온 값으로 업데이트
    }
  }, [generatedText]);

  useEffect(() => {
    if (pageContent) {
      const localData = localStorage.getItem("changedContent");

      if (localData) {
        const parsed = JSON.parse(localData);
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
      }
    }
  }, [pageContent]);

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
        isEditable={true}
        // onChange={(updatedContent) =>
        //   updateSectionContent("mainBanner", updatedContent)
        // }
      />
      <ProductListMain option="main" />
      <Review />
      <ServiceIntroduction />
      <ProductListMain option="list" />
      <ServiceContact />
      <Footer logo={headerData.logo} serviceType="쇼핑몰" />
    </div>
  );
}
