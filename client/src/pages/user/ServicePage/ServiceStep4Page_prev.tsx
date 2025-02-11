/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
/* components */
import { IloadingModal } from "@components/common/ui/Modal/LoadingModal";
import LoadingModal from "@components/common/ui/Modal/LoadingModal";
import { Ibutton } from "@components/common/button/Button";
import Button from "@components/common/button/Button";
import TemplateSlide from "@components/service/templateSlide/TemplateSlide";
/* store */
import { serviceInfoStore } from "@store/serviceInfoStore";

export default function ServiceStep4Page() {
  const navigate = useNavigate();
  const location = useLocation();
  const totalStep = 5;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const { serviceInfo, setServiceInfo } = serviceInfoStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const nextButtonData: Ibutton = {
    size: "XL",
    bg: "gradient",
    text: "기획안 생성하기 👀✨",
    onClick: () => {
      setIsModalOpen(true);
    },
    disabled: false,
  };

  const loadingModal: IloadingModal = {
    isOpen: isModalOpen,
    content: {
      title:
        serviceInfo.serviceTitle === "" ? "프로젝트" : serviceInfo.serviceTitle,
      desc: [
        "기획안 파일을 생성 중이예요!",
        <br key="1" />,
        "잠시만 기다려주세요",
      ],
    },
    onLoad: () => {},
    onComplete: () => {},
  };

  useEffect(() => {
    setCurrentStep(parseInt(location.pathname.slice(-1)));
  }, [location.pathname]);

  return (
    <>
      <LoadingModal {...loadingModal} />
      <div>
        <TemplateSlide>{/* <EditableText /> */}</TemplateSlide>
      </div>
      <div css={button_wrap}>
        <div css={button_container}>
          {currentStep !== totalStep && <Button {...nextButtonData} />}
        </div>
      </div>
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
