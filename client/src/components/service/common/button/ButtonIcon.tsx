/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function ButtonIcon(prop: IbuttonIcon) {
  const { size, icon, text, onClick } = prop;

  return (
    <button
      type="button"
      css={[button, btn_size(size)]}
      onClick={onClick || undefined}
    >
      <div className="icon_container">{icon}</div>
      <p>{text}</p>
    </button>
  );
}

const btn_size = (size: TbtnSize) => {
  switch (size) {
    case "M":
      return css`
        width: 170px;
        height: 50px;
        padding: 0px 24px;
        font-size: 17px;
      `;
    case "XL":
      return css`
        width: 191px;
        height: auto;
        padding: 20px 24px;
        font-size: 20px;
      `;
    default:
      return css`
        width: 170px;
        height: 50px;
        padding: 0px 24px;
        font-size: 17px;
      `;
  }
};

const button = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
  cursor: pointer;

  p {
    color: var(--383838, #383838);
    font-family: Pretendard;
    font-weight: 500;
  }

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(to right, #dedede, #dedede);
    transition: 0.3s ease;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
  }

  &:hover:before {
    background: linear-gradient(to right, #3b82f6, #a855f7);
  }

  .icon_container {
    display: inline-flex;
    svg {
      width: 24px;
      height: 24px;
      transition: fill 0.3s;

      path {
        fill: var(--747474, #747474);
        transition: fill 0.3s;
      }
    }
  }

  &:hover .icon_container svg path {
    fill: url(#paint1_linear_82_10914);
  }
`;
