/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Title from "../commonComponent/Title";
import { OuterWrap, InnerWrap, ContentsWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import NavItem from "../commonComponent/NavItem";
import { ReactComponent as Heart } from "@svgs/template/heart.svg";
import { ReactComponent as Bag } from "@svgs/template/bag.svg";

const product_title_ = "lorem ipsum, quia do";
const product_title_id = "product_list_item_title";

const product_desc_ = "lorem ipsum, quia do";
const product_desc_id = "product_list_item_desc";

export interface IproductListItem {
  title?: string;
  desc?: string;
  row?: string;
  idx?: string;
}

export interface IproductListText {
  categories?: string[];
  product?: {
    title?: string;
    desc?: string;
  };
}

export interface IproductList extends IproductListText {}

function ProductListItem(prop: IproductListItem) {
  const { title, desc, row, idx } = prop;

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

  const product_name = css`
    color: #486284;
    text-align: left;

    /* mall/subject */
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `;

  const product_desc = css`
    color: var(--A0A0A0, #a0a0a0);
    text-align: left;

    /* mall/subject_small */
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
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
            <p css={product_name} id={product_title_id + "_" + idx + "_" + row}>
              {title || product_title_}
            </p>
            <p css={product_desc} id={product_desc_id + "_" + idx + "_" + row}>
              {desc || product_desc_}
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
  const { categories, product } = prop;

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
              {categories ? (
                categories.map((category, idx) => (
                  <NavItem key={idx} isOption={false} category={category} />
                ))
              ) : (
                <>
                  <NavItem isOption={true} />
                  <NavItem isOption={true} />
                  <NavItem isOption={false} />
                  <NavItem isOption={false} />
                  <NavItem isOption={false} />
                  <NavItem isOption={false} />
                </>
              )}
            </ul>
          </div>
          <div css={item_rows_container}>
            {Array.from({ length: count }, (_, index1) => (
              <div css={item_container} key={index1}>
                {Array.from({ length: count }, (_, index2) => (
                  <ProductListItem
                    key={index2}
                    title={product?.title || product_title_}
                    desc={product?.desc || product_desc_}
                    idx={index2.toString()}
                    row={index1.toString()}
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
