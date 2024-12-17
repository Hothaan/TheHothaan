/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const title_ = "Headline H1";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IserviceIntroduceText {
  title?: string;
  desc?: string;
}

export interface IserviceIntroduceContent {
  title?: {
    text?: string;
    css?: CSSObject;
  };
  desc?: {
    text?: string;
    css?: CSSObject;
  };
}

export interface IserviceIntroduce {
  content?: IserviceIntroduceContent | null;
  isEditable?: boolean;
  onChange?: (content: IserviceIntroduceContent) => void;
}

const service_introduce_title_css: CSSObject = {
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

const service_introduce_desc_css: CSSObject = {
  wordBreak: "keep-all",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  maxWidth: "676px",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: "2",
};

export default function ServiceIntroduce(prop: IserviceIntroduce) {
  const { content, isEditable, onChange } = prop;

  const initial = {
    title: {
      text: content?.title?.text || title_,
      css: content?.title?.css || service_introduce_title_css,
    },
    desc: {
      text: content?.desc?.text || desc_,
      css: content?.desc?.css || service_introduce_desc_css,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (content) {
      setEdit(initial);
    }
  }, [content]);

  function handleEdit(
    field: keyof IserviceIntroduceContent,
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
              text={edit?.title?.text || title_}
              isTextArea={false}
              defaultCss={edit?.title?.css || service_introduce_title_css}
            />
          ) : (
            <p css={edit?.title?.css || service_introduce_title_css}>
              {edit?.title?.text || title_}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={edit?.desc?.text || desc_}
              isTextArea={true}
              defaultCss={edit?.desc?.css || service_introduce_desc_css}
            />
          ) : (
            <p css={edit?.desc?.css || service_introduce_desc_css}>
              {edit?.desc?.text || desc_}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={edit?.desc?.text || desc_}
              isTextArea={true}
              defaultCss={edit?.desc?.css || service_introduce_desc_css}
            />
          ) : (
            <p css={edit?.desc?.css || service_introduce_desc_css}>
              {edit?.desc?.text || desc_}
            </p>
          )}
          {isEditable ? (
            <EditableText
              text={edit?.desc?.text || desc_}
              isTextArea={true}
              defaultCss={edit?.desc?.css || service_introduce_desc_css}
            />
          ) : (
            <p css={edit?.desc?.css || service_introduce_desc_css}>
              {edit?.desc?.text || desc_}
            </p>
          )}
          <p css={pass_desc_line}>{edit?.desc?.text || desc_}</p>
          <p css={pass_desc_line}>{edit?.desc?.text || desc_}</p>
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
  padding: 80px 70px;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 40px;
`;

const pass_desc_line: CSSObject = {
  wordBreak: "keep-all",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: "2",
};
