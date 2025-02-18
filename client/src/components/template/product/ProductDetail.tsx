/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useCallback, useMemo } from "react";
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
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const product_detail_product_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const product_detail_product_desc_css_: CSSObject = {
  color: "#999",
  textAlign: "left",
  fontFamily: "Inter",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "1.6em",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "calc(4 * 1.6em)",
  WebkitLineClamp: "4",
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
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const product_detail_more_product__option_main_desc_css: CSSObject = {
  color: "#a0a0a0",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",

  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

function ProductDetailInfo(prop: IproductDetail) {
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

  const top_container = css`
    width: 100%;
    display: flex;
    gap: 60px;
  `;

  const top_info_container = css`
    display: flex;
    width: 100%;
    // height: 100%;
    height: auto;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    // gap: 50px;
    justify-content: space-between;
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
    align-items: center;
    height: auto;
    padding: 10px 0px;
    justify-content: space-between;
    gap: 20px;
    align-self: stretch;
    border-bottom: 1px solid #486284;
  `;

  const product_amount_name = css`
    width: 100%;
    color: #486284;
    font-family: Inter;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
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
              id={"productDetailProductTitle"}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
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
              isTextArea={true}
              defaultCss={style.productDetailProductDesc}
              onChangeText={(key, value) => onChangeContent(key, value)}
              onChangeCss={(key, value) => onChangeStyle(key, value)}
              id={"productDetailProductDesc"}
              activeEditor={activeEditor}
              setActiveEditor={setActiveEditor}
              isWidth100={true}
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
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

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
                  id={"productDetailMoreProductTitle" + index}
                  activeEditor={activeEditor}
                  setActiveEditor={setActiveEditor}
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
                  id={"productDetailMoreProductDesc" + index}
                  activeEditor={activeEditor}
                  setActiveEditor={setActiveEditor}
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
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

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

  // const [activeEditor, setActiveEditor] = useState<string | undefined>(
  //   undefined
  // );

  const updateValues = (source: any, initial: any) => {
    return Object.keys(initial).reduce((acc, key) => {
      const value = source?.[key];
      acc[key] = value === "" ? initial[key] : value ?? initial[key];
      return acc;
    }, {} as any);
  };

  const [editableContent, setEditableContent] = useState(() =>
    updateValues(content, initialContent)
  );
  const [editableStyle, setEditableStyle] = useState(() =>
    updateValues(style, initialStyle)
  );

  // `useMemo`로 최적화된 업데이트 값 생성
  const updatedContent = useMemo(
    () => updateValues(content, initialContent),
    [content, initialContent]
  );
  const updatedStyle = useMemo(
    () => updateValues(style, initialStyle),
    [style, initialStyle]
  );

  useEffect(() => {
    setEditableContent((prev: any) => {
      // 기존 객체와 새 객체를 비교하여 변경된 경우에만 업데이트
      if (!shallowEqual(prev, updatedContent)) {
        return { ...prev, ...updatedContent };
      }
      return prev;
    });
  }, [updatedContent]);

  useEffect(() => {
    setEditableStyle((prev: any) => {
      if (!shallowEqual(prev, updatedStyle)) {
        return updatedStyle;
      }
      return prev;
    });
  }, [updatedStyle]);

  // 얕은 비교를 수행하는 함수
  const shallowEqual = (objA: any, objB: any) => {
    if (Object.is(objA, objB)) return true;

    if (
      !objA ||
      !objB ||
      typeof objA !== "object" ||
      typeof objB !== "object"
    ) {
      return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => Object.is(objA[key], objB[key]));
  };

  const handleEditContent = useCallback(
    (key: string, value: string) => {
      setEditableContent((prev: any) => {
        if (prev[key] === value) return prev; // 값이 동일하면 업데이트 안 함
        return { ...prev, [key]: value };
      });
      onChangeContent?.(key, value);
    },
    [onChangeContent]
  );

  const handleEditStyle = useCallback(
    (key: string, value: CSSObject) => {
      setEditableStyle((prev: any) => ({
        ...prev,
        [key]: value,
      }));
      onChangeStyle?.(key, value);
    },
    [onChangeStyle]
  );

  const container = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  if (
    !editableContent ||
    editableContent.productDetailProductTitle === undefined ||
    editableContent.productDetailProductDesc === undefined ||
    editableContent.productDetailMoreProductTitle === undefined ||
    editableContent.productDetailMoreProductDesc === undefined
  ) {
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
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
          />
          <ProductDetailAccordion />
          <ProductDetailList
            content={editableContent}
            style={editableStyle}
            isEditable={isEditable}
            onChangeContent={handleEditContent}
            onChangeStyle={handleEditStyle}
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
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
