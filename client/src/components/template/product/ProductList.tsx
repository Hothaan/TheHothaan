/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useCallback } from "react";
import Title from "../commonComponent/Title";
import { OuterWrap, InnerWrap, ContentsWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import { ReactComponent as ChevDown } from "@svgs/template/chevDownTemplate.svg";
import { ReactComponent as Heart } from "@svgs/template/heart.svg";
import { ReactComponent as Bag } from "@svgs/template/bag.svg";
import EditableText from "@components/service/editableText/EditableText";

const categories_ = "category";

const product_title_ = "lorem ipsum, quia do";

const product_desc_ = "lorem ipsum, quia do";

export interface IproductListContent {
  productListCategories?: string;
  productListProductTitle?: string;
  productListProductDesc?: string;
}

export interface IproductListStyle {
  productListCategories?: CSSObject;
  productListProductTitle?: CSSObject;
  productListProductDesc?: CSSObject;
}

interface IproductList {
  content?: IproductListContent | null;
  style?: IproductListStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
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
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

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

  if (
    content?.productListProductTitle === undefined ||
    content?.productListProductDesc === undefined ||
    style?.productListProductTitle === undefined ||
    style?.productListProductDesc === undefined
  ) {
    return <></>;
  }

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
            {isEditable ? (
              <EditableText
                text={content.productListProductTitle}
                className="productListProductTitle"
                isTextArea={false}
                defaultCss={style.productListProductTitle}
                onChangeText={(key, value) => onChangeContent(key, value)}
                onChangeCss={(key, value) => onChangeStyle(key, value)}
              />
            ) : (
              <p
                css={style?.productListProductTitle || product_list_title_css_}
              >
                {content?.productListProductTitle || product_title_}
              </p>
            )}
            {isEditable ? (
              <EditableText
                text={content.productListProductDesc}
                className="productListProductDesc"
                isTextArea={false}
                defaultCss={style.productListProductDesc}
                onChangeText={(key, value) => onChangeContent(key, value)}
                onChangeCss={(key, value) => onChangeStyle(key, value)}
              />
            ) : (
              <p css={style?.productListProductDesc || product_list_desc_css_}>
                {content?.productListProductDesc || product_desc_}
              </p>
            )}
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
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const initialContent = {
    productListCategories: content?.productListCategories || categories_,
    productListProductTitle: content?.productListProductTitle || product_title_,
    productListProductDesc: content?.productListProductDesc || product_desc_,
  };

  const initialStyle = {
    productListCategories:
      style?.productListCategories || product_list_nav_item_css_,
    productListProductTitle:
      style?.productListProductTitle || product_list_title_css_,
    productListProductDesc:
      style?.productListProductDesc || product_list_desc_css_,
  };

  const [editableContent, setEditableContent] = useState<any>(initialContent);
  const [editableStyle, setEditableStyle] = useState<any>(initialStyle);

  useEffect(() => {
    setEditableContent((prev: any) => {
      const updatedContent = { ...prev };

      if (content?.productListCategories !== prev?.productListCategories) {
        updatedContent.productListCategories =
          content?.productListCategories ??
          initialContent.productListCategories;
      }
      if (content?.productListProductTitle !== prev?.productListProductTitle) {
        updatedContent.productListProductTitle =
          content?.productListProductTitle ??
          initialContent.productListProductTitle;
      }
      if (content?.productListProductDesc !== prev?.productListProductDesc) {
        updatedContent.productListProductDesc =
          content?.productListProductDesc ??
          initialContent.productListProductDesc;
      }

      // 변경된 값이 있다면 상태 업데이트
      return JSON.stringify(prev) === JSON.stringify(updatedContent)
        ? prev
        : updatedContent;
    });
  }, [content]);

  useEffect(() => {
    setEditableStyle((prev: any) => {
      const updatedStyle = { ...prev };

      if (style?.productListCategories !== prev?.productListCategories) {
        updatedStyle.productListCategories =
          style?.productListCategories ?? initialStyle.productListCategories;
      }
      if (style?.productListProductTitle !== prev?.productListProductTitle) {
        updatedStyle.productListProductTitle =
          style?.productListProductTitle ??
          initialStyle.productListProductTitle;
      }
      if (style?.productListProductDesc !== prev?.productListProductDesc) {
        updatedStyle.productListProductDesc =
          style?.productListProductDesc ?? initialStyle.productListProductDesc;
      }

      // 변경된 값이 있다면 상태 업데이트
      return JSON.stringify(prev) === JSON.stringify(updatedStyle)
        ? prev
        : updatedStyle;
    });
  }, [style]);

  const handleEditContent = useCallback(
    (key: string, value: string) => {
      setEditableContent((prev: any) => ({
        ...prev,
        [key]: value,
      }));
      onChangeContent?.(key, value);
    },
    [onChangeContent]
  );

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
    <OuterWrap padding="135px 0">
      <InnerWrap>
        <ContentsWrap>
          <div css={title_wrap}>
            <Title title="category" transform="uppercase" marginBottom={57} />
            <ul css={category_wrap}>
              {Array.from({ length: nav_count }, (_, index) => (
                <li css={nav_item} key={index}>
                  {isEditable ? (
                    <EditableText
                      text={editableContent.productListCategories}
                      className="productListCategories"
                      isTextArea={false}
                      defaultCss={editableStyle.productListCategories}
                      onChangeText={(key, value) => onChangeContent(key, value)}
                      onChangeCss={(key, value) => onChangeStyle(key, value)}
                    />
                  ) : (
                    <p css={editableStyle?.productListCategories}>
                      {editableContent?.productListCategories}
                    </p>
                  )}
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
                    content={editableContent}
                    style={editableStyle}
                    isEditable={isEditable}
                    onChangeContent={handleEditContent}
                    onChangeStyle={handleEditStyle}
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

const count = 3;

const nav_count = 6;

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
