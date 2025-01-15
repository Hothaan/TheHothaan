/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
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
