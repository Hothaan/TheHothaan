/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface ImainPageSectionContainer {
  children: React.ReactNode;
  bgColor?: string;
}

export default function MainPageSectionContainer(
  prop: ImainPageSectionContainer
) {
  const { children, bgColor } = prop;
  return (
    <div css={container(bgColor)}>
      <div css={inner_container}>{children}</div>
    </div>
  );
}

export const container = (bgColor?: string) => css`
  width: 100%;
  padding: 120px 360px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${bgColor !== undefined ? bgColor : "#fff"};
`;

const inner_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
