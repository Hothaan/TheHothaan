/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import useLocationControl from "@hooks/useLocationControl";
import { Routes, Route } from "react-router-dom";
import Header from "@components/common/ui/Header/Header";
import Footer from "@components/common/ui/Footer/Footer";
import MainPage from "@pages/user/MainPage/MainPage";
import TestPage from "@pages/user/TestPage/TestPage";

import EstimatePage from "@pages/user/EstimatePage/EstimatePage";
import PlanIntroPage from "@pages/user/PlanIntroPage/PlanIntroPage";

import ServiceLayout from "./ServiceLayout";
import ServiceStep1Page from "@pages/user/ServicePage/ServiceStep1Page";
import ServiceStep2Page from "@pages/user/ServicePage/ServiceStep2Page";
import ServiceStep3Page from "@pages/user/ServicePage/ServiceStep3Page";
import ServiceStep4Page from "@pages/user/ServicePage/ServiceStep4Page";
import ServiceStep5Page from "@pages/user/ServicePage/ServiceStep5Page";
import ServicePreviewPage from "@pages/user/ServicePage/ServicePreviewPage";

import MyPage from "@pages/user/MyPage/MyPage";
import LoginPage from "@pages/user/LoginPage/LoginPage";
import JoinPage from "@pages/user/JoinPage/JoinPage";

import TemplateFublishingPage from "@pages/user/TemplateFublishingPage/TemplateFublishingPage";

export default function UserLayout() {
  const { includeLocation } = useLocationControl();

  return (
    <>
      {!includeLocation("template") && <Header />}
      <main css={full_height}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* global nav main menu ------------------------------------------------- */}
          {/* depth1 ----------------------------------------------------- */}
          {/* service steps -------- */}
          <Route path="/service" element={<ServiceLayout />}>
            <Route path="step1" element={<ServiceStep1Page />} />
            <Route path="step2" element={<ServiceStep2Page />} />
            <Route path="step3" element={<ServiceStep3Page />} />
            <Route path="step4" element={<ServiceStep4Page />} />
            <Route path="step5" element={<ServiceStep5Page />} />
            <Route path="preview" element={<ServicePreviewPage />} />
          </Route>
          {/* ---------------------- */}
          <Route path="/estimate" element={<EstimatePage />} />
          <Route path="/planIntro" element={<PlanIntroPage />} />
          <Route path="/customerService" element={<MainPage />} />
          {/*depth2 ----------------------------------------------------- */}
          {/* ----- company menu ----- */}
          {/* ---- user -------------- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/myPage" element={<MyPage />} />
          {/* ---- test -------------- */}
          <Route path="/test" element={<TestPage />} />
          <Route path="/fublising" element={<TemplateFublishingPage />} />
        </Routes>
      </main>
      {!includeLocation("template") && <Footer />}
    </>
  );
}

const full_height = css`
  overflow-x: hidden;
  min-height: calc(100vh - 211px - 80px);
`;
