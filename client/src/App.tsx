import { Route, Routes } from "react-router-dom";
import { css, Global } from "@emotion/react";
import "reset-css";
import { globalStyles } from "@common/globalStyles";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyles} />
        <Routes>
          <Route path="/*" element={<UserLayout />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
