/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { IloadingModal } from "@components/common/ui/Modal/LoadingModal";
import LoadingModal from "@components/common/ui/Modal/LoadingModal";
import { serviceDefaultDataStore } from "@store/serviceDefaultDataStore";
import ToastPopup from "@components/common/ui/ToastPopup/ToastPopup";
import { ReactComponent as LogoLight } from "@svgs//common/logoLight.svg";
import { ReactComponent as Minimize } from "@svgs//common/buttonMinimizePage.svg";
import Button, { Ibutton } from "@components/common/button/Button";
import NavigationEditable from "../navigation/NavigationEditable";
import EditableText from "../editableText/EditableText";
import { templateMap } from "@components/template/templateMapping";

/* 수정 예정 */
// interface IgeneratedText {
//   menu: string;
//   feature: string;
//   content: { [key: string]: string };
// }

/* 임시 */
export interface IgeneratedText {
  menu: string;
  feature: string;
  content: {
    menu: string;
    feature: string;
    content: { [key: string]: string };
  };
}

interface IFullPageModal {
  projectType: string;
  data: IgeneratedText[] | null;
  listData: string[];
  selectedItem: string;
  onClick: (isModalOpen: boolean) => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

export default function FullPageModalEditable(prop: IFullPageModal) {
  const {
    projectType,
    data,
    listData,
    selectedItem,
    onClick,
    setSelectedItem,
  } = prop;
  const [isToast, setIsToast] = useState(true);
  const { serviceDefaultData } = serviceDefaultDataStore();
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [templateKey, setTemplateKey] = useState<string>(
    `${projectType}-${selectedItem}`
  );
  const TemplateToRender = templateMap[templateKey];

  const toast = {
    text: "✅ ESC를 누르거나 상단 우측 축소 버튼을 눌러 풀화면 화면 종료할 수 있어요.",
    isToast: isToast,
    setIsToast: setIsToast,
  };

  useEffect(() => {
    setTemplateKey(`${projectType}-${selectedItem}`);
  }, [selectedItem]);

  const buttonSave: Ibutton = {
    size: "full",
    bg: "gradient",
    text: "저장",
    onClick: () => {
      setIsLoadingModalOpen(true);
    },
  };

  const loadingModal: IloadingModal = {
    isOpen: isLoadingModalOpen,
    content: {
      title:
        serviceDefaultData.serviceTitle === ""
          ? "프로젝트"
          : serviceDefaultData.serviceTitle,
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
    listData: listData,
    selectedItem: selectedItem,
    setSelectedItem: setSelectedItem,
  };

  return (
    <>
      <NavigationEditable {...navigationEditable} />
      <div css={wrap}>
        <div css={title_bar}>
          <LogoLight />
          <p css={title}>편집 가능한 전체화면 모달</p>
          <div css={button_wrap}>
            <button
              type="button"
              onClick={() => {
                onClick(false);
              }}
            >
              <Minimize />
            </button>
            <div css={button_container}>
              <Button {...buttonSave} />
            </div>
          </div>
        </div>
        <div css={content_container}>
          <div css={content}>
            <div css={scroll_item}>
              {TemplateToRender && <TemplateToRender data={data} />}
              {/* <EditableText /> */}
            </div>
          </div>
        </div>
      </div>
      <ToastPopup {...toast} />
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

const content_container = css`
  width: 100%;
  height: 100%;
  padding: 20px 0;
`;

const content = css`
  width: 100%;
  height: calc(100% - 40px);
  border-radius: 20px;
  overflow-y: auto;
`;

const scroll_item = css`
  width: 100%;
  border-radius: 20px;
  background: #fff;
  height: 2000px;

  /* 임시 */
  // padding: 100px;
`;
