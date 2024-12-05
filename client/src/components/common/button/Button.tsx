/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export type TbtnSize = "XL" | "L" | "M" | "S" | "full";
export type TbtnBg = "gradient" | "blue" | "gray" | "white";
export interface Ibutton {
  size: TbtnSize;
  bg: TbtnBg;
  text: string;
  onClick?: any;
  disabled?: boolean;
}

export default function Button(prop: Ibutton) {
  const { size, bg, text, onClick, disabled } = prop;

  return (
    <button
      type="button"
      css={[button(bg, size), bg_color(bg, size, disabled), btn_size(size)]}
      onClick={onClick || undefined}
      className={disabled ? "disabled" : ""}
      disabled={disabled}
    >
      <p css={text_style(bg, size, disabled)} className="text">
        {text}
      </p>
    </button>
  );
}

const btn_size = (size: TbtnSize) => {
  switch (size) {
    case "S":
      return css`
        width: 190px;
        height: 50px;
        padding: 0px 24px;
        font-size: 15px;
        font-weight: 600;
        white-space: nowrap;
      `;
    case "M":
      return css`
        width: 190px;
        height: 50px;
        padding: 0px 24px;
        font-size: 17px;
        font-weight: 600;
      `;
    case "L":
      return css`
        width: 190px;
        height: 50px;
        padding: 0px 14px;
        font-size: 17px;
        font-weight: 500;
      `;
    case "XL":
      return css`
        width: 190px;
        height: auto;
        padding: 20px 24px;
        font-size: 17px;
        font-weight: 800;
        white-space: nowrap;
      `;
    case "full":
      return css`
        width: 100%;
        height: 50px;
        padding: 0px 24px;
        font-size: 17px;
        font-weight: 600;
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

const text_style = (bg: TbtnBg, size: TbtnSize, disabled?: boolean) => {
  if (size === "full" && bg === "white") {
    return css`
      color: #747474;
      font-family: Pretendard;
      font-style: normal;
      line-height: normal;
      transition: 0.3s ease;
    `;
  } else if (disabled) {
    return css`
      color: #a9aab8;
      font-family: Pretendard;
      font-style: normal;
      line-height: normal;
      transition: 0.3s ease;
    `;
  } else {
    switch (bg) {
      case "gradient":
        return css`
          color: var(--FFFFFF, #fff);
          font-family: Pretendard;
          font-style: normal;
          line-height: normal;
          transition: 0.3s ease;
        `;
      case "blue":
        return css`
          color: var(--FFFFFF, #fff);
          font-family: Pretendard;
          font-style: normal;
          line-height: normal;
          transition: 0.3s ease;
        `;
      case "gray":
        return css`
          color: var(--FFFFFF, #fff);
          font-family: Pretendard;
          font-style: normal;
          line-height: normal;
          transition: 0.3s ease;
        `;
      case "white":
        return css`
          color: #383838;
          font-family: Pretendard;
          font-style: normal;
          line-height: normal;
          transition: 0.3s ease;
        `;
      default:
        return css`
          color: var(--FFFFFF, #fff);
          font-family: Pretendard;
          font-style: normal;
          line-height: normal;
          transition: 0.3s ease;
        `;
    }
  }
};

const button = (bg: TbtnBg, size: TbtnSize) => {
  if (bg === "white" && size === "full") {
    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      position: relative;
      border-radius: 10px;
      border: 2px solid transparent;

      &:before {
        content: "";
        position: absolute;
        inset: -2px;
        border-radius: 10px;
        padding: 2px;
        -webkit-mask: linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: destination-out;
        mask-composite: exclude;
        pointer-events: none;
        background: linear-gradient(to right, #a9aab8, #a9aab8);
      }

      &:hover {
        &:before {
          background: linear-gradient(to right, #3b82f6, #a855f7);
        }
        .text {
          background: var(
            --Linear,
            linear-gradient(90deg, #56c0fe -1.67%, #6d0ee6 98.33%)
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    `;
  } else {
    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 10px;
      position: relative;
    `;
  }
};

const bg_color = (bg: TbtnBg, size: TbtnSize, disabled?: boolean) => {
  if (size === "full" && bg === "white") {
    return css`
      color: #747474;
      background-color: #ffffff;
      // box-shadow: 0 0 0 2px #dedede inset;
    `;
  } else if (disabled) {
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
          box-shadow: 0 0 0 2px #dedede inset;
        `;
      default:
        return css`
          color: var(--FFFFFF, #fff);
          background-color: transparent;
        `;
    }
  }
};
