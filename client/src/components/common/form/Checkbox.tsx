/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { ReactComponent as Check } from "@svgs//common/check.svg";

export interface Icheckbox {
  id: string;
  name: string;
  label: string;
  isDefault?: boolean;
  checked: boolean;
  padding?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox(prop: Icheckbox) {
  const { id, name, label, checked, padding, isDefault, onChange } = prop;

  const handleDivClick = () => {
    if (isDefault === false) {
      return;
    }
    const fakeEvent = {
      currentTarget: { id, checked: !checked },
      target: { checked: !checked },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(fakeEvent);
  };

  return (
    <div
      css={checkboxContainerStyle(
        isDefault === undefined ? false : isDefault,
        padding
      )}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        css={hiddenCheckboxStyle(isDefault === undefined ? false : isDefault)}
        disabled={isDefault === undefined ? false : !isDefault}
      />
      <div
        css={customCheckboxStyle(
          checked,
          isDefault === undefined ? false : isDefault
        )}
        onClick={handleDivClick}
      >
        <Check />
      </div>
      <label
        css={labelStyle(checked, isDefault === undefined ? false : isDefault)}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}

const checkboxContainerStyle = (isDefault: boolean, padding?: string) => css`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: ${padding ? padding : "10px"};
  flex-basis: 50%;
  cursor: ${isDefault ? "pointer" : "default"};
`;

const hiddenCheckboxStyle = (isDefault: boolean) => css`
  position: absolute;
  opacity: 0;
  cursor: ${isDefault ? "pointer" : "default"};
`;

const customCheckboxStyle = (checked: boolean, isDefault: boolean) => css`
  display: flex;
  width: var(--L, 24px);
  height: var(--L, 24px);
  justify-content: center;
  align-items: center;
  gap: 10px;

  border: 1px solid var(--stroke-C3C8D1, #c3c8d1);
  background: var(--background-FFFFFF, #fff);

  opacity: ${isDefault ? 1 : 0.5};
  cursor: ${isDefault ? "pointer" : "default"};

  svg {
    display: ${checked ? "block" : "none"};
  }
`;

const labelStyle = (checked: boolean, isDefault: boolean) => css`
  cursor: ${isDefault ? "pointer" : "default"};

  color: ${checked ? "#119CD4" : "#383838"};
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 25.5px */
  letter-spacing: -0.17px;

  opacity: ${isDefault ? 1 : 0.5};
`;
