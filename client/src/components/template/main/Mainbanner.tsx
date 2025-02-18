/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";
import useEditTemplate from "@hooks/useEditTemplate";

const title_ = "Headline H1";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

const button_ = "button";

export const mainBanner_title_css_: CSSObject = {
  marginBottom: "30px",
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
};

export const mainBanner_desc_css_: CSSObject = {
  wordBreak: "keep-all",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "1.5em",
  marginBottom: "80px",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "calc(2 * 1.5em)",
  WebkitLineClamp: "2",
};

export const mainBanner_button_css_: CSSObject = {
  display: "flex",
  padding: "22px 66px",
  justifyContent: "center",
  alignItems: "center",

  borderRadius: "10px",
  backgroundColor: "#486284",
  color: "var(--FFFFFF, #fff)",

  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  textAlign: "center",
};

export interface ImainBannerContent {
  mainBannerTitle?: string;
  mainBannerDesc?: string;
  mainBannerButton?: string;
}

export interface ImainBannerStyle {
  mainBannerTitle?: CSSObject;
  mainBannerDesc?: CSSObject;
  mainBannerButton?: CSSObject;
}

interface ImainBanner {
  content?: ImainBannerContent | null;
  style?: ImainBannerStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function Mainbanner(prop: ImainBanner) {
  const {
    isEditable,
    content,
    style,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

  const initialContent = {
    mainBannerTitle: content?.mainBannerTitle || title_,
    mainBannerDesc: content?.mainBannerDesc || desc_,
    mainBannerButton: content?.mainBannerDesc || button_,
  };

  const initialStyle = {
    mainBannerTitle: style?.mainBannerTitle || mainBanner_title_css_,
    mainBannerDesc: style?.mainBannerDesc || mainBanner_desc_css_,
    mainBannerButton: style?.mainBannerButton || mainBanner_button_css_,
  };

  /* *************** */

  const {
    updateStyle,
    updateContent,
    shallowEqual,
    handleEditContent,
    handleEditStyle,
  } = useEditTemplate();

  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const [editableContent, setEditableContent] = useState(() =>
    updateContent(content, initialContent, isFirstRender.current)
  );
  const [editableStyle, setEditableStyle] = useState(() =>
    updateStyle(style, initialStyle)
  );

  const updatedContent = useMemo(
    () => updateContent(content, initialContent, isFirstRender.current),
    [content, initialContent]
  );
  const updatedStyle = useMemo(
    () => updateStyle(style, initialStyle),
    [style, initialStyle]
  );

  useEffect(() => {
    setEditableContent((prev: any) => {
      const newContent = updateContent(
        content,
        initialContent,
        isFirstRender.current
      );

      // 최초 렌더링 이후에도 `initialContent` 값을 유지하도록 보장
      return Object.keys(newContent).reduce((acc, key) => {
        if (prev[key] === undefined || prev[key] === null) {
          acc[key] = newContent[key]; // ✅ 기존에 값이 없었다면 `newContent` 적용
        } else {
          acc[key] = newContent[key] === "" ? prev[key] : newContent[key]; // ✅ 이후에는 기존 값 유지
        }
        return acc;
      }, {} as any);
    });
  }, [content]);

  useEffect(() => {
    setEditableStyle((prev: any) => {
      if (!shallowEqual(prev, updatedStyle)) {
        return updatedStyle;
      }
      return prev;
    });
  }, [updatedStyle]);

  const memoizedHandleEditContent = useCallback(
    (key: string, value: string) => {
      handleEditContent(key, value, setEditableContent, onChangeContent);
    },
    [handleEditContent, onChangeContent]
  );

  const memoizedHandleEditStyle = useCallback(
    (key: string, value: CSSObject) => {
      handleEditStyle(key, value, setEditableStyle, onChangeStyle);
    },
    [handleEditStyle, onChangeStyle]
  );

  if (!editableContent) {
    return <></>;
  }

  /* ************* */

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
              text={editableContent.mainBannerTitle}
              isTextArea={false}
              defaultCss={editableStyle.mainBannerTitle}
              className="mainBannerTitle"
              onChangeText={(key, value) =>
                memoizedHandleEditContent(key, value)
              }
              onChangeCss={(key, value) => memoizedHandleEditStyle(key, value)}
              id={"mainBannerTitle"}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
            />
          ) : (
            <p css={editableStyle.mainBannerTitle}>
              {editableContent.mainBannerTitle}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={editableContent.mainBannerDesc}
              defaultCss={editableStyle.mainBannerDesc}
              isTextArea={true}
              className="mainBannerDesc"
              onChangeText={(key, value) =>
                memoizedHandleEditContent(key, value)
              }
              onChangeCss={(key, value) => memoizedHandleEditStyle(key, value)}
              id={"mainBannerDesc"}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
              justifyContent="start"
            />
          ) : (
            <p css={editableStyle.mainBannerDesc}>
              {editableContent.mainBannerDesc}
            </p>
          )}
          {isEditable ? (
            <EditableText
              id={"mainBannerButton"}
              text={editableContent.mainBannerButton}
              className="mainBannerButton"
              isTextArea={false}
              defaultCss={editableStyle.mainBannerButton}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              hasBg={true}
              onChangeText={(key, value) =>
                memoizedHandleEditContent(key, value)
              }
              onChangeCss={(key, value) => memoizedHandleEditStyle(key, value)}
            />
          ) : (
            <p css={editableStyle.mainBannerButton}>
              {editableContent.mainBannerButton}
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
  padding: 212px 132px;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;
