/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const component_title_ = "media board";

const item_title_ = "lorem ipsum, quia do";

const item_desc_ = "lorem ipsum, quia do";

export interface ImediaContent {
  mediaTitle?: string;
  mediaDesc?: string;
}

export interface ImediaStyle {
  mediaTitle?: CSSObject;
  mediaDesc?: CSSObject;
}

interface Imedia {
  content?: ImediaContent | null;
  style?: ImediaStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
}

export const media_title_css_ = css`
  color: #486284;

  /* mall/subject */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const media_desc_css_ = css`
  color: var(--A0A0A0, #a0a0a0);

  /* mall/subject_small */
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

function MediaItem(prop: Imedia) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  if (
    content?.mediaTitle === undefined ||
    content?.mediaDesc === undefined ||
    style?.mediaTitle === undefined ||
    style?.mediaDesc === undefined
  ) {
    return <></>;
  }

  return (
    <div css={item_container}>
      <ImageBox
        container={{ width: "100%", height: "280px" }}
        icon={{ width: "60px", height: "60px" }}
        borderRadius="none"
        responsive={{
          maxWidth: 1000,
          container: "",
          icon: "width: 40px; height: 40px;",
        }}
      />
      <div css={item_info_container}>
        <p css={number_style}>483</p>
        {isEditable ? (
          <EditableText
            text={content.mediaTitle}
            className="mediaTitle"
            isTextArea={false}
            defaultCss={style.mediaTitle}
            onChangeText={(key, value) => onChangeContent(key, value)}
            onChangeCss={(key, value) => onChangeStyle(key, value)}
          />
        ) : (
          <p css={style?.mediaTitle}>{content?.mediaTitle}</p>
        )}
        {isEditable ? (
          <EditableText
            text={content.mediaDesc}
            className="mediaDesc"
            isTextArea={false}
            defaultCss={style.mediaDesc}
            onChangeText={(key, value) => onChangeContent(key, value)}
            onChangeCss={(key, value) => onChangeStyle(key, value)}
          />
        ) : (
          <p css={style?.mediaDesc}>{content?.mediaDesc}</p>
        )}
      </div>
    </div>
  );
}

export default function Media(prop: Imedia) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const count = 6;

  const initialContent = {
    mediaTitle: content?.mediaTitle || item_title_,
    mediaDesc: content?.mediaDesc || item_desc_,
  };
  const initialStyle = {
    mediaTitle: style?.mediaTitle || media_title_css_,
    mediaDesc: style?.mediaDesc || media_desc_css_,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content) {
      if (content?.mediaDesc) {
        setEditableContent({
          ...initialContent,
          mediaDesc: content.mediaDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          mediaDesc: initialContent.mediaDesc,
        });
      }
      if (content?.mediaTitle) {
        setEditableContent({
          ...initialContent,
          mediaTitle: content.mediaTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          mediaTitle: initialContent.mediaTitle,
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
    <OuterWrap padding="100px 0">
      <Title
        title={component_title_}
        transform="capitalize"
        marginBottom={50}
      />
      <div css={item_list_container}>
        {Array.from({ length: count }, (_, index) => (
          <MediaItem
            key={index}
            isEditable={isEditable}
            content={editableContent}
            style={editableStyle}
            onChangeContent={handleEditContent}
            onChangeStyle={handleEditStyle}
          />
        ))}
      </div>
    </OuterWrap>
  );
}

const item_list_container = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const item_container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-bottom: 50px;
`;

const item_info_container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
`;

const number_style = css`
  color: #486284;

  /* pretendard/Regular/15px */
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 22.5px */
  letter-spacing: -0.15px;
`;
