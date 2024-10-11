import { Routes, Route } from "react-router-dom";
import MainPage from "@pages/user/MainPage/MainPage";

export default function UserLayout() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}
