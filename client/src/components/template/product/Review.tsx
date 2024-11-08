/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Title from "../commonComponent/Title";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import { ReactComponent as Star } from "@svgs/template/star.svg";

function ReviewItem() {
  return (
    <div css={item}>
      <ImageBox
        container={{ width: "260px", height: "260px" }}
        icon={{ width: "22px", height: "22px" }}
        borderRadius="8px 8px 0 0"
      />
      <div css={info_container}>
        <div css={star_container}>
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
        <p css={item_title}>
          Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
          phasellus mollis sit aliquam sit nullam.
        </p>
        <p css={item_desc}>
          Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
          phasellus mollis sit aliquam sit nullam.
        </p>
        <div css={item_caption_container}>
          <p css={item_caption_title}>Lorem ipsum</p>
          <p css={item_caption_desc}>Lorem ipsum</p>
        </div>
      </div>
    </div>
  );
}

export default function Review() {
  return (
    <OuterWrap padding="80px 0">
      <InnerWrap>
        <div css={text_container}>
          <Title title="Review" transform="capitalize" marginBottom={24} />
          <p css={desc}>
            Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
            phasellus mollis sit aliquam sit nullam.
          </p>
        </div>
        <div css={item_container}>
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
          <ReviewItem />
        </div>
      </InnerWrap>
    </OuterWrap>
  );
}

const text_container = css`
  width: 100%;
  max-width: 900px;
  margin-bottom: 40px;
`;

const desc = css`
  color: var(--Neutral-colors-600, #6d758f);
  text-align: center;
  word-break: keep-all;

  /* h2_small */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 32px */
`;

const item_container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
  @media (max-width: 1000px) {
    overflow: hidden;
  }
`;

const info_container = css`
  display: flex;
  width: 260px;
  height: 260px;
  padding: 24px;
  flex-direction: column;
  gap: 20px;

  border-radius: 0px 0px 8px 8px;
  border: 1px solid var(--Neutral-colors-300, #f1f3f7);
  background: var(--Neutral-colors-100, #fff);

  /* Neutral/Shadow 02 */
  box-shadow: 0px 1px 4px 0px rgba(25, 33, 61, 0.08);
`;

const item = css`
  width: 260px;

  display: flex;
  flex-direction: column;

  border-radius: 8px;
`;

const star_container = css`
  display: flex;
  gap: 4px;
`;

const item_title = css`
  color: var(--Neutral-colors-600, #6d758f);

  display: -webkit-box; /* Flexbox처럼 작동하여 요소를 박스화 */
  -webkit-box-orient: vertical; /* 텍스트가 수직으로 쌓이도록 설정 */
  overflow: hidden; /* 넘치는 텍스트를 숨김 처리 */
  text-overflow: ellipsis; /* 말줄임표(...) 추가 */
  -webkit-line-clamp: 2; /* 두 줄로 제한 */
  height: 41px;

  /* Display/4/Semi Bold */
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 124%;
`;

const item_desc = css`
  color: var(--Neutral-colors-600, #6d758f);
  display: -webkit-box; /* Flexbox처럼 작동하여 요소를 박스화 */
  -webkit-box-orient: vertical; /* 텍스트가 수직으로 쌓이도록 설정 */
  overflow: hidden; /* 넘치는 텍스트를 숨김 처리 */
  text-overflow: ellipsis; /* 말줄임표(...) 추가 */
  -webkit-line-clamp: 2; /* 두 줄로 제한 */
  height: 48px; /* 높이 설정 */

  /* Paragraph/Medium/Regular */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
`;

const item_caption_container = css`
  height: 36px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const item_caption_title = css`
  color: var(--Neutral-colors-600, #6d758f);

  /* Display/3/Semi Bold */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;
const item_caption_desc = css`
  color: var(--Neutral-colors-500, #b4b9c9);

  /* Display/3/Semi Bold */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;