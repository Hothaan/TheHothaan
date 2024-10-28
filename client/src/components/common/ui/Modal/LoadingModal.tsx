/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Loading from "@components/common/ui/Loading/loading";

export interface IloadingModal {
  isOpen: boolean;
  content: { title: string; desc: React.ReactNode };
  onLoad: () => void;
  onComplete: () => void;
}

export default function LoadingModal(prop: IloadingModal) {
  const { isOpen, content, onComplete } = prop;

  if (!isOpen) return null;

  return (
    <div css={modal_bg}>
      <div
        css={modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Loading />
        <div css={content_area}>
          <p css={title}>{content.title}</p>
          <p css={desc}>{content.desc}</p>
        </div>
      </div>
    </div>
  );
}

const modal_bg = css`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
`;

const modal = css`
  position: fixed;
  z-index: 10;
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
  overflow: hidden;
  border-radius: 20px;
  border: 1px solid var(--D9D7EF, #d9d7ef);
  background: var(--FFFFFF, #fff);
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
