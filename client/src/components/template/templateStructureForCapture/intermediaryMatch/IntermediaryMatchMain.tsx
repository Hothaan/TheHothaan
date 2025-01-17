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

/* text */
import { ImainBannerText } from "@components/template/main/Mainbanner";
import { ImatchingServiceIntroduceMainText } from "@components/template/main/MatchingServiceIntroduceMain";
import { IproductIntroduceMainText } from "@components/template/main/ProductIntroduceMain";
import { IreviewText } from "@components/template/product/Review";
import { IexploreServiceText } from "@components/template/main/ExploreServiceMain";
import { iPriceMainText } from "@components/template/main/PriceMain";

/* content */
import { ImainBannerContent } from "@components/template/main/Mainbanner";
import { ImatchingServiceIntroduceMainContent } from "@components/template/main/MatchingServiceIntroduceMain";
import { IproductIntroduceMainContent } from "@components/template/main/ProductIntroduceMain";
import { IreviewContent } from "@components/template/product/Review";
import { iPriceMainContent } from "@components/template/main/PriceMain";
import { IexploreServiceContent } from "@components/template/main/ExploreServiceMain";

interface IntermediaryMatchMainText {
  mainBanner: ImainBannerText;
  MatchingServiceIntroduceMain: ImatchingServiceIntroduceMainText;
  productIntroduce: IproductIntroduceMainText;
  Review: IreviewText;
  PriceMain: iPriceMainText;
  exploreService: IexploreServiceText;
}

interface IntermediaryMatchMainContent {
  mainBanner: ImainBannerContent;
  MatchingServiceIntroduceMain: ImatchingServiceIntroduceMainContent;
  productIntroduce: IproductIntroduceMainContent;
  Review: IreviewContent;
  PriceMain: IexploreServiceContent;
  exploreService: iPriceMainContent;
}

export default function IntermediaryMatchMain() {
  const feature = "메인";

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

  const [changedContent, setChangedContent] = useState(null);
  const [pageContent, setPageContent] = useState<IntermediaryMatchMainContent>(
    {} as IntermediaryMatchMainContent
  );

  function updateSectionContent<T extends keyof IntermediaryMatchMainContent>(
    section: T,
    updatedContent: Partial<IntermediaryMatchMainContent[T]>
  ) {
    setPageContent((prev) => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        ...updatedContent,
      },
    }));
  }

  // if (!generatedText || !headerData) {
  //   return <Loading />;
  // }

  return (
    <div className="templateImage">
      <Header serviceType="중개·매칭" />
      <Mainbanner />
      <MatchingServiceIntroduceMain />
      <ProductIntroduceMain />
      <Review />
      <PriceMain />
      <ExploreServiceMain />
      <Footer serviceType="중개·매칭" />
    </div>
  );
}
