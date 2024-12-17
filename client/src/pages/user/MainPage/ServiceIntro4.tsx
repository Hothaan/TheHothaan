/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import React, { ReactElement } from "react";
import MainPageSectionContainer from "./MainPageSectionContainer";
import { TitleGradient, Title } from "./Title";

interface IserviceIntro4Card {
  title: string;
  hightLight: string;
  subTitle: string;
  desc: string[];
  icon: string;
  bgColor: string;
}

function ServiceIntro4Card(prop: IserviceIntro4Card) {
  const { title, hightLight, subTitle, desc, icon, bgColor } = prop;

  const card_wrap = css`
    display: flex;
    padding: 60px 100px;
    align-items: center;
    gap: 70px;

    border-radius: 30px;
    background: var(--FFF, #fff);

    transition: 0.4s ease-in-out;

    &:hover {
      box-shadow: 0px 0px 24px 0px rgba(17, 156, 212, 0.5);

      .icon_container {
        transform: rotate(90deg);
      }
    }
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

    transition: 0.3s ease;
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

  const highLight_style = css`
    background: linear-gradient(90deg, #56c0fe -1.67%, #6d0ee6 25.54%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `;

  const parts = title.split(hightLight);

  return (
    <div css={card_wrap}>
      <div css={icon_container(bgColor)} className="icon_container">
        <img src={`/assets/images/serviceIntro4/${icon}.png`} alt={icon} />
      </div>
      <div css={text_container}>
        <p css={title_style}>
          {parts.map((item, idx) => (
            <React.Fragment key={idx}>
              {item}
              {idx < parts.length - 1 && (
                <span css={highLight_style}>{hightLight}</span>
              )}
            </React.Fragment>
          ))}
        </p>
        <p css={subTitle_style}>
          {subTitle.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
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
      hightLight: "창의적인 아이디어",
      subTitle:
        "더핫한은 인공지능 기반의 기획안 작성 플랫폼으로, 당신의 기획안에 새로운 시각과 \n 독창적인 아이디어를 더하는 데 도움을 줄 수 있습니다.",
      desc: [
        "기획안의 제목이나 슬로건을 생성",
        "핵심 메시지와 주요 내용을 간결하고 명확하게 정리",
        "독창적인 마케팅 전략과 아이디어를 제시",
        "기획안의 톤앤매너를 설정하고 일관성을 유지",
      ],
      icon: "card1",
      bgColor: "#383838",
    },
    {
      title: "ChatGPT 활용 팁",
      hightLight: "ChatGPT",
      subTitle: "더핫한을 효과적으로 활용하려면 다음과 같은 팁을 참고하세요.",
      desc: [
        "명확하고 구체적인 질문을 입력",
        "원하는 결과에 대한 예시를 제공",
        "다양한 옵션을 선택하고 최적의 결과를 제공",
      ],
      icon: "card2",
      bgColor: "#6100F3",
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
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const card_container = css`
  display: flex;
  width: 100%;
  max-width: 1200px;
  flex-direction: column;
  gap: 30px;
`;
