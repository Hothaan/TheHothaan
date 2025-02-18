/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import { ReactComponent as ChevUp } from "@svgs/template/faqMain/chevUp.svg";
import EditableText from "@components/service/editableText/EditableText";
import useEditTemplate from "@hooks/useEditTemplate";

const title_ = "FAQ";

const item_title_ = "FAQ 제목입니다.";

const item_desc_ = "FAQ 내용입니다.";

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
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const faq_main_item_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Pretendard",
  fontSize: " 15px",
  fontStyle: "normal",
  lineHeight: "150%",
  letterSpacing: "-0.15px",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const faq_main_item_desc_css_: CSSObject = {
  marginTop: "20px",
  color: "#486284",
  fontFamily: "Pretendard",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "150%",
  letterSpacing: "-0.15px",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

function FaqMainItem(prop: IfaqMain) {
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

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
            <div css={item} key={index}>
              <div css={title_container}>
                {isEditable ? (
                  <EditableText
                    text={content.faqTitle as string}
                    className="faqTitle"
                    id={"faqTitle" + index}
                    isTextArea={false}
                    defaultCss={style.faqTitle as CSSObject}
                    onChangeText={(key, value) => onChangeContent(key, value)}
                    onChangeCss={(key, value) => onChangeStyle(key, value)}
                    isWidth100={true}
                    activeEditor={activeEditor}
                    setActiveEditor={setActiveEditor}
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
                  id={"faqDesc" + index}
                  isTextArea={false}
                  defaultCss={style.faqDesc as CSSObject}
                  onChangeText={(key, value) => onChangeContent(key, value)}
                  onChangeCss={(key, value) => onChangeStyle(key, value)}
                  isWidth100={true}
                  activeEditor={activeEditor}
                  setActiveEditor={setActiveEditor}
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
            <div css={item} key={index}>
              <div css={title_container}>
                {isEditable ? (
                  <EditableText
                    text={content.faqTitle as string}
                    className="faqTitle"
                    id={"faqTitle" + index}
                    isTextArea={false}
                    defaultCss={style.faqTitle as CSSObject}
                    onChangeText={(key, value) => onChangeContent(key, value)}
                    onChangeCss={(key, value) => onChangeStyle(key, value)}
                    activeEditor={activeEditor}
                    setActiveEditor={setActiveEditor}
                    isWidth100={true}
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
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

  const initialContent = {
    faqTitle: content?.faqTitle || item_title_,
    faqDesc: content?.faqDesc || item_desc_,
  };

  const initialStyle = {
    faqTitle: style?.faqTitle || faq_main_item_title_css_,
    faqDesc: style?.faqDesc || faq_main_item_desc_css_,
  };

  /* *********** */

  const updateValues = (source: any, initial: any) => {
    return Object.keys(initial).reduce((acc, key) => {
      const value = source?.[key];
      acc[key] = value === "" ? initial[key] : value ?? initial[key];
      return acc;
    }, {} as any);
  };

  const [editableContent, setEditableContent] = useState(() =>
    updateValues(content, initialContent)
  );
  const [editableStyle, setEditableStyle] = useState(() =>
    updateValues(style, initialStyle)
  );

  // `useMemo`로 최적화된 업데이트 값 생성
  const updatedContent = useMemo(
    () => updateValues(content, initialContent),
    [content, initialContent]
  );
  const updatedStyle = useMemo(
    () => updateValues(style, initialStyle),
    [style, initialStyle]
  );

  useEffect(() => {
    setEditableContent((prev: any) => {
      // 객체 비교를 수행하여 변경된 경우에만 업데이트
      if (!shallowEqual(prev, updatedContent)) {
        return updatedContent;
      }
      return prev;
    });
  }, [updatedContent]);

  useEffect(() => {
    setEditableStyle((prev: any) => {
      if (!shallowEqual(prev, updatedStyle)) {
        return updatedStyle;
      }
      return prev;
    });
  }, [updatedStyle]);

  // 얕은 비교를 수행하는 함수
  const shallowEqual = (objA: any, objB: any) => {
    if (Object.is(objA, objB)) return true;
    if (
      typeof objA !== "object" ||
      typeof objB !== "object" ||
      objA === null ||
      objB === null
    )
      return false;

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => objA[key] === objB[key]);
  };

  const handleEditContent = useCallback(
    (key: string, value: string) => {
      setEditableContent((prev: any) => ({
        ...prev,
        [key]: value,
      }));
      onChangeContent?.(key, value);
    },
    [onChangeContent]
  );

  const handleEditStyle = useCallback(
    (key: string, value: CSSObject) => {
      setEditableStyle((prev: any) => ({
        ...prev,
        [key]: value,
      }));
      onChangeStyle?.(key, value);
    },
    [onChangeStyle]
  );

  if (!editableContent) {
    return <></>;
  }

  /* *********** */

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
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
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
