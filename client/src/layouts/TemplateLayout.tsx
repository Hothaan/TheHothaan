/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Routes, Route, useParams } from "react-router-dom";
import TemplateGeneratePage from "@pages/user/TemplateGeneratePage/TemplateGeneratePage";

export default function TemplateLayout() {
  return (
    <>
      <main css={full_height}>
        <Routes>
          <Route
            path="/:templateName/:data/:header"
            element={<TemplateGeneratePage />}
          />
        </Routes>
      </main>
    </>
  );
}

const full_height = css`
  overflow-x: hidden;
  min-height: calc(100vh - 211px - 80px);
`;
