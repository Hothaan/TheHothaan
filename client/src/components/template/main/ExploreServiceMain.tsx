/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState, useCallback } from "react";
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
};

export const explore_service_explore_title_css_: CSSObject = {
  color: "var(--Neutral-10, #486284)",
  fontFamily: "DM Sans",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "24px",
  letterSpacing: "0.5px",
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
};

export default function ExploreServiceMain(prop: IexploreService) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;
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
      style?.exploreServiceTitle || explore_service_button_css_,
    exploreServiceExploreTitle:
      style?.exploreServiceExploreTitle || explore_service_explore_title_css_,
    exploreServiceExploreButton:
      style?.exploreServiceExploreButton || explore_service_explore_button_css_,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(initialStyle);

  useEffect(() => {
    if (content?.exploreServiceTitle !== editableContent?.exploreServiceTitle) {
      setEditableContent({
        ...initialContent,
        exploreServiceTitle:
          content?.exploreServiceTitle ?? initialContent.exploreServiceTitle,
      });
    }

    if (
      content?.exploreServiceButton !== editableContent?.exploreServiceButton
    ) {
      setEditableContent({
        ...initialContent,
        exploreServiceButton:
          content?.exploreServiceButton ?? initialContent.exploreServiceButton,
      });
    }

    if (
      content?.exploreServiceExploreTitle !==
      editableContent?.exploreServiceExploreTitle
    ) {
      setEditableContent({
        ...initialContent,
        exploreServiceExploreTitle:
          content?.exploreServiceExploreTitle ??
          initialContent.exploreServiceExploreTitle,
      });
    }

    if (
      content?.exploreServiceExploreButton !==
      editableContent?.exploreServiceExploreButton
    ) {
      setEditableContent({
        ...initialContent,
        exploreServiceExploreButton:
          content?.exploreServiceExploreButton ??
          initialContent.exploreServiceExploreButton,
      });
    }
  }, [content]);

  useEffect(() => {
    setEditableStyle((prev: any) => {
      const updatedStyle = { ...prev };

      if (style?.exploreServiceTitle !== prev?.exploreServiceTitle) {
        updatedStyle.exploreServiceTitle =
          style?.exploreServiceTitle ?? initialStyle.exploreServiceTitle;
      }

      if (style?.exploreServiceButton !== prev?.exploreServiceButton) {
        updatedStyle.exploreServiceButton =
          style?.exploreServiceButton ?? initialStyle.exploreServiceButton;
      }

      if (
        style?.exploreServiceExploreTitle !== prev?.exploreServiceExploreTitle
      ) {
        updatedStyle.exploreServiceExploreTitle =
          style?.exploreServiceExploreTitle ??
          initialStyle.exploreServiceExploreTitle;
      }

      if (
        style?.exploreServiceExploreButton !== prev?.exploreServiceExploreButton
      ) {
        updatedStyle.exploreServiceExploreButton =
          style?.exploreServiceExploreButton ??
          initialStyle.exploreServiceExploreButton;
      }

      // 변경된 값이 있다면 상태 업데이트
      return JSON.stringify(prev) === JSON.stringify(updatedStyle)
        ? prev
        : updatedStyle;
    });
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
          <div css={text_container}>
            {isEditable ? (
              <EditableText
                text={editableContent.exploreServiceTitle as string}
                className="exploreServiceTitle"
                isTextArea={false}
                defaultCss={editableStyle.exploreServiceTitle as CSSObject}
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
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
