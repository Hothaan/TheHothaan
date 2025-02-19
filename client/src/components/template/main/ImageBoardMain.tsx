/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";
import useEditTemplate from "@hooks/useEditTemplate";

const component_title_ = "게시판";

const item_title_ = "일반게시판(이미지형) 게시판입니다.";
const item_title_className = "image_board_main_item_title";

interface IimageBoardMainContent {
  imageBoardTitle?: string;
}

interface IimageBoardMainStyle {
  imageBoardTitle?: CSSObject;
}

interface IimageBoardMain {
  content?: IimageBoardMainContent | null;
  style?: IimageBoardMainStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const image_board_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "normal",
  textTransform: "capitalize",
};

function ImageBoardMainItem(prop: IimageBoardMain) {
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    index,
    activeEditor,
    setActiveEditor,
  } = prop;

  const container = css`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `;

  if (
    content?.imageBoardTitle === undefined ||
    style?.imageBoardTitle === undefined
  ) {
    return <></>;
  }

  return (
    <div css={container}>
      <ImageBox
        container={{ width: "430px", height: "310px" }}
        icon={{ width: "50px", height: "50px" }}
        borderRadius="none"
        responsive={{
          maxWidth: 1000,
          container: "",
          icon: "width: 50px; height: 50px;",
        }}
      />
      {isEditable ? (
        <EditableText
          text={content.imageBoardTitle as string}
          className="imageBoardTitle"
          id={"imageBoardTitle" + index}
          isTextArea={false}
          defaultCss={style.imageBoardTitle as CSSObject}
          onChangeText={(key, value) => onChangeContent(key, value)}
          onChangeCss={(key, value) => onChangeStyle(key, value)}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
        />
      ) : (
        <p
          css={style?.imageBoardTitle || image_board_title_css_}
          className={item_title_className}
        >
          {content?.imageBoardTitle || item_title_}
        </p>
      )}
    </div>
  );
}

export default function ImageBoardMain(prop: IimageBoardMain) {
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

  const count = 4;

  const initialContent = {
    imageBoardTitle: content?.imageBoardTitle || item_title_,
  };

  const initialStyle = {
    imageBoardTitle: style?.imageBoardTitle || image_board_title_css_,
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
    <OuterWrap padding="120px 0">
      <InnerWrap>
        <div css={container}>
          <p css={title_style}>{component_title_}</p>
          <div css={item_container}>
            {Array.from({ length: count }, (_, index) => (
              <ImageBoardMainItem
                key={index}
                content={editableContent}
                style={editableStyle}
                isEditable={isEditable}
                onChangeContent={handleEditContent}
                onChangeStyle={handleEditStyle}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
              />
            ))}
          </div>
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;
