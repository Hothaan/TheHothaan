/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";
import useEditTemplate from "@hooks/useEditTemplate";

const title_ = "Headline H1";
const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IintermediaryMatchServiceIntroductionContent {
  IntermediaryMatchServiceIntroductionTitle?: string;
  IntermediaryMatchServiceIntroductionDesc?: string;
}

export interface IintermediaryMatchServiceIntroductionStyle {
  IntermediaryMatchServiceIntroductionTitle?: CSSObject;
  IntermediaryMatchServiceIntroductionDesc?: CSSObject;
}

interface IintermediaryMatchServiceIntroduction {
  content?: IintermediaryMatchServiceIntroductionContent | null;
  style?: IintermediaryMatchServiceIntroductionStyle | null;
  isEditable?: boolean;
  onChangeContent?: (key: string, value: string) => void;
  onChangeStyle?: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const intermediary_match_service_introduction_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "1.5em",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  "@media (max-width: 1000px)": {
    fontSize: "64px",
  },
};

export const intermediary_match_service_introduction_desc_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "1.25em",
  wordBreak: "break-all",

  width: "100%",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "calc(2 * 1.25em)",
  WebkitLineClamp: "2",
};

export default function IntermediaryMatchServiceIntroduction(
  prop: IintermediaryMatchServiceIntroduction
) {
  const {
    isEditable,
    style,
    content,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

  const initialContent = {
    IntermediaryMatchServiceIntroductionTitle:
      content?.IntermediaryMatchServiceIntroductionTitle || title_,
    IntermediaryMatchServiceIntroductionDesc:
      content?.IntermediaryMatchServiceIntroductionTitle || desc_,
  };

  const initialStyle = {
    IntermediaryMatchServiceIntroductionTitle:
      style?.IntermediaryMatchServiceIntroductionTitle ??
      intermediary_match_service_introduction_title_css_,
    IntermediaryMatchServiceIntroductionDesc:
      style?.IntermediaryMatchServiceIntroductionDesc ??
      intermediary_match_service_introduction_desc_css_,
  };

  /* *********** */

  const updateValues = (source: any, initial: any) => {
    return Object.keys(initial).reduce((acc, key) => {
      const value = source?.[key];
      acc[key] = value ?? initial[key];
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
      setEditableContent((prev: any) => {
        return {
          ...prev,
          [key]: value,
        };
      });
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
    <OuterWrap padding="0">
      <div css={container}>
        <div css={banner_1_container}>
          <div css={text_container_absolute}>
            {isEditable ? (
              <EditableText
                text={
                  editableContent.IntermediaryMatchServiceIntroductionTitle as string
                }
                className="intermediaryMatchServiceIntroductionTitle"
                isTextArea={false}
                defaultCss={
                  editableStyle.IntermediaryMatchServiceIntroductionTitle as CSSObject
                }
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
                id={"IntermediaryMatchServiceIntroductionTitle" + 1}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
                isWidth100={true}
              />
            ) : (
              <p css={editableStyle?.IntermediaryMatchServiceIntroductionTitle}>
                {editableContent?.IntermediaryMatchServiceIntroductionTitle}
              </p>
            )}
            {isEditable ? (
              <EditableText
                text={
                  editableContent.IntermediaryMatchServiceIntroductionDesc as string
                }
                className="intermediaryMatchServiceIntroductionDesc"
                isTextArea={true}
                defaultCss={
                  editableStyle.IntermediaryMatchServiceIntroductionDesc as CSSObject
                }
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
                id={"IntermediaryMatchServiceIntroductionDesc" + 1}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
                isWidth100={true}
              />
            ) : (
              <p css={editableStyle?.IntermediaryMatchServiceIntroductionDesc}>
                {editableContent?.IntermediaryMatchServiceIntroductionDesc}
              </p>
            )}
          </div>
          <ImageBox
            container={{ width: "100%", height: "1120px" }}
            icon={{ width: "100px", height: "100px" }}
            borderRadius="0"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 80px; height: 80px;",
            }}
          />
        </div>
        <div css={banner_2_container}>
          <div css={text_wrap}>
            <div css={text_container}>
              {isEditable ? (
                <EditableText
                  text={
                    editableContent.IntermediaryMatchServiceIntroductionTitle as string
                  }
                  className="intermediaryMatchServiceIntroductionTitle"
                  isTextArea={false}
                  defaultCss={
                    editableStyle.IntermediaryMatchServiceIntroductionTitle as CSSObject
                  }
                  onChangeText={(key, value) => handleEditContent(key, value)}
                  onChangeCss={(key, value) => handleEditStyle(key, value)}
                  id={"IntermediaryMatchServiceIntroductionTitle" + 2}
                  activeEditor={activeEditor}
                  setActiveEditor={setActiveEditor}
                  isWidth100={true}
                />
              ) : (
                <p
                  css={editableStyle?.IntermediaryMatchServiceIntroductionTitle}
                >
                  {editableContent?.IntermediaryMatchServiceIntroductionTitle}
                </p>
              )}
              {isEditable ? (
                <EditableText
                  text={
                    editableContent.IntermediaryMatchServiceIntroductionDesc as string
                  }
                  className="intermediaryMatchServiceIntroductionDesc"
                  isTextArea={true}
                  defaultCss={
                    editableStyle.IntermediaryMatchServiceIntroductionDesc as CSSObject
                  }
                  onChangeText={(key, value) => handleEditContent(key, value)}
                  onChangeCss={(key, value) => handleEditStyle(key, value)}
                  id={"IntermediaryMatchServiceIntroductionDesc" + 2}
                  activeEditor={activeEditor}
                  setActiveEditor={setActiveEditor}
                  isWidth100={true}
                />
              ) : (
                <p
                  css={editableStyle?.IntermediaryMatchServiceIntroductionDesc}
                >
                  {editableContent?.IntermediaryMatchServiceIntroductionDesc}
                </p>
              )}
            </div>
          </div>
          <ImageBox
            container={{ width: "50%", height: "668px" }}
            icon={{ width: "80px", height: "80px" }}
            borderRadius="0"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 80px; height: 80px;",
            }}
          />
        </div>
        <div css={banner_3_container}>
          <ImageBox
            container={{ width: "50%", height: "668px" }}
            icon={{ width: "80px", height: "80px" }}
            borderRadius="0"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 80px; height: 80px;",
            }}
          />
          <div css={text_wrap}>
            <div css={text_container}>
              {isEditable ? (
                <EditableText
                  text={
                    editableContent.IntermediaryMatchServiceIntroductionTitle as string
                  }
                  className="intermediaryMatchServiceIntroductionTitle"
                  isTextArea={false}
                  defaultCss={
                    editableStyle.IntermediaryMatchServiceIntroductionTitle as CSSObject
                  }
                  onChangeText={(key, value) => handleEditContent(key, value)}
                  onChangeCss={(key, value) => handleEditStyle(key, value)}
                  id={"IntermediaryMatchServiceIntroductionTitle" + 3}
                  activeEditor={activeEditor}
                  setActiveEditor={setActiveEditor}
                  isWidth100={true}
                />
              ) : (
                <p
                  css={editableStyle?.IntermediaryMatchServiceIntroductionTitle}
                >
                  {editableContent?.IntermediaryMatchServiceIntroductionTitle}
                </p>
              )}
              {isEditable ? (
                <EditableText
                  text={
                    editableContent.IntermediaryMatchServiceIntroductionDesc as string
                  }
                  className="intermediaryMatchServiceIntroductionDesc"
                  isTextArea={true}
                  defaultCss={
                    editableStyle.IntermediaryMatchServiceIntroductionDesc as CSSObject
                  }
                  onChangeText={(key, value) => handleEditContent(key, value)}
                  onChangeCss={(key, value) => handleEditStyle(key, value)}
                  id={"IntermediaryMatchServiceIntroductionDesc" + 3}
                  activeEditor={activeEditor}
                  setActiveEditor={setActiveEditor}
                  isWidth100={true}
                />
              ) : (
                <p
                  css={editableStyle?.IntermediaryMatchServiceIntroductionDesc}
                >
                  {editableContent?.IntermediaryMatchServiceIntroductionDesc}
                </p>
              )}
            </div>
          </div>
        </div>
        <div css={banner_4_container}>
          {isEditable ? (
            <EditableText
              text={
                editableContent.IntermediaryMatchServiceIntroductionTitle as string
              }
              className="intermediaryMatchServiceIntroductionTitle"
              isTextArea={false}
              defaultCss={
                editableStyle.IntermediaryMatchServiceIntroductionTitle as CSSObject
              }
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              id={"IntermediaryMatchServiceIntroductionTitle" + 4}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
              justifyContent="center"
            />
          ) : (
            <p css={editableStyle?.IntermediaryMatchServiceIntroductionTitle}>
              {editableContent?.IntermediaryMatchServiceIntroductionTitle}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={
                editableContent.IntermediaryMatchServiceIntroductionDesc as string
              }
              className="intermediaryMatchServiceIntroductionDesc"
              isTextArea={true}
              defaultCss={
                editableStyle.IntermediaryMatchServiceIntroductionDesc as CSSObject
              }
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              id={"IntermediaryMatchServiceIntroductionDesc" + 4}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
              justifyContent="center"
            />
          ) : (
            <p css={editableStyle?.IntermediaryMatchServiceIntroductionDesc}>
              {editableContent?.IntermediaryMatchServiceIntroductionDesc}
            </p>
          )}
        </div>
      </div>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 100px;
  padding-bottom: 240px;
`;
const banner_1_container = css`
  position: relative;
  width: 100%;
  padding-left: 560px;

  @media (max-width: 1000px) {
    padding-left: 280px;
  }
`;

const banner_2_container = css`
  display: flex;
  position: relative;
  width: 100%;
`;

const banner_3_container = css`
  display: flex;
  position: relative;
  width: 100%;
`;
const banner_4_container = css`
  display: flex;
  width: calc(100% - 240px);
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;

  @media (max-width: 1000px) {
    padding: 0 180px;
  }
`;

const text_wrap = css`
  width: 50%;
`;

const text_container_absolute = css`
  width: calc(100% - 240px);
  position: absolute;
  top: 160px;
  left: 120px;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const text_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;

  padding: 80px 114px;

  @media (max-width: 1000px) {
    padding: 80px 40px 80px 80px;
  }
`;
