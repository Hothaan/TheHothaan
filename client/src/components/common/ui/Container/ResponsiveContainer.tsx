/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export interface IResponsiveContainer {
  children?: React.ReactNode;
}

export default function ResponsiveContainer(prop: IResponsiveContainer) {
  const { children } = prop;
  return <div css={container}>{children}</div>;
}

const container = css`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;
