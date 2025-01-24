/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
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
}

interface iPriceMainItem extends IpriceMain {
  itemDay?: string;
}

export const price_main_item_desc_css_ = css`
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

  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
`;

function PriceMainItem(prop: iPriceMainItem) {
  const {
    content,
    style,
    isEditable,
    onChangeContent,
    onChangeStyle,
    itemDay,
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
            text={content.priceMainDesc}
            className="priceMainDesc"
            isTextArea={false}
            defaultCss={style.priceMainDesc}
            onChangeText={(key, value) => onChangeContent(key, value)}
            onChangeCss={(key, value) => onChangeStyle(key, value)}
          />
        ) : (
          <p css={price_main_item_desc_css_}>{content?.priceMainDesc}</p>
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
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;
  const count = 3;

  const initialContent = {
    priceMainDesc: content?.priceMainDesc || item_desc_,
  };
  const initialStyle = {
    priceMainDesc: style?.priceMainDesc || price_main_item_desc_css_,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content) {
      if (content?.priceMainDesc) {
        setEditableContent({
          ...initialContent,
          priceMainDesc: content.priceMainDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          priceMainDesc: initialContent.priceMainDesc,
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
                itemDay={(index + 1).toString()}
                content={editableContent}
                style={editableStyle}
                isEditable={isEditable}
                onChangeContent={handleEditContent}
                onChangeStyle={handleEditStyle}
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
