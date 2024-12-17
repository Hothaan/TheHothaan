/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

export interface ITextCaption {
  caption: string;
}

export default function TextCaption(prop: ITextCaption) {
  const { caption } = prop;

  return <p css={caption_style}>{caption}</p>;
}

const caption_style = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  letter-spacing: -0.14px;
`;
