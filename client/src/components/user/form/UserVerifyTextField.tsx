/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import UserFormLabel, { IuserFormLabel } from "./UserFormLabel";
import TextField from "@components/common/form/TextField";
import { ItextField } from "@components/common/form/TextField";
import Button from "@components/common/button/Button";
import { Ibutton } from "@components/common/button/Button";

export interface IuserVerifyTextField {
  textField: ItextField;
  button: Ibutton;
}

export default function UserVerifyTextField(prop: IuserVerifyTextField) {
  const { textField, button } = prop;
  const inputLabel: IuserFormLabel = { label: textField.label };
  return (
    <div css={wrap}>
      <UserFormLabel {...inputLabel} />
      <div css={input_container}>
        <TextField {...textField} />
        <Button {...button} />
      </div>
    </div>
  );
}

const wrap = css`
  width: 100%;
`;

const label = css`
  margin-bottom: 10px;
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const input_container = css`
  width: 100%;
  display: flex;
  gap: 10px;
  div {
    width: 100%;
  }
  button {
    white-space: nowrap;
    width: 58px;
  }
`;
