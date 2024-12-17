/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

export interface ItemplateBadge {
  text: string;
}

export default function TemplateBadge(prop: ItemplateBadge) {
  const { text } = prop;

  return <div css={badge}>{text}</div>;
}

const badge = css`
  display: inline-flex;
  padding: 4px 9px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 100px;
  border: 1px solid #486284;

  color: #486284;

  /* 15 */
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 24px */
`;
