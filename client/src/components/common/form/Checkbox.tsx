/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { ReactComponent as Check } from "@svgs//common/check.svg";

export interface Icheckbox {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  padding?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox(prop: Icheckbox) {
  const { id, name, label, checked, padding, onChange } = prop;

  const handleDivClick = () => {
    const fakeEvent = {
      currentTarget: { id, checked: !checked },
      target: { checked: !checked },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(fakeEvent);
  };

  return (
    <div css={checkboxContainerStyle(padding)}>
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

const checkboxContainerStyle = (padding?: string) => css`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: ${padding ? padding : "10px"};
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
