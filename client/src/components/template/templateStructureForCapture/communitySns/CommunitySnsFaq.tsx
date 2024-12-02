import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import Board from "@components/template/board/Board";
import Faq from "@components/template/board/Faq";

export default function CommunitySnsFaq() {
  return (
    <>
      <Header serviceType="커뮤니티SNS" />
      <Faq />
      <Footer />
    </>
  );
}
