import MainPage from "@pages/user/MainPage/MainPage";
import { Routes, Route } from "react-router-dom";

export default function UserLayout() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}
