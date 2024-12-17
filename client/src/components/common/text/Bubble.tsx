/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

type TbubbleType = "default" | "big" | "highLight";

export interface Ibubble {
  text?: string;
  type?: TbubbleType;
}

const text_ = "기획안 파일이 생성되었어요 👀🎉";

export default function Bubble(prop: Ibubble) {
  const { text, type } = prop;
  return (
    <div css={speech_bubble_container}>
      <div css={bubble(type)}>
        <p css={speech(type)}>{text || text_}</p>
      </div>
      <img
        src="/assets/images/serviceIntro1/speechBalloon.png"
        alt="speechBalloon"
        css={triangle}
      />
    </div>
  );
}

const speech_bubble_container = css`
  position: relative;
`;

const bubble = (type: TbubbleType | undefined) => css`
  border-radius: 100px;
  background-color: #119cd4;
  padding: ${type === "big" ? "30px 62px" : "20px"};
`;

const speech = (type: TbubbleType | undefined) => css`
  color: var(--FFF, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: ${type === "big"
    ? "38px"
    : type === "highLight"
    ? "16px"
    : "20px"};
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const triangle = css`
  position: absolute;
  top: calc(100% - 4px);
  right: 50%;
`;
