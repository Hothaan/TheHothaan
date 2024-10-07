import AdminLoginPage from "@pages/admin/AdminLoginPage/AdminLoginPage";
import { Routes, Route } from "react-router-dom";

export default function AdminLayout() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLoginPage />} />
    </Routes>
  );
}
