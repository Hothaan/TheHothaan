/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export default function TextField(prop: ItextField) {
  const { label, id, placeholder, disabled, value, onChange, className } = prop;
  return (
    <div css={text_field}>
      <label htmlFor={id} css={none}>
        {label}
      </label>
      <input
        css={input}
        type="text"
        name={id}
        id={id}
        placeholder={placeholder || ""}
        className={className || ""}
        onChange={onChange || undefined}
        disabled={disabled || false}
        value={value || undefined}
      />
    </div>
  );
}

const text_field = css``;

const none = css`
  display: none;
`;

const input = css`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 60px;
  padding: 20px;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 2px solid var(--DEDEDE, #dedede);
  background: var(--FFFFFF, #fff);
  color: var(--383838, #383838);
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  &:placeholder {
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
