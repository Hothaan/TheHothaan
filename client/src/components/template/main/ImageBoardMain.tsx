/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";

export interface IimageBoardText {
  title?: string;
}

interface IimageBoardMain extends IimageBoardText {}

export interface IimageBoardMainItem extends IimageBoardText {
  idx?: string;
}

const title_ = "게시판";
const item_title_ = "일반게시판(이미지형) 게시판입니다.";
const item_title_id = "image_board_main_item_title";

function ImageBoardMainItem(prop: IimageBoardMainItem) {
  const { idx, title } = prop;

  const container = css`
    display: flex;
    flex-direction: column;
    gap: 20px;
  `;

  const item_title = css`
    color: #486284;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-transform: capitalize;
  `;

  return (
    <div css={container}>
      <ImageBox
        container={{ width: "430px", height: "310px" }}
        icon={{ width: "50px", height: "50px" }}
        borderRadius="none"
        responsive={{
          maxWidth: 1000,
          container: "",
          icon: "width: 50px; height: 50px;",
        }}
      />
      <p css={item_title} id={item_title_id + "_" + idx}>
        {title || item_title_}
      </p>
    </div>
  );
}

export default function ImageBoardMain(prop: IimageBoardMain) {
  const { title } = prop;

  const count = 4;

  return (
    <OuterWrap padding="120px 0">
      <InnerWrap>
        <div css={container}>
          <p css={title_style}>{title_}</p>
          <div css={item_container}>
            {Array.from({ length: count }, (_, index) => (
              <ImageBoardMainItem
                key={index}
                idx={index.toString()}
                title={title || item_title_}
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
  gap: 50px;
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;
