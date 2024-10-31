/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export interface IuserPageTitle {
  title: string;
}

export default function UserPageTitle(prop: IuserPageTitle) {
  const { title } = prop;
  return <p css={page_title}>{title}</p>;
}

const page_title = css`
  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 39px */
`;
