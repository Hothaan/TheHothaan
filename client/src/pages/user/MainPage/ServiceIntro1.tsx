/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import MainPageSectionContainer from "./MainPageSectionContainer";
import Bubble from "@components/common/text/Bubble";

export default function ServiceIntro1() {
  return (
    <MainPageSectionContainer>
      <p css={text}>
        더핫한 자동 기획안 플랫폼은&nbsp;
        <span css={text_gradient}>ChatGPT기술</span>
        을 활용하여
        <br /> 여러분의 아이디어를 빠르고 효율적으로 현실로 만들어 드립니다.
      </p>
      <div css={image_container}>
        <div css={image_inner_container}>
          <img
            src="/assets/images/serviceIntro1/serviceIntro1.png"
            alt="serviceIntro1"
            css={serviceIntro1}
          />
          <div css={bubble_container}>
            <Bubble text="기획안 파일이 생성되었어요 👀🎉" />
          </div>
        </div>
      </div>
    </MainPageSectionContainer>
  );
}

const text = css`
  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 54px */
`;

const text_gradient = css`
  background: linear-gradient(91deg, #56c0fe 51.04%, #6d0ee6 68.72%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: Pretendard;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
`;

const image_container = css`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  padding-top: 80px;

  width: 100%;
  height: 600px;
  overflow: hidden;

  border-radius: 20px;
  background: var(--F6F8FF, #f6f8ff);
`;

const image_inner_container = css`
  position: relative;
  width: 800px;
`;

const serviceIntro1 = css`
  width: 100%;
  position: absolute;
  border-radius: 40px;
  border: 15px solid #000;
  box-shadow: 0px 4px 34px 0px rgba(0, 0, 0, 0.05);
  background-color: #fff;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
   transform: rotate(5deg);
  }
  75% {
   transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }`;

const bubble_container = css`
  position: absolute;
  top: -16px;
  right: -60px;

  animation: ${rotate} 4s ease-in-out infinite;
`;

const bubble = css`
  border-radius: 33.5px;
  background-color: #119cd4;
  padding: 20px 19px;
`;

const speech = css`
  color: var(--FFF, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const triangle = css`
  position: absolute;
  top: calc(100% - 4px);
  right: 50%;
`;
