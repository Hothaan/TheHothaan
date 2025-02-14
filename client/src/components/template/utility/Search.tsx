/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import { ReactComponent as SearchIcon } from "@svgs/template/search/search.svg";
import EditableText from "@components/service/editableText/EditableText";

const search_result_title_bold_ = "‘검색어’";
const search_result_title_ = " 검색 결과입니다.";
const search_result_item_title_ = "PRICE";
const search_result_item_desc_ =
  "Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam.";

export interface IsearchContent {
  SearchTitle?: string;
  SearchDesc?: string;
}

export interface IsearchStyle {
  SearchTitle?: CSSObject;
  SearchDesc?: CSSObject;
}

type TsearchOption = "일반 검색" | "통합 검색";

interface Isearch {
  content?: IsearchContent | null;
  style?: IsearchStyle | null;
  isEditable?: boolean;
  option?: TsearchOption;
  onChangeContent?: (key: string, value: string) => void;
  onChangeStyle?: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const search_result_item_title_css_: CSSObject = {
  color: "var(--Neutral-colors-600, #6d758f)",
  fontFamily: "Inter",
  fontSize: "36px",
  fontStyle: "normal",
  fontWeight: "800",
  lineHeight: "normal",
};

export const search_result_item_desc_css_: CSSObject = {
  color: "var(--Neutral-colors-600, #6d758f)",
  fontFamily: "Inter",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "160%",
};

export default function Search(prop: Isearch) {
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
    option,
  } = prop;

  const count = 3;

  const initialContent = {
    SearchTitle: content?.SearchTitle || search_result_item_title_,
    SearchDesc: content?.SearchDesc || search_result_item_desc_,
  };

  const initialStyle = {
    SearchTitle: style?.SearchTitle || search_result_item_title_css_,
    SearchDesc: style?.SearchDesc || search_result_item_desc_css_,
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
    <OuterWrap padding="100px 0">
      <div css={container}>
        <div css={search_bar}>
          <p css={text}>검색어를 입력해 주세요.</p>
          <SearchIcon />
        </div>
        {option === "통합 검색" && (
          <div css={total_search_container}>
            <p css={search_result_title}>
              <span css={search_result_title_bold}>
                {search_result_title_bold_}
              </span>
              {search_result_title_}
            </p>
            {Array.from({ length: count }, (_, index) => (
              <div css={search_result_item_container}>
                {isEditable ? (
                  <EditableText
                    text={editableContent.SearchTitle}
                    className="SearchTitle"
                    isTextArea={false}
                    defaultCss={editableStyle.SearchTitle}
                    onChangeText={(key, value) => handleEditContent(key, value)}
                    onChangeCss={(key, value) => handleEditStyle(key, value)}
                    id={"SearchTitle" + index}
                    activeEditor={activeEditor}
                    setActiveEditor={setActiveEditor}
                  />
                ) : (
                  <p
                    css={
                      editableStyle?.SearchTitle ||
                      search_result_item_title_css_
                    }
                  >
                    {editableContent?.SearchTitle || search_result_item_title_}
                  </p>
                )}
                {isEditable ? (
                  <EditableText
                    text={editableContent.SearchDesc}
                    className="SearchDesc"
                    isTextArea={false}
                    defaultCss={editableStyle.SearchDesc}
                    onChangeText={(key, value) => handleEditContent(key, value)}
                    onChangeCss={(key, value) => handleEditStyle(key, value)}
                    id={"SearchDesc" + index}
                    activeEditor={activeEditor}
                    setActiveEditor={setActiveEditor}
                  />
                ) : (
                  <p
                    css={
                      editableStyle?.SearchDesc || search_result_item_desc_css_
                    }
                  >
                    {editableContent?.SearchDesc || search_result_item_desc_}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-height: 780px;
  gap: 50px;
`;

const search_bar = css`
  display: flex;
  width: 900px;
  height: 90px;
  padding: 10px 40px 10px 50px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;

  border-radius: 100px;
  border: 2px solid #486284;
  background: var(--background-FFFFFF, #fff);
`;

const text = css`
  color: #486284;

  /* Pretendard/Regular/24 */
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 38.4px */
`;

const total_search_container = css`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const search_result_item_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const search_result_title = css`
  color: #486284;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
`;

const search_result_title_bold = css`
  color: #486284;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 160%; /* 64px */
`;
