/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { ReactComponent as Check } from "@svgs/check.svg";

export default function Checkbox(prop: Icheckbox) {
  const { id, name, label, checked, onChange } = prop;

  const handleDivClick = () => {
    const fakeEvent = {
      currentTarget: { id, checked: !checked },
      target: { checked: !checked },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(fakeEvent);
  };

  return (
    <div css={checkboxContainerStyle}>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        css={hiddenCheckboxStyle}
      />
      <div css={customCheckboxStyle(checked)} onClick={handleDivClick}>
        <Check />
      </div>
      <label css={labelStyle(checked)} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

const checkboxContainerStyle = css`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px;
  flex-basis: 50%;
`;

const hiddenCheckboxStyle = css`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

const customCheckboxStyle = (checked: boolean) => css`
  display: flex;
  width: var(--L, 24px);
  height: var(--L, 24px);
  justify-content: center;
  align-items: center;
  gap: 10px;

  border: 1px solid var(--stroke-C3C8D1, #c3c8d1);
  background: var(--background-FFFFFF, #fff);

  svg {
    display: ${checked ? "block" : "none"};
  }
`;

const labelStyle = (checked: boolean) => css`
  cursor: pointer;
  color: ${checked ? "#119CD4" : "#383838"};
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 25.5px */
  letter-spacing: -0.17px;
`;
