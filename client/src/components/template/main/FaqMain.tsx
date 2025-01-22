/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import { ReactComponent as ChevUp } from "@svgs/template/faqMain/chevUp.svg";

const title_ = "FAQ";

const item_title_ =
  "FAQ 제목입니다. FAQ 제목입니다. FAQ 제목입니다. FAQ 제목입니다. ";

const item_desc_ =
  "FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. FAQ 내용입니다. ";

export interface IfaqMainContent {
  faqTitle?: string;
  faqDesc?: string;
}
export interface IfaqMainStyle {
  faqTitle?: CSSObject;
  faqDesc?: CSSObject;
}

interface IfaqMain {
  content?: IfaqMainContent | null;
  style?: IfaqMainStyle | null;
  isEditable?: boolean;
  onChangeContent?: (key: string, value: string) => void;
  onChangeStyle?: (key: string, value: CSSObject) => void;
}

export const faq_main_item_title_css_ = css`
  color: #486284;

  /* pretendard/Regular/15px */
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;

  line-height: 150%; /* 22.5px */
  letter-spacing: -0.15px;
`;

export const faq_main_item_desc_css_ = css`
  margin-top: 20px;
  color: #486284;

  /* pretendard/Regular/15px */
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 22.5px */
  letter-spacing: -0.15px;
`;

function FaqMainItem(prop: IfaqMain) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const count = 6;

  const item = css`
    width: 100%;
    padding: 18px 0;
    border-bottom: 1px solid #486284;
  `;

  const title_container = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const icon = (isOpen: boolean) =>
    isOpen
      ? css`
          transform: rotate(180deg);
        `
      : "";

  const faq_main_item_title_is_open = (isOpen: boolean) => css`
    font-weight: ${isOpen ? "700" : "400"};
  `;

  return (
    <div css={item_container}>
      {Array.from({ length: count }, (_, index) => {
        if (index === 1) {
          return (
            <div css={item}>
              <div css={title_container}>
                <p
                  css={[
                    style?.faqTitle || faq_main_item_title_css_,
                    faq_main_item_title_is_open(true),
                  ]}
                >
                  {content?.faqTitle || item_title_}
                </p>
                <ChevUp css={icon(true)} />
              </div>
              {
                <p css={faq_main_item_desc_css_}>
                  {content?.faqDesc || item_desc_}
                </p>
              }
            </div>
          );
        } else {
          return (
            <div css={item}>
              <div css={title_container}>
                <p
                  css={[
                    style?.faqTitle || faq_main_item_title_css_,
                    faq_main_item_title_is_open(false),
                  ]}
                >
                  {content?.faqTitle || item_title_}
                </p>
                <ChevUp css={icon(false)} />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default function FaqMain(prop: IfaqMain) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const initial = {
    faqTitle: {
      text: content?.faqTitle || item_title_,
      css: style?.faqTitle || faq_main_item_title_css_,
    },
    faqDesc: {
      text: content?.faqDesc || item_desc_,
      css: style?.faqDesc || faq_main_item_desc_css_,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (content) {
      setEdit(initial);
    }
  }, [content]);

  return (
    <OuterWrap padding="114px 0">
      <InnerWrap>
        <div css={container}>
          <p css={title_style}>{title_}</p>
          <FaqMainItem
            content={content}
            isEditable={isEditable}
            onChangeContent={onChangeContent}
            onChangeStyle={onChangeStyle}
          />
        </div>
      </InnerWrap>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 0 60px;
`;

const title_style = css`
  color: #486284;
  text-align: center;
  font-family: "Noto Sans KR";
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 100% */
`;

const item_container = css`
  width: 100%;
`;
