/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState } from "react";
import Title from "../commonComponent/Title";
import ImageBox from "../commonComponent/ImageBox";
import { OuterWrap } from "../commonComponent/Wrap";

const item_title_ = "lorem ipsum, quia do";

export interface IfeedText {
  title?: string;
}

export interface IfeedContent {
  title?: {
    text?: string;
    css?: CSSObject;
  };
}

interface Ifeed {
  content?: IfeedContent | null;
  isEditable?: boolean;
  onChange?: (content: IfeedContent) => void;
}

export const feed_item_title_css_ = css`
  color: #486284;

  /* mall/subject */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

function FeedItem(prop: Ifeed) {
  const { content, isEditable, onChange } = prop;

  const count = 36;

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
          <p css={content?.title?.css || feed_item_title_css_}>
            {content?.title?.text || item_title_}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Feed(prop: Ifeed) {
  const { content, isEditable, onChange } = prop;

  const initial = {
    title: {
      text: content?.title?.text || item_title_,
      css: content?.title?.css || feed_item_title_css_,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (content) {
      setEdit(initial);
    }
  }, [content]);

  function handleEdit(
    field: keyof IfeedContent,
    updatedText: string,
    updatedCss: CSSObject
  ) {
    const updatedState = {
      ...edit,
      [field]: {
        text: updatedText,
        css: updatedCss,
      },
    };
    setEdit(updatedState);
    onChange?.(updatedState);
  }

  return (
    <OuterWrap padding="60px 0">
      <Title
        title="Feed"
        weight="bold"
        marginBottom={30}
        transform="capitalize"
      />
      <FeedItem content={edit} isEditable={isEditable} onChange={onChange} />
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
