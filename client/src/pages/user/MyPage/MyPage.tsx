/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MyPageNavigation from "./MyPageNavigation";
import MyInformation from "./MyInformation";

export default function MyPage() {
  return <MyInformation />;
}

const container = css`
  margin-top: 80px;
  display: flex;
  width: 100%;
`;
