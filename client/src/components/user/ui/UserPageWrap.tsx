/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

interface IuserPageWrap {
  children?: React.ReactNode;
}

export default function UserPageWrap({ children }: IuserPageWrap) {
  return <div css={wrap}>{children}</div>;
}

const wrap = css`
  display: flex;
  width: 340px;
  margin: 80px auto 0;
  padding: 100px 0;
  min-height: calc(100vh - 211px - 80px);
`;
