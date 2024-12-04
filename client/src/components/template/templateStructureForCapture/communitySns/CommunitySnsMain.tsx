import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { IfetchedfeatureResponseData } from "@components/template/types";
import Loading from "@components/common/ui/Loading/loading";
import { getFeatureData } from "@api/project/getFeatureData";
import useIsProduction from "@hooks/useIsProduction";
import { ImainBannerText } from "@components/template/main/Mainbanner";
import { InoticeMainText } from "@components/template/main/NoticeMain";
import { InormalBoardText } from "@components/template/main/NormalBoardMain";
import { InewsMainText } from "@components/template/main/NewsMain";
import { IfaqMainText } from "@components/template/main/FaqMain";
import { IserviceContact } from "@components/template/service/ServiceContact";

interface IcommunitySnsMain {
  mainBanner: ImainBannerText;
  notice: InoticeMainText;
  board: InormalBoardText;
  news: InewsMainText;
  faq: IfaqMainText;
  serviceContact: IserviceContact;
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
