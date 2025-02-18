/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const title_ = "Lorem ipsum dolorsit amet consectetur";

const button_ = "Lorem ipsum dolor";

const item_title_ = "Explore";

const item_button_ = "Explore";

export interface IexploreServiceContent {
  exploreServiceTitle?: string;
  exploreServiceButton?: string;
  exploreServiceExploreTitle?: string;
  exploreServiceExploreButton?: string;
}

export interface IexploreServiceStyle {
  exploreServiceTitle?: CSSObject;
  exploreServiceButton?: CSSObject;
  exploreServiceExploreTitle?: CSSObject;
  exploreServiceExploreButton?: CSSObject;
}

interface IexploreService {
  content?: IexploreServiceContent | null;
  style?: IexploreServiceStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const explore_service_title_css_: CSSObject = {
  marginBottom: "30px",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "50px",
  fontStyle: "normal",
  fontWeight: "800",
  lineHeight: "normal",
  textTransform: "capitalize",
  width: "100%",
  textAlign: "center",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const explore_service_button_css_: CSSObject = {
  display: "flex",
  padding: "12px 20px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  borderRadius: "50px",
  backgroundColor: "var(--Neutral-10, #486284)",
  textAlign: "center",
  color: "var(--Neutral-0, #fff)",
  fontFamily: "Inter",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "160%",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const explore_service_explore_title_css_: CSSObject = {
  color: "var(--Neutral-10, #486284)",
  fontFamily: "DM Sans",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "24px",
  letterSpacing: "0.5px",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const explore_service_explore_button_css_: CSSObject = {
  display: "flex",
  width: "380px",
  padding: "12px 20px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  borderRadius: "50px",
  border: "1px solid var(--Neutral-10, #486284)",
  background: "#fff",
  color: " var(--Neutral-10, #486284)",
  fontFamily: "DM Sans",
  fontSize: "16px",
  textAlign: "center",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "24px",
  letterSpacing: "0.5px",

  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export default function ExploreServiceMain(prop: IexploreService) {
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
    exploreServiceTitle: content?.exploreServiceTitle || title_,
    exploreServiceButton: content?.exploreServiceButton || button_,
    exploreServiceExploreTitle:
      content?.exploreServiceExploreTitle || item_title_,
    exploreServiceExploreButton:
      content?.exploreServiceExploreButton || item_button_,
  };

  const initialStyle = {
    exploreServiceTitle:
      style?.exploreServiceTitle || explore_service_title_css_,
    exploreServiceButton:
      style?.exploreServiceButton || explore_service_button_css_,
    exploreServiceExploreTitle:
      style?.exploreServiceExploreTitle || explore_service_explore_title_css_,
    exploreServiceExploreButton:
      style?.exploreServiceExploreButton || explore_service_explore_button_css_,
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
          <div css={text_container}>
            {isEditable ? (
              <EditableText
                text={editableContent.exploreServiceTitle as string}
                className="exploreServiceTitle"
                isTextArea={false}
                defaultCss={editableStyle.exploreServiceTitle as CSSObject}
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
                id={"exploreServiceTitle"}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
              />
            ) : (
              <p css={editableStyle?.exploreServiceTitle}>
                {editableContent?.exploreServiceTitle || title_}
              </p>
            )}
            <ul css={explore_list}>
              {Array.from({ length: count }, (_, index) => (
                <li css={explore_item} key={index}>
                  {isEditable ? (
                    <EditableText
                      text={
                        editableContent.exploreServiceExploreTitle as string
                      }
                      className="exploreServiceExploreTitle"
                      isTextArea={false}
                      defaultCss={
                        editableStyle.exploreServiceExploreTitle as CSSObject
                      }
                      onChangeText={(key, value) =>
                        handleEditContent(key, value)
                      }
                      onChangeCss={(key, value) => handleEditStyle(key, value)}
                      id={"exploreServiceExploreTitle" + index}
                      activeEditor={activeEditor}
                      setActiveEditor={setActiveEditor}
                    />
                  ) : (
                    <p css={editableStyle?.exploreServiceExploreTitle}>
                      {editableContent?.exploreServiceExploreTitle}
                    </p>
                  )}
                  {isEditable ? (
                    <EditableText
                      text={
                        editableContent.exploreServiceExploreButton as string
                      }
                      className="exploreServiceExploreButton"
                      isTextArea={false}
                      hasBg={true}
                      defaultCss={
                        editableStyle.exploreServiceExploreButton as CSSObject
                      }
                      onChangeText={(key, value) =>
                        handleEditContent(key, value)
                      }
                      onChangeCss={(key, value) => handleEditStyle(key, value)}
                      id={"exploreServiceExploreButton" + index}
                      activeEditor={activeEditor}
                      setActiveEditor={setActiveEditor}
                    />
                  ) : (
                    <p css={editableStyle?.exploreServiceExploreButton}>
                      {editableContent?.exploreServiceExploreButton}
                    </p>
                  )}
                </li>
              ))}
            </ul>
            {isEditable ? (
              <EditableText
                text={editableContent.exploreServiceButton as string}
                className="exploreServiceButton"
                hasBg={true}
                isTextArea={false}
                defaultCss={editableStyle.exploreServiceButton as CSSObject}
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => onChangeStyle(key, value)}
                id={"exploreServiceButton"}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
              />
            ) : (
              <p css={editableStyle?.exploreServiceButton}>
                {editableContent?.exploreServiceButton}
              </p>
            )}
          </div>
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
  padding: 212px 132px;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const text_container = css`
  max-width: 550px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const explore_list = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;

  margin-bottom: 40px;
`;

const explore_item = css`
  display: flex;
  align-items: center;
  gap: 16px;
`;
