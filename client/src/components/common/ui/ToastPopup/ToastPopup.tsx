/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { Dispatch, useEffect } from "react";

export interface ItoastPopup {
  text: string;
  isToast: boolean;
  setIsToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ToastPopup(prop: ItoastPopup) {
  const { text, isToast, setIsToast } = prop;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsToast(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isToast]);

  if (!isToast) {
    return null;
  }
  return (
    <div css={toastPopup}>
      <p>{text}</p>
    </div>
  );
}

const slide_up = keyframes`
    from {
      transform: translateX(-50%) translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  `;

const slide_down = keyframes`to {
      transform: translateX(-50%) translateY(20px);
      opacity: 0;
    }`;

const toastPopup = css`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 11;

  display: inline-flex;
  height: 50px;
  min-width: 800px;
  padding: 0px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 10px;
  background: rgba(22, 22, 22, 0.7);

  p {
    color: var(--FFFFFF, #fff);
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  animation: ${slide_up} 0.5s ease-in-out, ${slide_down} 0.5s ease-out 2.5s forwards;
  }
`;
