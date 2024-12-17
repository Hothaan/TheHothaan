/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import ResponsiveContainer from "@components/common/ui/Container/ResponsiveContainer";

export default function Title() {
  return (
    <div css={container}>
      <ResponsiveContainer>
        <div css={title_wrap}>
          <div css={title_container}>
            <p css={title}>맞춤형 기획서</p>
            <img src="/assets/images/planIntro/title1.png" alt="title1" />
            <p css={title}>작성을 위한</p>
          </div>
          <div css={title_container}>
            <p css={title_gradient}>더핫한 요금제</p>
            <img src="/assets/images/planIntro/title2.png" alt="title2" />
          </div>
        </div>
        <p css={desc}>
          업무 환경에 맞게 도입할 수 있도록 다양한 상품을 제공합니다.
        </p>
      </ResponsiveContainer>
    </div>
  );
}

const container = css`
  margin-top: 80px;
  display: flex;
  width: 100%;
  padding: 100px 0px;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  background: var(--F6F8FF, #f6f8ff);
`;

const title_wrap = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const title_container = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const title = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 45px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const title_gradient = css`
  background: linear-gradient(91deg, #56c0fe 51.04%, #6d0ee6 68.72%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-family: Pretendard;
  font-size: 45px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const desc = css`
  color: var(--747474, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
