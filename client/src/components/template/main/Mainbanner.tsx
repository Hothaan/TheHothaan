/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const title_ = "Headline H1";
const title_className = "main_banner_title";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";
const desc_className = "main_banner_desc";

const button_ = "button";
const button_className = "main_banner_button";

export interface ImainBannerText {
  title?: string;
  desc?: string;
  button?: string;
}

export interface ImainBannerContent {
  title?: string;
  titleCss?: Record<string, string>;
  desc?: string;
  descCss?: Record<string, string>;
  button?: string;
  buttonCss?: Record<string, string>;
}

interface ImainBanner {
  content?: ImainBannerContent | null;
  isEditable?: boolean;
  onChange?: (content: ImainBannerContent) => void;
}

export default function Mainbanner(prop: ImainBanner) {
  const { isEditable, content, onChange } = prop;

  const [editTitle, setEditTitle] = useState(content?.title || title_);
  const [editTitleCss, setEditTitleCss] = useState(content?.titleCss);
  const [editDesc, setEditDesc] = useState(content?.desc || desc_);
  const [editDescCss, setEditDescCss] = useState(content?.descCss);
  const [editButton, setEditButton] = useState(content?.button || button_);
  const [editButtonCss, setEditButtonCss] = useState(content?.buttonCss);

  useEffect(() => {
    if (content && content !== undefined) {
      setEditTitle(content?.title || title_);
      setEditTitleCss(content?.titleCss);
      setEditDesc(content?.desc || desc_);
      setEditDescCss(content.descCss);
    }
  }, [content]);

  console.log(editTitle);

  function handleEditTitle(
    updatedText: string,
    updatedCss: Record<string, string>
  ) {
    const newContent = {
      ...content,
      title: updatedText,
      titleCss: updatedCss,
    };
    setEditTitle(updatedText);
    setEditTitleCss(updatedCss);
    onChange?.(newContent);
  }

  function handleEditDesc(
    updatedText: string,
    updatedCss: Record<string, string>
  ) {
    setEditDesc(updatedText);
    setEditDescCss(updatedCss);
    onChange?.({
      ...content,
      desc: updatedText,
      descCss: updatedCss,
    });
  }

  function handleEditButton(
    updatedText: string,
    updatedCss: Record<string, string>
  ) {
    setEditButton(updatedText);
    setEditButtonCss(updatedCss);
    onChange?.({
      ...content,
      button: updatedText,
      buttonCss: updatedCss,
    });
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
              text={editTitle}
              isTextArea={false}
              defaultCss={editTitleCss || mainBanner_title_css_}
              className={title_className}
              onChange={handleEditTitle}
            />
          ) : (
            <p css={editTitleCss} className={title_className}>
              {editTitle}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={editDesc}
              isTextArea={true}
              defaultCss={editDescCss || mainBanner_desc_css_}
              className={desc_className}
              onChange={handleEditDesc}
            />
          ) : (
            <p
              css={editDescCss || mainBanner_desc_css_}
              className={title_className}
            >
              {editDesc}
            </p>
          )}
          <p css={editButtonCss || mainBanner_button_css}>{editButton}</p>
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

const mainBanner_title_css_: Record<string, string> = {
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

const mainBanner_desc_css_: Record<string, string> = {
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

const mainBanner_button_css: Record<string, string> = {
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
