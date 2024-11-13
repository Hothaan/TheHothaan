/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import ToastPopup from "@components/common/ui/ToastPopup/ToastPopup";
import { ReactComponent as LogoLight } from "@svgs//common/logoLight.svg";
import { ReactComponent as Minimize } from "@svgs//common/buttonMinimizePage.svg";

interface IFullPageModal {
  onClick: (isModalOpen: boolean) => void;
}

export default function FullPageModal(prop: IFullPageModal) {
  const { onClick } = prop;
  const [isToast, setIsToast] = useState(true);

  const toast = {
    text: "✅ ESC를 누르거나 상단 우측 축소 버튼을 눌러 풀화면 화면 종료할 수 있어요.",
    isToast: isToast,
    setIsToast: setIsToast,
  };

  return (
    <>
      <div css={wrap}>
        <div css={title_bar}>
          <LogoLight />
          <p css={title}>프로젝트</p>
          <button
            type="button"
            onClick={() => {
              onClick(false);
            }}
          >
            <Minimize />
          </button>
        </div>
        <div css={content_container}>
          <div css={content}>
            <div css={scroll_item}></div>
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

const content_container = css`
  width: 100%;
  height: 100%;
  padding: 20px 10px;
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
  background: #ededed;
  height: 2000px;
`;
