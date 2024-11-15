/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import MainPageSectionContainer from "./MainPageSectionContainer";
import { Title } from "./Title";

interface IserviceIntro7Card {
  image: string;
}

function ServiceIntro7Card(prop: IserviceIntro7Card) {
  const { image } = prop;

  const card_wrap = css`
    border-radius: 20px;
    border: 1px solid var(--DEDEDE, #dedede);
    position: relative;
  `;
  const image_style = css`
    border-radius: 20px;
    overflow: hidden;
  `;

  return (
    <div css={card_wrap}>
      <img
        css={image_style}
        src={`/assets/images/serviceIntro7/${image}.png`}
        alt={image}
      />
    </div>
  );
}

export default function ServiceIntro7() {
  const cardDatas: IserviceIntro7Card[] = [
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
    { image: "card1" },
  ];
  return (
    <MainPageSectionContainer>
      <div css={title_container}>
        <Title
          title="사전 구축된 1,500개 이상의 템플릿"
          highLight="템플릿"
          color="black"
        />
      </div>
      <div css={card_slide_wrap}></div>
      <div css={card_container}>
        {cardDatas.map((item, idx) => (
          <ServiceIntro7Card {...item} key={idx} />
        ))}
      </div>
    </MainPageSectionContainer>
  );
}

const title_container = css`
  margin-bottom: 50px;
`;

const card_slide_wrap = css``;

const card_container = css`
  display: flex;
  width: 100vw;
  align-items: flex-start;
  gap: 30px;
`;
