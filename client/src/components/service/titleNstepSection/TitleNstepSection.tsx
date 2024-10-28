/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as ChevRight } from "@svgs/chevRight.svg";
import { IbuttonStep } from "@components/service/button/ButtonStep";
import ButtonStep from "@components/service/button/ButtonStep";
import { serviceDefaultDataStore } from "@store/serviceDefaultDataStore";

export default function TitleNstepSection() {
  const location = useLocation();

  const initialStepData: IbuttonStep[] = [
    {
      status: "active",
      step: 1,
      text: "프로젝트 생성",
    },
    {
      status: "disabled",
      step: 2,
      text: "서비스 선택",
    },
    {
      status: "disabled",
      step: 3,
      text: "메뉴/기능 구성",
    },
    {
      status: "disabled",
      step: 4,
      text: "템플릿 수정",
      title: [`템플릿 수정`],
    },
    {
      status: "disabled",
      step: 5,
      text: "결과",
    },
  ];
  const [stepData, setStepData] = useState(initialStepData);
  const activeStep = stepData.find((step) => step.status === "active");

  useEffect(() => {
    const { serviceDefaultData } = serviceDefaultDataStore.getState();
    const currentStep = parseInt(location.pathname.slice(-1));
    const newStepData = [...stepData];
    newStepData.forEach((step) => {
      if (step.title !== undefined) {
        step.title = [
          <span css={gradient_text}>{serviceDefaultData.serviceTitle}</span>,
          ` 화면을 구성해봤어요.`,
          <br key="1" />,
          `화면을 클릭해 내용을 수정해보세요!`,
        ];
      }
      if (step.step === currentStep) {
        step.status = "active";
      } else if (step.step < currentStep) {
        step.status = "complete";
      } else {
        step.status = "disabled";
      }
    });
    setStepData(newStepData);
  }, [location.pathname]);

  return (
    <section css={wrap}>
      <h2 css={title}>{activeStep?.title || activeStep?.text}</h2>
      <div css={step_container}>
        {stepData.map((item, idx) => {
          if (idx === stepData.length - 1) {
            return <ButtonStep {...item} key={item.step} />;
          } else {
            return (
              <React.Fragment key={item.step}>
                <ButtonStep {...item} />
                <ChevRight />
              </React.Fragment>
            );
          }
        })}
      </div>
    </section>
  );
}

const wrap = css`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  gap: 50px;

  padding: 100px 0 50px 0;

  border-bottom: 1px solid #ececec;
`;

const title = css`
  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 45px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const step_container = css`
  width: 100%;
  max-width: 1200px;

  display: flex;
  align-items: center;
  gap: 5px;
`;

const gradient_text = css`
  background: linear-gradient(92deg, #56c0fe 2.67%, #6d0ee6 98.39%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
