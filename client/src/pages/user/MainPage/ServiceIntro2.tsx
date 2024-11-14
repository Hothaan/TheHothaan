/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import MainPageSectionContainer from "./MainPageSectionContainer";
import { TitleGradient, Title } from "./Title";

interface IserviceIntro2Card {
  titleGradient: string;
  title: string;
  desc: string;
  icon: string;
}

function ServiceIntro2Card(prop: IserviceIntro2Card) {
  const { titleGradient, title, desc, icon } = prop;
  const card_wrap = css`
    display: flex;
    padding: 60px;
    align-items: center;
    gap: 20px;

    transition: 0.3s ease;

    position: relative;
    border-radius: 30px;
    border: 3px solid transparent;
    background: var(--161616, #161616);

    &:before {
      content: "";
      position: absolute;
      inset: -3px;
      border-radius: 30px;
      padding: 3px;
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      pointer-events: none;
    }

    &:hover {
      transform: translateY(-2.5%);
      &:before {
        background: linear-gradient(to right, #3b82f6, #a855f7);
      }
    }
  `;
  const card_text_container = css`
    width: calc(100% - 180px - 20px);
  `;
  const card_icon_container = css`
    display: flex;
    width: 180px;
    height: 180px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  `;
  const card_title_gradinet = css`
    margin-bottom: 10px;

    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 25.5px */
    background: var(
      --Linear,
      linear-gradient(90deg, #56c0fe -1.67%, #6d0ee6 98.33%)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `;
  const card_title = css`
    margin-bottom: 30px;

    color: var(--FFF, #fff);
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; /* 45px */
  `;
  const card_desc = css`
    color: var(--FFF, #fff);
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 25.5px */
  `;

  return (
    <div css={card_wrap}>
      <div css={card_text_container}>
        <p css={card_title_gradinet}>{titleGradient}</p>
        <p css={card_title}>{title}</p>
        <p css={card_desc}>
          {desc.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
      <div css={card_icon_container}>
        <img src={`/assets/images/serviceIntro2/${icon}.png`} alt={`${icon}`} />
      </div>
    </div>
  );
}

export default function ServiceIntro2() {
  const cardDatas: IserviceIntro2Card[] = [
    {
      titleGradient: "Professionalism",
      title: "전문성 강화",
      desc: "경험이 풍부한 기획 전문가들의 노하우를 바탕으로 만들어진 템플릿과 \n 가이드라인을 활용하여 전문적인 기획안을 쉽게 작성할 수 있습니다. \n 전문성을 갖춘 기획안으로 성공적인 결과를 얻으세요.",
      icon: "card1",
    },
    {
      titleGradient: "Customized",
      title: "맞춤형 기획으로 차별화된 기획서",
      desc: "다양한 주제와 목적에 맞는 다채로운 템플릿과 \n 옵션을 제공하여 고객의 니즈에 꼭 맞는 기획안을 \n 만들 수 있습니다. 개인의 요구사항을 반영하여 \n 자신만의 독특하고 인상적인 기획서를 만들어보세요.",
      icon: "card2",
    },
    {
      titleGradient: "Time",
      title: "시간 절약",
      desc: "수동으로 기획안을 작성하는 데 드는 시간을 획기적으로 줄여줍니다. \n 빠르고 효율적인 자동 생성 기능을 통해 귀중한 시간을 절약하고 \n 더 중요한 일에 집중할 수 있습니다.",
      icon: "card3",
    },
    {
      titleGradient: "Analysis",
      title: "데이터 기반 분석",
      desc: "데이터 분석 기능을 통해 기획안의 효율성을 \n 객관적으로 평가하고 개선할 수 있습니다. \n 데이터를 기반으로 더 나은 의사 결정을 내리고 성공적인 결과물을 도출하세요.",
      icon: "card4",
    },
  ];

  return (
    <MainPageSectionContainer bgColor="#242424">
      <div css={title_container}>
        <TitleGradient title="The Hothaan의 장점" />
        <Title title="기획안을 간편하고 쉽게 만들 수 있어요" color="white" />
      </div>
      <div css={card_container}>
        {cardDatas.map((item, idx) => (
          <ServiceIntro2Card {...item} key={idx} />
        ))}
      </div>
    </MainPageSectionContainer>
  );
}

const title_container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  margin-bottom: 50px;
`;

const card_container = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
