/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import Title from "../commonComponent/Title";
import { OuterWrap, InnerWrap, ContentsWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import { ReactComponent as ChevDown } from "@svgs/template/chevDownTemplate.svg";
import { ReactComponent as Heart } from "@svgs/template/heart.svg";
import { ReactComponent as Bag } from "@svgs/template/bag.svg";

const categories_ = [
  "category",
  "category",
  "category",
  "category",
  "category",
  "category",
];

const product_title_ = "lorem ipsum, quia do";

const product_desc_ = "lorem ipsum, quia do";

export interface IproductListText {
  categories?: string[];
  productTitle?: string;
  productDesc?: string;
}

export interface IproductListContent {
  categories?: {
    text?: string[];
    css?: CSSObject;
  };
  productTitle?: {
    text?: string;
    css?: CSSObject;
  };
  productDesc?: {
    text?: string;
    css?: CSSObject;
  };
}

interface IproductList {
  content?: IproductListContent | null;
  isEditable?: boolean;
  onChange?: (content: IproductListContent) => void;
}

export const product_list_title_css_: CSSObject = {
  color: "#486284",
  textAlign: "left",
  fontFamily: "Inter",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
};

export const product_list_desc_css_: CSSObject = {
  color: "#a0a0a0",
  textAlign: "left",
  fontFamily: "Inter",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
};

export const product_list_nav_item_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "normal",
  textTransform: "capitalize",
};

function ProductListItem(prop: IproductList) {
  const { content, isEditable, onChange } = prop;

  const slide_item = css`
    width: 100%;
    max-width: 280px;
    display: flex;
    flex-direction: column;
    gap: 20px;
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

  const info_container = css`
    display: flex;
    gap: 14px;
  `;

  const product_price_container = css`
    width: 100%;
    justify-content: start;
    display: flex;
    align-items: center;
    gap: 10px;
  `;

  const product_price_sale = css`
    color: #486284;
    text-align: left;

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

  const icon_container = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
  `;

  return (
    <div css={slide_item}>
      <ImageBox
        container={{ width: "280px", height: "280px" }}
        icon={{ width: "50px", height: "50px" }}
        borderRadius="none"
      />
      <div css={info_container}>
        <div css={text_container}>
          <div css={product_info_container}>
            <p css={content?.productTitle?.css || product_list_title_css_}>
              {content?.productTitle?.text || product_title_}
            </p>
            <p css={content?.productDesc?.css || product_list_desc_css_}>
              {content?.productDesc?.text || product_desc_}
            </p>
          </div>
          <div css={product_price_container}>
            <p css={product_price_sale}>50,000원</p>
            <p css={product_price}>70,000원</p>
            <p css={product_price_sale}>36%</p>
          </div>
        </div>
        <div css={icon_container}>
          <Heart />
          <Bag />
        </div>
      </div>
    </div>
  );
}

export default function ProductList(prop: IproductList) {
  const { content, isEditable, onChange } = prop;

  const initial = {
    categories: {
      text: content?.categories?.text || categories_,
      css: content?.categories?.css || product_list_nav_item_css_,
    },
    productTitle: {
      text: content?.productTitle?.text || product_title_,
      css: content?.productTitle?.css || product_list_title_css_,
    },
    productDesc: {
      text: content?.productDesc?.text || product_desc_,
      css: content?.productDesc?.css || product_list_desc_css_,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (content) {
      setEdit(initial);
    }
  }, [content]);

  function handleEdit(
    field: keyof IproductListContent,
    updatedText: string,
    updatedCss: CSSObject
  ) {
    const updatedState = {
      ...edit,
      [field]: {
        text: updatedText,
        css: updatedCss,
      },
    };
    setEdit(updatedState);
    onChange?.(updatedState);
  }

  const count = 3;

  const item_rows_container = css`
    display: flex;
    flex-direction: column;
    gap: 100px;
  `;

  const item_container = css`
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 26px;
  `;

  const title_wrap = css`
    width: 100%;
    margin-bottom: 100px;
  `;
  const category_wrap = css`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `;

  return (
    <OuterWrap padding="135px 0">
      <InnerWrap>
        <ContentsWrap>
          <div css={title_wrap}>
            <Title title="category" transform="uppercase" marginBottom={57} />
            <ul css={category_wrap}>
              {edit?.categories?.text
                ? edit?.categories?.text.map((category, idx) => (
                    <li css={nav_item} key={idx}>
                      <p
                        css={
                          edit?.categories?.css || product_list_nav_item_css_
                        }
                      >
                        {category || "category"}
                      </p>
                      <ChevDown />
                    </li>
                  ))
                : categories_.map((category, idx) => (
                    <li css={nav_item} key={idx}>
                      <p
                        css={
                          edit?.categories?.css || product_list_nav_item_css_
                        }
                      >
                        {category || "category"}
                      </p>
                      <ChevDown />
                    </li>
                  ))}
            </ul>
          </div>
          <div css={item_rows_container}>
            {Array.from({ length: count }, (_, index1) => (
              <div css={item_container} key={index1}>
                {Array.from({ length: count }, (_, index2) => (
                  <ProductListItem
                    key={index2}
                    content={edit}
                    isEditable={isEditable}
                    onChange={onChange}
                  />
                ))}
              </div>
            ))}
          </div>
        </ContentsWrap>
      </InnerWrap>
    </OuterWrap>
  );
}

const nav_item = css`
  display: flex;
  align-items: center;
`;
