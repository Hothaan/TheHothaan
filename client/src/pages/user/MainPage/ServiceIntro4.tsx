/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { ReactElement } from "react";
import MainPageSectionContainer from "./MainPageSectionContainer";
import { TitleGradient, Title } from "./Title";

interface IserviceIntro4Card {
  title: string;
  subTitle: string;
  desc: string[];
  icon: string;
  bgColor: string;
}

function ServiceIntro4Card(prop: IserviceIntro4Card) {
  const { title, subTitle, desc, icon, bgColor } = prop;

  const card_wrap = css`
    display: flex;
    padding: 60px 100px;
    align-items: center;
    gap: 70px;

    border-radius: 30px;
    background: var(--FFF, #fff);
  `;

  const icon_container = (bgColor: string) => css`
    display: flex;
    width: 250px;
    height: 250px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    border-radius: 50%;
    background-color: ${bgColor};
  `;

  const text_container = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    flex: 1 0 0;
  `;

  const title_style = css`
    color: var(--383838, #383838);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 36px */
  `;

  const subTitle_style = css`
    color: var(--383838, #383838);
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 25.5px */
  `;

  const desc_style = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    align-self: stretch;
  `;

  const desc_item_style = css`
    position: relative;
    padding-left: 20px;
    color: var(--747474, #747474);
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 25.5px */

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 5px;
      width: 3px;
      height: 3px;
      background-color: var(--747474, #747474);
      border-radius: 50%;
    }
  `;

  return (
    <div css={card_wrap}>
      <div css={icon_container(bgColor)}>
        <img src={`/assets/images/serviceIntro4/${icon}.png`} alt={icon} />
      </div>
      <div css={text_container}>
        <p css={title_style}>{title}</p>
        <p css={subTitle_style}>{subTitle}</p>
        <ul css={desc_style}>
          {desc.map((item, idx) => (
            <li css={desc_item_style} key={idx}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ServiceIntro4() {
  const cardDatas: IserviceIntro4Card[] = [
    {
      title: "더핫한을 활용하여 기획안에 창의적인 아이디어를 더하세요.",
      subTitle:
        "더핫한은 인공지능 기반의 기획안 작성 플랫폼으로, 당신의 기획안에 새로운 시각과 독창적인 아이디어를 더하는 데 도움을 줄 수 있습니다.",
      desc: [
        "기획안의 제목이나 슬로건을 생성",
        "핵심 메시지와 주요 내용을 간결하고 명확하게 정리",
        "독창적인 마케팅 전략과 아이디어를 제시",
        "기획안의 톤앤매너를 설정하고 일관성을 유지",
      ],
      icon: "card1",
      bgColor: "#383838",
    },
  ];
  return (
    <MainPageSectionContainer bgColor="#F6F8FF">
      <div css={title_container}>
        <TitleGradient title="The Hothaan 활용방법" />
        <Title
          title="더핫한 플랫폼을 더 잘 이용할 수 있는 방법👀📢"
          color="black"
        />
      </div>
      <div css={card_container}>
        {cardDatas.map((item, idx) => (
          <ServiceIntro4Card {...item} key={idx} />
        ))}
      </div>
    </MainPageSectionContainer>
  );
}

const title_container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const card_container = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 30px;
`;
