/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";

const component_title_ = "뉴스";

const item_title_ = "뉴스 제목입니다. 뉴스 제목입니다. 뉴스 제목입니다.";

const item_tag_ = "뉴스 카테고리";

export interface InewsMainContent {
  newsTitle?: string;
}

export interface InewsMainStyle {
  newsTitle?: CSSObject;
}

interface InewsMain {
  content?: InewsMainContent | null;
  style?: InewsMainStyle | null;
  isEditable?: boolean;
  onChangeContent?: (key: string, value: string) => void;
  onChangeStyle?: (key: string, value: CSSObject) => void;
}

export const news_main_item_title_css_ = css`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;

  color: #486284;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: capitalize;
`;

function NewsMainItem(prop: InewsMain) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  return (
    <div css={item}>
      <ImageBox
        container={{ width: "100%", height: "310px" }}
        icon={{ width: "50px", height: "50px" }}
        borderRadius="none"
        responsive={{
          maxWidth: 1000,
          container: "",
          icon: "width: 50px; height: 50px;",
        }}
      />
      <div css={info_container}>
        <p css={item_tag}>{item_tag_}</p>
        <p css={style?.newsTitle || news_main_item_title_css_}>
          {content?.newsTitle || item_title_}
        </p>
      </div>
    </div>
  );
}

export default function NewsMain(prop: InewsMain) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const initial = {
    title: {
      text: content?.newsTitle || item_title_,
      css: style?.newsTitle || news_main_item_title_css_,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (content) {
      setEdit(initial);
    }
  }, [content]);

  // function handleEdit(
  //   field: keyof InewsMainContent,
  //   updatedText: string,
  //   updatedCss: CSSObject
  // ) {
  //   const updatedState = {
  //     ...edit,
  //     [field]: {
  //       text: updatedText,
  //       css: updatedCss,
  //     },
  //   };
  //   setEdit(updatedState);
  //   onChange?.(updatedState);
  // }

  const count = 6;

  return (
    <OuterWrap padding="86px 0">
      <div css={container}>
        <p css={title_style}>{component_title_}</p>
        <div css={item_container}>
          {Array.from({ length: count }, (_, index) => (
            <NewsMainItem key={index} content={content} />
          ))}
        </div>
      </div>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 0 60px;
`;

const title_style = css`
  color: #486284;
  text-align: center;
  font-family: "Noto Sans KR";
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 32px; /* 100% */
`;

const item_container = css`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const item = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const info_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const item_tag = css`
  display: flex;
  padding: 4px 16px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: 1px solid #486284;

  color: #486284;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-transform: capitalize;
  white-space: nowrap;
`;
