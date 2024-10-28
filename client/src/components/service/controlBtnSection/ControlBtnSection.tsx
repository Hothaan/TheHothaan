/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { serviceStepStore, TserviceStep } from "@store/serviceStepStore";
import { Ibutton } from "@components/common/button/Button";
import { serviceDefaultDataStore } from "@store/serviceDefaultDataStore";
import Button from "@components/common/button/Button";

export default function ControlBtnSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const totalStep = 5;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { steps, setSteps } = serviceStepStore();

  function handleNavigation(path: string) {
    navigate(path);
  }

  function isDisabled(steps: TserviceStep, currentStep: number): boolean {
    switch (currentStep) {
      case 1:
        return !steps.step1;
      case 2:
        return !steps.step2;
      case 3:
        return !steps.step3;
      case 4:
        return !steps.step4;
      case 5:
        return !steps.step5;
      default:
        return false;
    }
  }

  function saveDataInStore(currentStep: number) {
    if (currentStep === 1) {
      // set
    }
  }

  const prevButtonData: Ibutton = {
    size: "XL",
    bg: "white",
    text: "이전 페이지",
    onClick: () => {
      handleNavigation(`/service/step${currentStep - 1}`);
    },
    disabled: false,
  };
  const nextButtonData: Ibutton = {
    size: "XL",
    bg: "gradient",
    text: "다음으로 넘어가기",
    onClick: () => {
      handleNavigation(`/service/step${currentStep + 1}`);
    },
    disabled: isDisabled(steps, currentStep),
  };

  useEffect(() => {
    setCurrentStep(parseInt(location.pathname.slice(-1)));
  }, [location.pathname]);

  return (
    <section css={wrap}>
      <div css={button_container}>
        {currentStep !== 1 && <Button {...prevButtonData} />}
        {currentStep !== totalStep && <Button {...nextButtonData} />}
      </div>
    </section>
  );
}

const wrap = css`
  width: 100%;
  margin: 0 auto;
  padding: 80px 0 100px;
`;

const button_container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;
