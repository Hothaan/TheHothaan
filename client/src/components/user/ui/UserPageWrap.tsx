/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface IuserPageWrap {
  children?: React.ReactNode;
}

export default function UserPageWrap({ children }: IuserPageWrap) {
  return <div css={wrap}>{children}</div>;
}

const wrap = css`
  width: 340px;
  margin: 0 auto;
  padding: 100px 0;
`;
