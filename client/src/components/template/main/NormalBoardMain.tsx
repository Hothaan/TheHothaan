/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";

export interface InormalBoardText {
  title?: string;
}

interface InormalBoardMain extends InormalBoardText {}

export interface INormalBoardMainItem extends InormalBoardText {
  idx?: string;
}

const component_title_ = "게시판";

const title_ =
  "글 제목입니다. 글 제목입니다. 영역을 넘어갈 시 말줄임표가 적용됩니다.글 제목입니다. 글 제목입니다. 영역을 넘어갈 시 말줄임표가 적용됩니다.";
const title_id = "normal_board_main_title";

const date_ = "2025.09.31";

export function NormalBoardMainItem(prop: INormalBoardMainItem) {
  const { title, idx } = prop;

  const container = css`
    width: 100%;

    display: flex;
    padding: 20px 0px;
    justify-content: space-between;
    align-items: center;

    border-bottom: 1px solid #e9e9e9;
  `;

  const title_style = css`
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

  return (
    <div css={container}>
      <p css={title_style} id={title_id + "_" + idx}>
        {title || title_}
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
  const { title } = prop;

  const count = 3;

  return (
    <OuterWrap padding="74px 0">
      <InnerWrap>
        <div css={container}>
          <p css={title_style}>{component_title_}</p>
          <div css={item_container}>
            {Array.from({ length: count }, (_, index) => (
              <NormalBoardMainItem
                title={title || title_}
                key={index}
                idx={index.toString()}
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

const item_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
