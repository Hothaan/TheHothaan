/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import MainPageSectionContainer from "./MainPageSectionContainer";
import { TitleGradient, Title } from "./Title";
import Lottie from "react-lottie-player";
import step1 from "@svgs/serviceIntro3/step1.json";
import step2 from "@svgs/serviceIntro3/step2.json";
import step3 from "@svgs/serviceIntro3/step3.json";
import step4 from "@svgs/serviceIntro3/step4.json";

interface IserviceIntro3Card {
  step: number;
  title: string;
  desc: string;
  lottie: Record<string, any> | string;
}

function ServiceIntro3Card(prop: IserviceIntro3Card) {
  const { step, title, desc, lottie } = prop;

  const card_wrap = css`
    display: flex;
    flex-direction: column;
    gap: 30px;
  `;

  const lottie_container = css`
    border-radius: 30px;
    overflow: hidden;
  `;

  const text_container = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  `;

  const step_style = css`
    color: var(--A9AAB8, #a9aab8);
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 25.5px */
  `;

  const title_style = css`
    color: var(--383838, #383838);
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 45px */
  `;

  const desc_style = css`
    color: var(--747474, #747474);
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 25.5px */
  `;

  return (
    <div css={card_wrap}>
      <div css={lottie_container}>
        {typeof lottie === "object" ? (
          <Lottie
            loop
            play
            animationData={lottie}
            style={{ width: 575, height: 400 }}
          />
        ) : (
          <video src={lottie} controls width="575" height="400" />
        )}
      </div>
      <div css={text_container}>
        <p css={step_style}>{step}단계</p>
        <p css={title_style}>{title}</p>
        <p css={desc_style}>
          {desc.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
}

export default function ServiceIntro3() {
  const cardDatas: IserviceIntro3Card[] = [
    {
      step: 1,
      title: "아이디어 입력",
      desc: "당신의 아이디어를 간단하게 입력하세요. \n 핵심 서비스, 목표, 설명 등을 명확하게 입력 하면 \n 플랫폼이 당신의 의도를 정확하게 이해합니다.",
      lottie: step1,
    },
    {
      step: 2,
      title: "기획안 생성",
      desc: "플랫폼은 인공지능 기술을 활용하여 입력된 정보를 분석하고 \n 최적의 기획안을 자동으로 생성합니다. \n 다양한 템플릿과 옵션을 선택하여 당신의 요구에 맞는 기획안을 만들 수 있습니다.",
      lottie: step2,
    },
    {
      step: 3,
      title: "수정 및 보완",
      desc: "생성된 기획안을 검토하고 필요에 따라 수정 및 보완할 수 있습니다. \n 플랫폼은 사용자 친화적인 인터페이스를 제공하여 \n 쉽고 편리하게 기획안을 수정할 수 있도록 지원합니다.",
      lottie: step3,
    },
    {
      step: 4,
      title: "완성 및 공유",
      desc: "완성된 기획안을 다양한 형식으로 저장하고 공유할 수 있습니다. \n PDF, PPT, JPG 등 다양한 형식으로 변환하여 필요에 맞게 활용하세요.",
      lottie: step4,
    },
  ];

  return (
    <div css={wrap}>
      <div css={container}>
        <MainPageSectionContainer>
          <div css={title_container}>
            <TitleGradient title="The hothaan 프로세스" />
            <Title title="기획안 작성을 위한 더핫한 프로세스" color="black" />
          </div>
          <div css={card_container}>
            {cardDatas.map((item, idx) => (
              <ServiceIntro3Card {...item} key={idx} />
            ))}
          </div>
        </MainPageSectionContainer>
      </div>
    </div>
  );
}

const wrap = css`
  display: flex;
  justify-content: center;

  width: 100%;
  padding: 30px 0;
  margin: 0 auto;
`;

const container = css`
  width: 100%;
  @media (min-width: 1921px) {
    max-width: calc(1200px + 720px);
  }
`;

const title_container = css`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 10px;

  margin-bottom: 80px;
`;

const card_container = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  // flex-wrap: wrap;
`;
