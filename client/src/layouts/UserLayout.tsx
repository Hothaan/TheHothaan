/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import useLocationControl from "@hooks/useLocationControl";
import { Routes, Route } from "react-router-dom";
import Header from "@components/common/ui/Header/Header";
import Footer from "@components/common/ui/Footer/Footer";
import MainPage from "@pages/user/MainPage/MainPage";
// import TestPage from "@pages/user/TestPage/TestPage";

import EstimatePage from "@pages/user/EstimatePage/EstimatePage";
import PlanIntroPage from "@pages/user/PlanIntroPage/PlanIntroPage";

import ServiceLayout from "./ServiceLayout";
import ServiceStep1Page from "@pages/user/ServicePage/ServiceStep1Page";
import ServiceStep2Page from "@pages/user/ServicePage/ServiceStep2Page";
import ServiceStep3Page from "@pages/user/ServicePage/ServiceStep3Page";
import ServiceStep4Page from "@pages/user/ServicePage/ServiceStep4Page";
import ServiceStep5Page from "@pages/user/ServicePage/ServiceStep5Page";
import ServicePreviewPage from "@pages/user/ServicePage/ServicePreviewPage";

import MypageLayout from "./MypageLayout";
import MyInformationPage from "@pages/user/MyPage/MyInformationPage";
import MyProjectPage from "@pages/user/MyPage/MyProjectPage";
import MyProjectEditPage from "@pages/user/MyPage/MyProjectEditPage";
import MyEstimatePage from "@pages/user/MyPage/MyEstimatePage";
import EstimateDetailPage from "@pages/user/MyPage/EstimateDetailPage";
import ManageSubscriptionPage from "@pages/user/MyPage/ManageSubscriptionPage";
import PersonalInquiryPage from "@pages/user/MyPage/PersonalInquiryPage";
import PersonalInquiryRegisterPage from "@pages/user/MyPage/PersonalInquiryRegisterPage";

import LoginPage from "@pages/user/LoginPage/LoginPage";
import JoinPage from "@pages/user/JoinPage/JoinPage";
import JoinSuccessPage from "@pages/user/JoinPage/JoinSuccessPage";

import FindIdPage from "@pages/user/FindIdPage/FindIdPage";
import FindPwPage from "@pages/user/FindPwPage/FindPwPage";
import ResetPwPage from "@pages/user/ResetPwPage/ResetPwPage";

import CustomerServiceLayout from "./CustomerServiceLayout";
import GuidePage from "@pages/user/CustomerServicePage/GuidePage/GuidePage";
import ManualPage from "@pages/user/CustomerServicePage/ManualPage/ManualPage";
import FaqPage from "@pages/user/CustomerServicePage/FaqPage/FaqPage";
import NoticePage from "@pages/user/CustomerServicePage/NoticePage/NoticePage";
import SupportPage from "@pages/user/CustomerServicePage/SupportPage/SupportPage";

import IntroduceCompanyPage from "@pages/user/CompanyNav/IntroduceCompanyPage";
import IntroduceServicePage from "@pages/user/CompanyNav/IntroduceServicePage";
import PrivacyPolicyPage from "@pages/user/CompanyNav/PrivacyPolicyPage";
import TermOfUsePage from "@pages/user/CompanyNav/TermOfUsePage";

import PreparePage from "@pages/user/PreparePage/PreparePage";
import ErrorPage from "@pages/user/ErrorPage/ErrorPage";
import NotFoundPage from "@pages/user/NotFoundPage/NotFoundPage";

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
          <Route path="/customerService" element={<CustomerServiceLayout />}>
            {/* <Route path="support" element={<SupportPage />} /> */}
            <Route path="guide" element={<GuidePage />} />
            <Route path="manual" element={<ManualPage />} />
            <Route path="faq" element={<FaqPage />} />
            <Route path="notice" element={<NoticePage />} />
          </Route>
          {/*depth2 ----------------------------------------------------- */}
          {/* ----- company menu ----- */}
          {/* ---- user -------------- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/joinSuccess" element={<JoinSuccessPage />} />
          <Route path="/findId" element={<FindIdPage />} />
          <Route path="/findPw" element={<FindPwPage />} />
          <Route path="/resetPw" element={<ResetPwPage />} />
          {/* my page -------- */}
          <Route path="/myPage" element={<MypageLayout />}>
            <Route path="myInfo" element={<MyInformationPage />} />
            <Route path="myProject" element={<MyProjectPage />} />
            <Route path="myProjectEdit" element={<MyProjectEditPage />} />
            <Route path="estimate" element={<MyEstimatePage />} />
            <Route path="estimateDetail" element={<EstimateDetailPage />} />
            <Route
              path="manageSubscription"
              element={<ManageSubscriptionPage />}
            />
            <Route path="personalInquiry" element={<PersonalInquiryPage />} />
            <Route
              path="personalInquiryRegister"
              element={<PersonalInquiryRegisterPage />}
            />
          </Route>
          {/* ---- footer company nav ------- */}
          <Route path="/introduceCompany" element={<IntroduceCompanyPage />} />
          <Route path="/introduceService" element={<IntroduceServicePage />} />
          <Route path="/termOfUse" element={<PrivacyPolicyPage />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
          {/* error page */}
          <Route path="/prepare" element={<PreparePage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
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
