/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const title_ = "Headline H1";

const desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IgreetingsText {
  halfTitle?: string;
  halfDesc?: string;
  fullTitle?: string;
  fullDesc?: string;
}

export interface IgreetingsContent {
  halfTitle?: {
    text?: string;
    css?: CSSObject;
  };
  halfDesc?: {
    text?: string;
    css?: CSSObject;
  };
  fullTitle?: {
    text?: string;
    css?: CSSObject;
  };
  fullDesc?: {
    text?: string;
    css?: CSSObject;
  };
}

interface Igreetings {
  content?: IgreetingsContent | null;
  isEditable?: boolean;
  onChange?: (content: IgreetingsContent) => void;
}

const greetings_full_title_css_: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",
  textTransform: "capitalize",
  width: "100%",
  overflow: "hidden" /* 넘치는 텍스트 숨김 */,
  textOverflow: "ellipsis" /* 말줄임표 적용 */,
  whiteSpace: "nowrap" /* 텍스트를 한 줄로 처리 */,
  textAlign: "center",
};

const greetings_full_desc_css_: CSSObject = {
  wordBreak: "keep-all",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  maxWidth: "676px",
  width: "100%",

  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: "2",
  textAlign: "center",
};

const greetings_half_title_css_ = css`
  color: #486284;

  /* H1 */
  font-family: Inter;
  font-size: 96px;
  font-style: normal;
  font-weight: 900;
  line-height: 150%; /* 144px */

  @media (max-width: 1000px) {
    color: #486284;
    font-family: Inter;
    font-size: 50px;
    font-style: normal;
    font-weight: 900;
    line-height: 150%; /* 75px */
  }
`;

const greetings_half_desc_css_ = css`
  color: #486284;

  /* h2_middle */
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  word-break: break-all;
`;

export default function Greetings(prop: Igreetings) {
  const { content, isEditable, onChange } = prop;

  const initial = {
    halfTitle: {
      text: content?.halfTitle?.text || title_,
      css: content?.halfTitle?.css || greetings_half_title_css_,
    },
    halfDesc: {
      text: content?.halfDesc?.text || desc_,
      css: content?.halfDesc?.css || greetings_half_desc_css_,
    },
    fullTitle: {
      text: content?.fullTitle?.text || title_,
      css: content?.fullTitle?.css || greetings_full_title_css_,
    },
    fullDesc: {
      text: content?.fullDesc?.text || desc_,
      css: content?.fullDesc?.css || greetings_full_desc_css_,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (content) {
      setEdit(initial);
    }
  }, [content]);

  function handleEdit(
    field: keyof IgreetingsContent,
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
    <OuterWrap padding="0 0 100px 0">
      <div css={wrap}>
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
          </div>
          <div css={text_container}>
            <p css={edit?.halfTitle?.css || greetings_half_title_css_}>
              {edit?.halfTitle?.text || title_}
            </p>
            <p css={edit?.halfDesc?.css || greetings_half_desc_css_}>
              {edit?.halfDesc?.text || desc_}
            </p>
          </div>
        </div>
        <div css={container}>
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
          <div css={inner_container}>
            <p css={edit?.fullTitle?.css || greetings_full_title_css_}>
              {edit?.fullTitle?.text || title_}
            </p>
            <p css={edit?.fullDesc?.css || greetings_full_desc_css_}>
              {edit?.fullDesc?.text || desc_}
            </p>
            <p css={edit?.fullDesc?.css || greetings_full_desc_css_}>
              {edit?.fullDesc?.text || desc_}
            </p>
          </div>
        </div>
        <div css={container}>
          <div css={text_container}>
            <p css={edit?.halfTitle?.css || greetings_half_title_css_}>
              {edit?.halfTitle?.text || title_}
            </p>
            <p css={edit?.halfDesc?.css || greetings_half_desc_css_}>
              {edit?.halfDesc?.text || desc_}
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
          </div>
        </div>
      </div>
    </OuterWrap>
  );
}

const wrap = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const container = css`
  width: 100%;
  display: flex;
  position: relative;
`;

const inner_container = css`
  position: absolute;

  width: 100%;
  height: 100%;
  padding: 80px 70px;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 40px;
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
