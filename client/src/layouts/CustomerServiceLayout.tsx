/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Outlet } from "react-router-dom";

export default function CustomerServiceLayout() {
  return (
    <div css={container}>
      <Outlet />
    </div>
  );
}

const container = css`
  width: 100%;
  margin-top: 80px;
`;
