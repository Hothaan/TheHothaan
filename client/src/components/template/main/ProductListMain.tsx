/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Title from "../commonComponent/Title";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import { ReactComponent as Heart } from "@svgs/template/heart.svg";
import { ReactComponent as Bag } from "@svgs/template/bag.svg";
import EditableText from "@components/service/editableText/EditableText";
import useEditTemplate from "@hooks/useEditTemplate";

const title_ = "lorem ipsum, quia do";

const desc_ = "lorem ipsum, quia do";

export interface IproductListContent {
  productListTitle?: string;
  productListDesc?: string;
}

export interface IproductListStyle {
  productListTitle?: CSSObject;
  productListDesc?: CSSObject;
}

interface IproductListItem extends IproductList {}

interface IproductList {
  content?: IproductListContent | null;
  style?: IproductListStyle | null;
  isEditable?: boolean;
  option: "main" | "list";
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const product_list_option_main_title_css: CSSObject = {
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

export const product_list_option_list_title_css: CSSObject = {
  color: "#486284",
  textAlign: "left",
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

export const product_list_option_main_desc_css: CSSObject = {
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

export const product_list_option_list_desc_css: CSSObject = {
  color: "#a0a0a0",
  textAlign: "left",
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

function ProductListItemMain(prop: IproductListItem) {
  const {
    option,
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
    index,
  } = prop;

  if (
    content?.productListTitle === undefined ||
    content?.productListDesc === undefined ||
    style?.productListTitle === undefined ||
    style?.productListDesc === undefined
  ) {
    return <></>;
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
            {isEditable ? (
              <EditableText
                text={content.productListTitle}
                className="productListTitle"
                isTextArea={false}
                defaultCss={style.productListTitle}
                onChangeText={(key, value) => onChangeContent(key, value)}
                onChangeCss={(key, value) => onChangeStyle(key, value)}
                id={"productListTitle" + index}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
              />
            ) : (
              <p css={style?.productListTitle}>
                {content?.productListTitle || title_}
              </p>
            )}
            {isEditable ? (
              <EditableText
                text={content.productListDesc}
                className="productListDesc"
                isTextArea={false}
                defaultCss={style.productListDesc}
                onChangeText={(key, value) => onChangeContent(key, value)}
                onChangeCss={(key, value) => onChangeStyle(key, value)}
                id={"productListDesc" + index}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
              />
            ) : (
              <p css={style?.productListDesc}>
                {content?.productListDesc || desc_}
              </p>
            )}
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
              {isEditable ? (
                <EditableText
                  id={"productListTitle" + index}
                  text={content.productListTitle}
                  className="productListTitle"
                  isTextArea={false}
                  defaultCss={style.productListTitle}
                  activeEditor={activeEditor}
                  setActiveEditor={setActiveEditor}
                  onChangeText={(key, value) => onChangeContent(key, value)}
                  onChangeCss={(key, value) => onChangeStyle(key, value)}
                />
              ) : (
                <p css={style?.productListTitle}>
                  {content?.productListTitle || title_}
                </p>
              )}
              {isEditable ? (
                <EditableText
                  text={content.productListDesc}
                  className="productListDesc"
                  isTextArea={false}
                  defaultCss={style.productListDesc}
                  onChangeText={(key, value) => onChangeContent(key, value)}
                  onChangeCss={(key, value) => onChangeStyle(key, value)}
                  id={"productListDesc" + index}
                  activeEditor={activeEditor}
                  setActiveEditor={setActiveEditor}
                />
              ) : (
                <p css={style?.productListDesc}>
                  {content?.productListDesc || desc_}
                </p>
              )}
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
  const {
    option,
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    activeEditor,
    setActiveEditor,
  } = prop;

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

  const initialContent = {
    productListTitle: content?.productListTitle || title_,
    productListDesc: content?.productListDesc || desc_,
  };

  const initialStyle = {
    productListTitle:
      style?.productListTitle ||
      (option === "main"
        ? product_list_option_main_title_css
        : product_list_option_list_title_css),
    productListDesc:
      style?.productListDesc ||
      (option === "main"
        ? product_list_option_main_desc_css
        : product_list_option_list_desc_css),
  };

  /* *************** */

  const {
    updateStyle,
    updateContent,
    shallowEqual,
    handleEditContent,
    handleEditStyle,
  } = useEditTemplate();

  const isFirstRender = useRef(true);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  const [editableContent, setEditableContent] = useState(() =>
    updateContent(content, initialContent, isFirstRender.current)
  );
  const [editableStyle, setEditableStyle] = useState(() =>
    updateStyle(style, initialStyle)
  );

  const updatedContent = useMemo(
    () => updateContent(content, initialContent, isFirstRender.current),
    [content, initialContent]
  );
  const updatedStyle = useMemo(
    () => updateStyle(style, initialStyle),
    [style, initialStyle]
  );

  useEffect(() => {
    setEditableContent((prev: any) => {
      if (!shallowEqual(prev, updatedContent)) {
        return updatedContent;
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

  const memoizedHandleEditContent = useCallback(
    (key: string, value: string) => {
      handleEditContent(key, value, setEditableContent, onChangeContent);
    },
    [handleEditContent, onChangeContent]
  );

  const memoizedHandleEditStyle = useCallback(
    (key: string, value: CSSObject) => {
      handleEditStyle(key, value, setEditableStyle, onChangeStyle);
    },
    [handleEditStyle, onChangeStyle]
  );

  if (!editableContent) {
    return <></>;
  }

  /* ************* */

  if (option === "main") {
    return (
      <OuterWrap padding="135px 0">
        <InnerWrap>
          <Title title="category" transform="uppercase" marginBottom={57} />
          <div css={item_container}>
            {Array.from({ length: count }, (_, index) => (
              <ProductListItemMain
                key={index}
                option={option}
                content={editableContent}
                style={editableStyle}
                isEditable={isEditable}
                onChangeContent={memoizedHandleEditContent}
                onChangeStyle={memoizedHandleEditStyle}
                index={index}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
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
                    key={index2}
                    option={option}
                    content={editableContent}
                    style={editableStyle}
                    isEditable={isEditable}
                    onChangeContent={memoizedHandleEditContent}
                    onChangeStyle={memoizedHandleEditStyle}
                    index={index2}
                    activeEditor={activeEditor}
                    setActiveEditor={setActiveEditor}
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
