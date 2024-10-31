/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ItextField } from "@components/common/form/TextField";
import TextField from "@components/common/form/TextField";
import { ItextArea } from "@components/common/form/TextArea";
import TextArea from "@components/common/form/TextArea";
import { serviceStepStore, TserviceStep } from "@store/serviceStepStore";
import { serviceDefaultDataStore } from "@store/serviceDefaultDataStore";
import { Ibutton } from "@components/common/button/Button";
import Button from "@components/common/button/Button";

interface IformData {
  serviceTitle: string;
  serviceDesc: string;
}

export default function ServiceStep1Page() {
  const { steps, setSteps } = serviceStepStore();
  const { serviceDefaultData, setServiceDefaultData } =
    serviceDefaultDataStore();
  const initialFormData = {
    serviceTitle: serviceDefaultData.serviceTitle,
    serviceDesc: serviceDefaultData.serviceDesc,
  };
  const [formData, setFormData] = useState<IformData>(initialFormData);

  const navigate = useNavigate();
  const location = useLocation();
  const totalStep = 5;
  const [currentStep, setCurrentStep] = useState<number>(1);

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

  function saveDataInStore(formData: IformData) {
    const { serviceDefaultData, setServiceDefaultData } =
      serviceDefaultDataStore.getState();
    setServiceDefaultData({
      ...serviceDefaultData,
      serviceTitle: formData.serviceTitle,
      serviceDesc: formData.serviceDesc,
    });
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
      saveDataInStore(formData);
      handleNavigation(`/service/step${currentStep + 1}`);
    },
    disabled: isDisabled(steps, currentStep),
  };

  useEffect(() => {
    setCurrentStep(parseInt(location.pathname.slice(-1)));
  }, [location.pathname]);

  const serviceTitleData: ItextField = {
    size: "normal",
    label: "serviceTitle",
    id: "serviceTitle",
    placeholder: "내용입력",
    value: formData.serviceTitle,
    disabled: false,
    onChange: (e) =>
      setFormData((prev) => ({ ...prev, serviceTitle: e.target.value })),
  };

  const textAreaDefault: ItextArea = {
    label: "serviceDesc",
    id: "serviceDesc",
    placeholder: "내용입력",
    value: formData.serviceDesc,
    disabled: false,
    onChange: (e) =>
      setFormData((prev) => ({ ...prev, serviceDesc: e.target.value })),
  };

  useEffect(() => {
    if (formData.serviceTitle !== "" && formData.serviceDesc !== "") {
      setSteps({
        ...steps,
        step1: true,
      });
    } else {
      setSteps({
        ...steps,
        step1: false,
      });
    }
  }, [formData]);

  return (
    <>
      <div css={wrap}>
        <div css={input_container}>
          <div css={input_guide_container}>
            <p css={text_left}>
              <span css={gradient_text}>프로젝트 명</span>
              <span css={require_text}>을 작성해주세요.</span>
            </p>
            <p css={[text_left, guide_text]}>생성할 프로젝트명을 입력하세요.</p>
          </div>
          <TextField {...serviceTitleData} />
        </div>
        <div css={input_container}>
          <div css={input_guide_container}>
            <p css={text_left}>
              <span css={require_text}>홈페이지를</span>
              <span css={gradient_text}>설명</span>
              <span css={require_text}>해주세요.</span>
            </p>
          </div>
          <TextArea {...textAreaDefault} />
        </div>
      </div>
      <section css={button_wrap}>
        <div css={button_container}>
          {currentStep !== 1 && <Button {...prevButtonData} />}
          {currentStep !== totalStep && <Button {...nextButtonData} />}
        </div>
      </section>
    </>
  );
}

const button_wrap = css`
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

const wrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  align-self: stretch;
`;

const input_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const input_guide_container = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  align-self: stretch;
`;

const text_left = css`
  width: 100%;
  display: flex;
  justify-content: start;
`;

const guide_text = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const require_text = css`
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: var(--383838, #383838);
`;

const gradient_text = css`
  display: inline-block;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  background: linear-gradient(92deg, #56c0fe 2.67%, #6d0ee6 98.39%);
  background-clip: text;
`;
