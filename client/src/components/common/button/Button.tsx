/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export type TbtnSize = "XL" | "M" | "S";
export type TbtnBg = "gradient" | "blue" | "gray" | "white";
export interface Ibutton {
  size: TbtnSize;
  bg: TbtnBg;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button(prop: Ibutton) {
  const { size, bg, text, onClick, disabled } = prop;

  return (
    <button
      type="button"
      css={[button, bg_color(bg, disabled), btn_size(size)]}
      onClick={onClick || undefined}
      className={disabled ? "disabled" : ""}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

const btn_size = (size: TbtnSize) => {
  switch (size) {
    case "S":
      return css`
        height: 50px;
        padding: 0px 24px;
        font-size: 15px;
        font-weight: 600;
        white-space: nowrap;
      `;
    case "M":
      return css`
        height: 50px;
        padding: 0px 24px;
        font-size: 17px;
        font-weight: 600;
      `;
    case "XL":
      return css`
        height: auto;
        padding: 20px 24px;
        font-size: 20px;
        font-weight: 800;
        white-space: nowrap;
      `;
    default:
      return css`
        height: 50px;
        padding: 0px 24px;
        font-size: 17px;
        font-weight: 600;
      `;
  }
};

const button = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 190px;
  // flex-grow: 1;
  border-radius: 10px;

  font-family: Pretendard;
  font-style: normal;
  line-height: normal;
`;

const bg_color = (bg: TbtnBg, disabled?: boolean) => {
  if (disabled) {
    return css`
      background-color: #ececec;
      color: #a9aab8;
    `;
  } else {
    switch (bg) {
      case "gradient":
        return css`
          color: var(--FFFFFF, #fff);
          background: linear-gradient(97deg, #56c0fe 0.25%, #6d0ee6 98.51%);
        `;
      case "blue":
        return css`
          color: var(--FFFFFF, #fff);
          background-color: #119cd4;
        `;
      case "gray":
        return css`
          color: var(--FFFFFF, #fff);
          background-color: #383838;
        `;
      case "white":
        return css`
          color: #383838;
          background-color: #ffffff;
          box-shadow: 0 0 0 2px #747474 inset;
        `;
      default:
        return css`
          color: var(--FFFFFF, #fff);
          background-color: transparent;
        `;
    }
  }
};
