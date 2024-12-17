/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState } from "react";
import { IradioButton } from "@components/common/form/RadioButton";
import RadioButton from "@components/common/form/RadioButton";
import { Icheckbox } from "@components/common/form/Checkbox";
import Checkbox from "@components/common/form/Checkbox";
import { ReactComponent as ArrowUp } from "@svgs/common/arrowUp.svg";
import { ReactComponent as ArrowDown } from "@svgs/common/arrowDown.svg";

export interface IradioButtonAccordion {
  radioButton: IradioButton;
  options: Icheckbox[];
}

export default function RadioButtonAccordion(prop: IradioButtonAccordion) {
  const { radioButton, options } = prop;
  const [isOpen, setIsOpen] = useState(true);
  const MAX_NUM = 5;

  return (
    <div css={wrap}>
      <div
        css={accordion_title_container(isOpen)}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <RadioButton {...radioButton} />
        </div>

        {!isOpen ? <ArrowUp /> : <ArrowDown />}
      </div>
      {isOpen && (
        <div css={accordicon_content}>
          {options.map((option) => (
            <Checkbox {...option} key={option.id} />
          ))}
        </div>
      )}
    </div>
  );
}

const wrap = css`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  border-radius: 10px;

  position: relative;
  background-clip: padding-box;
  border: 1px solid transparent;
  background-color: #fff;

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 2px;
    background: linear-gradient(to right, #3b82f6, #a855f7);
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const accordion_title_container = (isOpen: boolean) => css`
  height: 50px;
  display: flex;
  width: 100%;
  justify-content: space-between;

  align-items: center;
  padding: 10px 14px;
  border-bottom: ${isOpen ? "1px solid var(--DEDEDE, #dedede)" : "none"};
  background: ${isOpen ? "var(--EEF7FD, #eef7fd)" : "#fff"};
`;

const accordicon_content = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  // gap: 5px;
  padding: 10px 14px;
`;
