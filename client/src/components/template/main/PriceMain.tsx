/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import Title from "../commonComponent/Title";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const component_desc_ =
  "Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit phasellus mollis sit aliquam sit nullam.";
const item_desc_ = "Lorem ipsum dolor";
const item_price = 3300;

export interface iPriceMainContent {
  priceMainDesc?: string;
}
export interface iPriceMainStyle {
  priceMainDesc?: CSSObject;
}

interface IpriceMain {
  content?: iPriceMainContent | null;
  style?: iPriceMainStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
  index?: number;
  activeEditor?: string;
  setActiveEditor?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

interface iPriceMainItem extends IpriceMain {
  itemDay?: string;
}

export const price_main_item_desc_css_: CSSObject = {
  width: "100%",
  maxWidth: "150px",
  color: "#486284",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "160%",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  // overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: "3",
  zIndex: "10",
};

function PriceMainItem(prop: iPriceMainItem) {
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    itemDay,
    index,
    activeEditor,
    setActiveEditor,
  } = prop;

  if (
    content?.priceMainDesc === undefined ||
    style?.priceMainDesc === undefined
  ) {
    return <></>;
  }

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
        {isEditable ? (
          <EditableText
            text={content.priceMainDesc as string}
            className="priceMainDesc"
            id={"priceMainDesc" + index}
            isTextArea={false}
            defaultCss={style.priceMainDesc as CSSObject}
            onChangeText={(key, value) => onChangeContent(key, value)}
            onChangeCss={(key, value) => onChangeStyle(key, value)}
            activeEditor={activeEditor}
            setActiveEditor={setActiveEditor}
          />
        ) : (
          <p css={price_main_item_desc_css_}>
            {content?.priceMainDesc || item_desc_}
          </p>
        )}

        <p css={item_price_text_style}>
          <span css={item_bold_text_40_style}>
            {item_price.toLocaleString()}
          </span>
          <span>won</span>
        </p>
      </div>
    </div>
  );
}

export default function PriceMain(prop: IpriceMain) {
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

  const initialContent = {
    priceMainDesc: content?.priceMainDesc || item_desc_,
  };

  const initialStyle = {
    priceMainDesc: style?.priceMainDesc || price_main_item_desc_css_,
  };
  /* *********** */

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
      setEditableContent((prev: any) => ({
        ...prev,
        [key]: value,
      }));
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
    <OuterWrap padding="160px 0">
      <ContentsWrap>
        <div css={container}>
          <div>
            <Title title="price" transform="uppercase" marginBottom={24} />
            <p css={component_desc_style}>{component_desc_}</p>
          </div>
          <div css={item_wrap}>
            {Array.from({ length: count }, (_, index) => (
              <PriceMainItem
                key={index}
                index={index}
                itemDay={(index + 1).toString()}
                content={editableContent}
                style={editableStyle}
                isEditable={isEditable}
                onChangeContent={handleEditContent}
                onChangeStyle={handleEditStyle}
                activeEditor={activeEditor}
                setActiveEditor={setActiveEditor}
              />
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
  justify-content: center;
  gap: 24px;
  height: 100%;
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
