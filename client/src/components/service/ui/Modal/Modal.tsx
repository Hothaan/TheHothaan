/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export interface Imodal {
  isOpen: boolean;
  content: string;
  onClick: () => void;
  buttons: Ibutton[];
}
export default function Modal(prop: Imodal) {
  const { isOpen, content, onClick } = prop;

  if (!isOpen) return null;

  return (
    <div css={modal_bg} onClick={onClick}>
      <div css={modal}>
        <p css={content_area}>{content}</p>
      </div>
    </div>
  );
}

const modal_bg = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
`;

const modal = css`
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  width: 360px;
  padding: 50px 20px 20px 20px;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  border-radius: 20px;
  background: var(--FFFFFF, #fff);
`;

const content_area = css`
  display: flex;
  height: 50px;
  flex-direction: column;
  justify-content: center;
  align-self: stretch;

  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
