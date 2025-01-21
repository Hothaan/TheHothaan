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

interface IntermediaryMatchMainContent {
  mainBannerTitle: string;
  mainBannerDesc: string;
  mainBannerButton: string;
  MatchingServiceIntroduceMainBannerTitle: string;
  MatchingServiceIntroduceMainBannerDesc: string;
  MatchingServiceIntroduceMainItemTitle: string;
  MatchingServiceIntroduceMainItemDesc: string;
  productIntroduce: string;
  ReviewTitle: string;
  ReviewDesc: string;
  ReviewName: string;
  ReviewRole: string;
  PriceMainDesc: string;
  exploreServiceTitle: string;
  exploreServiceButton: string;
  exploreServiceExploreTitle: string;
  exploreServiceExploreButton: string;
}

interface IntermediaryMatchMainStyle {
  mainBannerTitle: CSSObject;
  mainBannerDesc: CSSObject;
  mainBannerButton: CSSObject;
  MatchingServiceIntroduceMainBannerTitle: CSSObject;
  MatchingServiceIntroduceMainBannerDesc: CSSObject;
  MatchingServiceIntroduceMainItemTitle: CSSObject;
  MatchingServiceIntroduceMainItemDesc: CSSObject;
  productIntroduce: CSSObject;
  ReviewTitle: CSSObject;
  ReviewDesc: CSSObject;
  ReviewName: CSSObject;
  ReviewRole: CSSObject;
  PriceMainDesc: CSSObject;
  exploreServiceTitle: CSSObject;
  exploreServiceButton: CSSObject;
  exploreServiceExploreTitle: CSSObject;
  exploreServiceExploreButton: CSSObject;
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

  const [changedContent, setChangedContent] = useState(null);
  const [pageContent, setPageContent] = useState<IntermediaryMatchMainContent>(
    {} as IntermediaryMatchMainContent
  );

  // function updateSectionContent<T extends keyof IntermediaryMatchMainContent>(
  //   section: T,
  //   updatedContent: Partial<IntermediaryMatchMainContent[T]>
  // ) {
  //   setPageContent((prev) => ({
  //     ...prev,
  //     [section]: {
  //       ...prev?.[section],
  //       ...updatedContent,
  //     },
  //   }));
  // }

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
