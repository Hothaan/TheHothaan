/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import Button, { Ibutton } from "@components/common/button/Button";
import useNavigation from "@hooks/useNavigation";

export default function MainBanner() {
  const { handleNavigation } = useNavigation();
  const buttonStartService: Ibutton = {
    size: "XL",
    bg: "white",
    text: "지금 시작하기",
    onClick: () => {
      handleNavigation("/service/step1");
    },
  };

  return (
    <div css={wrap}>
      <div css={container}>
        <div css={text_container}>
          <p css={title}>더핫한 AI 자동생성 플랫폼</p>
          <p css={desc}>
            더 이상 복잡하고 시간이 오래 걸리는
            <br />
            기획안 작성에 힘들어하지 마세요!
          </p>
          <Button {...buttonStartService} />
        </div>
        <div css={image_container}>
          <img src="/assets/images/mainBanner/ai.png" alt="ai" css={ai} />
          <img
            src="/assets/images/mainBanner/cursor.png"
            alt="cursor"
            css={cursor}
          />

          <img
            src="/assets/images/mainBanner/loading.png"
            alt="loading"
            css={loading}
          />
          <img
            src="/assets/images/mainBanner/float1.png"
            alt="float1"
            css={float1}
          />
          <img
            src="/assets/images/mainBanner/float2.png"
            alt="float2"
            css={float2}
          />
          <img
            src="/assets/images/mainBanner/float3.png"
            alt="float3"
            css={float3}
          />
        </div>
      </div>
    </div>
  );
}

const float = keyframes`
  0% {
    transform: translateY(0%);
  }
  50% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(0%);
  }`;

const rotate = keyframes`
 0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(0deg);
  }`;

const wrap = css`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 80px 360px 0;
  height: 960px;
  background: linear-gradient(180deg, #00489b 0%, #611fd2 100%);
`;

const container = css`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
`;

const text_container = css`
  width: 100%;
`;

const title = css`
  margin-bottom: 24px;

  color: var(--FFF, #fff);
  font-family: Pretendard;
  font-size: 55px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const desc = css`
  margin-bottom: 80px;

  color: var(--FFF, #fff);
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 45px */
`;

const image_container = css``;

const ai = css`
  z-index: 4;
  position: absolute;
  right: 0;
  bottom: 203px;

  width: 440px;
  height: 444px;

  animation: ${float} 4s ease-in-out infinite;
`;

const cursor = css`
  z-index: 3;
  position: absolute;
  right: 300px;
  bottom: 71px;

  width: 300px;
  height: 300px;

  animation: ${float} 2s ease-in-out infinite;
`;

const loading = css`
  z-index: 2;
  position: absolute;
  right: 480px;
  bottom: 65px;

  width: 170px;
  height: 170px;

  animation: ${rotate} 2s ease-in-out infinite;
`;

const float1 = css`
  z-index: 1;
  position: absolute;
  left: calc(100% + 57px);
  top: 132px;

  width: 144px;
  height: 131px;

  animation: ${float} 3s ease-in-out infinite;
`;

const float2 = css`
  z-index: 1;
  position: absolute;
  top: 160px;
  left: 100%;

  width: 39px;
  height: 39px;

  animation: ${float} 1.5s ease-in-out infinite;
`;
const float3 = css`
  z-index: 1;
  position: absolute;
  top: 402px;
  right: 427px;

  width: 98px;
  height: 57px;

  animation: ${float} 2s ease-in-out infinite;
`;
