/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export interface Itabs {
  tab1: { text: string; width: string };
  tab2: { text: string; width: string };
}

export default function Tabs(prop: Itabs) {
  const { tab1, tab2 } = prop;

  return (
    <div css={tabs_container}>
      <div css={[tab_button, tab_button_selected(tab1.width)]}>
        <p css={text_style}>{tab1.text}</p>
      </div>
      <div css={[tab_button, tab_button_unselected(tab2.width)]}>
        <p css={text_style}>{tab2.text}</p>
      </div>
    </div>
  );
}

const tabs_container = css`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #486284;

  margin-bottom: 54px;
`;

const tab_button = css`
  // width: 228px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const tab_button_selected = (width: string) => css`
  width: ${width};
  position: relative;

  border-top: 1px solid #486284;
  border-right: 1px solid #486284;
  border-left: 1px solid #486284;

  &:after {
    position: absolute;
    display: block;
    content: "";
    width: 100%;
    background-color: #fff;
    height: 1px;
    bottom: -1px;
  }
`;

const tab_button_unselected = (width: string) => css`
  width: ${width};
  border: 1px solid var(--E5E5E5, #e5e5e5);
  background: #f6f6f6;
`;

const text_style = css`
  color: #486284;
  font-family: "Noto Sans KR";
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
`;
