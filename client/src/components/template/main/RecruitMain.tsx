/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";

const component_title_ = "채용";

const title_ = "제목입니다.";

const desc_ =
  "채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. 채용 게시글입니다. ";

const date_ = "2024.11.12";

export interface IrecruitMainContent {
  recruitTitle?: string;
  recruitDesc?: string;
}
export interface IrecruitMainStyle {
  recruitTitle?: CSSObject;
  recruitDesc?: CSSObject;
}

interface IrecruitMain {
  content?: IrecruitMainContent | null;
  style?: IrecruitMainStyle | null;
  isEditable?: boolean;
  onChangeContent?: (key: string, value: string) => void;
  onChangeStyle?: (key: string, value: CSSObject) => void;
}

export const recruit_item_title_css_ = css`
  overflow: hidden;
  color: #486284;
  text-overflow: ellipsis;

  /* pretendard/Regular/20px */
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
  letter-spacing: -0.4px;
`;

export const recruit_item_desc_css_ = css`
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: var(--black-gray-888888, #888);
  text-overflow: ellipsis;

  /* pretendard/Regular/15px */
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 22.5px */
  letter-spacing: -0.15px;
`;

function RecruitMainItem(prop: IrecruitMain) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  return (
    <div css={item_container}>
      <div css={title_container}>
        <div css={title_inner_container}>
          <p css={tag}>NEW</p>
          <p css={style?.recruitTitle || recruit_item_title_css_}>
            {content?.recruitTitle || title_}
          </p>
        </div>
        <p css={date_style}>{date_}</p>
      </div>
      <p css={style?.recruitDesc || recruit_item_desc_css_}>
        {content?.recruitDesc || desc_}
      </p>
    </div>
  );
}

export default function RecruitMain(prop: IrecruitMain) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const initial = {
    recruitTitle: {
      text: content?.recruitTitle || title_,
      css: style?.recruitTitle || recruit_item_title_css_,
    },
    recruitDesc: {
      text: content?.recruitDesc || desc_,
      css: style?.recruitDesc || recruit_item_desc_css_,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (content) {
      setEdit(initial);
    }
  }, [content]);

  // function handleEdit(
  //   field: keyof IrecruitMainContent,
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

  const count = 3;

  return (
    <OuterWrap padding="98px 0">
      <InnerWrap>
        <div css={container}>
          <div css={inner_container}>
            <p css={title_style}>{component_title_}</p>
            <div css={item_wrap}>
              {Array.from({ length: count }, (_, index) => (
                <RecruitMainItem
                  key={index}
                  content={content}
                  isEditable={isEditable}
                  onChangeContent={onChangeContent}
                  onChangeStyle={onChangeStyle}
                />
              ))}
            </div>
          </div>
          <ImageBox
            container={{ width: "calc(50% - 12px)", height: "auto" }}
            icon={{ width: "60px", height: "60px" }}
            borderRadius="none"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 60px; height: 60px;",
            }}
          />
        </div>
      </InnerWrap>
    </OuterWrap>
  );
}

const container = css`
  display: flex;
  width: 100%;
  gap: 24px;
`;

const inner_container = css`
  width: calc(50% - 12px);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const title_style = css`
  color: #486284;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 130%; /* 31.2px */
  letter-spacing: -0.24px;
`;

const item_wrap = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const item_container = css`
  display: flex;
  flex-direction: column;
  padding: 30px 0px;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  border-top: 1px solid var(--stroke-E2E2E2, #e2e2e2);
  border-bottom: 1px solid var(--stroke-E2E2E2, #e2e2e2);
`;

const title_container = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const title_inner_container = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const tag = css`
  display: flex;
  padding: 3px 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #486284;
  border-radius: 100px;
  border: 1px solid #486284;
`;

const date_style = css`
  color: #7d7d7d;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`;
