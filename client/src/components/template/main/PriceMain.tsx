/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";
import ImageBox from "../commonComponent/ImageBox";

const component_desc_ =
  "Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam.";
const item_desc_ = "Lorem ipsum dolor";
const item_price = 3300;

export interface iPriceMainText extends iPriceMainItem {
  desc?: string;
}

interface iPriceMainItem {
  itemDay?: string;
  itemDesc?: string;
  itemPrice?: number;
}

function PriceMainItem(prop: iPriceMainItem) {
  const { itemDay, itemDesc, itemPrice } = prop;

  return (
    <div css={item_container}>
      <ImageBox
        container={{ width: "100%", height: "400px" }}
        icon={{ width: "60px", height: "60px" }}
        borderRadius="20px"
        responsive={{
          maxWidth: 1000,
          container: "",
          icon: "width: 80px; height: 80px;",
        }}
      />
      <div css={item_text_container}>
        <p css={item_day_text_style}>
          <span css={item_bold_text_64_style}>{itemDay}</span>
          <span>day</span>
        </p>
        <p css={item_desc_text_style}>{itemDesc || item_desc_}</p>
        <p css={item_price_text_style}>
          <span css={item_bold_text_40_style}>
            {itemPrice
              ? itemPrice.toLocaleString()
              : item_price.toLocaleString()}
          </span>
          <span>won</span>
        </p>
      </div>
    </div>
  );
}

export default function PriceMain() {
  const count = 3;

  return (
    <OuterWrap padding="160px 0">
      <ContentsWrap>
        <div css={container}>
          <div>
            <Title title="price" transform="uppercase" marginBottom={24} />
            <p css={component_desc_style}>{component_desc_}</p>
          </div>
          <div css={item_wrap}>
            {Array.from({ length: count }, (_, index) => (
              <PriceMainItem key={index} itemDay={(index + 1).toString()} />
            ))}
          </div>
        </div>
      </ContentsWrap>
    </OuterWrap>
  );
}

const container = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
`;

const component_desc_style = css`
  width: 100%;
  color: var(--Neutral-colors-600, #6d758f);
  text-align: center;

  /* h2_small */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 32px */
`;

const item_wrap = css`
  width: 100%;
  display: flex;
  gap: 30px;
`;

const item_container = css`
  width: 100%;
  position: relative;
`;

const item_text_container = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const item_bold_text_64_style = css`
  color: #486284;
  text-align: center;
  font-family: Inter;
  font-size: 64px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const item_bold_text_40_style = css`
  color: #486284;
  text-align: center;
  font-family: Inter;
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const item_day_text_style = css`
  display: flex;
  align-items: center;
  gap: 4px;

  color: #486284;
  text-align: center;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  text-transform: uppercase;
`;

const item_desc_text_style = css`
  width: 100%;
  max-width: 150px;
  color: #486284;
  text-align: center;

  /* h2_small */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 32px */
`;

const item_price_text_style = css`
  display: flex;
  gap: 4px;
  align-items: center;

  color: #486284;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  text-transform: uppercase;
`;
