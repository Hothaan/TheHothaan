/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState } from "react";
import { ReactComponent as Check } from "@svgs//common/check.svg";
import { ReactComponent as Down } from "@svgs/common/buttonArrowBottom.svg";
import { ReactComponent as Up } from "@svgs/common/buttonArrowTop.svg";

export interface IcheckboxAccordion {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  padding?: string;
  required?: boolean;
  content?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UserCheckboxAccordion(prop: IcheckboxAccordion) {
  const { id, name, label, checked, padding, required, content, onChange } =
    prop;

  const handleDivClick = () => {
    const fakeEvent = {
      currentTarget: { id, checked: !checked },
      target: { checked: !checked },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(fakeEvent);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div css={checkboxContainerStyle(padding)}>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          css={hiddenCheckboxStyle}
          required={required}
        />
        <div css={container}>
          <div css={customCheckboxStyle(checked)} onClick={handleDivClick}>
            <Check />
          </div>
          <label htmlFor={id} css={label_container}>
            <p css={required_static}>
              {`(`}
              <span css={required_style(required)}>
                {required ? "필수" : "선택"}
              </span>
              {`)`}
            </p>
            <p css={labelStyle(checked)}>{label}</p>
          </label>
        </div>
        {isOpen ? (
          <Up
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        ) : (
          <Down
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        )}
      </div>
      {isOpen && (
        <div css={content_area}>
          <p css={content_style}>{content}</p>
        </div>
      )}
    </div>
  );
}

const container = css`
  display: flex;
  gap: 6px;
`;

const checkboxContainerStyle = (padding?: string) => css`
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const label_container = css`
  display: flex;
  gap: 4px;
`;

const required_static = css`
  cursor: pointer;
  color: #119cd4;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.17px;
`;

const required_style = (required?: boolean) => css`
  cursor: pointer;
  color: ${required ? "#119CD4" : "#383838"};
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  letter-spacing: -0.17px;
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

const content_area = css`
  display: flex;
  border: 1px solid var(--DEDEDE, #dedede);
  background: var(--FFF, #fff);
  max-height: 92px;
  overflow-y: auto;
`;
const content_style = css`
  text-align: left;
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
