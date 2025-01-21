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

export interface ImainBannerContent {
  mainBannerTitle?: string;
  mainBannerDesc?: string;
  mainBannerButton?: string;
}

export interface ImainBannerStyle {
  mainBannerTitle?: CSSObject;
  mainBannerDesc?: CSSObject;
  mainBannerButton?: CSSObject;
}

interface ImainBanner {
  content?: ImainBannerContent | null;
  style?: ImainBannerStyle | null;
  isEditable?: boolean;
  onChangeContent?: (key: string, value: string) => void;
  onChangeStyle?: (key: string, value: CSSObject) => void;
}

interface IEditState {
  [key: string]: {
    text: string;
    css: CSSObject;
  };
}

export default function Mainbanner(prop: ImainBanner) {
  const { isEditable, content, style, onChangeContent, onChangeStyle } = prop;

  const initial: IEditState = {
    mainBannerTitle: {
      text: content?.mainBannerTitle || title_,
      css: style?.mainBannerTitle || mainBanner_title_css_,
    },
    mainBannerDesc: {
      text: content?.mainBannerDesc || desc_,
      css: style?.mainBannerDesc || mainBanner_desc_css_,
    },
    mainBannerButton: {
      text: content?.mainBannerButton || button_,
      css: style?.mainBannerButton || mainBanner_button_css_,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (
      content?.mainBannerButton &&
      content?.mainBannerDesc &&
      content?.mainBannerTitle
    ) {
      setEdit(initial);
    }
  }, [content, style]);

  function handleEditText(key: string, value: string) {
    const updatedState = {
      ...edit,
      [key]: {
        ...edit[key],
        text: value,
      },
    };
    setEdit(updatedState);
    onChangeContent?.(key, value);
  }

  function handleEditCss(key: string, value: CSSObject) {
    const updatedState = {
      ...edit,
      [key]: {
        ...edit[key],
        css: value,
      },
    };
    setEdit(updatedState);
    onChangeStyle?.(key, value);
  }

  if (!edit) {
    return <></>;
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
              text={edit.mainBannerTitle.text}
              className="mainBannerTitle"
              isTextArea={false}
              defaultCss={edit.mainBannerTitle.css}
              onChangeText={(key, value) => handleEditText(key, value)}
              onChangeCss={(key, value) => handleEditCss(key, value)}
            />
          ) : (
            <p css={edit.mainBannerTitle.css}>{edit.mainBannerTitle.text}</p>
          )}
          {isEditable ? (
            <EditableText
              text={edit.mainBannerDesc.text}
              className="mainBannerDesc"
              isTextArea={true}
              defaultCss={edit.mainBannerDesc.css}
              onChangeText={(key, value) => handleEditText(key, value)}
              onChangeCss={(key, value) => handleEditCss(key, value)}
            />
          ) : (
            <p css={edit.mainBannerDesc.css}>{edit.mainBannerDesc.text}</p>
          )}
          <p css={edit.mainBannerButton.css}>{edit.mainBannerButton.text}</p>
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
