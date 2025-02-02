/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import Title from "../commonComponent/Title";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import { ReactComponent as Star } from "@svgs/template/star.svg";
import EditableText from "@components/service/editableText/EditableText";

const title_ =
  "Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam.";
const desc_ =
  "Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam.";
const name_ = "Lorem ipsum";
const role_ = "Lorem ipsum";

export interface IreviewContent {
  reviewTitle?: string;
  reviewDesc?: string;
  reviewName?: string;
  reviewRole?: string;
}

export interface IreviewStyle {
  reviewTitle?: CSSObject;
  reviewDesc?: CSSObject;
  reviewName?: CSSObject;
  reviewRole?: CSSObject;
}

interface Ireview {
  content?: IreviewContent | null;
  style?: IreviewStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
}

export const review_item_title_css: CSSObject = {
  color: "#6d758f",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: "2",
  height: "41px",
  fontFamily: "Inter",
  fontSize: "18px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "124%",
};

export const review_item_desc_css: CSSObject = {
  color: "#6d758f",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: "2",
  maxHeight: "48px",
  fontFamily: "Inter",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "150%",
};

export const review_item_caption_name_css: CSSObject = {
  color: "#6d758f",
  fontFamily: "Inter",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "16px",
};

export const review_item_caption_role_css: CSSObject = {
  color: "#b4b9c9",
  fontFamily: "Inter",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "600",
  lineHeight: "16px",
};

function ReviewItem(prop: Ireview) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  if (
    content?.reviewTitle === undefined ||
    content?.reviewDesc === undefined ||
    content?.reviewName === undefined ||
    content?.reviewRole === undefined ||
    style?.reviewTitle === undefined ||
    style?.reviewDesc === undefined ||
    style?.reviewName === undefined ||
    style?.reviewRole === undefined
  ) {
    return <></>;
  }

  return (
    <div css={item}>
      <ImageBox
        container={{ width: "260px", height: "260px" }}
        icon={{ width: "22px", height: "22px" }}
        borderRadius="8px 8px 0 0"
      />
      <div css={info_container}>
        <div css={star_container}>
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
        {isEditable ? (
          <EditableText
            text={content.reviewTitle}
            className="reviewTitle"
            isTextArea={false}
            defaultCss={style.reviewTitle}
            onChangeText={(key, value) => onChangeContent(key, value)}
            onChangeCss={(key, value) => onChangeStyle(key, value)}
          />
        ) : (
          <p css={style?.reviewTitle}>{content?.reviewTitle || title_}</p>
        )}
        {isEditable ? (
          <EditableText
            text={content.reviewDesc}
            className="reviewDesc"
            isTextArea={true}
            defaultCss={style.reviewDesc}
            onChangeText={(key, value) => onChangeContent(key, value)}
            onChangeCss={(key, value) => onChangeStyle(key, value)}
          />
        ) : (
          <p css={style?.reviewDesc}>{content?.reviewDesc || desc_}</p>
        )}
        <div css={item_caption_container}>
          {isEditable ? (
            <EditableText
              text={content.reviewName}
              className="reviewName"
              isTextArea={false}
              defaultCss={style.reviewName}
              onChangeText={(key, value) => onChangeContent(key, value)}
              onChangeCss={(key, value) => onChangeStyle(key, value)}
            />
          ) : (
            <p css={style?.reviewName}>{content?.reviewName || name_}</p>
          )}
          {isEditable ? (
            <EditableText
              text={content.reviewRole}
              className="reviewRole"
              isTextArea={false}
              defaultCss={style.reviewRole}
              onChangeText={(key, value) => onChangeContent(key, value)}
              onChangeCss={(key, value) => onChangeStyle(key, value)}
            />
          ) : (
            <p css={style?.reviewRole}>{content?.reviewRole || role_}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Review(prop: Ireview) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const count = 7;

  const initialContent = {
    reviewTitle: content?.reviewTitle || title_,
    reviewDesc: content?.reviewDesc || desc_,
    reviewName: content?.reviewName || name_,
    reviewRole: content?.reviewRole || role_,
  };

  const initialStyle = {
    reviewTitle: style?.reviewTitle || review_item_title_css,
    reviewDesc: style?.reviewDesc || review_item_desc_css,
    reviewName: style?.reviewName || review_item_caption_name_css,
    reviewRole: style?.reviewRole || review_item_caption_role_css,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content) {
      if (content?.reviewTitle) {
        setEditableContent({
          ...initialContent,
          reviewTitle: content.reviewTitle,
        });
      }
      if (content?.reviewDesc) {
        setEditableContent({
          ...initialContent,
          reviewDesc: content.reviewDesc,
        });
      }
      if (content?.reviewName) {
        setEditableContent({
          ...initialContent,
          reviewName: content.reviewName,
        });
      }
      if (content?.reviewRole) {
        setEditableContent({
          ...initialContent,
          reviewRole: content.reviewRole,
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
    <OuterWrap padding="80px 0">
      <InnerWrap>
        <div css={text_container}>
          <Title title="Review" transform="capitalize" marginBottom={24} />
          <p css={desc_style}>{desc_}</p>
        </div>
        <div css={item_container}>
          {Array.from({ length: count }, (_, index) => (
            <ReviewItem
              key={index}
              content={editableContent}
              style={editableStyle}
              isEditable={isEditable}
              onChangeContent={handleEditContent}
              onChangeStyle={handleEditStyle}
            />
          ))}
        </div>
      </InnerWrap>
    </OuterWrap>
  );
}

const text_container = css`
  width: 100%;
  max-width: 900px;
  margin-bottom: 40px;
`;

const desc_style = css`
  color: var(--Neutral-colors-600, #6d758f);
  text-align: center;
  word-break: keep-all;

  /* h2_small */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 32px */
`;

const item_container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
  @media (max-width: 1000px) {
    overflow: hidden;
  }
`;

const info_container = css`
  display: flex;
  width: 260px;
  height: 260px;
  padding: 24px;
  flex-direction: column;
  gap: 20px;

  border-radius: 0px 0px 8px 8px;
  border: 1px solid var(--Neutral-colors-300, #f1f3f7);
  background: var(--Neutral-colors-100, #fff);

  /* Neutral/Shadow 02 */
  box-shadow: 0px 1px 4px 0px rgba(25, 33, 61, 0.08);
`;

const item = css`
  width: 260px;

  display: flex;
  flex-direction: column;

  border-radius: 8px;
`;

const star_container = css`
  display: flex;
  gap: 4px;
`;

const item_caption_container = css`
  height: 36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
