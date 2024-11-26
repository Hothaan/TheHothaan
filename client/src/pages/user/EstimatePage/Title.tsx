/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export interface Ititle {
  title: string;
}

export default function Title(prop: Ititle) {
  const { title } = prop;

  return <p css={title_style}>{title}</p>;
}
const title_style = css`
  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: uppercase;
`;
