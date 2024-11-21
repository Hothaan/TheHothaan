/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as ArrowLeft } from "@svgs/common/buttonArrowLeft.svg";
import { ReactComponent as ArrowRight } from "@svgs/common/buttonArrowRight.svg";
import { ReactComponent as ArrowUp } from "@svgs/common/buttonArrowTop.svg";
import { ReactComponent as ArrowDown } from "@svgs/common/buttonArrowBottom.svg";

export interface IbuttonArrowControler {
  currentIdx: number;
  total: number;
  direction: "left" | "right" | "up" | "down";
  onClick: () => void;
}

export default function ButtonArrowIconControler(prop: IbuttonArrowControler) {
  const { currentIdx, total, direction, onClick } = prop;
  return (
    <button css={container} type="button" onClick={onClick}>
      {direction === "up" && <ArrowUp css={opacity_prev(currentIdx === 0)} />}
      {direction === "left" && (
        <ArrowLeft css={opacity_prev(currentIdx === 0)} />
      )}
      {direction === "right" && (
        <ArrowRight css={opacity_next(currentIdx === total)} />
      )}
      {direction === "down" && (
        <ArrowDown css={opacity_next(currentIdx === total)} />
      )}
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

  background-color: #fff;

  svg * {
    fill: #747474;
  }
`;

const opacity_prev = (isfirstIdx: boolean) => css`
  opacity: ${isfirstIdx ? "0.5" : "1"};
`;
const opacity_next = (islastIdx: boolean) => css`
  opacity: ${islastIdx ? "0.5" : "1"};
`;
