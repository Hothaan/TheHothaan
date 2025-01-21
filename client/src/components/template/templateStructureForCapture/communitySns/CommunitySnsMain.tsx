/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/* component */
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import Mainbanner from "@components/template/main/Mainbanner";
import NoticeMain from "@components/template/main/NoticeMain";
import NormalBoardMain from "@components/template/main/NormalBoardMain";
import FeedMain from "@components/template/main/FeedMain";
import ImageBoardMain from "@components/template/main/ImageBoardMain";
import NewsMain from "@components/template/main/NewsMain";
import FaqMain from "@components/template/main/FaqMain";
import ServiceContact from "@components/template/service/ServiceContact";
import Loading from "@components/common/ui/Loading/loading";

/* data */
import { IfetchedfeatureResponseData } from "@components/template/types";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";

interface IcommunitySnsMainContent {
  mainBannerTitle: string;
  mainBannerDesc: string;
  mainBannerButton: string;
  noticeTitle: string;
  noticeDesc: string;
  boardTitle: string;
  newsTitle: string;
  faqTitle: string;
  faqDesc: string;
  serviceContactTitle: string;
  serviceContactButton: string;
}

interface IcommunitySnsMainStyle {
  mainBannerTitle: CSSObject;
  mainBannerDesc: CSSObject;
  mainBannerButton: CSSObject;
  noticeTitle: CSSObject;
  noticeDesc: CSSObject;
  boardTitle: CSSObject;
  newsTitle: CSSObject;
  faqTitle: CSSObject;
  faqDesc: CSSObject;
  serviceContactTitle: CSSObject;
  serviceContactButton: CSSObject;
}

export default function CommunitySnsMain() {
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
  const [pageContent, setPageContent] = useState<IcommunitySnsMainContent>(
    {} as IcommunitySnsMainContent
  );

  // function updateSectionContent<T extends keyof IcommunitySnsMainContent>(
  //   section: T,
  //   updatedContent: Partial<IcommunitySnsMainContent[T]>
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
      <Header serviceType="커뮤니티·sns" />
      <Mainbanner />
      <NoticeMain />
      <NormalBoardMain />
      <FeedMain />
      <ImageBoardMain />
      <NewsMain />
      <FaqMain />
      <ServiceContact />
      <Footer serviceType="커뮤니티·sns" />
    </div>
  );
}
