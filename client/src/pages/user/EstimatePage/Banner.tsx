/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function Banner() {
  return (
    <div css={container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="23"
        viewBox="0 0 16 23"
        fill="none"
      >
        <path
          d="M1.59668 8.95161L8.04829 2.5M8.04829 2.5L14.4999 8.95161M8.04829 2.5V22.5"
          stroke="white"
          strokeWidth="3"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="23"
        viewBox="0 0 16 23"
        fill="none"
      >
        <path
          d="M1.59668 8.95161L8.04829 2.5M8.04829 2.5L14.4999 8.95161M8.04829 2.5V22.5"
          stroke="white"
          strokeWidth="3"
        />
      </svg>
      <p css={text}>카테고리를 선택해볼까요? 👀✨</p>
    </div>
  );
}

const container = css`
  display: flex;
  padding: 30px 0px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  background: linear-gradient(to right, #56c0fe, #6d0ee6);
`;

const text = css`
  color: var(--FFF, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
