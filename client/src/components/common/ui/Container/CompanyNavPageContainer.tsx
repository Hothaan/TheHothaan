/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

export interface Icontainer {
  children?: React.ReactNode;
  title: string;
  maxWidth: number;
}

export default function CompanyNavPageContainer(prop: Icontainer) {
  const { children, title, maxWidth } = prop;
  return (
    <div css={container(maxWidth)}>
      <p css={title_css}>{title}</p>
      {children}
    </div>
  );
}

const container = (maxWidth: number) => css`
  width: 100%;
  max-width: ${maxWidth}px;
  margin: 80px auto 0;
`;

const title_css = css`
  padding: 100px 0 20px;
  margin-bottom: 70px;
  border-bottom: 1px solid var(--DEDEDE, #dedede);

  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
