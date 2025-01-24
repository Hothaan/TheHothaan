/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
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
  option?: TsearchOption;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
}

export const search_result_item_title_css_ = css`
  color: var(--Neutral-colors-600, #6d758f);

  /* H2 */
  font-family: Inter;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

export const search_result_item_desc_css_ = css`
  color: var(--Neutral-colors-600, #6d758f);

  /* h2_small */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 32px */
`;

export default function Search(prop: Isearch) {
  const { content, style, isEditable, onChangeContent, onChangeStyle, option } =
    prop;

  const initialContent = {
    SearchTitle: content?.SearchTitle || search_result_item_title_,
    SearchDesc: content?.SearchDesc || search_result_item_desc_,
  };

  const initialStyle = {
    SearchTitle: style?.SearchTitle || search_result_item_title_css_,
    SearchDesc: style?.SearchDesc || search_result_item_desc_css_,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content) {
      if (content?.SearchTitle) {
        setEditableContent({
          ...initialContent,
          SearchTitle: content.SearchTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          SearchTitle: initialContent.SearchTitle,
        });
      }
      if (content?.SearchDesc) {
        setEditableContent({
          ...initialContent,
          SearchDesc: content.SearchDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          SearchDesc: initialContent.SearchDesc,
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
  if (
    editableContent.SearchTitle === undefined ||
    editableContent.SearchDesc === undefined ||
    editableStyle.SearchTitle === undefined ||
    editableStyle.SearchDesc === undefined
  ) {
    return <></>;
  }

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
            <div css={search_result_item_container}>
              {isEditable ? (
                <EditableText
                  text={editableContent.SearchTitle}
                  className="SearchTitle"
                  isTextArea={false}
                  defaultCss={editableStyle.SearchTitle}
                  onChangeText={(key, value) => onChangeContent(key, value)}
                  onChangeCss={(key, value) => onChangeStyle(key, value)}
                />
              ) : (
                <p css={editableStyle?.SearchTitle}>
                  {editableContent?.SearchTitle}
                </p>
              )}
              {isEditable ? (
                <EditableText
                  text={editableContent.SearchDesc}
                  className="SearchDesc"
                  isTextArea={false}
                  defaultCss={editableStyle.SearchDesc}
                  onChangeText={(key, value) => onChangeContent(key, value)}
                  onChangeCss={(key, value) => onChangeStyle(key, value)}
                />
              ) : (
                <p css={editableStyle?.SearchDesc}>
                  {editableContent?.SearchDesc}
                </p>
              )}
            </div>
            <div css={search_result_item_container}>
              {isEditable ? (
                <EditableText
                  text={editableContent.SearchTitle}
                  className="SearchTitle"
                  isTextArea={false}
                  defaultCss={editableStyle.SearchTitle}
                  onChangeText={(key, value) => onChangeContent(key, value)}
                  onChangeCss={(key, value) => onChangeStyle(key, value)}
                />
              ) : (
                <p css={editableStyle?.SearchTitle}>
                  {editableContent?.SearchTitle}
                </p>
              )}
              {isEditable ? (
                <EditableText
                  text={editableContent.SearchDesc}
                  className="SearchDesc"
                  isTextArea={false}
                  defaultCss={editableStyle.SearchDesc}
                  onChangeText={(key, value) => onChangeContent(key, value)}
                  onChangeCss={(key, value) => onChangeStyle(key, value)}
                />
              ) : (
                <p css={editableStyle?.SearchDesc}>
                  {editableContent?.SearchDesc}
                </p>
              )}
            </div>
            <div css={search_result_item_container}>
              {isEditable ? (
                <EditableText
                  text={editableContent.SearchTitle}
                  className="SearchTitle"
                  isTextArea={false}
                  defaultCss={editableStyle.SearchTitle}
                  onChangeText={(key, value) => onChangeContent(key, value)}
                  onChangeCss={(key, value) => onChangeStyle(key, value)}
                />
              ) : (
                <p css={editableStyle?.SearchTitle}>
                  {editableContent?.SearchTitle}
                </p>
              )}
              {isEditable ? (
                <EditableText
                  text={editableContent.SearchDesc}
                  className="SearchDesc"
                  isTextArea={false}
                  defaultCss={editableStyle.SearchDesc}
                  onChangeText={(key, value) => onChangeContent(key, value)}
                  onChangeCss={(key, value) => onChangeStyle(key, value)}
                />
              ) : (
                <p css={editableStyle?.SearchDesc}>
                  {editableContent?.SearchDesc}
                </p>
              )}
            </div>
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
