/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export interface ItemplateButton {
  type: "default" | "round" | "square";
  text: string;
  color?: "dark" | "light";
}

export default function TemplateButton(prop: ItemplateButton) {
  const { type, text, color } = prop;

  if (type === "default") {
    return (
      <button type="button" css={button_default}>
        {text}
      </button>
    );
  } else if (type === "round") {
    return (
      <button type="button" css={button_round}>
        {text}
      </button>
    );
  } else {
    return (
      <button type="button" css={button_square(color)}>
        {text}
      </button>
    );
  }
}

const button_default = css`
  display: flex;
  padding: 22px 66px;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  background: #486284;
  color: var(--FFFFFF, #fff);

  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const button_round = css`
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;

  border-radius: 50px;
  background: var(--Neutral-10, #486284);

  color: var(--Neutral-0, #fff);

  /* h2_small */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 32px */
`;

const button_square = (color?: string) => css`
  display: flex;
  height: 50px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex: 1 0 0;

  color: ${color === "dark" ? "#fff" : "#486284"};

  /* 15 */
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 24px */

  border: ${color === "dark" ? "none" : "1px solid #486284"};

  background: ${color === "dark" ? "#486284" : "#fff"};
`;