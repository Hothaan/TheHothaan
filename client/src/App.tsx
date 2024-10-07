import { Route, Routes } from "react-router-dom";
import "./common/globalStyles.css";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<UserLayout />} />
      <Route path="/admin/*" element={<AdminLayout />} />
    </Routes>
  );
}

export default App;
