/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

export interface IradioButton {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export default function RadioButton(prop: IradioButton) {
  const { id, name, value, label, checked, onChange, required } = prop;

  function handleDivClick() {
    const fakeEvent = {
      currentTarget: { value },
    } as React.FormEvent<HTMLInputElement>;
    onChange(fakeEvent);
  }

  return (
    <div css={radioContainerStyle}>
      <div css={styledRadioStyle(checked)} onClick={handleDivClick}>
        <span></span>
      </div>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required={required}
        css={hiddenRadioStyle}
      />
      <label css={labelStyle(checked)} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

const radioContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 6px;
  align-self: stretch;
`;

const hiddenRadioStyle = css`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const styledRadioStyle = (checked: boolean) => css`
  display: flex;
  width: var(--L, 24px);
  min-width: var(--L, 24px);
  min-height: var(--L, 24px);
  height: var(--L, 24px);
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  border: 1px solid var(--stroke-C3C8D1, #c3c8d1);
  background: var(--background-FFFFFF, #fff);

  span {
    display: ${checked ? "block" : "none"};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #119cd4;
  }
`;

const labelStyle = (checked: boolean) => css`
  cursor: pointer;
  color: ${checked ? "#119CD4" : "#383838"};
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.15px;
`;
