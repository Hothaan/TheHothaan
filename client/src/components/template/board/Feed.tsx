/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState, useCallback } from "react";
import Title from "../commonComponent/Title";
import ImageBox from "../commonComponent/ImageBox";
import { OuterWrap } from "../commonComponent/Wrap";
import EditableText from "@components/service/editableText/EditableText";

const item_title_ = "lorem ipsum, quia do";

export interface IfeedContent {
  feedTitle?: string;
}
export interface IfeedStyle {
  feedTitle?: CSSObject;
}

interface Ifeed {
  content?: IfeedContent | null;
  style?: IfeedStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
}

export const feed_item_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
};

function FeedItem(prop: Ifeed) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const count = 36;

  if (content?.feedTitle === undefined || style?.feedTitle === undefined) {
    return <></>;
  }

  return (
    <div css={image_wrap}>
      {Array.from({ length: count }, (_, index) => (
        <div css={item} key={index}>
          <ImageBox
            container={{ width: "100%", height: "280px" }}
            icon={{ width: "40px", height: "40px" }}
            borderRadius="none"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 40px; height: 40px;",
            }}
          />
          {isEditable ? (
            <EditableText
              text={content.feedTitle as string}
              className="feedTitle"
              isTextArea={false}
              defaultCss={style.feedTitle as CSSObject}
              onChangeText={(key, value) => onChangeContent(key, value)}
              onChangeCss={(key, value) => onChangeStyle(key, value)}
            />
          ) : (
            <p css={style?.feedTitle || feed_item_title_css_}>
              {content?.feedTitle || item_title_}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Feed(prop: Ifeed) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const initialContent = {
    feedTitle: content?.feedTitle || item_title_,
  };

  const initialStyle = {
    feedTitle: style?.feedTitle || feed_item_title_css_,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content?.feedTitle !== editableContent?.feedTitle) {
      setEditableContent({
        ...initialContent,
        feedTitle: content?.feedTitle ?? initialContent.feedTitle,
      });
    }
  }, [content]);

  useEffect(() => {
    if (style?.feedTitle !== editableStyle?.feedTitle) {
      setEditableStyle({
        ...initialStyle,
        feedTitle: style?.feedTitle ?? initialStyle.feedTitle,
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

  if (!editableContent) {
    return <></>;
  }

  return (
    <OuterWrap padding="60px 0">
      <Title
        title="Feed"
        weight="bold"
        marginBottom={30}
        transform="capitalize"
      />
      <FeedItem
        content={editableContent}
        style={editableStyle}
        isEditable={isEditable}
        onChangeContent={handleEditContent}
        onChangeStyle={handleEditStyle}
      />
    </OuterWrap>
  );
}

const item = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const image_wrap = css`
  width: 100%;
  padding: 0 45px;
  flex-wrap: wrap;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 30px;

  @media (max-width: 1000px) {
    padding: 0 50px;
    grid-template-columns: repeat(3, 1fr);
  }
`;
