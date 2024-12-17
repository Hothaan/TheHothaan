/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";
import ImageBox from "../commonComponent/ImageBox";

const component_title_ = "news board";

const item_title_ = "lorem ipsum, quia do";

const item_desc_ = "lorem ipsum, quia do";

export interface InewsText {
  title?: string;
  desc?: string;
}

export interface InewsContent {
  title?: {
    text?: string;
    css?: CSSObject;
  };
  desc?: {
    text?: string;
    css?: CSSObject;
  };
}

interface Inews {
  content?: InewsContent | null;
  isEditable?: boolean;
  onChange?: (content: InewsContent) => void;
}

function NewsItem(prop: Inews) {
  const { content, isEditable, onChange } = prop;

  return (
    <div css={item_container}>
      <ImageBox
        container={{ width: "100%", height: "380px" }}
        icon={{ width: "80px", height: "80px" }}
        borderRadius="none"
        responsive={{
          maxWidth: 1000,
          container: "",
          icon: "width: 40px; height: 40px;",
        }}
      />
      <div css={item_info_container}>
        <p css={number_style}>483</p>
        <p css={content?.title?.css || news_title_css_}>
          {content?.title?.text || item_title_}
        </p>
        <p css={content?.desc?.css || news_desc_css_}>
          {content?.desc?.text || item_desc_}
        </p>
      </div>
    </div>
  );
}

export default function News(prop: Inews) {
  const { content, isEditable, onChange } = prop;

  const initial = {
    title: {
      text: content?.title?.text || item_title_,
      css: content?.title?.css || news_title_css_,
    },
    desc: {
      text: content?.desc?.text || item_desc_,
      css: content?.desc?.css || news_desc_css_,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (content) {
      setEdit(initial);
    }
  }, [content]);

  function handleEdit(
    field: keyof InewsContent,
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

  const count = 4;

  return (
    <OuterWrap padding="100px">
      <div css={container}></div>
      <Title
        title={component_title_}
        transform="capitalize"
        marginBottom={50}
      />
      <div css={item_list_container}>
        {Array.from({ length: count }, (_, index) => (
          <NewsItem
            key={index}
            content={edit}
            isEditable={isEditable}
            onChange={onChange}
          />
        ))}
      </div>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1520px;
`;

const item_list_container = css`
  width: 100%;
  display: grid;
  gap: 100px;
  grid-template-columns: repeat(2, 1fr);
`;

const item_container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
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

const news_title_css_ = css`
  color: #486284;

  /* mall/subject */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const news_desc_css_ = css`
  color: var(--A0A0A0, #a0a0a0);

  /* mall/subject_small */
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
