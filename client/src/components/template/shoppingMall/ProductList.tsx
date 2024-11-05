/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as Image } from "@svgs/template/imageTemplate.svg";
import { ReactComponent as SlideButton } from "@svgs/template/slideButton.svg";

export default function ProductList() {
  return (
    <div css={wrap}>
      <p css={title}>category</p>
      <div css={slide_container}>
        <div css={slide_item}>
          <div css={slide_image}>
            <SlideButton css={slide_button_prev} />
            <div css={gradient}>
              <Image css={image_icon} />
            </div>
          </div>
          <div css={text_container}>
            <div css={product_info_container}>
              <p css={product_name}>상품명</p>
              <p css={product_desc}>상품 설명</p>
            </div>
            <div css={product_price_container}>
              <p css={product_price_sale}>50,000원</p>
              <p css={product_price}>70,000원</p>
            </div>
          </div>
        </div>
        <div css={slide_item}>
          <div css={slide_image}>
            <div css={gradient}>
              <Image css={image_icon} />
            </div>
          </div>
          <div css={text_container}>
            <div css={product_info_container}>
              <p css={product_name}>상품명</p>
              <p css={product_desc}>상품 설명</p>
            </div>
            <div css={product_price_container}>
              <p css={product_price_sale}>50,000원</p>
              <p css={product_price}>70,000원</p>
            </div>
          </div>
        </div>
        <div css={slide_item}>
          <div css={slide_image}>
            <SlideButton css={slide_button_next} />
            <div css={gradient}>
              <Image css={image_icon} />
            </div>
          </div>
          <div css={text_container}>
            <div css={product_info_container}>
              <p css={product_name}>상품명</p>
              <p css={product_desc}>상품 설명</p>
            </div>
            <div css={product_price_container}>
              <p css={product_price_sale}>50,000원</p>
              <p css={product_price}>70,000원</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const wrap = css`
  width: 100%;
  max-width: 1920px;
  min-width: 1000px;

  padding: 100px 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const title = css`
  margin-bottom: 50px;

  color: #486284;
  text-align: center;
  font-family: Inter;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-transform: uppercase;
`;

const slide_container = css`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 26px;
`;

const slide_item = css`
  width: 100%;
  max-width: 418px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const slide_image = css`
  position: relative;
  width: 100%;
  max-width: 418px;
  height: 420px;
  background-color: #eff2f6;
`;

const slide_button_prev = css`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`;
const slide_button_next = css`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%) scaleX(-1);
`;

const gradient = css`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #9cb0c900 0%, #9cb0c933 100%);
`;

const image_icon = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
`;

const text_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const product_info_container = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const product_name = css`
  color: #486284;
  text-align: center;

  /* mall/subject */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const product_desc = css`
  color: var(--A0A0A0, #a0a0a0);
  text-align: center;

  /* mall/subject_small */
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const product_price_container = css`
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const product_price_sale = css`
  color: #486284;
  text-align: center;

  /* mall/price_bold */
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const product_price = css`
  color: var(--A0A0A0, #a0a0a0);
  text-align: center;

  /* mall/price_small */
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration: line-through;
`;
