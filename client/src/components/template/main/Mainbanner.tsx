/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const title_ = "Headline H1";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

const button_ = "button";

export const mainBanner_title_css_: CSSObject = {
  marginBottom: "30px",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",
  textTransform: "capitalize",
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const mainBanner_desc_css_: CSSObject = {
  wordBreak: "keep-all",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "150%",
  marginBottom: "80px",
  maxWidth: "676px",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "100px",
  WebkitLineClamp: "2",
};

export const mainBanner_button_css_: CSSObject = {
  display: "flex",
  padding: "22px 66px",
  justifyContent: "center",
  alignItems: "center",

  borderRadius: "10px",
  background: "#486284",
  color: "var(--FFFFFF, #fff)",

  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
};

export interface ImainBannerText {
  title?: string;
  desc?: string;
  button?: string;
}

export interface ImainBannerContent {
  title?: {
    text?: string;
    css?: CSSObject;
  };
  desc?: {
    text?: string;
    css?: CSSObject;
  };
  button?: {
    text?: string;
    css?: CSSObject;
  };
}

interface ImainBanner {
  content?: ImainBannerContent | null;
  isEditable?: boolean;
  onChange?: (content: ImainBannerContent) => void;
}

export default function Mainbanner(prop: ImainBanner) {
  const { isEditable, content, onChange } = prop;

  const initial = {
    title: {
      text: content?.title?.text || title_,
      css: content?.title?.css || mainBanner_title_css_,
    },
    desc: {
      text: content?.desc?.text || desc_,
      css: content?.desc?.css || mainBanner_desc_css_,
    },
    button: {
      text: content?.button?.text || button_,
      css: content?.button?.css || mainBanner_button_css_,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (content) {
      setEdit(initial);
    }
  }, [content]);

  function handleEdit(
    field: keyof ImainBannerContent,
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
      <div css={banner_container}>
        <ImageBox
          container={{ width: "100%", height: "850px" }}
          icon={{ width: "210px", height: "210px" }}
          borderRadius="none"
          responsive={{
            maxWidth: 1000,
            container: "",
            icon: "width: 110px; height: 108px;",
          }}
        />
        <div css={container}>
          {isEditable ? (
            <EditableText
              text={edit.title.text}
              isTextArea={false}
              defaultCss={edit.title.css}
              onChange={(text, css) => handleEdit("title", text, css)}
            />
          ) : (
            <p css={edit.title.css}>{edit.title.text}</p>
          )}
          {isEditable ? (
            <EditableText
              text={edit.desc.text}
              isTextArea={true}
              defaultCss={edit.desc.css}
              onChange={(text, css) => handleEdit("desc", text, css)}
            />
          ) : (
            <p css={edit.desc.css}>{edit.desc.text}</p>
          )}
          <p css={edit.button.css}>{edit.button.text}</p>
          {/* <TemplateButton
            type="default"
            text={content?.button || button_}
            className={button_className}
          /> */}
        </div>
      </div>
    </OuterWrap>
  );
}

const banner_container = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

const container = css`
  position: absolute;

  width: 100%;
  height: 100%;
  padding: 212px 132px;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;
