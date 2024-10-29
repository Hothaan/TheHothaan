/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLocation } from "react-router-dom";
import TitleNstepSection from "@components/service/titleNstepSection/TitleNstepSection";
import { Outlet } from "react-router-dom";

export default function ServiceLayout() {
  const location = useLocation();

  return (
    <div css={wrap}>
      {location.pathname !== "/service/preview" && <TitleNstepSection />}
      <section css={main_wrap}>
        <Outlet />
      </section>
    </div>
  );
}

const wrap = css`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const main_wrap = css`
  width: 100%;
  margin: 0 auto;
  padding-top: 100px;
`;
