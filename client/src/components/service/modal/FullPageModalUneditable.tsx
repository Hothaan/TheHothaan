/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { IloadingModal } from "@components/common/ui/Modal/LoadingModal";
import LoadingModal from "@components/common/ui/Modal/LoadingModal";
import { serviceDefaultDataStore } from "@store/serviceDefaultDataStore";
import ToastPopup from "@components/common/ui/ToastPopup/ToastPopup";
import { ReactComponent as LogoLight } from "@svgs//common/logoLight.svg";
import { ReactComponent as Minimize } from "@svgs//common/buttonMinimizePage.svg";
import Button, { Ibutton } from "@components/common/button/Button";
import NavigationUnEditable, {
  INavigationUnEditable,
} from "../navigation/NavigationUnEditable";
/* store */
import { TserviceDefaultData } from "@store/serviceDefaultDataStore";

interface IFullPageModal {
  imageUrlArr: string[] | null;
  imageNameArr: string[] | null;
  projectType: string;
  listData: string[];
  onClick: (isModalOpen: boolean) => void;
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
  selectedIdx: number;
  setSelectedIdx: React.Dispatch<React.SetStateAction<number>>;
}

export default function FullPageModalUneditable(prop: IFullPageModal) {
  const {
    imageUrlArr,
    imageNameArr,
    projectType,
    listData,
    onClick,
    selectedItem,
    setSelectedItem,
    selectedIdx,
    setSelectedIdx,
  } = prop;
  const [isToast, setIsToast] = useState(true);
  const [isNaviOpen, setIsNaviOpen] = useState<boolean>(false);
  const [serviceDefaultData, setServiceDefaultData] =
    useState<TserviceDefaultData | null>(null);

  useEffect(() => {
    const sessionData = sessionStorage.getItem("serviceData");
    if (sessionData) {
      setServiceDefaultData(JSON.parse(sessionData));
    }
  }, []);

  const toast = {
    text: "✅ ESC를 누르거나 상단 우측 축소 버튼을 눌러 풀화면 화면 종료할 수 있어요.",
    isToast: isToast,
    setIsToast: setIsToast,
  };

  if (!imageUrlArr) {
    return <></>;
  }

  return (
    <>
      <NavigationUnEditable
        imageUrlArr={imageUrlArr}
        imageNameArr={imageNameArr}
        listData={listData}
        isOpen={isNaviOpen}
        setIsOpen={setIsNaviOpen}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        selectedIdx={selectedIdx}
        setSelectedIdx={setSelectedIdx}
      />
      <div css={wrap}>
        <div css={title_bar}>
          <LogoLight />
          <p css={title}>{serviceDefaultData?.serviceTitle || "프로젝트"}</p>
          <div css={button_wrap}>
            <button
              type="button"
              onClick={() => {
                onClick(false);
              }}
            >
              <Minimize />
            </button>
          </div>
        </div>
        <div css={content_container}>
          <div css={content(isNaviOpen)}>
            <div css={scroll_item}>
              <img src={imageUrlArr[selectedIdx]} alt="img" />
            </div>
          </div>
        </div>
      </div>
      <ToastPopup {...toast} />
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
  display: flex;
  justify-content: center;

  height: 100%;
  padding: 20px 0;
`;

const content = (isOpen: boolean) => css`
  width: calc(100% - 40px);
  padding-left: ${isOpen ? "220px" : "0"};
  height: calc(100% - 40px);
  overflow-y: auto;
`;

const scroll_item = css`
  width: 100%;
  overflow: hidden;
  background: #ededed;

  img {
    width: 100%;
    object-fit: cover;
  }
`;
