import { Routes, Route } from "react-router-dom";
import Header from "@components/ui/Header";
import MainPage from "@pages/user/MainPage/MainPage";

export default function UserLayout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}
