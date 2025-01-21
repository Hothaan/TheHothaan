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

/* content */
import { ImainBannerContent } from "@components/template/main/Mainbanner";
import { IserviceIntroduceContent } from "@components/template/main/ServiceIntroduceMain";
import { IproductIntroduceMainContent } from "@components/template/main/ProductIntroduceMain";
import { InoticeMainContent } from "@components/template/main/NoticeMain";
import { IrecruitMainContent } from "@components/template/main/RecruitMain";
import { InewsMainContent } from "@components/template/main/NewsMain";
import { IexploreServiceContent } from "@components/template/main/ExploreServiceMain";

interface IlandingIntroduceMainContent {
  mainBannerTitle: string;
  mainBannerDesc: string;
  mainBannerButton: string;
  serviceIntroduceTitle: string;
  serviceIntroduceDesc: string;
  productIntroduceImageDesc: string;
  productIntroduceTitle: string;
  productIntroduceDesc: string;
  noticeTitle: string;
  noticeDesc: string;
  recruitTitle: string;
  recruitDesc: string;
  newsTitle: string;
  exploreServiceTitle: string;
  exploreServiceButton: string;
  exploreServiceExploreTitle: string;
  exploreServiceExploreButton: string;
}

interface IlandingIntroduceMainStyle {
  mainBannerTitle: CSSObject;
  mainBannerDesc: CSSObject;
  mainBannerButton: CSSObject;
  serviceIntroduceTitle: CSSObject;
  serviceIntroduceDesc: CSSObject;
  productIntroduceImageDesc: CSSObject;
  productIntroduceTitle: CSSObject;
  productIntroduceDesc: CSSObject;
  noticeTitle: CSSObject;
  noticeDesc: CSSObject;
  recruitTitle: CSSObject;
  recruitDesc: CSSObject;
  newsTitle: CSSObject;
  exploreServiceTitle: CSSObject;
  exploreServiceButton: CSSObject;
  exploreServiceExploreTitle: CSSObject;
  exploreServiceExploreButton: CSSObject;
}

export default function LandingIntroduceMain() {
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
  const [pageContent, setPageContent] = useState<IlandingIntroduceMainContent>(
    {} as IlandingIntroduceMainContent
  );

  // function updateSectionContent<T extends keyof IlandingIntroduceMainContent>(
  //   section: T,
  //   updatedContent: Partial<IlandingIntroduceMainContent[T]>
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
      <Header serviceType="랜딩·소개" />
      <Mainbanner />
      <ServiceIntroduce />
      <ProductIntroduceMain />
      <NoticeMain />
      <RecruitMain />
      <NewsMain />
      <ExploreServiceMain />
      <Footer serviceType="랜딩·소개" />
    </div>
  );
}
