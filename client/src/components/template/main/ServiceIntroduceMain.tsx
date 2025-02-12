/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const title_ = "Headline H1";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IserviceIntroduceContent {
  serviceIntroduceTitle?: string;
  serviceIntroduceDesc?: string;
}
export interface IserviceIntroduceStyle {
  serviceIntroduceTitle?: CSSObject;
  serviceIntroduceDesc?: CSSObject;
}

export interface IserviceIntroduce {
  content?: IserviceIntroduceContent | null;
  style?: IserviceIntroduceStyle | null;
  isEditable?: boolean;
  onChangeContent?: (key: string, value: string) => void;
  onChangeStyle?: (key: string, value: CSSObject) => void;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const service_introduce_title_css: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",
  textTransform: "capitalize",
  textAlign: "center",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const service_introduce_desc_css: CSSObject = {
  wordBreak: "keep-all",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  textAlign: "center",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: "6",
  height: "auto",
  // height: "360px",
};

export default function ServiceIntroduce(prop: IserviceIntroduce) {
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
    serviceIntroduceTitle: content?.serviceIntroduceTitle || title_,
    serviceIntroduceDesc: content?.serviceIntroduceDesc || desc_,
  };

  const initialStyle = {
    serviceIntroduceTitle:
      style?.serviceIntroduceTitle || service_introduce_title_css,
    serviceIntroduceDesc:
      style?.serviceIntroduceDesc || service_introduce_desc_css,
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
    <OuterWrap padding="0">
      <div css={banner_container}>
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
        <div css={container}>
          {isEditable ? (
            <EditableText
              text={editableContent?.serviceIntroduceTitle || title_}
              defaultCss={
                editableStyle?.serviceIntroduceTitle ||
                service_introduce_title_css
              }
              isTextArea={false}
              className="serviceIntroduceTitle"
              id="serviceIntroduceTitle"
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
              justifyContent="center"
            />
          ) : (
            <p
              css={
                editableStyle?.serviceIntroduceTitle ||
                service_introduce_title_css
              }
            >
              {editableContent?.serviceIntroduceTitle || title_}
            </p>
          )}

          {isEditable ? (
            <EditableText
              text={editableContent?.serviceIntroduceDesc || desc_}
              defaultCss={
                editableStyle?.serviceIntroduceDesc ||
                service_introduce_desc_css
              }
              isTextArea={true}
              className="serviceIntroduceDesc"
              id="serviceIntroduceDesc"
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
              justifyContent="center"
            />
          ) : (
            <p
              css={
                editableStyle?.serviceIntroduceDesc ||
                service_introduce_desc_css
              }
            >
              {editableContent?.serviceIntroduceDesc || desc_}
            </p>
          )}
        </div>
      </div>
    </OuterWrap>
  );
}

const banner_container = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const container = css`
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
