/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";
import useEditTemplate from "@hooks/useEditTemplate";

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
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const service_contact_title_css_: CSSObject = {
  color: "#486284",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "50px",
  fontStyle: "normal",
  fontWeight: "800",
  lineHeight: "1.25em",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "calc(2 * 1.25em)",
  WebkitLineClamp: "2",
};

export const service_contact_button_css_: CSSObject = {
  display: "flex",
  padding: "12px 20px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50px",
  background: "var(--Neutral-10, #486284)",
  color: "var(--Neutral-0, #fff)",
  fontFamily: "Inter",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "1.6em",
  textAlign: "center",

  width: "fit-content",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export default function ServiceContact(prop: IserviceContact) {
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

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
              isTextArea={true}
              defaultCss={editableStyle.serviceContactTitle as CSSObject}
              onChangeText={(key, value) =>
                memoizedHandleEditContent(key, value)
              }
              onChangeCss={(key, value) => memoizedHandleEditStyle(key, value)}
              id={"serviceContactTitle"}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
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
              onChangeText={(key, value) =>
                memoizedHandleEditContent(key, value)
              }
              onChangeCss={(key, value) => memoizedHandleEditStyle(key, value)}
              id={"serviceContactButton"}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
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
