/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ItextField } from "@components/common/form/TextField";
import TextField from "@components/common/form/TextField";
import { ItextArea } from "@components/common/form/TextArea";
import TextArea from "@components/common/form/TextArea";
import { serviceStepStore, TserviceStep } from "@store/serviceStepStore";
import {
  serviceDefaultDataStore,
  TserviceDefaultData,
} from "@store/serviceDefaultDataStore";
import { Ibutton } from "@components/common/button/Button";
import Button from "@components/common/button/Button";

export interface IserviceInfo {
  serviceTitle: string;
  serviceDesc: string;
}

interface IformData {
  serviceTitle: string;
  serviceDesc: string;
}

export default function ServiceStep1Page() {
  const [serviceInfo, setserviceInfo] = useState<TserviceDefaultData | null>(
    null
  );
  const { steps, setSteps } = serviceStepStore();
  const [formData, setFormData] = useState<IformData>({
    serviceTitle: "",
    serviceDesc: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const totalStep = 5;
  const [currentStep, setCurrentStep] = useState<number>(1);

  useEffect(() => {
    if (sessionStorage.getItem("serviceInfo") !== null) {
      let sessionData = JSON.parse(
        sessionStorage.getItem("serviceInfo") as string
      );
      setFormData({
        serviceTitle: sessionData.serviceTitle,
        serviceDesc: sessionData.serviceDesc,
      });
      setserviceInfo(sessionData);
    }
  }, []);

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
    sessionStorage.setItem(
      "serviceInfo",
      JSON.stringify({
        ...serviceInfo,
        serviceTitle: formData.serviceTitle,
        serviceDesc: formData.serviceDesc,
      })
    );
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
    placeholder: "ex) 스킨케어 코스메틱 브랜드 쇼핑몰 홈페이지를 제작건",
    value: formData.serviceTitle,
    disabled: false,
    onChange: (e) =>
      setFormData((prev) => ({ ...prev, serviceTitle: e.target.value })),
  };

  const textAreaDefault: ItextArea = {
    label: "serviceDesc",
    id: "serviceDesc",
    placeholder:
      "ex) 스킨케어 코스메틱 브랜드 쇼핑몰 홈페이지이며 메인 페이지와 브랜드 소개 페이지가 들어가 있어야 하며, 상품 카테고리가 나올 수 있는 상품 리스트 페이지와 상품 뷰 페이지가 필요합니다. 게시판은 공지사항과 후기가 필요하며, 결제 기능이 추가되어야 합니다.",
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
              <span css={require_text}>홈페이지를&nbsp;</span>
              <span css={gradient_text}>설명&nbsp;</span>
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
