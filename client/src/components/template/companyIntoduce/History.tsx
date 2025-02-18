/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import EditableText from "@components/service/editableText/EditableText";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IhistoryContent {
  historyDesc?: string;
}
export interface IhistoryStyle {
  historyDesc?: CSSObject;
}

interface Ihistory {
  content?: IhistoryContent | null;
  style?: IhistoryStyle | null;
  isEditable?: boolean;
  onChangeContent?: (key: string, value: string) => void;
  onChangeStyle?: (key: string, value: CSSObject) => void;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const history_desc_css_: CSSObject = {
  width: "100%",
  position: "relative",
  maxWidth: "600px",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "1.25em",
  height: "calc(2 * 1.25em)",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: "2",
};

export default function History(prop: Ihistory) {
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

  const initialContent = { historyDesc: content?.historyDesc || desc_ };
  const initialStyle = { historyDesc: style?.historyDesc || history_desc_css_ };

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
    <OuterWrap padding="200px 0">
      <div css={container}>
        <ul css={history_list}>
          {Array.from({ length: count }, (_, index) => (
            <li css={history_item} key={index}>
              <p css={year_style}>{2021 - index}</p>
              <div css={circle_container}>
                <span css={circle(index === 0 ? true : false)}></span>
              </div>
              {isEditable ? (
                <div
                  css={[
                    history_desc_change(
                      index === 0 ? true : false,
                      index === count - 1 ? true : false
                    ),
                  ]}
                >
                  <EditableText
                    text={editableContent?.historyDesc}
                    defaultCss={editableStyle?.historyDesc}
                    isTextArea={true}
                    className="historyDesc"
                    id="historyDesc"
                    onChangeText={(key, value) => handleEditContent(key, value)}
                    onChangeCss={(key, value) => handleEditStyle(key, value)}
                    activeEditor={activeEditor}
                    setActiveEditor={setActiveEditor}
                    isWidth100={true}
                    // justifyContent="center"
                  />
                </div>
              ) : (
                <div
                  css={history_desc_change(
                    index === 0 ? true : false,
                    index === count - 1 ? true : false
                  )}
                >
                  <p css={[editableStyle?.historyDesc]}>
                    {editableContent?.historyDesc}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const history_list = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const history_item = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 24px;
`;

const year_style = css`
  color: #486284;
  font-family: "Kumbh Sans";
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const circle_container = css`
  display: flex;
  align-items: center;
  height: 54px;
`;

const circle = (isSelected?: boolean) => css`
  position: relative;

  width: 20px;
  height: 20px;
  display: block;
  border: 5px solid ${isSelected ? "#486284" : "#D6D6D6"};
  background-color: #fff;
  border-radius: 50%;

  &:before {
    display: block;
    content: "";
    z-index: 1;
    width: 10px;
    height: 10px;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const history_desc_change = (isSelected?: boolean, isLast?: boolean) => css`
  width: 100%;
  max-width: 600px;
  padding-bottom: ${isLast ? "0px" : isSelected ? "240px" : "140px"};
  position: relative;

  &:after {
    background-color: ${isSelected ? "#486284" : "#D6D6D6"};

    display: block;
    content: "";
    width: 1px;
    height: 100%;
    position: absolute;
    top: 20px;
    left: -34px;
  }
`;
