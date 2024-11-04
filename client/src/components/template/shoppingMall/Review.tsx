/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as Image } from "@svgs/template/imageTemplate.svg";
import { ReactComponent as Star } from "@svgs/template/star.svg";

export default function Review() {
  return (
    <div css={wrap}>
      <div css={text_container}>
        <p css={title}>Review</p>
        <p css={desc}>
          Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
          phasellus mollis sit aliquam sit nullam.
        </p>
      </div>
      <div css={item_container}>
        <div css={item}>
          <div css={image_container}>
            <div css={gradient}>
              <Image css={logo} />
            </div>
          </div>
          <div css={info_container}>
            <div css={star_container}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <p css={item_desc}>
              Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
              phasellus mollis sit aliquam sit nullam.
            </p>
            <p css={item_caption}>Lorem ipsum</p>
          </div>
        </div>
        <div css={item}>
          <div css={image_container}>
            <div css={gradient}>
              <Image css={logo} />
            </div>
          </div>
          <div css={info_container}>
            <div css={star_container}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <p css={item_desc}>
              Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
              phasellus mollis sit aliquam sit nullam.
            </p>
            <p css={item_caption}>Lorem ipsum</p>
          </div>
        </div>
        <div css={item}>
          <div css={image_container}>
            <div css={gradient}>
              <Image css={logo} />
            </div>
          </div>
          <div css={info_container}>
            <div css={star_container}>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <p css={item_desc}>
              Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
              phasellus mollis sit aliquam sit nullam.
            </p>
            <p css={item_caption}>Lorem ipsum</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const wrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 120px 112px 80px;
`;

const text_container = css`
  width: 420px;
  margin-bottom: 10px;
`;

const title = css`
  margin-bottom: 24px;
  color: var(--Neutral-colors-600, #6d758f);
  text-align: center;

  /* H2 */
  font-family: Inter;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const desc = css`
  color: var(--Neutral-colors-600, #6d758f);
  text-align: center;

  /* h2_small */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 32px */
`;

const item_container = css`
  display: flex;
  justify-content: center;
  gap: 40px;
`;

const info_container = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const item = css`
  width: 394px;
  display: flex;
  padding: 24px;
  gap: 16px;

  border-radius: 30px;
  background: #f6f6f6;
`;

const image_container = css`
  width: 48px;
  height: 48px;

  flex-shrink: 0;
  border-radius: 50%;
  background-color: #e2e8ef;
`;

const gradient = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #9cb0c900 0%, #9cb0c933 100%);
  border-radius: 50%;
`;

const logo = css`
  width: 22px;
  height: 22px;
`;

const star_container = css`
  display: flex;
  gap: 4px;
`;

const item_desc = css`
  height: 110px;
  color: var(--Neutral-7, #8ca2c0);
  text-overflow: ellipsis;

  /* 17 */
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 27.2px */
`;

const item_caption = css`
  color: var(--Neutral-10, #486284);

  /* 15 */
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 24px */
`;
