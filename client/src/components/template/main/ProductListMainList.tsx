/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect,
} from "react";
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
  productListItemTitle?: string;
  productListItemDesc?: string;
}

export interface IproductListStyle {
  productListItemTitle?: CSSObject;
  productListItemDesc?: CSSObject;
}

interface IproductListItem extends IproductList {}

interface IproductList {
  content?: IproductListContent | null;
  style?: IproductListStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

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

function ProductListItemMainOptionList(prop: IproductListItem) {
  const {
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
    content?.productListItemTitle === undefined ||
    content?.productListItemDesc === undefined ||
    style?.productListItemTitle === undefined ||
    style?.productListItemDesc === undefined
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
                id={"productListItemTitle" + index}
                text={content.productListItemTitle}
                className="productListItemTitle"
                isTextArea={false}
                defaultCss={style.productListItemTitle}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
                onChangeText={(key, value) => onChangeContent(key, value)}
                onChangeCss={(key, value) => onChangeStyle(key, value)}
              />
            ) : (
              <p css={style?.productListItemTitle}>
                {content?.productListItemTitle || title_}
              </p>
            )}
            {isEditable ? (
              <EditableText
                id={"productListItemDesc" + index}
                text={content.productListItemDesc}
                className="productListItemDesc"
                isTextArea={false}
                defaultCss={style.productListItemDesc}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
                onChangeText={(key, value) => onChangeContent(key, value)}
                onChangeCss={(key, value) => onChangeStyle(key, value)}
              />
            ) : (
              <p css={style?.productListItemDesc}>
                {content?.productListItemDesc || desc_}
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

export default function ProductListMainOptionList(prop: IproductList) {
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
    productListItemTitle: content?.productListItemTitle || title_,
    productListItemDesc: content?.productListItemDesc || desc_,
  };

  const initialStyle = {
    productListItemTitle:
      style?.productListItemTitle || product_list_option_list_title_css,
    productListItemDesc:
      style?.productListItemDesc || product_list_option_list_desc_css,
  };

  /* *********** */

  const updateValues = (source: any, initial: any) => {
    return Object.keys(initial).reduce((acc, key) => {
      const value = source?.[key];
      acc[key] = value ?? initial[key];
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
      // 객체 비교를 수행하여 변경된 경우에만 업데이트
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

  // 얕은 비교를 수행하는 함수
  const shallowEqual = (objA: any, objB: any) => {
    if (Object.is(objA, objB)) return true;
    if (
      typeof objA !== "object" ||
      typeof objB !== "object" ||
      objA === null ||
      objB === null
    )
      return false;

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => objA[key] === objB[key]);
  };

  const handleEditContent = useCallback(
    (key: string, value: string) => {
      setEditableContent((prev: any) => {
        return {
          ...prev,
          [key]: value,
        };
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

  if (!editableContent) {
    return <></>;
  }

  /* *********** */

  return (
    <OuterWrap padding="135px 0">
      <InnerWrap>
        <Title title="category" transform="uppercase" marginBottom={57} />
        <div css={item_rows_container}>
          {Array.from({ length: count }, (_, index1) => (
            <div css={item_container} key={index1}>
              {Array.from({ length: count }, (_, index2) => (
                <ProductListItemMainOptionList
                  key={index2}
                  content={editableContent}
                  style={editableStyle}
                  isEditable={isEditable}
                  onChangeContent={handleEditContent}
                  onChangeStyle={handleEditStyle}
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

const slide_item = css`
  width: 100%;
  max-width: 280px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const text_container = css`
  width: calc(100% - 84px);
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const product_info_container = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
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

export { ProductListItemMainOptionList };
