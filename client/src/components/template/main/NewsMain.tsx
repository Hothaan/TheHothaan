/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const component_title_ = "뉴스";

const item_title_ = "뉴스 제목입니다.";

const item_tag_ = "뉴스 카테고리";

export interface InewsMainContent {
  newsTitle?: string;
}

export interface InewsMainStyle {
  newsTitle?: CSSObject;
}

interface InewsMain {
  content?: InewsMainContent | null;
  style?: InewsMainStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const news_main_item_title_css_: CSSObject = {
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",

  color: "#486284",
  fontFamily: "Pretendard",
  fontSize: "24px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
  textTransform: "capitalize",
};

function NewsMainItem(prop: InewsMain) {
  const {
    content,
    style,
    isEditable,
    index,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

  if (content?.newsTitle === undefined || style?.newsTitle === undefined) {
    return <></>;
  }

  return (
    <div css={item}>
      <ImageBox
        container={{ width: "100%", height: "310px" }}
        icon={{ width: "50px", height: "50px" }}
        borderRadius="none"
        responsive={{
          maxWidth: 1000,
          container: "",
          icon: "width: 50px; height: 50px;",
        }}
      />
      <div css={info_container}>
        <p css={item_tag}>{item_tag_}</p>
        {isEditable ? (
          <EditableText
            text={content.newsTitle as string}
            className="newsTitle"
            id={"newsTitle" + index}
            isTextArea={false}
            defaultCss={style.newsTitle as CSSObject}
            onChangeText={(key, value) => onChangeContent(key, value)}
            onChangeCss={(key, value) => onChangeStyle(key, value)}
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
            isWidth100={true}
          />
        ) : (
          <p css={style?.newsTitle || news_main_item_title_css_}>
            {content?.newsTitle || item_title_}
          </p>
        )}
      </div>
    </div>
  );
}

export default function NewsMain(prop: InewsMain) {
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
    newsTitle: content?.newsTitle || item_title_,
  };
  const initialStyle = {
    newsTitle: style?.newsTitle || news_main_item_title_css_,
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
    <OuterWrap padding="86px 0">
      <div css={container}>
        <p css={title_style}>{component_title_}</p>
        <div css={item_container}>
          {Array.from({ length: count }, (_, index) => (
            <NewsMainItem
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
      </div>
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const item = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const info_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const item_tag = css`
  display: flex;
  padding: 4px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: 1px solid #486284;

  color: #486284;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: capitalize;
  white-space: nowrap;
`;
