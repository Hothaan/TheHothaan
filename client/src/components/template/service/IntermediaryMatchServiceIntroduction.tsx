/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState, useCallback } from "react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const title_ = "Headline H1";
const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IintermediaryMatchServiceIntroductionContent {
  IntermediaryMatchServiceIntroductionTitle?: string;
  IntermediaryMatchServiceIntroductionDesc?: string;
}

export interface IintermediaryMatchServiceIntroductionStyle {
  IntermediaryMatchServiceIntroductionTitle?: CSSObject;
  IntermediaryMatchServiceIntroductionDesc?: CSSObject;
}

interface IintermediaryMatchServiceIntroduction {
  content?: IintermediaryMatchServiceIntroductionContent | null;
  style?: IintermediaryMatchServiceIntroductionStyle | null;
  isEditable?: boolean;
  onChangeContent?: (key: string, value: string) => void;
  onChangeStyle?: (key: string, value: CSSObject) => void;
}

export const intermediary_match_service_introduction_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",

  // "@media (max-width: 1000px)": {
  //   color: "#486284",
  //   fontFamily: "Inter",
  //   fontSize: "64px",
  //   fontStyle: "normal",
  //   fontWeight: "900",
  //   lineHeight: "150%",
  // },
};

export const intermediary_match_service_introduction_desc_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  wordBreak: "break-all",

  width: "100%",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "100px",
  WebkitLineClamp: "2",
  whiteSpace: "nowrap",

  // "@media (max-width: 1000px)": {
  //   color: "#486284",
  //   fontFamily: "Inter",
  //   fontSize: "32px",
  //   fontStyle: "normal",
  //   fontWeight: "400",
  //   lineHeight: "normal",
  // },
};

export default function IntermediaryMatchServiceIntroduction(
  prop: IintermediaryMatchServiceIntroduction
) {
  const { isEditable, style, content, onChangeContent, onChangeStyle } = prop;

  const initialContent = {
    IntermediaryMatchServiceIntroductionTitle:
      content?.IntermediaryMatchServiceIntroductionTitle || title_,
    IntermediaryMatchServiceIntroductionDesc:
      content?.IntermediaryMatchServiceIntroductionTitle || desc_,
  };

  // const initialStyle = {
  //   IntermediaryMatchServiceIntroductionTitle:
  //     style?.IntermediaryMatchServiceIntroductionTitle ||
  //     intermediary_match_service_introduction_title_css_,
  //   IntermediaryMatchServiceIntroductionDesc:
  //     style?.IntermediaryMatchServiceIntroductionDesc ||
  //     intermediary_match_service_introduction_desc_css_,
  // };

  const initialStyle = {
    IntermediaryMatchServiceIntroductionTitle:
      style?.IntermediaryMatchServiceIntroductionTitle ??
      intermediary_match_service_introduction_title_css_,
    IntermediaryMatchServiceIntroductionDesc:
      style?.IntermediaryMatchServiceIntroductionDesc ??
      intermediary_match_service_introduction_desc_css_,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    setEditableContent((prev: any) => {
      const updatedContent = { ...prev };

      if (
        content?.IntermediaryMatchServiceIntroductionTitle !==
        prev?.IntermediaryMatchServiceIntroductionTitle
      ) {
        updatedContent.IntermediaryMatchServiceIntroductionTitle =
          content?.IntermediaryMatchServiceIntroductionTitle ??
          initialContent.IntermediaryMatchServiceIntroductionTitle;
      }

      if (
        content?.IntermediaryMatchServiceIntroductionDesc !==
        prev?.IntermediaryMatchServiceIntroductionDesc
      ) {
        updatedContent.IntermediaryMatchServiceIntroductionDesc =
          content?.IntermediaryMatchServiceIntroductionDesc ??
          initialContent.IntermediaryMatchServiceIntroductionDesc;
      }

      return JSON.stringify(prev) === JSON.stringify(updatedContent)
        ? prev
        : updatedContent;
    });
  }, [content]);

  useEffect(() => {
    setEditableStyle((prev: any) => {
      const updatedStyle = { ...prev };

      updatedStyle.IntermediaryMatchServiceIntroductionTitle =
        style?.IntermediaryMatchServiceIntroductionTitle ??
        initialStyle.IntermediaryMatchServiceIntroductionTitle;

      updatedStyle.IntermediaryMatchServiceIntroductionDesc =
        style?.IntermediaryMatchServiceIntroductionDesc ??
        initialStyle.IntermediaryMatchServiceIntroductionDesc;

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
      <div css={container}>
        <div css={banner_1_container}>
          <div css={text_container_absolute}>
            {isEditable ? (
              <EditableText
                text={
                  editableContent.IntermediaryMatchServiceIntroductionTitle as string
                }
                className="IntermediaryMatchServiceIntroductionTitle"
                isTextArea={false}
                defaultCss={
                  editableStyle.IntermediaryMatchServiceIntroductionTitle as CSSObject
                }
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
              />
            ) : (
              <p css={editableStyle?.IntermediaryMatchServiceIntroductionTitle}>
                {editableContent?.IntermediaryMatchServiceIntroductionTitle}
              </p>
            )}
            {isEditable ? (
              <EditableText
                text={
                  editableContent.IntermediaryMatchServiceIntroductionDesc as string
                }
                className="IntermediaryMatchServiceIntroductionDesc"
                isTextArea={true}
                defaultCss={
                  editableStyle.IntermediaryMatchServiceIntroductionDesc as CSSObject
                }
                onChangeText={(key, value) => handleEditContent(key, value)}
                onChangeCss={(key, value) => handleEditStyle(key, value)}
              />
            ) : (
              <p css={editableStyle?.IntermediaryMatchServiceIntroductionDesc}>
                {editableContent?.IntermediaryMatchServiceIntroductionDesc}
              </p>
            )}
          </div>
          <ImageBox
            container={{ width: "100%", height: "1120px" }}
            icon={{ width: "100px", height: "100px" }}
            borderRadius="0"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 80px; height: 80px;",
            }}
          />
        </div>
        <div css={banner_2_container}>
          <div css={text_wrap}>
            <div css={text_container}>
              {isEditable ? (
                <EditableText
                  text={
                    editableContent.IntermediaryMatchServiceIntroductionTitle as string
                  }
                  className="IntermediaryMatchServiceIntroductionTitle"
                  isTextArea={false}
                  defaultCss={
                    editableStyle.IntermediaryMatchServiceIntroductionTitle as CSSObject
                  }
                  onChangeText={(key, value) => handleEditContent(key, value)}
                  onChangeCss={(key, value) => handleEditStyle(key, value)}
                />
              ) : (
                <p
                  css={editableStyle?.IntermediaryMatchServiceIntroductionTitle}
                >
                  {editableContent?.IntermediaryMatchServiceIntroductionTitle}
                </p>
              )}
              {isEditable ? (
                <EditableText
                  text={
                    editableContent.IntermediaryMatchServiceIntroductionDesc as string
                  }
                  className="IntermediaryMatchServiceIntroductionDesc"
                  isTextArea={true}
                  defaultCss={
                    editableStyle.IntermediaryMatchServiceIntroductionDesc as CSSObject
                  }
                  onChangeText={(key, value) => handleEditContent(key, value)}
                  onChangeCss={(key, value) => handleEditStyle(key, value)}
                />
              ) : (
                <p
                  css={editableStyle?.IntermediaryMatchServiceIntroductionDesc}
                >
                  {editableContent?.IntermediaryMatchServiceIntroductionDesc}
                </p>
              )}
            </div>
          </div>
          <ImageBox
            container={{ width: "50%", height: "668px" }}
            icon={{ width: "80px", height: "80px" }}
            borderRadius="0"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 80px; height: 80px;",
            }}
          />
        </div>
        <div css={banner_3_container}>
          <ImageBox
            container={{ width: "50%", height: "668px" }}
            icon={{ width: "80px", height: "80px" }}
            borderRadius="0"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 80px; height: 80px;",
            }}
          />
          <div css={text_wrap}>
            <div css={text_container}>
              {isEditable ? (
                <EditableText
                  text={
                    editableContent.IntermediaryMatchServiceIntroductionTitle as string
                  }
                  className="IntermediaryMatchServiceIntroductionTitle"
                  isTextArea={false}
                  defaultCss={
                    editableStyle.IntermediaryMatchServiceIntroductionTitle as CSSObject
                  }
                  onChangeText={(key, value) => handleEditContent(key, value)}
                  onChangeCss={(key, value) => handleEditStyle(key, value)}
                />
              ) : (
                <p
                  css={editableStyle?.IntermediaryMatchServiceIntroductionTitle}
                >
                  {editableContent?.IntermediaryMatchServiceIntroductionTitle}
                </p>
              )}
              {isEditable ? (
                <EditableText
                  text={
                    editableContent.IntermediaryMatchServiceIntroductionDesc as string
                  }
                  className="IntermediaryMatchServiceIntroductionDesc"
                  isTextArea={true}
                  defaultCss={
                    editableStyle.IntermediaryMatchServiceIntroductionDesc as CSSObject
                  }
                  onChangeText={(key, value) => handleEditContent(key, value)}
                  onChangeCss={(key, value) => handleEditStyle(key, value)}
                />
              ) : (
                <p
                  css={editableStyle?.IntermediaryMatchServiceIntroductionDesc}
                >
                  {editableContent?.IntermediaryMatchServiceIntroductionDesc}
                </p>
              )}
            </div>
          </div>
        </div>
        <div css={banner_4_container}>
          {isEditable ? (
            <EditableText
              text={
                editableContent.IntermediaryMatchServiceIntroductionTitle as string
              }
              className="IntermediaryMatchServiceIntroductionTitle"
              isTextArea={false}
              defaultCss={
                editableStyle.IntermediaryMatchServiceIntroductionTitle as CSSObject
              }
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
            />
          ) : (
            <p css={editableStyle?.IntermediaryMatchServiceIntroductionTitle}>
              {editableContent?.IntermediaryMatchServiceIntroductionTitle}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={
                editableContent.IntermediaryMatchServiceIntroductionDesc as string
              }
              className="IntermediaryMatchServiceIntroductionDesc"
              isTextArea={true}
              defaultCss={
                editableStyle.IntermediaryMatchServiceIntroductionDesc as CSSObject
              }
              onChangeText={(key, value) => handleEditContent(key, value)}
              onChangeCss={(key, value) => handleEditStyle(key, value)}
            />
          ) : (
            <p css={editableStyle?.IntermediaryMatchServiceIntroductionDesc}>
              {editableContent?.IntermediaryMatchServiceIntroductionDesc}
            </p>
          )}
        </div>
      </div>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 100px;
  padding-bottom: 240px;
`;
const banner_1_container = css`
  position: relative;
  width: 100%;
  padding-left: 560px;

  @media (max-width: 1000px) {
    padding-left: 280px;
  }
`;

const banner_2_container = css`
  display: flex;
  position: relative;
  width: 100%;
`;

const banner_3_container = css`
  display: flex;
  position: relative;
  width: 100%;
`;
const banner_4_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;

  @media (max-width: 1000px) {
    padding: 0 180px;
  }
`;

const text_wrap = css`
  width: 50%;
`;

const text_container_absolute = css`
  position: absolute;
  top: 160px;
  left: 120px;
  width: 100%;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const text_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;

  padding: 80px 114px;

  @media (max-width: 1000px) {
    padding: 80px 40px 80px 80px;
  }
`;
