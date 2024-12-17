/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import MainPageSectionContainer from "./MainPageSectionContainer";
import { Title } from "./Title";
import Button, { Ibutton } from "@components/common/button/Button";
import { ReactComponent as EditProject } from "@svgs/serviceIntro8/editProject.svg";
import { ReactComponent as ProjectBoard } from "@svgs/serviceIntro8/projectBoard.svg";
import { ReactComponent as Plugin } from "@svgs/serviceIntro8/plugin.svg";
import { ReactComponent as Template } from "@svgs/serviceIntro8/template.svg";
import { useState } from "react";

type Tplan = "FREE" | "Basic" | "Pro";
type Tperiod = "month" | "year" | "none";

interface IserviceIntro8Card {
  isUsing: boolean;
  plan: Tplan;
  period: Tperiod;
  priceMonth: number;
  priceYear: number;
  desc: string;
  editProject: string;
  projectBoard: string;
  plugin: string;
  template: string;
}

export function ServiceIntro8Card(prop: IserviceIntro8Card) {
  const {
    isUsing,
    plan,
    period,
    priceMonth,
    priceYear,
    desc,
    editProject,
    projectBoard,
    plugin,
    template,
  } = prop;

  const [periodState, setPeriodState] = useState(period);

  const card_wrap = css`
    position: relative;

    border-radius: 16px;
    border: 3px solid transparent;

    &:before {
      content: "";
      position: absolute;
      inset: -3px;
      border-radius: 16px;
      padding: 3px;
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
      pointer-events: none;
      background: #dedede;
    }

    &:hover {
      &:before {
        background: linear-gradient(to right, #3b82f6, #a855f7);
      }
    }
  `;

  const card_top = css`
    border-radius: 16px 16px 0 0;
    position: relative;
    display: flex;
    padding: 50px;
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
    background: var(--FFF, #fff);
  `;

  const card_bottom = css`
    border-radius: 0 0 16px 16px;
    display: flex;
    padding: 50px;
    flex-direction: column;
    gap: 20px;
    align-self: stretch;
    background: #f6f6f6;
  `;

  const plan_style = css`
    color: var(--383838, #383838);
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
  `;

  const price_container = css`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  `;

  const price_style = css`
    color: var(--747474, #747474);
    font-family: Pretendard;
    font-size: 30px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `;

  const price_period = css`
    color: var(--A9AAB8, #a9aab8);
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `;

  const desc_style = css`
    color: var(--747474, #747474);
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 25.5px */
  `;

  const info_item = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
  `;

  const info_title_container = css`
    display: flex;
    align-items: center;
    gap: 10px;
  `;

  const info_title = css`
    color: var(--747474, #747474);
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 25.5px */
  `;

  const number = css`
    color: var(--383838, #383838);
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%; /* 25.5px */
  `;

  const peroid_button_container = css`
    display: flex;

    border-radius: 8px;
    border: 1px solid var(--DEDEDE, #dedede);
    overflow: hidden;
  `;
  const period_button = (isSelected: boolean) => css`
    display: flex;
    width: 60px;
    height: 40px;
    padding: 0px 14px;
    justify-content: center;
    align-items: center;
    gap: 10px;

    background: ${isSelected ? "#383838" : "#F6F8FF"};

    color: ${isSelected ? "#fff" : "383838"};
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `;

  const button: Ibutton = {
    size: "full",
    bg: "white",
    text: isUsing === true ? "이용중" : "이용하기",
    onClick: () => {
      setPeriodState((prev) => {
        if (prev === "month") {
          return "year";
        } else {
          return "month";
        }
      });
    },
  };

  const button_plan_container = css`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  return (
    <div css={card_wrap}>
      <div css={card_top}>
        <div css={button_plan_container}>
          <p css={plan_style}>{plan}</p>
          {periodState !== "none" && (
            <div css={peroid_button_container}>
              <button
                type="button"
                css={period_button(periodState === "month")}
                onClick={() => {
                  setPeriodState("month");
                }}
              >
                월간
              </button>
              <button
                type="button"
                css={period_button(periodState === "year")}
                onClick={() => {
                  setPeriodState("year");
                }}
              >
                연간
              </button>
            </div>
          )}
        </div>
        <div css={price_container}>
          {periodState === "month" ? (
            <>
              <p css={price_style}>
                {priceMonth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
              </p>
              <p css={price_period}>/ {period}</p>
            </>
          ) : periodState === "year" ? (
            <>
              <p css={price_style}>
                {priceYear.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
              </p>
              <p css={price_period}>/ {periodState}</p>
            </>
          ) : (
            <>
              <p css={price_style}>
                {priceMonth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
              </p>
            </>
          )}
        </div>
        <p css={desc_style}>{desc}</p>
        <Button {...button} />
      </div>
      <div css={card_bottom}>
        <div css={info_item}>
          <div css={info_title_container}>
            <EditProject />
            <p css={info_title}>편집 프로젝트</p>
          </div>
          <p css={number}>{editProject}</p>
        </div>
        <div css={info_item}>
          <div css={info_title_container}>
            <ProjectBoard />
            <p css={info_title}>프로젝트 당 보드</p>
          </div>
          <p css={number}>{projectBoard}</p>
        </div>
        <div css={info_item}>
          <div css={info_title_container}>
            <Plugin />
            <p css={info_title}>더핫한 플러그인 </p>
          </div>
          <p css={number}>{plugin}</p>
        </div>
        <div css={info_item}>
          <div css={info_title_container}>
            <Template />
            <p css={info_title}>{plan === "FREE" ? "템플릿" : "피그마 변환"}</p>
          </div>
          <p css={number}>{template}</p>
        </div>
      </div>
    </div>
  );
}

export const cardDatas: IserviceIntro8Card[] = [
  {
    isUsing: true,
    plan: "FREE",
    period: "none",
    priceMonth: 0,
    priceYear: 0,
    desc: "기본 자동 생성 기능, 기본 템플릿 이용, 데이터 분석 기능",
    editProject: "1개",
    projectBoard: "2개",
    plugin: "제한",
    template: "20개 제한",
  },
  {
    isUsing: false,
    plan: "Basic",
    period: "month",
    priceMonth: 10000,
    priceYear: 120000,
    desc: "ChatGPT 연동, 고급 템플릿 이용, 맞춤형 분석 기능",
    editProject: "10개",
    projectBoard: "20개",
    plugin: "가능",
    template: "가능",
  },
  {
    isUsing: false,
    plan: "Pro",
    period: "month",
    priceMonth: 20000,
    priceYear: 240000,
    desc: "ChatGPT 연동, 고급 템플릿 무제한 이용, 맞춤형 분석 기능",
    editProject: "무제한",
    projectBoard: "무제한",
    plugin: "가능",
    template: "가능",
  },
];

export default function ServiceIntro8() {
  const userPlan: Tplan = "FREE";

  return (
    <MainPageSectionContainer>
      <div css={title_container}>
        <Title title="가격 정책" color="black" />
      </div>
      <div css={card_container}>
        {cardDatas.map((item, idx) => (
          <ServiceIntro8Card {...item} key={idx} />
        ))}
      </div>
    </MainPageSectionContainer>
  );
}

const title_container = css`
  margin-bottom: 50px;
`;

const card_container = css`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 40px;
`;
