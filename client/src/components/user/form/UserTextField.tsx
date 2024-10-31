/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import TextField from "@components/common/form/TextField";
import { ItextField } from "@components/common/form/TextField";

export default function UserTextField(prop: ItextField) {
  return (
    <div css={wrap}>
      <p css={label}>{prop.label}</p>
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
