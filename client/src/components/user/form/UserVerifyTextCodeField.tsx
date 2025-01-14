/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import UserFormLabel, { IuserFormLabel } from "./UserFormLabel";
import TextField from "@components/common/form/TextField";
import { ItextField } from "@components/common/form/TextField";
import Button from "@components/common/button/Button";
import { Ibutton } from "@components/common/button/Button";

export interface IuserVerifyCodeFieldArea extends ItextField {
  ms: string;
}

export interface IuserVerifyCodeField {
  textField: IuserVerifyCodeFieldArea;
  button: Ibutton;
}

export default function UserVerifyTextCodeField(prop: IuserVerifyCodeField) {
  const { textField, button } = prop;
  const inputLabel: IuserFormLabel = { label: textField.label };
  return (
    <div css={wrap}>
      <UserFormLabel {...inputLabel} />
      <div css={input_container}>
        <div css={text_field}>
          <label htmlFor={textField.id} css={none}>
            {textField.label}
          </label>
          <input
            css={input(textField.size)}
            type={textField.type !== undefined ? textField.type : "text"}
            name={textField.id}
            id={textField.id}
            placeholder={textField.placeholder || ""}
            className={textField.className || ""}
            onChange={textField.onChange || undefined}
            disabled={textField.disabled || false}
            value={textField.value || ""}
          />
          <p css={ms}>{textField.ms}</p>
          <div css={caption_container}>
            <p css={caption}>인증번호 n자리를 입력하세요.</p>
            <p css={caption_link}>인증번호 재발송</p>
          </div>
        </div>
        <Button {...button} />
      </div>
    </div>
  );
}

const ms = css`
  position: absolute;
  bottom: calc(45px + 25px);
  right: 17px;
  transform: translateY(50%);

  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const caption_container = css`
  margin: 10px 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  align-self: stretch;
`;

const caption_link = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: none;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;

const caption = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const wrap = css`
  width: 100%;
  margin-bottom: 16px;
`;

const input_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  button {
    white-space: nowrap;
  }
`;

const text_field = css`
  position: relative;
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
