/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import EditableText from "@components/service/editableText/EditableText";

const component_title_ = "게시판";

const title_ =
  "글 제목입니다. 글 제목입니다. 영역을 넘어갈 시 말줄임표가 적용됩니다.글 제목입니다. 글 제목입니다. 영역을 넘어갈 시 말줄임표가 적용됩니다.";
const title_className = "normal_board_main_title";

const date_ = "2025.09.31";

export interface InormalBoardContent {
  boardTitle?: string;
}
export interface InormalBoardStyle {
  boardTitle?: CSSObject;
}

interface InormalBoardMain {
  content?: InormalBoardContent | null;
  style?: InormalBoardStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const normal_board_main_title_css_: CSSObject = {
  color: "var(--Greys-Blue-Grey-800, #444a6d)",
  fontFamily: "Noto Sans KR",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "20px",

  width: "100%",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
};

export function NormalBoardMainItem(prop: InormalBoardMain) {
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

  if (content?.boardTitle === undefined || style?.boardTitle === undefined) {
    return <></>;
  }

  return (
    <div css={item_container}>
      {isEditable ? (
        <EditableText
          text={content.boardTitle as string}
          className="boardTitle"
          id={"boardTitle" + index}
          isTextArea={false}
          defaultCss={style.boardTitle as CSSObject}
          onChangeText={(key, value) => onChangeContent(key, value)}
          onChangeCss={(key, value) => onChangeStyle(key, value)}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
          isWidth100={true}
        />
      ) : (
        <p
          css={style?.boardTitle || normal_board_main_title_css_}
          className={title_className}
        >
          {content?.boardTitle || title_}
        </p>
      )}

      <div css={inner_container}>
        <p css={date_style}>{date_}</p>
        <button type="button" css={button}>
          바로가기
        </button>
      </div>
    </div>
  );
}

export default function NormalBoardMain(prop: InormalBoardMain) {
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

  const count = 3;

  const initialContent = {
    boardTitle: content?.boardTitle || title_,
  };

  const initialStyle = {
    boardTitle: style?.boardTitle || normal_board_main_title_css_,
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
    <OuterWrap padding="74px 0">
      <InnerWrap>
        <div css={container}>
          <p css={title_style}>{component_title_}</p>
          <div css={item_wrap}>
            {Array.from({ length: count }, (_, index) => (
              <NormalBoardMainItem
                key={index}
                index={index}
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
  gap: 20px;
`;

const title_style = css`
  color: #486284;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 130%; /* 31.2px */
  letter-spacing: -0.24px;
`;

const item_wrap = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const item_container = css`
  width: 100%;

  display: flex;
  padding: 20px 0px;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #e9e9e9;
`;

const inner_container = css`
  display: flex;

  align-items: center;
  gap: 26px;
`;

const date_style = css`
  color: #486284;
  text-align: center;
  font-family: "Noto Sans KR";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 123.077% */
`;

const button = css`
  padding: 4px 10px;
  display: flex;
  flex-direction: column;
  justify-title: center;
  flex-shrink: 0;

  border-radius: 100px;
  background: #f3f3f3;

  color: #a5a5a5;
  text-align: center;
  font-family: "Noto Sans KR";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
