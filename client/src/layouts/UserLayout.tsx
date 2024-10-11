import { Routes, Route } from "react-router-dom";
import MainPage from "@pages/user/MainPage/MainPage";
import TestPage from "@pages/user/TestPage/TestPage";

export default function UserLayout() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </>
  );
}
