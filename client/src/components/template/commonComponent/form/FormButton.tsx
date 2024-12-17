/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

export interface IformButton {
  width: string;
  height: string;
  text: string;
}

export default function FormButton(prop: IformButton) {
  const { width, height, text } = prop;

  return <div css={container(width, height)}>{text}</div>;
}

const container = (width: string, height: string) => css`
  width: ${width};
  height: ${height};

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #486284;
  background: rgba(255, 255, 255, 0);

  color: #486284;
  text-align: center;

  /* 15 */
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 24px */
`;
