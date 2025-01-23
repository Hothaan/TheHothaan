/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

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
  lineHeight: "150%",
  marginBottom: "80px",
  maxWidth: "676px",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "100px",
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
}

export default function Mainbanner(prop: ImainBanner) {
  const { isEditable, content, style, onChangeContent, onChangeStyle } = prop;

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

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content) {
      if (content?.mainBannerTitle) {
        setEditableContent({
          ...initialContent,
          mainBannerTitle: content.mainBannerTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          mainBannerTitle: initialContent.mainBannerTitle,
        });
      }
      if (content?.mainBannerDesc) {
        setEditableContent({
          ...initialContent,
          mainBannerDesc: content.mainBannerDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          mainBannerDesc: initialContent.mainBannerDesc,
        });
      }
      if (content?.mainBannerButton) {
        setEditableContent({
          ...initialContent,
          mainBannerButton: content.mainBannerButton,
        });
      } else {
        setEditableContent({
          ...initialContent,
          mainBannerButton: initialContent.mainBannerButton,
        });
      }
      setEditableStyle(initialStyle);
    }
  }, [content]);

  function handleEditContent(key: string, value: string) {
    setEditableContent({
      ...editableContent,
      [key]: value,
    });
    onChangeContent?.(key, value);
  }

  function handleEditStyle(key: string, value: CSSObject) {
    setEditableStyle({
      ...editableStyle,
      [key]: value,
    });
    onChangeStyle?.(key, value);
  }

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
              text={editableContent.mainBannerTitle}
              className="mainBannerTitle"
              isTextArea={false}
              defaultCss={editableStyle.mainBannerTitle}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
            />
          ) : (
            <p css={editableStyle.mainBannerTitle}>
              {editableContent.mainBannerTitle}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={editableContent.mainBannerDesc}
              className="mainBannerDesc"
              isTextArea={true}
              defaultCss={editableStyle.mainBannerDesc}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
            />
          ) : (
            <p css={editableStyle.mainBannerDesc}>
              {editableContent.mainBannerDesc}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={editableContent.mainBannerButton}
              className="mainBannerButton"
              isTextArea={false}
              defaultCss={editableStyle.mainBannerButton}
              hasBg={true}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
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
