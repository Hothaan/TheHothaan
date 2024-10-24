/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ButtonChooseDevice from "@components/service/button/ButtonChooseDevice";
import ButtonChooseService from "@components/service/button/ButtonChooseService";
import { serviceStepStore, TserviceStep } from "@store/serviceStepStore";
import { serviceDefaultDataStore } from "@store/serviceDefaultDataStore";
import Button from "@components/common/button/Button";

interface IformData {
  device: Tdevice | "";
  service: Tservice | "";
}

export default function ServiceStep2Page() {
  const { steps, setSteps } = serviceStepStore();
  const { data, setData } = serviceDefaultDataStore();
  const initialFormData = {
    device: data.device,
    service: data.service,
  };
  const totalStep = 5;
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [formData, setFormData] = useState<IformData>(initialFormData);
  const navigate = useNavigate();
  const location = useLocation();

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
    if (formData.device !== "" && formData.service !== "") {
      const { data, setData } = serviceDefaultDataStore.getState();
      setData({
        ...data,
        device: formData.device,
        service: formData.service,
      });
      console.log(
        "Updated store data:",
        serviceDefaultDataStore.getState().data
      );
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
      saveDataInStore(formData);
      handleNavigation(`/service/step${currentStep + 1}`);
    },
    disabled: isDisabled(steps, currentStep),
  };

  useEffect(() => {
    setCurrentStep(parseInt(location.pathname.slice(-1)));
  }, [location.pathname]);

  const pc: IbuttonChooseDevice = {
    isSelected: formData.device === "pc",
    device: "pc",
    onClick: () => {
      setFormData((prev) => ({ ...prev, device: "pc" }));
    },
  };
  const tablet: IbuttonChooseDevice = {
    isSelected: formData.device === "tablet",
    device: "tablet",
    onClick: () => {
      setFormData((prev) => ({ ...prev, device: "tablet" }));
    },
  };
  const mobile: IbuttonChooseDevice = {
    isSelected: formData.device === "mobile",
    device: "mobile",
    onClick: () => {
      setFormData((prev) => ({ ...prev, device: "mobile" }));
    },
  };

  const shoppingMall: IbuttonChooseService = {
    isSelected: formData.service === "shoppingMall",
    service: "shoppingMall",
    onClick: () => {
      setFormData((prev) => ({ ...prev, service: "shoppingMall" }));
    },
  };
  const communitySns: IbuttonChooseService = {
    isSelected: formData.service === "communitySns",
    service: "communitySns",
    onClick: () => {
      setFormData((prev) => ({ ...prev, service: "communitySns" }));
    },
  };
  const intermediaryMatch: IbuttonChooseService = {
    isSelected: formData.service === "intermediaryMatch",
    service: "intermediaryMatch",
    onClick: () => {
      setFormData((prev) => ({ ...prev, service: "intermediaryMatch" }));
    },
  };
  const homepageBoard: IbuttonChooseService = {
    isSelected: formData.service === "homepageBoard",
    service: "homepageBoard",
    onClick: () => {
      setFormData((prev) => ({ ...prev, service: "homepageBoard" }));
    },
  };
  const landingIntroduce: IbuttonChooseService = {
    isSelected: formData.service === "landingIntroduce",
    service: "landingIntroduce",
    onClick: () => {
      setFormData((prev) => ({ ...prev, service: "landingIntroduce" }));
    },
  };

  useEffect(() => {
    if (formData.device && formData.service) {
      setSteps({
        ...steps,
        step2: true,
      });
    } else {
      setSteps({
        ...steps,
        step2: false,
      });
    }
  }, [formData]);

  return (
    <>
      <div css={wrap}>
        <div css={input_container}>
          <div css={input_guide_container}>
            <p css={text_center}>
              <span css={require_text}>제작할&nbsp;</span>
              <span css={gradient_text}>디바이스 환경</span>
              <span css={require_text}>을 선택해주세요.</span>
            </p>
          </div>
          <div css={select_container}>
            <ButtonChooseDevice {...pc} />
            <ButtonChooseDevice {...tablet} />
            <ButtonChooseDevice {...mobile} />
          </div>
        </div>
        <div css={input_container}>
          <div css={input_guide_container}>
            <p css={text_center}>
              <span css={require_text}>제작하고자 하는&nbsp;</span>
              <span css={gradient_text}>서비스를 선택&nbsp;</span>
              <span css={require_text}>해주세요.</span>
            </p>
          </div>
          <div css={select_container}>
            <ButtonChooseService {...shoppingMall} />
            <ButtonChooseService {...communitySns} />
            <ButtonChooseService {...intermediaryMatch} />
            <ButtonChooseService {...homepageBoard} />
            <ButtonChooseService {...landingIntroduce} />
          </div>
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

const text_center = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const select_container = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  gap: 14px;
  align-self: stretch;
  flex-wrap: wrap;
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
