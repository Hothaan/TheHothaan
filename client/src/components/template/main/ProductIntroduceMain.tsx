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

export interface IproductIntroduceMainText {
  imageDesc?: string;
  title?: string;
  desc?: string;
}

export interface IproductIntroduceMainContent {
  imageDesc?: {
    text?: string;
    css?: CSSObject;
  };
  title?: {
    text?: string;
    css?: CSSObject;
  };
  desc?: {
    text?: string;
    css?: CSSObject;
  };
}

interface IproductIntroduceMain {
  content?: IproductIntroduceMainContent;
  isEditable?: boolean;
  onChange?: (content: IproductIntroduceMainContent) => void;
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
  const { content, isEditable, onChange } = prop;

  const initial = {
    imageDesc: {
      text: content?.imageDesc?.text || image_desc_,
      css: content?.imageDesc?.css || product_introduce_image_desc_css_,
    },
    title: {
      text: content?.title?.text || title_,
      css: content?.title?.css || product_introduce_title_css_,
    },
    desc: {
      text: content?.desc?.text || desc_,
      css: content?.desc?.css || product_introduce_desc_css_,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (content) {
      setEdit(initial);
    }
  }, [content]);

  function handleEdit(
    field: keyof IproductIntroduceMainContent,
    updatedText: string,
    updatedCss: CSSObject
  ) {
    const updatedState = {
      ...edit,
      [field]: {
        text: updatedText,
        css: updatedCss,
      },
    };
    setEdit(updatedState);
    onChange?.(updatedState);
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
          <p css={edit?.imageDesc?.css || product_introduce_image_desc_css_}>
            {edit?.imageDesc?.text || image_desc_}
          </p>
        </div>
        <div css={text_container}>
          <p css={edit?.title?.css || product_introduce_title_css_}>
            {edit?.title?.text || title_}
          </p>
          <p css={edit?.desc?.css || product_introduce_desc_css_}>
            {edit?.desc?.text || desc_}
          </p>
          <p css={edit?.desc?.css || product_introduce_desc_css_}>
            {edit?.desc?.text || desc_}
          </p>
        </div>
      </div>
      <div css={container}>
        <div css={text_container}>
          <p css={edit?.title?.css || product_introduce_title_css_}>
            {edit?.title?.text || title_}
          </p>
          <p css={edit?.desc?.css || product_introduce_desc_css_}>
            {edit?.desc?.text || desc_}
          </p>
          <p css={edit?.desc?.css || product_introduce_desc_css_}>
            {edit?.desc?.text || desc_}
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
          <p css={edit?.imageDesc?.css || product_introduce_image_desc_css_}>
            {edit?.imageDesc?.text || image_desc_}
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
