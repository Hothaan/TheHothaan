/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useRef } from "react";
import { IloadingModal } from "@components/common/ui/Modal/LoadingModal";
import LoadingModal from "@components/common/ui/Modal/LoadingModal";
import ToastPopup from "@components/common/ui/ToastPopup/ToastPopup";
import { ReactComponent as LogoLight } from "@svgs/common/logoLight.svg";
import Button, { Ibutton } from "@components/common/button/Button";
import NavigationEditable from "../navigation/NavigationEditable";
import {
  TimageName,
  TimageUrl,
} from "@pages/user/ServicePage/ServiceStep4Page";
import { TserviceDefaultData } from "@store/serviceDefaultDataStore";
import { templateMapForCapture } from "@components/template/templateMapping";

interface IFullPageModal {
  imageUrlArr: TimageUrl[] | null;
  imageNameArr: TimageName[] | null;
  projectType: string;
  listData: string[];
  selectedItem: string;
  onClick: (isModalOpen: boolean) => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

export default function FullPageModalEditable(prop: IFullPageModal) {
  const {
    imageUrlArr,
    imageNameArr,
    projectType,
    listData,
    selectedItem,
    onClick,
    setSelectedItem,
  } = prop;

  const [isInitalToast, setisInitalToast] = useState(true);
  const [isSavedToast, setisSavedToast] = useState(false);

  const [serviceDefaultData, setServiceDefaultData] =
    useState<TserviceDefaultData | null>(null);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [templateKey, setTemplateKey] = useState<string>(
    `${projectType}-${selectedItem}`
  );
  const TemplateToRender = templateMapForCapture[templateKey];

  const initialToast = {
    text: "✅ ESC를 누르거나 상단 우측 축소 버튼을 눌러 풀화면 화면 종료할 수 있어요.",
    isToast: isInitalToast,
    setIsToast: setisInitalToast,
  };

  const savedToast = {
    text: "✅ 수정사항을 저장 완료했어요.",
    isToast: isSavedToast,
    setIsToast: setisSavedToast,
  };

  useEffect(() => {
    const sessionData = sessionStorage.getItem("serviceData");
    if (sessionData) {
      setServiceDefaultData(JSON.parse(sessionData));
    }
  }, []);

  useEffect(() => {
    setTemplateKey(`${projectType}-${selectedItem}`);
  }, [selectedItem]);

  const [isSaved, setIsSaved] = useState<boolean>(false);

  const buttonSave: Ibutton = {
    size: "full",
    bg: "gradient",
    text: "저장",
    onClick: () => {
      setIsLoadingModalOpen(true);
    },
  };

  function saveChangedContent() {
    const localData = localStorage.getItem("changedContent");
    if (localData) {
      /* db 저장 api 적용 */
      console.log("db 저장 api 적용");
      const timer = setTimeout(() => {
        setIsSaved(true);
        setisSavedToast(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }

  useEffect(() => {
    if (isSaved) {
      setIsLoadingModalOpen(false);
    }
  }, [isSaved]);

  useEffect(() => {
    if (isLoadingModalOpen) {
      saveChangedContent();
    } else {
      setIsSaved(false);
    }
  }, [isLoadingModalOpen]);

  const loadingModal: IloadingModal = {
    isOpen: isLoadingModalOpen,
    bubble: "열심히 수정 중!",
    content: {
      title:
        (serviceDefaultData && serviceDefaultData.serviceTitle) || "프로젝트",
      desc: [
        "기획안 파일을 수정 중이예요!",
        <br key="1" />,
        "잠시만 기다려주세요",
      ],
    },
    onLoad: () => {},
    onComplete: () => {},
  };

  const navigationEditable = {
    imageUrlArr: imageUrlArr,
    imageNameArr: imageNameArr,
    listData: listData,
    selectedItem: selectedItem,
    setSelectedItem: setSelectedItem,
  };

  const buttonClose: Ibutton = {
    size: "full",
    bg: "gray",
    text: "닫기",
    onClick: () => {
      onClick(false);
    },
  };

  return (
    <>
      <NavigationEditable {...navigationEditable} />
      <div css={wrap}>
        <div css={title_bar}>
          <LogoLight />
          <p css={title}>{serviceDefaultData?.serviceTitle || "프로젝트"}</p>
          <div css={button_wrap}>
            <div css={button_container}>
              <Button {...buttonSave} />
            </div>
            <div css={button_container}>
              <Button {...buttonClose} />
            </div>
          </div>
        </div>
        <div css={content_wrap}>
          <div css={content_container}>
            <div css={content} className="content">
              {TemplateToRender && <TemplateToRender />}
            </div>
          </div>
        </div>
      </div>
      <ToastPopup {...initialToast} />
      <ToastPopup {...savedToast} />
      {isLoadingModalOpen && <LoadingModal {...loadingModal} />}
    </>
  );
}

const wrap = css`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--383838, #383838);
`;

const title_bar = css`
  position: relative;

  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  background: var(--161616, #161616);
`;

const title = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: var(--FFF, var(--FFFFFF, #fff));
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const button_wrap = css`
  display: flex;
  gap: 20px;
`;
const button_container = css`
  width: 100px;
  display: flex;
  gap: 20px;
`;

const close_icon_container = css`
  padding: 4px;
  border-radius: 8px;
  background-color: #383838;
`;

const close_icon = css`
  width: 24px;
  height: 16px;

  * {
    fill: #fff;
  }
`;

const content_wrap = css`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (min-width: 1921px) {
    padding-left: 220px;
  }
`;

const content_container = css`
  width: 100%;
  height: calc(100vh - 70px);
  max-width: 1920px;
`;

const content = css`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #fff;
`;
