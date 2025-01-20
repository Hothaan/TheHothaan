/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState } from "react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";

const component_title_ = "게시판";

const title_ =
  "글 제목입니다. 글 제목입니다. 영역을 넘어갈 시 말줄임표가 적용됩니다.글 제목입니다. 글 제목입니다. 영역을 넘어갈 시 말줄임표가 적용됩니다.";
const title_className = "normal_board_main_title";

const date_ = "2025.09.31";

export interface InormalBoardContent {
  boardTitle: string;
}
export interface InormalBoardStyle {
  boardTitle: CSSObject;
}

interface InormalBoardMain {
  content?: InormalBoardContent | null;
  style?: InormalBoardStyle | null;
  isEditable?: boolean;
  onChange?: (content: InormalBoardContent) => void;
}

export const nomal_board_main_title_css_ = css`
  width: 50%;
  color: var(--Greys-Blue-Grey-800, #444a6d);
  font-family: "Noto Sans KR";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */

  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

export function NormalBoardMainItem(prop: InormalBoardMain) {
  const { content, style, isEditable, onChange } = prop;

  return (
    <div css={item_container}>
      <p
        css={style?.boardTitle || nomal_board_main_title_css_}
        className={title_className}
      >
        {content?.boardTitle || title_}
      </p>
      <div css={inner_container}>
        <p css={date_style}>{date_}</p>
        <button type="button" css={button}>
          바로가기
        </button>
      </div>
    </div>
  );
}

export default function NormalBoardMain(prop: InormalBoardMain) {
  const { content, style, isEditable, onChange } = prop;

  const initial = {
    boardTitle: {
      text: content?.boardTitle || title_,
      css: style?.boardTitle || nomal_board_main_title_css_,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (content) {
      setEdit(initial);
    }
  }, [content]);

  // function handleEdit(
  //   field: keyof InormalBoardContent,
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
    <OuterWrap padding="74px 0">
      <InnerWrap>
        <div css={container}>
          <p css={title_style}>{component_title_}</p>
          <div css={item_wrap}>
            {Array.from({ length: count }, (_, index) => (
              <NormalBoardMainItem
                content={content}
                isEditable={isEditable}
                onChange={onChange}
                key={index}
              />
            ))}
          </div>
        </div>
      </InnerWrap>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
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
  width: 100%;

  display: flex;
  padding: 20px 0px;
  justify-content: space-between;
  align-items: center;

  border-bottom: 1px solid #e9e9e9;
`;

const inner_container = css`
  display: flex;

  align-items: center;
  gap: 26px;
`;

const date_style = css`
  color: #486284;
  text-align: center;
  font-family: "Noto Sans KR";
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 123.077% */
`;

const button = css`
  padding: 4px 10px;
  display: flex;
  flex-direction: column;
  justify-title: center;
  flex-shrink: 0;

  border-radius: 100px;
  background: #f3f3f3;

  color: #a5a5a5;
  text-align: center;
  font-family: "Noto Sans KR";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
