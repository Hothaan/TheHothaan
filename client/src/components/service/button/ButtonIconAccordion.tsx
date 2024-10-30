/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, ReactElement } from "react";
import { TbtnSize } from "@components/common/button/Button";
import { ReactComponent as ArrowUp } from "@svgs/arrowUp.svg";
import { ReactComponent as ArrowDown } from "@svgs/arrowDown.svg";

export type TbuttonIconAccordionOption = {
  text: string;
  onClick: () => void;
};

export interface IbuttonIconAccordion {
  size: TbtnSize;
  icon: ReactElement;
  text: string;
  onClick: () => void;
  options: TbuttonIconAccordionOption[];
}

export default function ButtonIconAccordion(prop: IbuttonIconAccordion) {
  const { size, icon, text, onClick, options } = prop;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div css={container}>
      <button
        type="button"
        css={[button(size), btn_size(size)]}
        className={isOpen ? "open" : ""}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div css={button_content}>
          <div className="icon_container">{icon}</div>
          <p>{text}</p>
        </div>
        {!isOpen ? <ArrowUp /> : <ArrowDown />}
      </button>
      {isOpen && (
        <ul css={[accordion_content, accordion_size(size)]}>
          {options.map((option) => (
            <li
              key={option.text}
              onClick={() => {
                setIsOpen(false);
                option.onClick();
              }}
            >
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const btn_size = (size: TbtnSize) => {
  switch (size) {
    case "M":
      return css`
        width: 170px;
        height: 50px;
        padding: 0px 24px;
      `;
    case "XL":
      return css`
        width: 191px;
        height: auto;
        padding: 20px 24px;
      `;
    default:
      return css`
        width: 170px;
        height: 50px;
        padding: 0px 24px;
      `;
  }
};

const accordion_size = (size: TbtnSize) => {
  switch (size) {
    case "M":
      return css`
        width: 170px;
        top: calc(100% + 6px);
      `;
    case "XL":
      return css`
        width: 191px;
        bottom: calc(100% + 6px);
      `;
    default:
      return css`
        width: 170px;
        top: calc(100% + 6px);
      `;
  }
};

const container = css`
  position: relative;
`;

const accordion_content = css`
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 170px;
  height: auto;
  padding: 24px;
  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
  cursor: pointer;

  p {
    color: var(--383838, #383838);
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(to right, #3b82f6, #a855f7);
    transition: 0.3s ease;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const button = (btnSize: TbtnSize) => css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  border-radius: 10px;
  background-color: #fff;
  overflow: hidden;
  cursor: pointer;

  p {
    white-space: nowrap;
    color: var(--383838, #383838);
    font-family: Pretendard;
    font-size: ${btnSize === "XL" ? "20px" : "17px"};
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

  &.open:before {
    background: linear-gradient(to right, #3b82f6, #a855f7);
  }

  &.open .icon_container svg path {
    fill: url(#paint1_linear_82_10914);
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

const button_content = css`
  display: flex;
  gap: 10px;
`;
