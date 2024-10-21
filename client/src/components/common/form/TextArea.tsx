/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

export default function TextFArea(prop: ItextArea) {
  const { label, id, placeholder, disabled, value, onChange, className } = prop;
  const [byteLength, setByteLength] = useState<number>(0);
  const MAX_LENGTH = 500;

  function getByteLength(text: string): number {
    let byteLength = 0;
    for (let char of text) {
      byteLength += char.charCodeAt(0) > 127 ? 2 : 1;
    }
    return byteLength;
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const currentByteLength = getByteLength(event.target.value);
    if (currentByteLength <= MAX_LENGTH) {
      if (onChange !== undefined) {
        onChange(event);
      }
      setByteLength(currentByteLength);
    } else {
      setByteLength(MAX_LENGTH);
    }
  }

  return (
    <div css={text_field}>
      <label htmlFor={id} css={none}>
        {label}
      </label>
      <textarea
        css={input}
        name={id}
        id={id}
        placeholder={placeholder || ""}
        className={className || ""}
        onChange={handleChange}
        disabled={disabled || false}
        value={value || undefined}
      />
      <p css={char_count}>
        {byteLength}/{MAX_LENGTH}
      </p>
    </div>
  );
}

const text_field = css`
  width: 100%;
  max-width: 1200px;
  position: relative;
`;

const none = css`
  display: none;
`;

const input = css`
  display: flex;
  width: 100%;
  height: 200px;
  padding: 20px;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 10px;

  border-radius: 20px;
  border: 2px solid var(--DEDEDE, #dedede);
  background: var(--FFFFFF, #fff);

  color: var(--383838, #383838);
  font-family: Pretendard;
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

const char_count = css`
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: var(--747474, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
