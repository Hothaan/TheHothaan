/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

export interface IouterWrap {
  padding: string;
  children?: React.ReactNode;
}

function OuterWrap(prop: IouterWrap) {
  const { children, padding } = prop;
  return <div css={outerWrap(padding)}>{children}</div>;
}

const outerWrap = (padding: string) => css`
  width: 100%;
  overflow: hidden;
  max-width: 1920px;
  min-width: 1000px;
  padding: ${padding};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #fff;
`;

export interface IinnerWrap {
  children?: React.ReactNode;
}

function InnerWrap(prop: IinnerWrap) {
  const { children } = prop;
  return <div css={innerWrap}>{children}</div>;
}

const innerWrap = css`
  width: 100%;
  max-width: 1000px;

  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1000px) {
    padding: 0 50px;
  }
`;

export interface IcontentsWrap {
  children?: React.ReactNode;
}

function ContentsWrap(prop: IcontentsWrap) {
  const { children } = prop;
  return <div css={contents_wrap}>{children}</div>;
}

const contents_wrap = css`
  width: 100%;
  max-width: 900px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export { OuterWrap, InnerWrap, ContentsWrap };
