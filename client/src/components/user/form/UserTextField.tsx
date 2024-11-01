/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import UserFormLabel, { IuserFormLabel } from "./UserFormLabel";
import TextField from "@components/common/form/TextField";
import { ItextField } from "@components/common/form/TextField";

export default function UserTextField(prop: ItextField) {
  const inputLabel: IuserFormLabel = { label: prop.label };

  return (
    <div css={wrap}>
      <UserFormLabel {...inputLabel} />
      <TextField {...prop} />
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
