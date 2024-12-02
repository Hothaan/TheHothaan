import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import MyProfile from "@components/template/mypage/MyProfile";
export default function CommunitySnsMyProfile() {
  return (
    <>
      <Header serviceType="커뮤니티SNS" />
      <MyProfile />
      <Footer />
    </>
  );
}
