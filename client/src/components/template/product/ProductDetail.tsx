/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import BreadCrumble from "../commonComponent/BreadCrumble";
import TemplateBadge from "../commonComponent/TemplateBadge";
import TemplateButton from "../commonComponent/TemplateButton";
import TemplateAccordion from "../commonComponent/TemplateAccordion";
import Pagination from "../commonComponent/Pagination";
import { ReactComponent as Heart } from "@svgs/template/heart.svg";
import { ReactComponent as Plus } from "@svgs/template/productAmountPlus.svg";
import { ReactComponent as Minus } from "@svgs/template/productAmountMinus.svg";
import EditableText from "@components/service/editableText/EditableText";

const product_title_ = "상품제목입니다";
const product_desc_ = "상품 설명 내용입니다.";

const more_product_title_ = "lorem ipsum, quia do";
const more_product_desc_ = "lorem ipsum, quia do";

export interface IproductDetailContent {
  productDetailProductTitle?: string;
  productDetailProductDesc?: string;
  productDetailMoreProductTitle?: string;
  productDetailMoreProductDesc?: string;
}
export interface IproductDetailStyle {
  productDetailProductTitle?: CSSObject;
  productDetailProductDesc?: CSSObject;
  productDetailMoreProductTitle?: CSSObject;
  productDetailMoreProductDesc?: CSSObject;
}

interface IproductDetail {
  content?: IproductDetailContent | null;
  style?: IproductDetailStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
}

export const product_detail_product_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
};

export const product_detail_product_desc_css_: CSSObject = {
  color: "#999",
  textAlign: "left",
  fontFamily: "Inter",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "160%",
};

export const product_detail_more_product__option_main_title_css: CSSObject = {
  color: "#486284",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",

  width: "100%",
  textOverflow: "ellipsis",
  overflow: "hidden",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "1",
};

export const product_detail_more_product__option_main_desc_css: CSSObject = {
  color: "#a0a0a0",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
};

function ProductDetailInfo(prop: IproductDetail) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const top_container = css`
    width: 100%;
    display: flex;
    gap: 60px;
  `;

  const top_info_container = css`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    gap: 50px;
  `;

  const breadCrumble_container = css`
    display: flex;
    width: 100%;
    justify-content: end;
  `;

  const prodcut_info_container = css`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 13px;
  `;

  const product_price_container = css`
    display: flex;
    width: 100%;
    gap: 8px;
    align-items: center;
  `;

  const product_price_sale = css`
    color: #486284;
    text-align: left;

    /* mall/price_bold */
    font-family: Inter;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%;
  `;

  const product_price = css`
    color: #989898;

    /* 17 */
    font-family: Inter;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%;
    text-decoration-line: strikethrough;
  `;

  const product_amount_container = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 13px;
  `;

  const product_amount_controller_container = css`
    width: 100%;
    display: flex;
    padding: 10px 0px;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    align-self: stretch;
    border-bottom: 1px solid #486284;
  `;

  const product_amount_name = css`
    align-self: stretch;
    width: 100%;
    color: #486284;

    /* 13 */
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 20.8px */
  `;

  const product_amount_controller = css`
    width: 100%;
    display: flex;
    align-items: center;
  `;

  const icon_container = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
  `;

  const amount_container = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 30px;
  `;

  const amount_text = css`
    color: #486284;

    /* 13 */
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
  `;

  const product_price_calculated = css`
    width: 100%;

    display: flex;
    justify-content: end;
    color: #486284;

    /* 17 */
    font-family: Inter;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%; /* 27.2px */
  `;

  const product_action_container = css`
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
  `;

  const like_button = css`
    display: flex;
    width: 50px;
    height: 50px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    background: #f9f9f9;
  `;

  if (
    content?.productDetailProductTitle === undefined ||
    content?.productDetailProductDesc === undefined ||
    style?.productDetailProductTitle === undefined ||
    style?.productDetailProductDesc === undefined
  ) {
    return <></>;
  }

  return (
    <div css={top_container}>
      <ImageBox
        container={{ width: "480px", height: "480px" }}
        icon={{ width: "58px", height: "58px" }}
        borderRadius="0"
      />
      <div css={top_info_container}>
        <div css={breadCrumble_container}>
          <BreadCrumble path1="홈" path2="SHOP" />
        </div>
        <div css={prodcut_info_container}>
          <TemplateBadge text="카테고리" />
          {isEditable ? (
            <EditableText
              text={content.productDetailProductTitle}
              className="productDetailProductTitle"
              isTextArea={false}
              defaultCss={style.productDetailProductTitle}
              onChangeText={(key, value) => onChangeContent(key, value)}
              onChangeCss={(key, value) => onChangeStyle(key, value)}
            />
          ) : (
            <p
              css={
                style.productDetailProductTitle ||
                product_detail_product_title_css_
              }
            >
              {content?.productDetailProductTitle || product_title_}
            </p>
          )}

          <div css={product_price_container}>
            <p css={product_price}>32,000원</p>
            <p css={product_price_sale}>32,000원</p>
          </div>
          {isEditable ? (
            <EditableText
              text={content.productDetailProductDesc}
              className="productDetailProductDesc"
              isTextArea={false}
              defaultCss={style.productDetailProductDesc}
              onChangeText={(key, value) => onChangeContent(key, value)}
              onChangeCss={(key, value) => onChangeStyle(key, value)}
            />
          ) : (
            <p
              css={
                style.productDetailProductDesc ||
                product_detail_product_desc_css_
              }
            >
              {content?.productDetailProductDesc || product_desc_}
            </p>
          )}
        </div>
        <div css={product_amount_container}>
          <div css={product_amount_controller_container}>
            <p css={product_amount_name}>
              {content?.productDetailProductTitle || product_title_}
            </p>

            <div css={product_amount_controller}>
              <div css={icon_container}>
                <Minus />
              </div>
              <div css={amount_container}>
                <p css={amount_text}>1</p>
              </div>
              <div css={icon_container}>
                <Plus />
              </div>
            </div>
          </div>
          <p css={product_price_calculated}>5,000원</p>
        </div>
        <div css={product_action_container}>
          <TemplateButton text="장바구니 담기" type="square" color="dark" />
          <TemplateButton text="바로구매" type="square" color="light" />
          <div css={like_button}>
            <Heart />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductDetailAccordion() {
  const accordion_container = css`
    width: 100%;
  `;
  return (
    <>
      <div css={accordion_container}>
        <TemplateAccordion text="product inpormation" isOpen={false} />
        <TemplateAccordion text="Q & A" isOpen={false} />
        <TemplateAccordion text="recommended item" isOpen={false} />
      </div>
    </>
  );
}

function ProductDetailList(prop: IproductDetail) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const count = 3;

  const container = css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  `;

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

  if (
    content?.productDetailMoreProductTitle === undefined ||
    content?.productDetailMoreProductDesc === undefined ||
    style?.productDetailMoreProductTitle === undefined ||
    style?.productDetailMoreProductDesc === undefined
  ) {
    return <></>;
  }

  return (
    <div css={container}>
      {Array.from({ length: count }, (_, index) => (
        <div css={slide_item} key={index}>
          <ImageBox
            container={{ width: "280px", height: "280px" }}
            icon={{ width: "50px", height: "50px" }}
            borderRadius="none"
          />
          <div css={text_container}>
            <div css={product_info_container}>
              {isEditable ? (
                <EditableText
                  text={content.productDetailMoreProductTitle as string}
                  className="productDetailMoreProductTitle"
                  isTextArea={false}
                  defaultCss={style.productDetailMoreProductTitle as CSSObject}
                  onChangeText={(key, value) => onChangeContent(key, value)}
                  onChangeCss={(key, value) => onChangeStyle(key, value)}
                />
              ) : (
                <p css={style?.productDetailMoreProductTitle}>
                  {content?.productDetailMoreProductTitle}
                </p>
              )}
              {isEditable ? (
                <EditableText
                  text={content.productDetailMoreProductDesc as string}
                  className="productDetailMoreProductDesc"
                  isTextArea={false}
                  defaultCss={style.productDetailMoreProductDesc as CSSObject}
                  onChangeText={(key, value) => onChangeContent(key, value)}
                  onChangeCss={(key, value) => onChangeStyle(key, value)}
                />
              ) : (
                <p css={style?.productDetailMoreProductDesc}>
                  {content?.productDetailMoreProductDesc}
                </p>
              )}
            </div>
            <div css={product_price_container("main")}>
              <p css={product_price_sale("main")}>50,000원</p>
              <p css={product_price}>70,000원</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductDetailReview() {
  const accordion_container = css`
    width: 100%;
  `;
  return (
    <>
      <div css={accordion_container}>
        <TemplateAccordion text="Review" isOpen={false} />
      </div>
    </>
  );
}

export default function ProductDetail(prop: IproductDetail) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const container = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
  `;

  const initialContent = {
    productDetailProductTitle:
      content?.productDetailProductTitle || product_title_,
    productDetailProductDesc:
      content?.productDetailProductDesc || product_desc_,
    productDetailMoreProductTitle:
      content?.productDetailMoreProductTitle || more_product_title_,
    productDetailMoreProductDesc:
      content?.productDetailMoreProductDesc || more_product_desc_,
  };

  const initialStyle = {
    productDetailProductTitle:
      style?.productDetailProductTitle || product_detail_product_title_css_,
    productDetailProductDesc:
      style?.productDetailProductDesc || product_detail_product_desc_css_,
    productDetailMoreProductTitle:
      style?.productDetailMoreProductTitle ||
      product_detail_more_product__option_main_title_css,
    productDetailMoreProductDesc:
      style?.productDetailMoreProductDesc ||
      product_detail_more_product__option_main_desc_css,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content) {
      if (content?.productDetailProductTitle) {
        setEditableContent({
          ...initialContent,
          productDetailProductTitle: content.productDetailProductTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          productDetailProductTitle: initialContent.productDetailProductTitle,
        });
      }

      if (content?.productDetailProductDesc) {
        setEditableContent({
          ...initialContent,
          productDetailProductDesc: content.productDetailProductDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          productDetailProductDesc: initialContent.productDetailProductDesc,
        });
      }

      if (content?.productDetailMoreProductTitle) {
        setEditableContent({
          ...initialContent,
          productDetailMoreProductTitle: content.productDetailMoreProductTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          productDetailMoreProductTitle:
            initialContent.productDetailMoreProductTitle,
        });
      }

      if (content?.productDetailMoreProductDesc) {
        setEditableContent({
          ...initialContent,
          productDetailMoreProductDesc: content.productDetailMoreProductDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          productDetailMoreProductDesc:
            initialContent.productDetailMoreProductDesc,
        });
      }
      setEditableStyle(initialStyle);
    }
  }, [content]);

  function handleEditContent(key: string, value: string) {
    setEditableContent({
      ...editableContent,
      [key]: value,
    });
    onChangeContent?.(key, value);
  }

  function handleEditStyle(key: string, value: CSSObject) {
    setEditableStyle({
      ...editableStyle,
      [key]: value,
    });
    onChangeStyle?.(key, value);
  }

  if (!editableContent) {
    return <></>;
  }

  return (
    <OuterWrap padding="200px 0">
      <ContentsWrap>
        <div css={container}>
          <ProductDetailInfo
            content={editableContent}
            style={editableStyle}
            isEditable={isEditable}
            onChangeContent={handleEditContent}
            onChangeStyle={handleEditStyle}
          />
          <ProductDetailAccordion />
          <ProductDetailList
            content={editableContent}
            style={editableStyle}
            isEditable={isEditable}
            onChangeContent={handleEditContent}
            onChangeStyle={handleEditStyle}
          />
          <ProductDetailReview />
          <Pagination />
          <ImageBox
            container={{ width: "900px", height: "900px" }}
            icon={{ width: "100px", height: "100px" }}
            borderRadius="0"
          />
        </div>
      </ContentsWrap>
    </OuterWrap>
  );
}
