import { Routes, Route } from "react-router-dom";
import Header from "@components/service/ui/Header";
import MainPage from "@pages/user/MainPage/MainPage";
import TestPage from "@pages/user/TestPage/TestPage";
import EstimatePage from "@pages/user/EstimatePage/EstimatePage";
import PlanIntroPage from "@pages/user/PlanIntroPage/PlanIntroPage";
import ServicePage from "@pages/user/ServicePage/ServicePage";
import LoginPage from "@pages/user/LoginPage/LoginPage";
import JoinPage from "@pages/user/JoinPage/JoinPage";

export default function UserLayout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/*depth1*/}
        <Route path="/service" element={<ServicePage />} />
        <Route path="/estimate" element={<EstimatePage />} />
        <Route path="/planIntro" element={<PlanIntroPage />} />
        <Route path="/customerService" element={<MainPage />} />
        {/*user*/}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        {/*test*/}
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </>
  );
}
