/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MyPageNavigation from "@components/common/mypage/MyPageNavigation";
import { Outlet } from "react-router-dom";

export default function MypageLayout() {
  return (
    <div css={container}>
      <MyPageNavigation />
      <Outlet />
    </div>
  );
}

const container = css`
  margin-top: 80px;
  display: flex;
  width: 100%;
`;
