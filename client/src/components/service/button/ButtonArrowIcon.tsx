/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as ArrowLeft } from "@svgs/buttonArrowLeft.svg";
import { ReactComponent as ArrowRight } from "@svgs/buttonArrowRight.svg";
import { ReactComponent as ArrowUp } from "@svgs/buttonArrowTop.svg";
import { ReactComponent as ArrowDown } from "@svgs/buttonArrowBottom.svg";

export interface IbuttonArrow {
  direction: "left" | "right" | "up" | "down";
  onClick: () => void;
}

export default function ButtonArrowIcon(prop: IbuttonArrow) {
  const { direction, onClick } = prop;
  return (
    <button css={container} type="button" onClick={onClick}>
      {direction === "up" && <ArrowUp />}
      {direction === "right" && <ArrowRight />}
      {direction === "down" && <ArrowDown />}
      {direction === "left" && <ArrowLeft />}
    </button>
  );
}

const container = css`
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;

  border-radius: 70px;
  border: 1px solid var(--DEDEDE, #dedede);

  svg * {
    fill: #747474;
  }
`;
