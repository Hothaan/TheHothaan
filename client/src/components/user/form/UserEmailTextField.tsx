/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

import UserFormLabel, { IuserFormLabel } from "./UserFormLabel";
import TextField from "@components/common/form/TextField";
import { ItextField } from "@components/common/form/TextField";
import Button from "@components/common/button/Button";
import { Ibutton } from "@components/common/button/Button";

export interface IuserEmailTextField extends ItextField {
  isError: boolean;
}

export default function UserEmailTextField(prop: IuserEmailTextField) {
  const {
    isError,
    id,
    label,
    size,
    type,
    placeholder,
    className,
    onChange,
    disabled,
    value,
  } = prop;
  const inputLabel: IuserFormLabel = { label: label };
  return (
    <div css={wrap}>
      <UserFormLabel {...inputLabel} />
      <div css={input_container}>
        <div css={text_field}>
          <label htmlFor={id} css={none}>
            {label}
          </label>
          <input
            css={input(size, isError)}
            type={type !== undefined ? type : "text"}
            name={id}
            id={id}
            placeholder={placeholder || ""}
            className={className || ""}
            onChange={onChange || undefined}
            disabled={disabled || false}
            value={value || ""}
          />
          {isError && (
            <div css={error_icon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.96859 1.33203C4.30992 1.33203 1.33325 4.3227 1.33325 7.9987C1.33325 11.6747 4.32392 14.6654 7.99992 14.6654C11.6759 14.6654 14.6666 11.6747 14.6666 7.9987C14.6666 4.3227 11.6619 1.33203 7.96859 1.33203ZM8.66658 11.332H7.33325V9.9987H8.66658V11.332ZM8.66658 8.66536H7.33325V4.66536H8.66658V8.66536Z"
                  fill="#D00000"
                />
              </svg>
            </div>
          )}
          {isError && (
            <p css={caption(isError)}>등록 되어 있지 않은 이메일입니다.</p>
          )}
        </div>
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

const caption = (isError: boolean) => css`
  margin-top: 10px;

  color: ${isError ? "#d00000" : "#747474"};
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const error_icon = css`
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

const input = (size: string, isError: boolean) => css`
  display: flex;
  width: 100%;
  max-width: 1400px;
  height: ${size === "normal" ? "60px" : "50px"};
  padding: ${size === "normal" ? "20px" : "10px 14px"};
  align-items: center;
  gap: 10px;

  border-radius: ${size === "normal" ? "10px" : "7px"};
  border: ${size === "normal" ? "2px" : "1px"} solid var(--DEDEDE, #dedede);
  background: ${isError ? "rgba(208, 0, 0, 0.10)" : "#fff"};

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
