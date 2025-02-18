/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

export interface IuserFormLabel {
  label: string;
}

export default function UserFormLabel(prop: IuserFormLabel) {
  const { label } = prop;
  return <p css={label_style}>{label}</p>;
}

const label_style = css`
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
