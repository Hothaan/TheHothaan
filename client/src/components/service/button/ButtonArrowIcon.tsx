/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { ReactComponent as ArrowLeft } from "@svgs/common/buttonArrowLeft.svg";
import { ReactComponent as ArrowRight } from "@svgs/common/buttonArrowRight.svg";
import { ReactComponent as ArrowUp } from "@svgs/common/buttonArrowTop.svg";
import { ReactComponent as ArrowDown } from "@svgs/common/buttonArrowBottom.svg";

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
