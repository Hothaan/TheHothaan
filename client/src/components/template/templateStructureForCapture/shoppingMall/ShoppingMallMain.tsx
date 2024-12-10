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
import { IserviceContact } from "@components/template/service/ServiceContact";
import { IreviewText } from "@components/template/product/Review";
import { IserviceIntroductionText } from "@components/template/service/ServiceIntroduction";

/* content */
import { ImainBannerContent } from "@components/template/main/Mainbanner";

interface IshoppingMallMain {
  mainBanner: ImainBannerText;
  productList: IproductListText;
  review: IreviewText;
  serviceIntroduction: IserviceIntroductionText;
  serviceContact: IserviceContact;
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

  const [mainBannerContent, setMainBannerContent] =
    useState<ImainBannerContent | null>(null);

  function handleMainBannerChange(updatedContent: ImainBannerContent) {
    setMainBannerContent((prevContent) => ({
      ...prevContent,
      ...updatedContent,
    }));
  }

  async function fetchFeatureData(isProduction: boolean, projectId: string) {
    try {
      const response = await getFeatureData(isProduction, projectId);
      if (response.status === 200) {
        const categoryArr: string[] = response.data.featureResponseData.map(
          (item: IfetchedfeatureResponseData) => item.menu
        );
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
      setMainBannerContent({
        title: generatedText.content?.title,
        titleCss: mainBanner_title_css_,
        desc: generatedText.content?.desc,
        descCss: mainBanner_desc_css_,
      });
    }
  }, [generatedText]);

  const mainBanner_title_css_: Record<string, string> = {
    marginBottom: "30px",
    color: "#486284",
    fontFamily: "Inter",
    fontSize: "96px",
    fontStyle: "normal",
    fontWeight: "900",
    lineHeight: "150%",
    textTransform: "capitalize",
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const mainBanner_desc_css_: Record<string, string> = {
    wordBreak: "keep-all",
    color: "#486284",
    fontFamily: "Inter",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "150%",
    marginBottom: "80px",
    maxWidth: "676px",

    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "100px",
    WebkitLineClamp: "2",
  };

  console.log(mainBannerContent);

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
        content={mainBannerContent || undefined}
        isEditable={true}
        onChange={handleMainBannerChange}
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
