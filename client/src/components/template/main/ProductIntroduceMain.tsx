/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";

const image_desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";
const image_desc_className = "product_introduce_image_desc";

const title_ = "Headline H1";
const title_className = "product_introduce_title";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";
const desc_className = "product_introduce_desc";

export interface IproductIntroduceMainText {
  imageDesc?: string;
  title?: string;
  desc?: string;
}

interface IproductIntroduceMain extends IproductIntroduceMainText {
  isEditable?: boolean;
}

export default function ProductIntroduceMain(prop: IproductIntroduceMain) {
  const { imageDesc, title, desc, isEditable } = prop;

  return (
    <OuterWrap padding="0">
      <div css={container}>
        <div css={image_container}>
          <ImageBox
            container={{ width: "100%", height: "860px" }}
            icon={{ width: "110px", height: "110px" }}
            borderRadius="none"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 110px; height: 110px;",
            }}
          />
          <p css={image_desc} className={image_desc_className}>
            {imageDesc || image_desc_}
          </p>
        </div>
        <div css={text_container}>
          <p css={title_style} className={title_className}>
            {title || title_}
          </p>
          <p css={desc_style} className={desc_className}>
            {desc || desc_}
          </p>
          <p css={desc_style} className={desc_className}>
            {desc || desc_}
          </p>
        </div>
      </div>
      <div css={container}>
        <div css={text_container}>
          <p css={title_style} className={title_className}>
            {title || title_}
          </p>
          <p css={desc_style} className={desc_className}>
            {desc || desc_}
          </p>
          <p css={desc_style} className={desc_className}>
            {desc || desc_}
          </p>
        </div>
        <div css={image_container}>
          <ImageBox
            container={{ width: "100%", height: "860px" }}
            icon={{ width: "110px", height: "110px" }}
            borderRadius="none"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 110px; height: 110px;",
            }}
          />
          <p css={image_desc} className={image_desc_className}>
            {imageDesc || image_desc_}
          </p>
        </div>
      </div>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  display: flex;
`;

const image_container = css`
  width: 50%;
  position: relative;
`;

const image_desc = css`
  width: calc(100% - 140px);
  position: absolute;
  bottom: 70px;
  left: 70px;
  color: #486284;
  word-break: break-all;

  /* h2_middle */
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const text_container = css`
  display: flex;
  flex-direction: column;
  gap: 60px;

  width: 50%;
  padding: 110px 144px;

  background-color: #fff;

  @media (max-width: 1000px) {
    padding: 110px 70px;
    gap: 40px;
  }
`;

const title_style = css`
  color: #486284;

  /* H1 */
  font-family: Inter;
  font-size: 96px;
  font-style: normal;
  font-weight: 900;
  line-height: 150%; /* 144px */

  @media (max-width: 1000px) {
    color: #486284;
    font-family: Inter;
    font-size: 50px;
    font-style: normal;
    font-weight: 900;
    line-height: 150%; /* 75px */
  }
`;

const desc_style = css`
  color: #486284;

  /* h2_middle */
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  word-break: break-all;
`;
