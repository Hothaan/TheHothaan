/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

export interface ItextField {
  size: "small" | "normal";
  label: string;
  id: string;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function TextField(prop: ItextField) {
  const { size, label, id, placeholder, disabled, value, onChange, className } =
    prop;
  return (
    <div css={text_field}>
      <label htmlFor={id} css={none}>
        {label}
      </label>
      <input
        css={input(size)}
        type="text"
        name={id}
        id={id}
        placeholder={placeholder || ""}
        className={className || ""}
        onChange={onChange || undefined}
        disabled={disabled || false}
        value={value || ""}
      />
    </div>
  );
}

const text_field = css`
  width: 100%;
`;

const none = css`
  display: none;
`;

const input = (size: string) => css`
  display: flex;
  width: 100%;
  max-width: 1400px;
  height: ${size === "normal" ? "60px" : "50px"};
  padding: ${size === "normal" ? "20px" : "10px 14px"};
  align-items: center;
  gap: 10px;

  border-radius: ${size === "normal" ? "10px" : "7px"};
  border: ${size === "normal" ? "2px" : "1px"} solid var(--DEDEDE, #dedede);
  background: var(--FFFFFF, #fff);

  font-family: "Pretendard";
  color: var(--383838, #383838);
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:placeholder {
    font-family: "Pretendard";
    color: var(--747474, #747474);
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  &:disabled {
    background: var(--ECECEC, #ececec);
    &:placeholder {
      color: var(--A9AAB8, #a9aab8);
    }
  }
`;
