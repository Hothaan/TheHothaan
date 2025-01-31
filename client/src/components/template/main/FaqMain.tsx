/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import { ReactComponent as ChevUp } from "@svgs/template/faqMain/chevUp.svg";
import EditableText from "@components/service/editableText/EditableText";

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
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
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

  if (
    content?.faqTitle === undefined ||
    content?.faqDesc === undefined ||
    style?.faqTitle === undefined ||
    style?.faqDesc === undefined
  ) {
    return <></>;
  }

  return (
    <div css={item_container}>
      {Array.from({ length: count }, (_, index) => {
        if (index === 1) {
          return (
            <div css={item}>
              <div css={title_container}>
                {isEditable ? (
                  <EditableText
                    text={content.faqTitle as string}
                    className="faqTitle"
                    isTextArea={false}
                    defaultCss={style.faqTitle as CSSObject}
                    onChangeText={(key, value) => onChangeContent(key, value)}
                    onChangeCss={(key, value) => onChangeStyle(key, value)}
                  />
                ) : (
                  <p
                    css={[
                      style?.faqTitle || faq_main_item_title_css_,
                      faq_main_item_title_is_open(true),
                    ]}
                  >
                    {content?.faqTitle || item_title_}
                  </p>
                )}
                <ChevUp css={icon(true)} />
              </div>
              {isEditable ? (
                <EditableText
                  text={content.faqDesc as string}
                  className="faqDesc"
                  isTextArea={false}
                  defaultCss={style.faqDesc as CSSObject}
                  onChangeText={(key, value) => onChangeContent(key, value)}
                  onChangeCss={(key, value) => onChangeStyle(key, value)}
                />
              ) : (
                <p css={faq_main_item_desc_css_}>
                  {content?.faqDesc || item_desc_}
                </p>
              )}
            </div>
          );
        } else {
          return (
            <div css={item}>
              <div css={title_container}>
                {isEditable ? (
                  <EditableText
                    text={content.faqTitle as string}
                    className="faqTitle"
                    isTextArea={false}
                    defaultCss={style.faqTitle as CSSObject}
                    onChangeText={(key, value) => onChangeContent(key, value)}
                    onChangeCss={(key, value) => onChangeStyle(key, value)}
                  />
                ) : (
                  <p
                    css={[
                      style?.faqTitle || faq_main_item_title_css_,
                      faq_main_item_title_is_open(false),
                    ]}
                  >
                    {content?.faqTitle || item_title_}
                  </p>
                )}
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

  const initialContent = {
    faqTitle: content?.faqTitle || item_title_,
    faqDesc: content?.faqDesc || item_desc_,
  };

  const initialStyle = {
    faqTitle: style?.faqTitle || faq_main_item_title_css_,
    faqDesc: style?.faqDesc || faq_main_item_desc_css_,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content) {
      if (content?.faqTitle) {
        setEditableContent({
          ...initialContent,
          faqTitlefaqTitle: content.faqTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          faqTitle: initialContent.faqTitle,
        });
      }

      if (content?.faqDesc) {
        setEditableContent({
          ...initialContent,
          faqDesc: content.faqDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          faqDesc: initialContent.faqDesc,
        });
      }

      setEditableStyle(initialStyle);
    }
  }, [content]);

  function handleEditContent(key: string, value: string) {
    setEditableContent({
      ...editableContent,
      [key]: value,
    });
    onChangeContent?.(key, value);
  }

  function handleEditStyle(key: string, value: CSSObject) {
    setEditableStyle({
      ...editableStyle,
      [key]: value,
    });
    onChangeStyle?.(key, value);
  }

  if (!editableContent) {
    return <></>;
  }

  return (
    <OuterWrap padding="114px 0">
      <InnerWrap>
        <div css={container}>
          <p css={title_style}>{title_}</p>
          <FaqMainItem
            content={editableContent}
            style={editableStyle}
            isEditable={isEditable}
            onChangeContent={handleEditContent}
            onChangeStyle={handleEditStyle}
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
