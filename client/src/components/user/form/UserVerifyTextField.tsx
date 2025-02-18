/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import UserFormLabel, { IuserFormLabel } from "./UserFormLabel";
import TextField from "@components/common/form/TextField";
import { ItextField } from "@components/common/form/TextField";
import Button from "@components/common/button/Button";
import { Ibutton } from "@components/common/button/Button";

export interface IuserVerifyTextFieldArea extends ItextField {
  isVerified: boolean;
}

export interface IuserVerifyTextField {
  textField: IuserVerifyTextFieldArea;
  button: Ibutton;
}

export default function UserVerifyTextField(prop: IuserVerifyTextField) {
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
          {textField.isVerified && (
            <div css={verified_icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.99992 1.33203C4.32392 1.33203 1.33325 4.3227 1.33325 7.9987C1.33325 11.6747 4.32392 14.6654 7.99992 14.6654C11.6759 14.6654 14.6666 11.6747 14.6666 7.9987C14.6666 4.3227 11.6759 1.33203 7.99992 1.33203ZM6.66725 10.9407L4.19192 8.4707L5.13325 7.5267L6.66592 9.0567L10.1953 5.52736L11.1379 6.47003L6.66725 10.9407Z"
                  fill="#119CD4"
                />
              </svg>
            </div>
          )}
          {textField.isVerified && (
            <div css={caption_container}>
              <div css={caption_icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.99997 15.586L6.70697 12.293L5.29297 13.707L9.99997 18.414L19.707 8.70697L18.293 7.29297L9.99997 15.586Z"
                    fill="white"
                  />
                </svg>
              </div>
              <p css={caption}>이메일 인증이 완료 되었습니다.</p>
            </div>
          )}
        </div>
        <Button {...button} />
      </div>
    </div>
  );
}

const caption_container = css`
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  align-self: stretch;
`;

const caption = css`
  color: var(--119CD4, #119cd4);
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const caption_icon = css`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 50px;
  background: var(--119CD4, #119cd4);
`;

const verified_icon = css`
  position: absolute;
  width: 16px;
  height: 16px;
  right: 17px;
  top: 25px;
  transform: translateY(-50%);
`;

const wrap = css`
  width: 100%;
`;

const label = css`
  margin-bottom: 10px;
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const input_container = css`
  width: 100%;
  display: flex;
  gap: 10px;
  button {
    white-space: nowrap;
    width: 58px;
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
