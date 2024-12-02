import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import Board from "@components/template/board/Board";

export default function CommunitySnsBoard() {
  return (
    <>
      <Header serviceType="커뮤니티SNS" />
      <Board option="텍스트형" />
      <Footer />
    </>
  );
}
