/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

export type TbuttonStepStatus = "active" | "disabled" | "complete";

export interface IbuttonStep {
  status: TbuttonStepStatus;
  step: number;
  text: string;
  title?: any[];
}

export default function ButtonStep(prop: IbuttonStep) {
  const { status, step, text } = prop;
  return (
    <button type="button" css={[step_button, step_button_color(status)]}>
      <p css={[step_number, step_number_color(status)]}>0{step}</p>
      <p css={[step_text_color(status), step_text]}>{text}</p>
    </button>
  );
}

const step_button_color = (status: TbuttonStepStatus) => {
  switch (status) {
    case "active":
      return css`
        background: var(--FFF, #fff);
        &:before {
          background: linear-gradient(to right, #3b82f6, #a855f7);
        }
      `;
    case "disabled":
      return css`
        background: #ececec;
        &:before {
          background: linear-gradient(to right, #ececec, #ececec);
        }
      `;
    case "complete":
      return css`
        background: var(--FFF, #fff);
        &:before {
          background: linear-gradient(to right, #dedede, #dedede);
        }
      `;
    default:
      return css`
        background: var(--FFF, #fff);
        &:before {
          background: linear-gradient(to right, #3b82f6, #a855f7);
        }
      `;
  }
};

const step_button = css`
  cursor: default;

  display: flex;
  padding: 10px 20px;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  position: relative;

  border-radius: 60px;
  border: 2px solid transparent;

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 30px;
    padding: 2px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const step_number_color = (status: TbuttonStepStatus) => {
  switch (status) {
    case "active":
      return css`
        background: linear-gradient(137deg, #56c0fe 13.28%, #6d0ee6 99.19%);
      `;
    case "disabled":
      return css`
        background: var(--DEDEDE, #dedede);
      `;
    case "complete":
      return css`
        background: var(--383838, #383838);
      `;
    default:
      return css`
        background: linear-gradient(137deg, #56c0fe 13.28%, #6d0ee6 99.19%);
      `;
  }
};

const step_number = css`
  display: flex;
  width: 30px;
  height: 30px;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 30px;

  color: var(--FFF, var(--FFFFFF, #fff));
  font-family: "SUITE Variable", sans-serif;
  font-size: 12px;
  font-weight: 900;
`;

const step_text_color = (status: TbuttonStepStatus) => {
  switch (status) {
    case "active":
      return css`
        background: linear-gradient(92deg, #56c0fe 2.67%, #6d0ee6 98.39%);
      `;
    case "disabled":
      return css`
        background: linear-gradient(92deg, #a9aab8 2.67%, #a9aab8 98.39%);
      `;
    case "complete":
      return css`
        background: linear-gradient(92deg, #383838 2.67%, #383838 98.39%);
      `;
    default:
      return css`
        background: linear-gradient(92deg, #56c0fe 2.67%, #6d0ee6 98.39%);
      `;
  }
};

const step_text = css`
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
