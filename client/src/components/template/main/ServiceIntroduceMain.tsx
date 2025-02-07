/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const title_ = "Headline H1";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IserviceIntroduceContent {
  serviceIntroduceTitle?: string;
  serviceIntroduceDesc?: string;
}
export interface IserviceIntroduceStyle {
  serviceIntroduceTitle?: CSSObject;
  serviceIntroduceDesc?: CSSObject;
}

export interface IserviceIntroduce {
  content?: IserviceIntroduceContent | null;
  style?: IserviceIntroduceStyle | null;
  isEditable?: boolean;
  onChangeContent?: (key: string, value: string) => void;
  onChangeStyle?: (key: string, value: CSSObject) => void;
}

export const service_introduce_title_css: CSSObject = {
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

export const service_introduce_desc_css: CSSObject = {
  wordBreak: "keep-all",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  maxWidth: "676px",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: "2",
};

export default function ServiceIntroduce(prop: IserviceIntroduce) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const initialContent = {
    serviceIntroduceTitle: content?.serviceIntroduceTitle || title_,
    serviceIntroduceDesc: content?.serviceIntroduceDesc || desc_,
  };

  const initialStyle = {
    serviceIntroduceTitle:
      style?.serviceIntroduceTitle || service_introduce_title_css,
    serviceIntroduceDesc:
      style?.serviceIntroduceDesc || service_introduce_desc_css,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content) {
      if (content?.serviceIntroduceTitle) {
        setEditableContent({
          ...initialContent,
          serviceIntroduceTitle: content.serviceIntroduceTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          serviceIntroduceTitle: initialContent.serviceIntroduceTitle,
        });
      }

      if (content?.serviceIntroduceDesc) {
        setEditableContent({
          ...initialContent,
          serviceIntroduceDesc: content.serviceIntroduceDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          serviceIntroduceDesc: initialContent.serviceIntroduceDesc,
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
              text={editableContent?.serviceIntroduceTitle || title_}
              defaultCss={
                editableStyle?.serviceIntroduceTitle ||
                service_introduce_title_css
              }
              isTextArea={false}
              className="serviceIntroduceTitle"
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
            />
          ) : (
            <p
              css={
                editableStyle?.serviceIntroduceTitle ||
                service_introduce_title_css
              }
            >
              {editableContent?.serviceIntroduceTitle || title_}
            </p>
          )}

          {isEditable ? (
            <EditableText
              text={editableContent?.serviceIntroduceDesc || desc_}
              defaultCss={
                editableStyle?.serviceIntroduceDesc ||
                service_introduce_desc_css
              }
              isTextArea={true}
              className="serviceIntroduceDesc"
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
            />
          ) : (
            <p
              css={
                editableStyle?.serviceIntroduceDesc ||
                service_introduce_desc_css
              }
            >
              {editableContent?.serviceIntroduceDesc || desc_}
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
  padding: 80px 70px;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 40px;
`;
