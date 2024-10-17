/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { Routes, Route } from "react-router-dom";
import Header from "@components/service/ui/Header/Header";
import Footer from "@components/service/ui/Footer/Footer";
import MainPage from "@pages/user/MainPage/MainPage";
import TestPage from "@pages/user/TestPage/TestPage";
import ComponentGuidePage from "@pages/user/ComponentGuidePage/ComponentGuidePage";
import EstimatePage from "@pages/user/EstimatePage/EstimatePage";
import PlanIntroPage from "@pages/user/PlanIntroPage/PlanIntroPage";
import ServicePage from "@pages/user/ServicePage/ServicePage";
import LoginPage from "@pages/user/LoginPage/LoginPage";
import JoinPage from "@pages/user/JoinPage/JoinPage";

export default function UserLayout() {
  return (
    <>
      <Header />
      <main css={full_height}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* ----- global nav main menu ----- */}
          {/*depth1*/}
          <Route path="/service" element={<ServicePage />} />
          <Route path="/estimate" element={<EstimatePage />} />
          <Route path="/planIntro" element={<PlanIntroPage />} />
          <Route path="/customerService" element={<MainPage />} />
          {/*depth2*/}
          {/* ----- company menu ----- */}
          {/* ---- user ---- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          {/* ---- test ---- */}
          <Route path="/test" element={<TestPage />} />
          <Route path="/componentGuide" element={<ComponentGuidePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

const full_height = css`
  min-height: calc(100vh - 211px - 80px);
`;
