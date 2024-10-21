/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Button from "@components/common/button/Button";

export default function Modal(prop: Imodal) {
  const { isOpen, content, onClick, buttons } = prop;

  if (!isOpen) return null;

  return (
    <div css={modal_bg} onClick={onClick}>
      <div
        css={modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p css={content_area}>{content}</p>
        <div css={button_container}>
          {buttons.map((button) => (
            <Button {...button} />
          ))}
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
  background: rgba(0, 0, 0, 0.2);
`;

const button_container = css`
  display: flex;
  gap: 7px;
  width: 100%;
`;

const modal = css`
  position: fixed;
  z-index: 10;
  width: 360px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  padding: 50px 20px 20px 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  border-radius: 20px;
  overflow: hidden;
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
