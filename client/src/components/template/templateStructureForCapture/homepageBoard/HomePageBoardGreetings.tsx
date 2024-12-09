import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
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

import Greetings from "@components/template/companyIntoduce/Greetings";
export default function HomePageBoardGreetings() {
  return (
    <div className="templateImage">
      <Header serviceType="홈페이지·게시판" />
      <Greetings />
      <Footer serviceType="홈페이지·게시판" />
    </div>
  );
}
