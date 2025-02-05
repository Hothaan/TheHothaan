/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useCallback } from "react";
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

export const service_contact_button_css_: CSSObject = {
  display: "flex",
  padding: "12px 20px",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  borderRadius: "50px",
  background: "var(--Neutral-10, #486284)",
  color: "var(--Neutral-0, #fff)",
  fontFamily: "Inter",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "160%",
  textAlign: "center",
};

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
    if (content?.serviceContactTitle !== editableContent?.serviceContactTitle) {
      setEditableContent({
        ...initialContent,
        serviceContactTitle:
          content?.serviceContactTitle ?? initialContent.serviceContactTitle,
      });
    }
    if (
      content?.serviceContactButton !== editableContent?.serviceContactButton
    ) {
      setEditableContent({
        ...initialContent,
        serviceContactButton:
          content?.serviceContactButton ?? initialContent.serviceContactButton,
      });
    }
  }, [content]);

  useEffect(() => {
    if (style?.serviceContactTitle !== editableStyle?.serviceContactTitle) {
      setEditableStyle({
        ...initialStyle,
        serviceContactTitle:
          style?.serviceContactTitle ?? initialStyle.serviceContactTitle,
      });
    }
    if (style?.serviceContactButton !== editableStyle?.serviceContactButton) {
      setEditableStyle({
        ...initialStyle,
        serviceContactButton:
          style?.serviceContactButton ?? initialStyle.serviceContactButton,
      });
    }
  }, [style]);

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

  function handleEditStyle(key: string, value: CSSObject) {
    setEditableStyle({
      ...editableStyle,
      [key]: value,
    });
    onChangeStyle?.(key, value);
  }

  console.log(editableContent);
  console.log(editableStyle);

  if (!editableContent || !editableStyle) {
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
              text={editableContent.serviceContactTitle as string}
              className="serviceContactTitle"
              isTextArea={false}
              defaultCss={editableStyle.serviceContactTitle as CSSObject}
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
              text={editableContent.serviceContactButton as string}
              className="serviceContactButton"
              isTextArea={false}
              hasBg={true}
              defaultCss={editableStyle.serviceContactButton as CSSObject}
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
