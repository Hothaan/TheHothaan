/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Bubble from "@components/common/text/Bubble";

const bubble_ = "문제가 발생했어요.";
const text_ = "잠깐! 준비하고 있으니 잠시만 기다려주세요";

export interface Iattention {
  bubble?: string;
  text?: React.ReactNode;
}

export default function Attention(prop: Iattention) {
  const { bubble, text } = prop;

  return (
    <div css={content_container}>
      <Bubble text={bubble || bubble_} type="big" />
      <img src="/assets/images/loadingModal/ai.png" alt="ai" css={ai} />
      <p css={text_style}>{text || text_}</p>
    </div>
  );
}

const content_container = css`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ai = css`
  transform: scaleX(-1);
`;

const text_style = css`
  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 30px */
`;
