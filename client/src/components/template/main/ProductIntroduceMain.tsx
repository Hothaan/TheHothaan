/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";

const image_desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

const title_ = "Headline H1";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IproductIntroduceMainContent {
  productIntroduceImageDesc?: string;
  productIntroduceTitle?: string;
  productIntroduceDesc?: string;
}
export interface IproductIntroduceMainStyle {
  productIntroduceImageDesc?: CSSObject;
  productIntroduceTitle?: CSSObject;
  productIntroduceDesc?: CSSObject;
}

interface IproductIntroduceMain {
  content?: IproductIntroduceMainContent | null;
  style?: IproductIntroduceMainStyle | null;
  isEditable?: boolean;
  onChangeContent: (key: string, value: string) => void;
  onChangeStyle: (key: string, value: CSSObject) => void;
}

export const product_introduce_image_desc_css_: CSSObject = {
  width: "calc(100% - 140px)",
  position: "absolute",
  bottom: "70px",
  left: "70px",
  color: "#486284",
  wordBreak: "break-all",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
};

export const product_introduce_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",
  "@media (max-width: 1000px)": {
    color: "#486284",
    fontFamily: "Inter",
    fontSize: "50px",
    fontStyle: "normal",
    fontWeight: "900",
    lineHeight: "150%",
  },
};

export const product_introduce_desc_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  wordBreak: "break-all",
};

export default function ProductIntroduceMain(prop: IproductIntroduceMain) {
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

  const initial = {
    productIntroduceImageDesc: {
      text: content?.productIntroduceImageDesc || image_desc_,
      css:
        style?.productIntroduceImageDesc || product_introduce_image_desc_css_,
    },
    productIntroduceTitle: {
      text: content?.productIntroduceTitle || title_,
      css: style?.productIntroduceTitle || product_introduce_title_css_,
    },
    productIntroduceDesc: {
      text: content?.productIntroduceDesc || desc_,
      css: style?.productIntroduceDesc || product_introduce_desc_css_,
    },
  };

  const initialContent = {
    productIntroduceImageDesc:
      content?.productIntroduceImageDesc || image_desc_,
    productIntroduceTitle: content?.productIntroduceTitle || title_,
    productIntroduceDesc: content?.productIntroduceDesc || desc_,
  };

  const initialStyle = {
    productIntroduceImageDesc:
      style?.productIntroduceImageDesc || product_introduce_image_desc_css_,
    productIntroduceTitle:
      style?.productIntroduceTitle || product_introduce_title_css_,
    productIntroduceDesc:
      style?.productIntroduceDesc || product_introduce_desc_css_,
  };

  const [editableContent, setEditableContent] = useState<any>(null);
  const [editableStyle, setEditableStyle] = useState<any>(null);

  useEffect(() => {
    if (content) {
      if (content?.productIntroduceImageDesc) {
        setEditableContent({
          ...initialContent,
          productIntroduceImageDesc: content.productIntroduceImageDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          productIntroduceImageDesc: initialContent.productIntroduceImageDesc,
        });
      }
      if (content?.productIntroduceTitle) {
        setEditableContent({
          ...initialContent,
          productIntroduceTitle: content.productIntroduceTitle,
        });
      } else {
        setEditableContent({
          ...initialContent,
          productIntroduceTitle: initialContent.productIntroduceTitle,
        });
      }
      if (content?.productIntroduceDesc) {
        setEditableContent({
          ...initialContent,
          productIntroduceDesc: content.productIntroduceDesc,
        });
      } else {
        setEditableContent({
          ...initialContent,
          productIntroduceDesc: initialContent.productIntroduceDesc,
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
    <OuterWrap padding="0">
      <div css={container}>
        <div css={image_container}>
          <ImageBox
            container={{ width: "100%", height: "860px" }}
            icon={{ width: "110px", height: "110px" }}
            borderRadius="none"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 110px; height: 110px;",
            }}
          />
          <p
            css={
              editableStyle?.productIntroduceImageDesc ||
              product_introduce_image_desc_css_
            }
          >
            {editableContent?.productIntroduceImageDesc || image_desc_}
          </p>
        </div>
        <div css={text_container}>
          <p
            css={
              editableStyle?.productIntroduceTitle ||
              product_introduce_title_css_
            }
          >
            {editableContent?.productIntroduceTitle || title_}
          </p>
          <p
            css={
              editableStyle?.productIntroduceDesc || product_introduce_desc_css_
            }
          >
            {editableContent?.productIntroduceDesc || desc_}
          </p>
          <p
            css={
              editableStyle?.productIntroduceDesc || product_introduce_desc_css_
            }
          >
            {editableContent?.productIntroduceDesc || desc_}
          </p>
        </div>
      </div>
      <div css={container}>
        <div css={text_container}>
          <p
            css={
              editableStyle?.productIntroduceTitle ||
              product_introduce_title_css_
            }
          >
            {editableContent?.productIntroduceTitle || title_}
          </p>
          <p
            css={
              editableStyle?.productIntroduceDesc || product_introduce_desc_css_
            }
          >
            {editableContent?.productIntroduceDesc || desc_}
          </p>
          <p
            css={
              editableStyle?.productIntroduceDesc || product_introduce_desc_css_
            }
          >
            {editableContent?.productIntroduceDesc || desc_}
          </p>
        </div>
        <div css={image_container}>
          <ImageBox
            container={{ width: "100%", height: "860px" }}
            icon={{ width: "110px", height: "110px" }}
            borderRadius="none"
            responsive={{
              maxWidth: 1000,
              container: "",
              icon: "width: 110px; height: 110px;",
            }}
          />
          <p
            css={
              editableStyle?.productIntroduceImageDesc ||
              product_introduce_image_desc_css_
            }
          >
            {editableContent?.productIntroduceImageDesc || image_desc_}
          </p>
        </div>
      </div>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  display: flex;
`;

const image_container = css`
  width: 50%;
  position: relative;
`;

const text_container = css`
  display: flex;
  flex-direction: column;
  gap: 60px;

  width: 50%;
  padding: 110px 144px;

  background-color: #fff;

  @media (max-width: 1000px) {
    padding: 110px 70px;
    gap: 40px;
  }
`;
