/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import UserFormLabel, { IuserFormLabel } from "./UserFormLabel";
import TextField from "@components/common/form/TextField";
import { ItextField } from "@components/common/form/TextField";
import Button from "@components/common/button/Button";
import { Ibutton } from "@components/common/button/Button";
import { text } from "stream/consumers";

export interface IuserVerifyCodeFieldArea extends ItextField {
  ms: string;
  isCodeTimeOut: boolean;
  onClick: () => void;
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
            css={input(textField.size, textField.isCodeTimeOut)}
            type={textField.type !== undefined ? textField.type : "text"}
            name={textField.id}
            id={textField.id}
            placeholder={textField.placeholder || ""}
            className={textField.className || ""}
            onChange={textField.onChange || undefined}
            disabled={textField.disabled || false}
            value={textField.value || ""}
          />
          <p css={ms(textField.isCodeTimeOut)}>{textField.ms}</p>
          {textField.isCodeTimeOut && (
            <div css={error_icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.96871 1.33203C4.31004 1.33203 1.33337 4.3227 1.33337 7.9987C1.33337 11.6747 4.32404 14.6654 8.00004 14.6654C11.676 14.6654 14.6667 11.6747 14.6667 7.9987C14.6667 4.3227 11.662 1.33203 7.96871 1.33203ZM8.66671 11.332H7.33337V9.9987H8.66671V11.332ZM8.66671 8.66536H7.33337V4.66536H8.66671V8.66536Z"
                  fill="#D00000"
                />
              </svg>
            </div>
          )}
          <div css={caption_container}>
            {textField.isCodeTimeOut ? (
              <p css={caption(textField.isCodeTimeOut)}>
                인증 유효 시간을 초과했습니다.
              </p>
            ) : (
              <p css={caption(textField.isCodeTimeOut)}>
                인증번호 n자리를 입력하세요.
              </p>
            )}
            <p css={caption_link} onClick={textField.onClick}>
              인증번호 재발송
            </p>
          </div>
        </div>
        <Button {...button} />
      </div>
    </div>
  );
}

const error_icon = css`
  position: absolute;
  bottom: calc(45px + 25px);
  right: 17px;
  transform: translateY(50%);
`;

const ms = (isCodeTimeOut: boolean) => css`
  position: absolute;
  bottom: calc(45px + 25px);
  right: ${isCodeTimeOut ? "40px" : "17px"};
  transform: translateY(50%);

  color: ${isCodeTimeOut ? "#D00000" : "#747474"};
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
  cursor: pointer;

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

const caption = (isCodeTimeOut: boolean) => css`
  color: ${isCodeTimeOut ? "#D00000" : "#747474"};
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

const input = (size: string, isCodeTimeOut: boolean) => css`
  display: flex;
  width: 100%;
  max-width: 1400px;
  height: ${size === "normal" ? "60px" : "50px"};
  padding: ${size === "normal" ? "20px" : "10px 14px"};
  align-items: center;
  gap: 10px;

  border-radius: ${size === "normal" ? "10px" : "7px"};
  border: ${size === "normal" ? "2px" : "1px"} solid var(--DEDEDE, #dedede);
  background: ${isCodeTimeOut ? "rgba(208, 0, 0, 0.10);" : "#fff"};

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
