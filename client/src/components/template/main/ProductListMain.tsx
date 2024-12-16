/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import Title from "../commonComponent/Title";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import { ReactComponent as Heart } from "@svgs/template/heart.svg";
import { ReactComponent as Bag } from "@svgs/template/bag.svg";

const title_ = "lorem ipsum, quia do";

const desc_ = "lorem ipsum, quia do";

export interface IproductListText {
  title?: string;
  desc?: string;
}

export interface IproductListContent {
  title?: {
    text?: string;
    css?: Record<string, string>;
  };
  desc?: {
    text?: string;
    css?: Record<string, string>;
  };
}

interface IproductListItem extends IproductList {}

interface IproductList {
  content?: IproductListContent | null;
  isEditable?: boolean;
  onChange?: (content: IproductListContent) => void;
  option: "main" | "list";
}

export const product_list_option_main_title_css: Record<string, string> = {
  color: "#486284",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
};

export const product_list_option_list_title_css: Record<string, string> = {
  color: "#486284",
  textAlign: "left",
  fontFamily: "Inter",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
};

export const product_list_option_main_desc_css: Record<string, string> = {
  color: "#a0a0a0",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
};

export const product_list_option_list_desc_css: Record<string, string> = {
  color: "#a0a0a0",
  textAlign: "left",
  fontFamily: "Inter",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
};

function ProductListItemMain(prop: IproductListItem) {
  const { option, content, isEditable, onChange } = prop;

  const [productListMain, setProductListMain] = useState({
    title: {
      text: content?.title?.text || title_,
      css:
        content?.title?.css ||
        (option === "main"
          ? product_list_option_main_title_css
          : product_list_option_list_title_css),
    },
    desc: {
      text: content?.desc?.text || desc_,
      css:
        content?.desc?.css ||
        (option === "list"
          ? product_list_option_main_desc_css
          : product_list_option_list_desc_css),
    },
  });

  useEffect(() => {
    if (content) {
      setProductListMain({
        title: {
          text: content?.title?.text || title_,
          css:
            content?.title?.css ||
            (option === "main"
              ? product_list_option_main_title_css
              : product_list_option_list_title_css),
        },
        desc: {
          text: content?.desc?.text || desc_,
          css:
            content?.desc?.css ||
            (option === "list"
              ? product_list_option_main_desc_css
              : product_list_option_list_desc_css),
        },
      });
    }
  }, [content]);

  function handleEdit(
    field: keyof IproductListContent,
    updatedText: string,
    updatedCss: Record<string, string>
  ) {
    const updatedState = {
      ...productListMain,
      [field]: {
        text: updatedText,
        css: updatedCss,
      },
    };
    setProductListMain(updatedState);
    onChange?.(updatedState);
  }

  if (option === "main") {
    return (
      <div css={slide_item}>
        <ImageBox
          container={{ width: "280px", height: "280px" }}
          icon={{ width: "50px", height: "50px" }}
          borderRadius="none"
        />
        <div css={text_container}>
          <div css={product_info_container}>
            <p css={product_list_option_main_title_css}>
              {content?.title?.text || title_}
            </p>
            <p css={product_list_option_main_desc_css}>
              {content?.desc?.text || desc_}
            </p>
          </div>
          <div css={product_price_container(option)}>
            <p css={product_price_sale(option)}>50,000원</p>
            <p css={product_price}>70,000원</p>
          </div>
        </div>
      </div>
    );
  } else {
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
              <p css={product_list_option_list_title_css}>
                {content?.title?.text || title_}
              </p>
              <p css={product_list_option_list_desc_css}>
                {content?.desc?.text || desc_}
              </p>
            </div>
            <div css={product_price_container(option)}>
              <p css={product_price_sale(option)}>50,000원</p>
              <p css={product_price}>70,000원</p>
              <p css={product_price_sale(option)}>36%</p>
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
}

export default function ProductListMain(prop: IproductList) {
  const { option, content, isEditable, onChange } = prop;

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

  if (option === "main") {
    return (
      <OuterWrap padding="135px 0">
        <InnerWrap>
          <Title title="category" transform="uppercase" marginBottom={57} />
          <div css={item_container}>
            {Array.from({ length: count }, (_, index) => (
              <ProductListItemMain
                option={option}
                content={content}
                key={index}
              />
            ))}
          </div>
        </InnerWrap>
      </OuterWrap>
    );
  } else {
    return (
      <OuterWrap padding="135px 0">
        <InnerWrap>
          <Title title="category" transform="uppercase" marginBottom={57} />
          <div css={item_rows_container}>
            {Array.from({ length: count }, (_, index1) => (
              <div css={item_container} key={index1}>
                {Array.from({ length: count }, (_, index2) => (
                  <ProductListItemMain
                    option={option}
                    key={index2}
                    content={content}
                  />
                ))}
              </div>
            ))}
          </div>
        </InnerWrap>
      </OuterWrap>
    );
  }
}

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

const product_price_container = (option: string) => css`
  width: 100%;
  justify-content: ${option === "main" ? "center" : "start"};
  display: flex;
  align-items: center;
  gap: 10px;
`;

const product_price_sale = (option: string) => css`
  color: #486284;
  text-align: ${option === "main" ? "center" : "left"};

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

export { ProductListItemMain };
