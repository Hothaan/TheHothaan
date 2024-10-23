/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as ChevRight } from "@svgs/chevRight.svg";
import ButtonStep from "@components/service/button/ButtonStep";

const initialStepData: IbuttonStep[] = [
  {
    status: "active",
    step: 1,
    text: "프로젝트 생성",
    onClick: () => {},
  },
  {
    status: "disabled",
    step: 2,
    text: "서비스 선택",
    onClick: () => {},
  },
  {
    status: "disabled",
    step: 3,
    text: "메뉴/기능 구성",
    onClick: () => {},
  },
  {
    status: "disabled",
    step: 4,
    text: "메뉴 구성",
    onClick: () => {},
  },
  {
    status: "disabled",
    step: 5,
    text: "프로젝트명",
    onClick: () => {},
  },
];

export default function TitleNstepSection() {
  const navigate = useNavigate();
  function handleNavigation(path: string) {
    navigate(path);
  }
  const updatedStepData = initialStepData.map((step) => ({
    ...step,
    onClick: () => handleNavigation(`/service/step${step.step}`),
  }));
  const [stepData, setStepData] = useState(updatedStepData);
  const activeStep = stepData.find((step) => step.status === "active");
  const location = useLocation();

  useEffect(() => {
    const currentStep = parseInt(location.pathname.slice(-1));
    const newStepData = [...stepData];
    newStepData.forEach((step) => {
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
      <h2 css={title}>{activeStep?.text}</h2>
      <div css={step_container}>
        {stepData.map((item, idx) => {
          if (idx === stepData.length - 1) {
            return <ButtonStep {...item} key={item.step} />;
          } else {
            return (
              <>
                <ButtonStep {...item} />
                <ChevRight />
              </>
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
