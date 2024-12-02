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

export default function CommunitySnsMain() {
  return (
    <>
      <Header serviceType="커뮤니티SNS" />
      <Mainbanner />
      <NoticeMain />
      <NormalBoardMain />
      <FeedMain />
      <ImageBoardMain />
      <NewsMain />
      <FaqMain />
      <ServiceContact />
      <Footer />
    </>
  );
}
