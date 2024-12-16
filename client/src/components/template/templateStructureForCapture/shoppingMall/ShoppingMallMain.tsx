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

/* text */
import { ImainBannerText } from "@components/template/main/Mainbanner";
import { IproductListText } from "@components/template/main/ProductListMain";
import { IserviceContactText } from "@components/template/service/ServiceContact";
import { IreviewText } from "@components/template/product/Review";
import { IserviceIntroductionText } from "@components/template/service/ServiceIntroduction";

/* content */
import { ImainBannerContent } from "@components/template/main/Mainbanner";
import { IproductListContent } from "@components/template/main/ProductListMain";
import { IreviewContent } from "@components/template/product/Review";
import { IserviceIntroductionContent } from "@components/template/service/ServiceIntroduction";
import { IserviceContactContent } from "@components/template/service/ServiceContact";

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
  mainBanner: ImainBannerContent;
  productList: IproductListContent;
  review: IreviewContent;
  serviceIntroduction: IserviceIntroductionContent;
  serviceContact: IserviceContactContent;
}

interface IshoppingMallMainText {
  mainBanner: ImainBannerText;
  productList: IproductListText;
  review: IreviewText;
  serviceIntroduction: IserviceIntroductionText;
  serviceContact: IserviceContactText;
}

export default function ShoppingMallMain() {
  const feature = "메인";

  /* only projectId */
  const { isProduction } = useIsProduction();
  const { projectId } = useParams();
  const [projectIdValue, setProjectIdValue] = useState<string | null>(null);
  const [headerData, setHeaderData] = useState<Iheader | null>(null);
  const [generatedText, setGeneratedText] =
    useState<IfetchedfeatureResponseData | null>(null);
  const [changedContent, setChangedContent] = useState(null);
  const [pageContent, setPageContent] = useState<IshoppingMallMainContent>(
    {} as IshoppingMallMainContent
  );

  function updateSectionContent<T extends keyof IshoppingMallMainContent>(
    section: T,
    updatedContent: Partial<IshoppingMallMainContent[T]>
  ) {
    setPageContent((prev) => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        ...updatedContent,
      },
    }));
  }

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

  useEffect(() => {
    if (
      generatedText &&
      generatedText.content?.title &&
      generatedText.content?.desc
    ) {
      updateSectionContent("mainBanner", {
        title: {
          text: generatedText.content?.title,
          css: mainBanner_title_css_,
        },
        desc: {
          text: generatedText.content?.desc,
          css: mainBanner_desc_css_,
        },
      });
      // setMainBannerContent({
      //   title: generatedText.content?.title,
      //   titleCss: mainBanner_title_css_,
      //   desc: generatedText.content?.desc,
      //   descCss: mainBanner_desc_css_,
      // });
    }
  }, [generatedText]);

  useEffect(() => {
    const localData = localStorage.getItem("changedContent");
    if (localData) {
      setChangedContent(JSON.parse(localData));
    }
  }, []);

  useEffect(() => {
    if (pageContent) {
      localStorage.setItem(
        "changedContent",
        JSON.stringify({
          featureId: generatedText?.feature_id,
          structure: {
            mainBanner: pageContent?.mainBanner,
          },
        })
      );
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
        content={pageContent?.mainBanner}
        isEditable={true}
        onChange={(updatedContent) =>
          updateSectionContent("mainBanner", updatedContent)
        }
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
