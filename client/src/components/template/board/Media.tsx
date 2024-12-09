/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";
import ImageBox from "../commonComponent/ImageBox";

const title_ = "media board";
const item_title_ = "lorem ipsum, quia do";
const item_desc_ = "lorem ipsum, quia do";

export interface ImediaItem {
  title?: string;
  desc?: string;
}

function MediaItem(prop: ImediaItem) {
  const { title, desc } = prop;

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
        <p css={item_title_style}>{title || item_title_}</p>
        <p css={item_desc_style}>{desc || item_desc_}</p>
      </div>
    </div>
  );
}

export default function Media() {
  const count = 6;

  return (
    <OuterWrap padding="100px 0">
      <Title title={title_} transform="capitalize" marginBottom={50} />
      <div css={item_list_container}>
        {Array.from({ length: count }, (_, index) => (
          <MediaItem key={index} />
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

const item_title_style = css`
  color: #486284;

  /* mall/subject */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const item_desc_style = css`
  color: var(--A0A0A0, #a0a0a0);

  /* mall/subject_small */
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
