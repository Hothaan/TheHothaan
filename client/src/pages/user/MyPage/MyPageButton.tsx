/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export interface IMyPageButton {
  text: string;
}

export default function MyPageButton(prop: IMyPageButton) {
  const { text } = prop;
  return (
    <button type="button" css={container}>
      <p css={text_style}>{text}</p>
    </button>
  );
}

const container = css`
  display: flex;
  height: 44px;
  padding: 13px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 50px;
  border: 1px solid var(--DEDEDE, #dedede);
  background: var(--F6F8FF, #f6f8ff);
`;

const text_style = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
