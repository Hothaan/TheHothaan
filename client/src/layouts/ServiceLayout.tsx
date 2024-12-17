/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import TitleNstepSection from "@components/service/titleNstepSection/TitleNstepSection";
import { Outlet } from "react-router-dom";
import useLocationControl from "@hooks/useLocationControl";

export default function ServiceLayout() {
  const { checkLocation } = useLocationControl();

  return (
    <div css={wrap}>
      {!checkLocation(["/service/preview"]) && <TitleNstepSection />}
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
