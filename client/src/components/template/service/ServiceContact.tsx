/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const title_ = [`Lorem ipsum dolor`, <br key="1" />, `sit amet consectetur`];
const button_ = "Lorem ipsum dolor";

export interface IserviceContactContent {
  serviceContactTitle?: string;
  serviceContactButton?: string;
}
export interface IserviceContactStyle {
  serviceContactTitle?: CSSObject;
  serviceContactButton?: CSSObject;
}

interface IserviceContact {
  content?: IserviceContactContent | null;
  style?: IserviceContactStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
}

export const service_contact_title_css_: CSSObject = {
  width: "100%",
  color: "#486284",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "50px",
  fontStyle: "normal",
  fontWeight: "800",
  lineHeight: "normal",
};

export const service_contact_button_css_ = css`
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;

  width: fit-content;

  border-radius: 50px;
  background: var(--Neutral-10, #486284);

  color: var(--Neutral-0, #fff);

  /* h2_small */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 32px */
  text-align: center;
`;

export default function ServiceContact(prop: IserviceContact) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const initialContent = {
    serviceContactTitle: content?.serviceContactTitle || title_,
    serviceContactButton: content?.serviceContactButton || button_,
  };

  const initialStyle = {
    serviceContactTitle:
      style?.serviceContactTitle || service_contact_title_css_,
    serviceContactButton:
      style?.serviceContactButton || service_contact_button_css_,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content) {
      if (content?.serviceContactTitle) {
        setEditableContent({
          ...initialContent,
          serviceContactTitle: content.serviceContactTitle,
        });
      }
      if (content?.serviceContactButton) {
        setEditableContent({
          ...initialContent,
          serviceContactButton: content.serviceContactButton,
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
          container={{ width: "100%", height: "740px" }}
          icon={{ width: "210px", height: "210px" }}
          borderRadius="none"
          responsive={{
            maxWidth: 1000,
            container: "",
            icon: "width: 110px; height: 108px;",
          }}
        />
        <div css={contents_container}>
          {isEditable ? (
            <EditableText
              text={editableContent.serviceContactTitle}
              className="serviceContactTitle"
              isTextArea={false}
              defaultCss={editableStyle.serviceContactTitle}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
            />
          ) : (
            <p css={editableStyle?.serviceContactTitle}>
              {editableContent?.serviceContactTitle || title_}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={editableContent.serviceContactButton}
              className="serviceContactButton"
              isTextArea={false}
              hasBg={true}
              defaultCss={editableStyle.serviceContactButton}
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
            />
          ) : (
            <p css={editableStyle?.serviceContactButton}>
              {editableContent?.serviceContactButton || button_}
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

const contents_container = css`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 120px 112px;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
`;
