/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";

export default function Loading() {
  return (
    <div css={wrap}>
      <span css={dot(1)}> </span>
      <span css={dot(2)}> </span>
      <span css={dot(3)}> </span>
    </div>
  );
}

const wave = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(2);
    opacity: 0.5;
  }
`;

const wrap = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const dot = (index: number) => css`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${index === 0
    ? "linear-gradient(45deg, #60a5fa, #38bdf8)"
    : index === 1
    ? "linear-gradient(45deg, #818cf8, #6366f1)"
    : "linear-gradient(45deg, #a78bfa, #8b5cf6)"};
  animation: ${wave} 1.2s ease-in-out infinite;
  animation-delay: ${index * 0.3}s;
`;
