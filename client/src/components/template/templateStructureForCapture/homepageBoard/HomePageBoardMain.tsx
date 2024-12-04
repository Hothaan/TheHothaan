import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import Mainbanner from "@components/template/main/Mainbanner";
import ServiceIntroduce from "@components/template/main/ServiceIntroduceMain";
import ProductIntroduceMain from "@components/template/main/ProductIntroduceMain";
import NoticeMain from "@components/template/main/NoticeMain";
import RecruitMain from "@components/template/main/RecruitMain";
import NewsMain from "@components/template/main/NewsMain";
import ExploreServiceMain from "@components/template/main/ExploreServiceMain";
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

export default function HomePageBoardMain() {
  return (
    <div className="templateImage">
      <Header serviceType="홈페이지 · 게시판" />
      <Mainbanner />
      <ServiceIntroduce />
      <ProductIntroduceMain />
      <NoticeMain />
      <RecruitMain />
      <NewsMain />
      <ExploreServiceMain />
      <Footer serviceType="홈페이지 · 게시판" />
    </div>
  );
}
