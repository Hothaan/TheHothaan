/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const component_title_ = "채용";

const title_ = "제목입니다.";

const desc_ =
  "채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. ";

const date_ = "2024.11.12";

export interface IrecruitMainContent {
  recruitTitle?: string;
  recruitDesc?: string;
}
export interface IrecruitMainStyle {
  recruitTitle?: CSSObject;
  recruitDesc?: CSSObject;
}

interface IrecruitMain {
  content?: IrecruitMainContent | null;
  style?: IrecruitMainStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const recruit_item_title_css_ = css`
  overflow: hidden;
  color: #486284;
  text-overflow: ellipsis;

  /* pretendard/Regular/20px */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
  letter-spacing: -0.4px;
`;

export const recruit_item_desc_css_ = css`
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: var(--black-gray-888888, #888);
  text-overflow: ellipsis;

  /* pretendard/Regular/15px */
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 22.5px */
  letter-spacing: -0.15px;
`;

function RecruitMainItem(prop: IrecruitMain) {
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
    style?.recruitDesc === undefined ||
    content?.recruitDesc === undefined ||
    style?.recruitTitle === undefined ||
    content?.recruitTitle === undefined
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
              text={content.recruitTitle}
              className="recruitTitle"
              id={"recruitTitle" + index}
              isTextArea={false}
              defaultCss={style.recruitTitle}
              onChangeText={(key, value) => onChangeContent(key, value)}
              onChangeCss={(key, value) => onChangeStyle(key, value)}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              // isWidth100={true}
              justifyContent="center"
            />
          ) : (
            <p css={style?.recruitTitle || recruit_item_title_css_}>
              {content?.recruitTitle || title_}
            </p>
          )}
        </div>
        <p css={date_style}>{date_}</p>
      </div>
      {isEditable ? (
        <EditableText
          text={content.recruitDesc}
          className="recruitDesc"
          id={"recruitDesc" + index}
          isTextArea={false}
          defaultCss={style.recruitDesc}
          onChangeText={(key, value) => onChangeContent(key, value)}
          onChangeCss={(key, value) => onChangeStyle(key, value)}
          activeEditor={activeEditor}
          setActiveEditor={setActiveEditor}
          // isWidth100={true}
          justifyContent="center"
        />
      ) : (
        <p css={style?.recruitDesc || recruit_item_desc_css_}>
          {content?.recruitDesc || desc_}
        </p>
      )}
    </div>
  );
}

export default function RecruitMain(prop: IrecruitMain) {
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
    recruitTitle: content?.recruitTitle || title_,
    recruitDesc: content?.recruitDesc || desc_,
  };

  const initialStyle = {
    recruitTitle: style?.recruitTitle || recruit_item_title_css_,
    recruitDesc: style?.recruitDesc || recruit_item_desc_css_,
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
    <OuterWrap padding="98px 0">
      <InnerWrap>
        <div css={container}>
          <div css={inner_container}>
            <p css={title_style}>{component_title_}</p>
            <div css={item_wrap}>
              {Array.from({ length: count }, (_, index) => (
                <RecruitMainItem
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
          <ImageBox
            container={{ width: "calc(50% - 12px)", height: "auto" }}
            icon={{ width: "60px", height: "60px" }}
            borderRadius="none"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 60px; height: 60px;",
            }}
          />
        </div>
      </InnerWrap>
    </OuterWrap>
  );
}

const container = css`
  display: flex;
  width: 100%;
  gap: 24px;
`;

const inner_container = css`
  width: calc(50% - 12px);
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
  color: #7d7d7d;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`;
