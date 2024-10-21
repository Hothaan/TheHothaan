/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Button from "@components/common/button/Button";
import ButtonClose from "@components/common/button/ButtonClose";

export default function ServiceModal(prop: IserviceModal) {
  const { isOpen, title, buttons, children, onClick } = prop;

  if (!isOpen) return null;

  const closeButton: IbuttonClose = {
    onClick: onClick,
    top: "33px",
    right: "30px",
  };

  return (
    <div css={modal_bg} onClick={onClick}>
      <div
        css={modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div css={title_area}>
          <p css={title_style}>{title}</p>
          <ButtonClose {...closeButton} />
        </div>
        <div css={content_area}>{children}</div>
        <div css={button_container}>
          {buttons.map((button) => (
            <Button {...button} key={button.text} />
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

const modal = css`
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  width: 400px;
  padding: 30px;

  border-radius: 20px;
  overflow: hidden;
  background: var(--FFFFFF, #fff);
`;

const title_area = css`
  display: flex;
  width: 100%;
`;

const title_style = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 30px */
`;

const button_container = css`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const content_area = css`
  width: 100%;
`;
