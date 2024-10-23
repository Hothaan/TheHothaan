/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "@components/common/button/Button";

export default function ControlBtnSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const totalStep = 5;
  const [currentStep, setCurrentStep] = useState<number>(1);

  function handleNavigation(path: string) {
    navigate(path);
  }

  //추후 메인 영역 폼을 다 채웠는지 여부를 받아 disabled true false 및 색상 변경 처리

  const prevButtonData: Ibutton = {
    size: "XL",
    bg: "gray",
    text: "이전 페이지",
    onClick: () => {
      handleNavigation(`/service/step${currentStep - 1}`);
    },
    disabled: true,
  };
  const nextButtonData: Ibutton = {
    size: "XL",
    bg: "gray",
    text: "다음으로 넘어가기",
    onClick: () => {
      handleNavigation(`/service/step${currentStep + 1}`);
    },
    disabled: true,
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
