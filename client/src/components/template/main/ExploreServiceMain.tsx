/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState } from "react";
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
  onChangeContent?: (key: string, value: string) => void;
  onChangeStyle?: (key: string, value: CSSObject) => void;
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

export const explore_service_button_css_: CSSObject = css`
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 50px;
  border: 1px solid var(--Neutral-10, #486284);
  background: var(--Neutral-10, #486284);

  color: var(--Neutral-0, #fff);

  /* h2_small */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 32px */
`;

export const explore_service_explore_title_css_ = css`
  color: var(--Neutral-10, #486284);

  /* body/small */
  font-family: "DM Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: 0.5px;
`;

export const explore_service_explore_button_css_ = css`
  display: flex;
  width: 380px;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 50px;
  border: 1px solid var(--Neutral-10, #486284);
  background: #fff;

  color: var(--Neutral-10, #486284);

  /* body/small */
  font-family: "DM Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: 0.5px;
`;

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
      style?.exploreServiceButton || explore_service_button_css_,
    exploreServiceExploreTitle:
      style?.exploreServiceExploreTitle || explore_service_explore_title_css_,
    exploreServiceExploreButton:
      style?.exploreServiceExploreButton || explore_service_explore_button_css_,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content) {
      if (content?.exploreServiceTitle) {
        setEditableContent({
          ...initialContent,
          exploreServiceTitle: content.exploreServiceTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          exploreServiceTitle: initialContent.exploreServiceTitle,
        });
      }

      if (content?.exploreServiceButton) {
        setEditableContent({
          ...initialContent,
          exploreServiceButton: content.exploreServiceButton,
        });
      } else {
        setEditableContent({
          ...initialContent,
          exploreServiceButton: initialContent.exploreServiceButton,
        });
      }

      if (content?.exploreServiceExploreTitle) {
        setEditableContent({
          ...initialContent,
          exploreServiceExploreTitle: content.exploreServiceExploreTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          exploreServiceExploreTitle: initialContent.exploreServiceExploreTitle,
        });
      }

      if (content?.exploreServiceExploreButton) {
        setEditableContent({
          ...initialContent,
          exploreServiceExploreButton: content.exploreServiceExploreButton,
        });
      } else {
        setEditableContent({
          ...initialContent,
          exploreServiceExploreButton:
            initialContent.exploreServiceExploreButton,
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
          <div css={text_container}>
            {isEditable ? (
              <EditableText
                text={editableContent?.exploreServiceTitle}
                defaultCss={editableStyle?.exploreServiceTitle}
                className="exploreServiceTitle"
                isTextArea={true}
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
              />
            ) : (
              <p
                css={
                  editableStyle?.exploreServiceTitle?.css ||
                  explore_service_title_css_
                }
              >
                {editableContent?.exploreServiceTitle?.text || title_}
              </p>
            )}
            <ul css={explore_list}>
              {Array.from({ length: count }, (_, index) => (
                <li css={explore_item} key={index}>
                  {isEditable ? (
                    <EditableText
                      text={editableContent?.exploreServiceExploreTitle}
                      defaultCss={editableStyle?.exploreServiceExploreTitle}
                      className="exploreServiceExploreTitle"
                      isTextArea={false}
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
                      text={editableContent?.exploreServiceExploreButton}
                      defaultCss={editableStyle?.exploreServiceExploreButton}
                      className="exploreServiceExploreButton"
                      isTextArea={false}
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
                text={editableContent?.exploreServiceButton}
                defaultCss={editableStyle?.exploreServiceButton}
                className="exploreServiceButton"
                isTextArea={false}
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
              />
            ) : (
              <div css={editableStyle?.exploreServiceButton}>
                {editableContent?.exploreServiceButton}
              </div>
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
