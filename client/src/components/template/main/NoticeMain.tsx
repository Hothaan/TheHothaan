/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import EditableText from "@components/service/editableText/EditableText";

const component_title_ = "공지사항";

const title_ = "공지사항 제목입니다.";

const desc_ = "공지사항 입니다.";

const date_ = "2024.11.12";

export interface InoticeMainContent {
  noticeTitle?: string;
  noticeDesc?: string;
}
export interface InoticeMainStyle {
  noticeTitle?: CSSObject;
  noticeDesc?: CSSObject;
}

interface InoticeMain {
  content?: InoticeMainContent | null;
  style?: InoticeMainStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const notice_main_title_css_: CSSObject = {
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  color: "#486284",
  fontFamily: "Pretendard",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "150%",
  letterSpacing: "-0.4px",
};

export const notice_main_desc_css_: CSSObject = {
  width: "100%",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
  overflow: "hidden",
  color: "var(--black-gray-888888, #888)",
  textOverflow: "ellipsis",
  fontFamily: "Pretendard",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "150%",
  letterSpacing: "-0.15px",
};

function NoticeMainItem(prop: InoticeMain) {
  const {
    content,
    style,
    index,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

  if (
    content?.noticeTitle === undefined ||
    style?.noticeTitle === undefined ||
    content?.noticeDesc === undefined ||
    style?.noticeDesc === undefined
  ) {
    return <></>;
  }

  return (
    <div css={item_container}>
      <div css={title_container}>
        <div css={title_inner_container}>
          <p css={tag}>NEW</p>
          {isEditable ? (
            <EditableText
              text={content.noticeTitle as string}
              className="noticeTitle"
              id={"noticeTitle" + index}
              isTextArea={false}
              defaultCss={style.noticeTitle as CSSObject}
              onChangeText={(key, value) => onChangeContent(key, value)}
              onChangeCss={(key, value) => onChangeStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
            />
          ) : (
            <p css={notice_main_title_css_}>{content?.noticeTitle || title_}</p>
          )}
        </div>
        <p css={date_style}>{date_}</p>
      </div>
      {isEditable ? (
        <EditableText
          text={content.noticeDesc as string}
          className="noticeDesc"
          id={"noticeDesc" + index}
          isTextArea={false}
          defaultCss={style.noticeDesc as CSSObject}
          onChangeText={(key, value) => onChangeContent(key, value)}
          onChangeCss={(key, value) => onChangeStyle(key, value)}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
          isWidth100={true}
        />
      ) : (
        <p css={notice_main_desc_css_}>{content?.noticeDesc || desc_}</p>
      )}
    </div>
  );
}

export default function NoticeMain(prop: InoticeMain) {
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

  const container = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 50px;
  `;

  const initialContent = {
    noticeTitle: content?.noticeTitle || title_,
    noticeDesc: content?.noticeDesc || desc_,
  };
  const initialStyle = {
    noticeTitle: style?.noticeTitle || notice_main_title_css_,
    noticeDesc: style?.noticeDesc || notice_main_desc_css_,
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
    <OuterWrap padding="98px 0">
      <InnerWrap>
        <div css={container}>
          <p css={title_style}>{component_title_}</p>
          <div css={item_wrap}>
            {Array.from({ length: count }, (_, index) => (
              <NoticeMainItem
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
      </InnerWrap>
    </OuterWrap>
  );
}

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
  display: flex;
  flex-direction: column;
  padding: 30px 0px;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  border-top: 1px solid var(--stroke-E2E2E2, #e2e2e2);
  border-bottom: 1px solid var(--stroke-E2E2E2, #e2e2e2);
`;

const title_container = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const title_inner_container = css`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const tag = css`
  display: flex;
  padding: 3px 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #486284;
  border-radius: 100px;
  border: 1px solid #486284;
`;

const date_style = css`
  white-space: nowrap;
  color: #7d7d7d;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`;
