/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

export interface IMyPageContainer {
  children?: React.ReactNode;
  title?: string;
}

export default function MyPageContainer(prop: IMyPageContainer) {
  const { children, title } = prop;
  return (
    <div css={container}>
      <p css={title_css}>{title}</p>
      {children}
    </div>
  );
}

const container = css`
  position: relative;

  width: 100%;
  display: flex;
  padding: 50px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  background: var(--FFF, #fff);
`;

const title_css = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
