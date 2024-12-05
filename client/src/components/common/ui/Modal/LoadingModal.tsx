/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import Loading from "@components/common/ui/Loading/loading";
import Bubble from "@components/common/text/Bubble";

type TloadingModalType = "clock" | "default";

export interface IloadingModal {
  isOpen: boolean;
  content: { title: string; desc: React.ReactNode };
  bubble?: string;
  type?: TloadingModalType;
  onLoad?: () => void;
  onComplete?: () => void;
}

const bubble_ = "화면을 구성하고 있어요!";

export default function LoadingModal(prop: IloadingModal) {
  const { isOpen, content, bubble, type, onLoad, onComplete } = prop;

  if (!isOpen) return null;

  return (
    <div css={modal_bg} className="loading_modal_bg">
      <div
        css={modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {type === "clock" && (
          <img
            src="/assets/images/loadingModal/clock.png"
            alt="clock"
            css={clock}
          />
        )}
        <img src="/assets/images/loadingModal/ai.png" alt="ai" css={ai(type)} />
        <img
          src="/assets/images/loadingModal/circle.png"
          alt="circle"
          css={circle(type)}
        />
        <div css={speech_bubble_container(type)}>
          <Bubble text={bubble || bubble_} />
        </div>
        <Loading />
        <div css={content_area}>
          <p css={title}>{content.title}</p>
          <p css={desc}>{content.desc}</p>
        </div>
      </div>
    </div>
  );
}

const speech_bubble_container = (type: TloadingModalType | undefined) => css`
  position: absolute;
  top: ${type === "clock" ? "calc(50% - 48px)" : "-220px"};
  left: ${type === "clock" ? "calc(100% + 36px)" : "0"};
`;

const float1 = (type: TloadingModalType | undefined) => keyframes`
  0% {
    transform: ${
      type === "clock"
        ? "translate(-50%, -50%)"
        : "translate(-50%, -50%) scaleX(-1)"
    };
  }
  50% {
    transform: ${
      type === "clock"
        ? "translate(-50%, -60%)"
        : "translate(-50%, -60%) scaleX(-1)"
    };
  }
  100% {
    transform: ${
      type === "clock"
        ? "translate(-50%, -50%)"
        : "translate(-50%, -50%) scaleX(-1)"
    };
  }`;

const float2 = keyframes`
  0% {
    transform: translate(50%, 50%);
  }
  50% {
    transform: translate(50%, 60%);
  }
  100% {
    transform: translate(50%, 50%);
  }`;

const modal_bg = css`
  position: fixed;
  z-index: 12;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const modal = css`
  position: fixed;
  z-index: 13;
  width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  padding: 100px 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  border-radius: 20px;
  border: 1px solid var(--D9D7EF, #d9d7ef);
  background: var(--FFFFFF, #fff);
`;

const ai = (type: TloadingModalType | undefined) => css`
  position: absolute;
  left: ${type === "clock" ? "100%" : "0"};
  top: ${type === "clock" ? "100%" : "0"};
  transform: ${type === "clock"
    ? "translate(-50%, -50%)"
    : "translate(-50%, -50%) scaleX(-1)"};
  animation: ${float1(type)} 4s ease-in-out infinite;
`;

const circle = (type: TloadingModalType | undefined) => css`
  position: absolute;
  right: ${type === "clock" ? "100%" : "0"};
  bottom: 0;
  transform: translate(50%, 50%);

  animation: ${float2} 1.5s ease-in-out infinite;
`;

const clock = css`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
`;

const content_area = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
  gap: 10px;
`;

const title = css`
  color: var(--119CD4, #119cd4);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const desc = css`
  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
`;
