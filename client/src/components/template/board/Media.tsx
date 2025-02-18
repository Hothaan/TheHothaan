/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";
import useEditTemplate from "@hooks/useEditTemplate";

const component_title_ = "media board";

const item_title_ = "lorem ipsum, quia do";

const item_desc_ = "lorem ipsum, quia do";

export interface ImediaContent {
  mediaTitle?: string;
  mediaDesc?: string;
}

export interface ImediaStyle {
  mediaTitle?: CSSObject;
  mediaDesc?: CSSObject;
}

interface Imedia {
  content?: ImediaContent | null;
  style?: ImediaStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const media_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const media_desc_css_: CSSObject = {
  color: "var(--A0A0A0, #a0a0a0)",
  fontFamily: "Inter",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

function MediaItem(prop: Imedia) {
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
    index,
  } = prop;

  if (
    style?.mediaTitle === undefined ||
    style?.mediaDesc === undefined ||
    content?.mediaTitle === undefined ||
    content?.mediaDesc === undefined
  ) {
    return <></>;
  }

  return (
    <div css={item_container}>
      <ImageBox
        container={{ width: "100%", height: "280px" }}
        icon={{ width: "60px", height: "60px" }}
        borderRadius="none"
        responsive={{
          maxWidth: 1000,
          container: "",
          icon: "width: 40px; height: 40px;",
        }}
      />
      <div css={item_info_container}>
        <p css={number_style}>483</p>
        {isEditable ? (
          <EditableText
            text={content?.mediaTitle as string}
            className="mediaTitle"
            id={"mediaTitle" + index}
            isTextArea={false}
            defaultCss={style?.mediaTitle as CSSObject}
            onChangeText={(key, value) => onChangeContent(key, value)}
            onChangeCss={(key, value) => onChangeStyle(key, value)}
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
            isWidth100={true}
          />
        ) : (
          <p css={style?.mediaTitle || media_title_css_}>
            {content?.mediaTitle || item_title_}
          </p>
        )}
        {isEditable ? (
          <EditableText
            text={content?.mediaDesc as string}
            className="mediaDesc"
            id={"mediaDesc" + index}
            isTextArea={false}
            defaultCss={style?.mediaDesc as CSSObject}
            onChangeText={(key, value) => onChangeContent(key, value)}
            onChangeCss={(key, value) => onChangeStyle(key, value)}
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
            isWidth100={true}
          />
        ) : (
          <p css={style?.mediaDesc || media_desc_css_}>
            {content?.mediaDesc || item_desc_}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Media(prop: Imedia) {
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

  const initialContent = {
    mediaTitle: content?.mediaTitle || item_title_,
    mediaDesc: content?.mediaDesc || item_desc_,
  };
  const initialStyle = {
    mediaTitle: style?.mediaTitle || media_title_css_,
    mediaDesc: style?.mediaDesc || media_desc_css_,
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
    <OuterWrap padding="100px 0">
      <Title
        title={component_title_}
        transform="capitalize"
        marginBottom={50}
      />
      <div css={item_list_container}>
        {Array.from({ length: count }, (_, index) => (
          <MediaItem
            key={index}
            index={index}
            isEditable={isEditable}
            content={editableContent}
            style={editableStyle}
            onChangeContent={handleEditContent}
            onChangeStyle={handleEditStyle}
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
          />
        ))}
      </div>
    </OuterWrap>
  );
}

const item_list_container = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const item_container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-bottom: 50px;
`;

const item_info_container = css`
  padding: 0 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
`;

const number_style = css`
  color: #486284;

  /* pretendard/Regular/15px */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 22.5px */
  letter-spacing: -0.15px;
`;
