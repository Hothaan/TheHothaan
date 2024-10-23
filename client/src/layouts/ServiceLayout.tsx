/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import React from "react";
import TitleNstepSection from "@components/service/titleNstepSection/TitleNstepSection";
import ControlBtnSection from "@components/service/controlBtnSection/ControlBtnSection";
import { Link, Outlet } from "react-router-dom";

export default function ServiceLayout() {
  return (
    <div css={wrap}>
      <TitleNstepSection />
      <section css={main_wrap}>
        <Outlet />
      </section>
      <ControlBtnSection />
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
