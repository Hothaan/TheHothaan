/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const title_ = "Headline H1";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IgreetingsContent {
  greetingsHalfTitle?: string;
  greetingsHalfDesc?: string;
  greetingsFullTitle?: string;
  greetingsFullDesc?: string;
}

export interface IgreetingsStyle {
  greetingsHalfTitle?: CSSObject;
  greetingsHalfDesc?: CSSObject;
  greetingsFullTitle?: CSSObject;
  greetingsFullDesc?: CSSObject;
}

interface Igreetings {
  content?: IgreetingsContent | null;
  style?: IgreetingsStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
}

export const greetings_full_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",
  textTransform: "capitalize",
  width: "100%",
  overflow: "hidden" /* 넘치는 텍스트 숨김 */,
  textOverflow: "ellipsis" /* 말줄임표 적용 */,
  whiteSpace: "nowrap" /* 텍스트를 한 줄로 처리 */,
  textAlign: "center",
};

export const greetings_full_desc_css_: CSSObject = {
  wordBreak: "keep-all",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  maxWidth: "676px",
  width: "100%",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: "2",
  textAlign: "center",
};

export const greetings_half_title_css_ = css`
  color: #486284;

  /* H1 */
  font-family: Inter;
  font-size: 96px;
  font-style: normal;
  font-weight: 900;
  line-height: 150%; /* 144px */

  @media (max-width: 1000px) {
    color: #486284;
    font-family: Inter;
    font-size: 50px;
    font-style: normal;
    font-weight: 900;
    line-height: 150%; /* 75px */
  }
`;

export const greetings_half_desc_css_ = css`
  color: #486284;

  /* h2_middle */
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  word-break: break-all;
`;

export default function Greetings(prop: Igreetings) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const initial = {
    greetingsHalfTitle: {
      text: content?.greetingsHalfTitle || title_,
      css: style?.greetingsHalfTitle || greetings_half_title_css_,
    },
    greetingsHalfDesc: {
      text: content?.greetingsHalfDesc || desc_,
      css: style?.greetingsHalfDesc || greetings_half_desc_css_,
    },
    greetingsFullTitle: {
      text: content?.greetingsFullTitle || title_,
      css: style?.greetingsFullTitle || greetings_full_title_css_,
    },
    greetingsFullDesc: {
      text: content?.greetingsFullDesc || desc_,
      css: style?.greetingsFullDesc || greetings_full_desc_css_,
    },
  };

  const initialContent = {
    greetingsHalfTitle: content?.greetingsHalfTitle || title_,
    greetingsHalfDesc: content?.greetingsHalfDesc || desc_,
    greetingsFullTitle: content?.greetingsFullTitle || title_,
    greetingsFullDesc: content?.greetingsFullDesc || desc_,
  };

  const initialStyle = {
    greetingsHalfTitle: style?.greetingsHalfTitle || greetings_half_title_css_,
    greetingsHalfDesc: style?.greetingsHalfDesc || greetings_half_desc_css_,
    greetingsFullTitle: style?.greetingsFullTitle || greetings_full_title_css_,
    greetingsFullDesc: style?.greetingsFullDesc || greetings_full_desc_css_,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content) {
      if (content?.greetingsHalfTitle) {
        setEditableContent({
          ...initialContent,
          greetingsHalfTitle: content.greetingsHalfTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          greetingsHalfTitle: initialContent.greetingsHalfTitle,
        });
      }

      if (content?.greetingsHalfDesc) {
        setEditableContent({
          ...initialContent,
          greetingsHalfDesc: content.greetingsHalfDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          greetingsHalfDesc: initialContent.greetingsHalfDesc,
        });
      }

      if (content?.greetingsFullTitle) {
        setEditableContent({
          ...initialContent,
          greetingsFullTitle: content.greetingsFullTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          greetingsFullTitle: initialContent.greetingsFullTitle,
        });
      }

      if (content?.greetingsFullDesc) {
        setEditableContent({
          ...initialContent,
          greetingsFullDesc: content.greetingsFullDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          greetingsFullDesc: initialContent.greetingsFullDesc,
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
    <OuterWrap padding="0 0 100px 0">
      <div css={wrap}>
        <div css={container}>
          <div css={image_container}>
            <ImageBox
              container={{ width: "100%", height: "860px" }}
              icon={{ width: "110px", height: "110px" }}
              borderRadius="none"
              responsive={{
                maxWidth: 1000,
                container: "",
                icon: "width: 110px; height: 110px;",
              }}
            />
          </div>
          <div css={text_container}>
            {isEditable ? (
              <EditableText
                text={editableContent.greetingsHalfTitle}
                className="greetingsHalfTitle"
                isTextArea={false}
                defaultCss={editableStyle.greetingsHalfTitle}
                onChangeText={(key, value) => onChangeContent(key, value)}
                onChangeCss={(key, value) => onChangeStyle(key, value)}
              />
            ) : (
              <p css={editableStyle?.greetingsHalfTitle}>
                {editableContent?.greetingsHalfTitle}
              </p>
            )}
            {isEditable ? (
              <EditableText
                text={editableContent.greetingsHalfDesc}
                className="greetingsHalfTitle"
                isTextArea={true}
                defaultCss={editableStyle.greetingsHalfDesc}
                onChangeText={(key, value) => onChangeContent(key, value)}
                onChangeCss={(key, value) => onChangeStyle(key, value)}
              />
            ) : (
              <p css={editableStyle?.greetingsHalfDesc}>
                {editableContent?.greetingsHalfDesc}
              </p>
            )}
          </div>
        </div>
        <div css={container}>
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
          <div css={inner_container}>
            {isEditable ? (
              <EditableText
                text={editableContent.greetingsFullTitle}
                className="greetingsFullTitle"
                isTextArea={false}
                defaultCss={editableStyle.greetingsFullTitle}
                onChangeText={(key, value) => onChangeContent(key, value)}
                onChangeCss={(key, value) => onChangeStyle(key, value)}
              />
            ) : (
              <p css={editableStyle?.greetingsFullTitle}>
                {editableContent?.greetingsFullTitle}
              </p>
            )}
            {isEditable ? (
              <EditableText
                text={editableContent.greetingsFullDesc}
                className="greetingsFullDesc"
                isTextArea={true}
                defaultCss={editableStyle.greetingsFullDesc}
                onChangeText={(key, value) => onChangeContent(key, value)}
                onChangeCss={(key, value) => onChangeStyle(key, value)}
              />
            ) : (
              <p css={editableStyle?.greetingsFullDesc}>
                {editableContent?.greetingsFullDesc}
              </p>
            )}
            {isEditable ? (
              <EditableText
                text={editableContent.greetingsFullDesc}
                className="greetingsFullDesc"
                isTextArea={true}
                defaultCss={editableStyle.greetingsFullDesc}
                onChangeText={(key, value) => onChangeContent(key, value)}
                onChangeCss={(key, value) => onChangeStyle(key, value)}
              />
            ) : (
              <p css={editableStyle?.greetingsFullDesc}>
                {editableContent?.greetingsFullDesc}
              </p>
            )}
          </div>
        </div>
        <div css={container}>
          <div css={text_container}>
            {isEditable ? (
              <EditableText
                text={editableContent.greetingsHalfTitle}
                className="greetingsHalfTitle"
                isTextArea={false}
                defaultCss={editableStyle.greetingsHalfTitle}
                onChangeText={(key, value) => onChangeContent(key, value)}
                onChangeCss={(key, value) => onChangeStyle(key, value)}
              />
            ) : (
              <p css={editableStyle?.greetingsHalfTitle}>
                {editableContent?.greetingsHalfTitle}
              </p>
            )}
            {isEditable ? (
              <EditableText
                text={editableContent.greetingsHalfDesc}
                className="greetingsHalfDesc"
                isTextArea={true}
                defaultCss={editableStyle.greetingsHalfDesc}
                onChangeText={(key, value) => onChangeContent(key, value)}
                onChangeCss={(key, value) => onChangeStyle(key, value)}
              />
            ) : (
              <p css={editableStyle?.greetingsHalfDesc}>
                {editableContent?.greetingsHalfDesc}
              </p>
            )}
          </div>
          <div css={image_container}>
            <ImageBox
              container={{ width: "100%", height: "860px" }}
              icon={{ width: "110px", height: "110px" }}
              borderRadius="none"
              responsive={{
                maxWidth: 1000,
                container: "",
                icon: "width: 110px; height: 110px;",
              }}
            />
          </div>
        </div>
      </div>
    </OuterWrap>
  );
}

const wrap = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const container = css`
  width: 100%;
  display: flex;
  position: relative;
`;

const inner_container = css`
  position: absolute;

  width: 100%;
  height: 100%;
  padding: 80px 70px;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 40px;
`;

const image_container = css`
  width: 50%;
  position: relative;
`;

const text_container = css`
  display: flex;
  flex-direction: column;
  gap: 60px;

  width: 50%;
  padding: 110px 144px;

  background-color: #fff;

  @media (max-width: 1000px) {
    padding: 110px 70px;
    gap: 40px;
  }
`;
