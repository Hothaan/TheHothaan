import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import Feed from "@components/template/board/Feed";

export default function CommunitySnsFeed() {
  return (
    <>
      <Header serviceType="커뮤니티SNS" />
      <Feed />
      <Footer />
    </>
  );
}
