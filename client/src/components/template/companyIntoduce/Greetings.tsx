/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const title_ = "Headline H1";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IgreetingsContent {
  greetingsHalfTitle?: string;
  greetingsHalfDesc?: string;
  greetingsFullTitle?: string;
  greetingsFullDesc?: string;
}

export interface IgreetingsStyle {
  greetingsHalfTitle?: CSSObject;
  greetingsHalfDesc?: CSSObject;
  greetingsFullTitle?: CSSObject;
  greetingsFullDesc?: CSSObject;
}

interface Igreetings {
  content?: IgreetingsContent | null;
  style?: IgreetingsStyle | null;
  isEditable?: boolean;
  onChangeContent?: (key: string, value: string) => void;
  onChangeStyle?: (key: string, value: CSSObject) => void;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const greetings_full_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",
  textTransform: "capitalize",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  textAlign: "center",
};

export const greetings_full_desc_css_: CSSObject = {
  wordBreak: "keep-all",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  // maxWidth: "676px",

  width: "100%",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "200px",
  WebkitLineClamp: "6",
  textAlign: "center",
};

export const greetings_half_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  "@media (max-width: 1000px)": {
    color: "#486284",
    fontFamily: "Inter",
    fontSize: "50px",
    fontStyle: "normal",
    fontWeight: "900",
    lineHeight: "150%",
  },
};

export const greetings_half_desc_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  wordBreak: "break-all",

  width: "100%",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: "4",
};

export default function Greetings(prop: Igreetings) {
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
    greetingsHalfTitle: content?.greetingsHalfTitle || title_,
    greetingsHalfDesc: content?.greetingsHalfDesc || desc_,
    greetingsFullTitle: content?.greetingsFullTitle || title_,
    greetingsFullDesc: content?.greetingsFullDesc || desc_,
  };

  const initialStyle = {
    greetingsHalfTitle: style?.greetingsHalfTitle || greetings_half_title_css_,
    greetingsHalfDesc: style?.greetingsHalfDesc || greetings_half_desc_css_,
    greetingsFullTitle: style?.greetingsFullTitle || greetings_full_title_css_,
    greetingsFullDesc: style?.greetingsFullDesc || greetings_full_desc_css_,
  };

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
      // 기존 객체와 새 객체를 비교하여 변경된 경우에만 업데이트
      if (!shallowEqual(prev, updatedContent)) {
        return { ...prev, ...updatedContent };
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
      !objA ||
      !objB ||
      typeof objA !== "object" ||
      typeof objB !== "object"
    ) {
      return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => Object.is(objA[key], objB[key]));
  };

  const handleEditContent = useCallback(
    (key: string, value: string) => {
      setEditableContent((prev: any) => {
        if (prev[key] === value) return prev; // 값이 동일하면 업데이트 안 함
        return { ...prev, [key]: value };
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

  return (
    <OuterWrap padding="0 0 100px 0">
      <div css={wrap}>
        <div css={container}>
          <div css={image_container}>
            <ImageBox
              container={{ width: "100%", height: "860px" }}
              icon={{ width: "110px", height: "110px" }}
              borderRadius="none"
              responsive={{
                maxWidth: 1000,
                container: "",
                icon: "width: 110px; height: 110px;",
              }}
            />
          </div>
          <div css={text_container}>
            {isEditable ? (
              <EditableText
                text={editableContent.greetingsHalfTitle}
                className="greetingsHalfTitle"
                id={"greetingsHalfTitle" + 1}
                isTextArea={false}
                defaultCss={editableStyle.greetingsHalfTitle}
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
              />
            ) : (
              <p css={editableStyle?.greetingsHalfTitle}>
                {editableContent?.greetingsHalfTitle}
              </p>
            )}
            {isEditable ? (
              <EditableText
                text={editableContent.greetingsHalfDesc}
                className="greetingsHalfDesc"
                id={"greetingsHalfDesc" + 1}
                isTextArea={true}
                defaultCss={editableStyle.greetingsHalfDesc}
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
              />
            ) : (
              <p css={editableStyle?.greetingsHalfDesc}>
                {editableContent?.greetingsHalfDesc}
              </p>
            )}
          </div>
        </div>
        <div css={container}>
          <ImageBox
            container={{ width: "100%", height: "850px" }}
            icon={{ width: "210px", height: "210px" }}
            borderRadius="none"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 110px; height: 108px;",
            }}
          />
          <div css={inner_container}>
            {isEditable ? (
              <EditableText
                text={editableContent.greetingsFullTitle}
                className="greetingsFullTitle"
                id={"greetingsFullTitle"}
                isTextArea={false}
                defaultCss={editableStyle.greetingsFullTitle}
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
              />
            ) : (
              <p css={editableStyle?.greetingsFullTitle}>
                {editableContent?.greetingsFullTitle}
              </p>
            )}
            {isEditable ? (
              <EditableText
                text={editableContent.greetingsFullDesc}
                className="greetingsFullDesc"
                id={"greetingsFullDesc"}
                isTextArea={true}
                defaultCss={editableStyle.greetingsFullDesc}
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
                isWidth100={true}
              />
            ) : (
              <p css={editableStyle?.greetingsFullDesc}>
                {editableContent?.greetingsFullDesc}
              </p>
            )}
          </div>
        </div>
        <div css={container}>
          <div css={text_container}>
            {isEditable ? (
              <EditableText
                text={editableContent.greetingsHalfTitle}
                className="greetingsHalfTitle"
                id={"greetingsHalfTitle" + 2}
                isTextArea={false}
                defaultCss={editableStyle.greetingsHalfTitle}
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
              />
            ) : (
              <p css={editableStyle?.greetingsHalfTitle}>
                {editableContent?.greetingsHalfTitle}
              </p>
            )}
            {isEditable ? (
              <EditableText
                text={editableContent.greetingsHalfDesc}
                className="greetingsHalfDesc"
                id={"greetingsHalfDesc" + 2}
                isTextArea={true}
                defaultCss={editableStyle.greetingsHalfDesc}
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
              />
            ) : (
              <p css={editableStyle?.greetingsHalfDesc}>
                {editableContent?.greetingsHalfDesc}
              </p>
            )}
          </div>
          <div css={image_container}>
            <ImageBox
              container={{ width: "100%", height: "860px" }}
              icon={{ width: "110px", height: "110px" }}
              borderRadius="none"
              responsive={{
                maxWidth: 1000,
                container: "",
                icon: "width: 110px; height: 110px;",
              }}
            />
          </div>
        </div>
      </div>
    </OuterWrap>
  );
}

const wrap = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const container = css`
  width: 100%;
  display: flex;
  position: relative;
`;

const inner_container = css`
  position: absolute;

  width: 100%;
  height: 100%;
  padding: 80px 70px;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const image_container = css`
  width: 50%;
  position: relative;
`;

const text_container = css`
  display: flex;
  flex-direction: column;
  gap: 60px;

  width: 50%;
  padding: 110px 144px;

  background-color: #fff;

  @media (max-width: 1000px) {
    padding: 110px 70px;
    gap: 40px;
  }
`;
