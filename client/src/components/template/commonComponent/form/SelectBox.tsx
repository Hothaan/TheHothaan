/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as Arrow } from "@svgs/template/selectBoxArrow.svg";

export interface IselectBox {
  width: string;
  height: string;
  text: string;
}

export default function SelectBox(prop: IselectBox) {
  const { width, height, text } = prop;
  return (
    <div css={container(width, height)}>
      <p css={text_style}>{text}</p>
      <Arrow />
    </div>
  );
}

const container = (width: string, height: string) => css`
  width: ${width};
  height: ${height};

  padding: 11px 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid #486284;
  background: rgba(255, 255, 255, 0);
`;

const text_style = css`
  color: #486284;
  text-align: center;

  /* 15 */
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 24px */
`;
