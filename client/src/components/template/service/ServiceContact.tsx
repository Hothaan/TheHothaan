/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import TemplateButton from "../commonComponent/TemplateButton";

const title_ = [`Lorem ipsum dolor`, <br key="1" />, `sit amet consectetur`];

const button_ = "Lorem ipsum dolor";

export interface IserviceContactText {
  title?: string;
  button?: string;
}

export interface IserviceContactContent {
  title?: {
    text?: string;
    css?: Record<string, string>;
  };
  button?: {
    text?: string;
  };
}

interface IserviceContact {
  content?: IserviceContactContent | null;
  isEditable?: boolean;
  onChange?: (content: IserviceContactContent) => void;
}

const service_contact_title_css_: Record<string, string> = {
  width: "100%",
  color: "#486284",
  textAlign: "center",
  fontFamily: "Inter",
  fontSize: "50px",
  fontStyle: "normal",
  fontWeight: "800",
  lineHeight: "normal",
};

export default function ServiceContact(prop: IserviceContact) {
  const { content, isEditable, onChange } = prop;

  const [edit, setEdit] = useState({
    title: {
      text: content?.title?.text || title_,
      css: content?.title?.css || service_contact_title_css_,
    },
    button: {
      text: content?.button?.text || button_,
    },
  });

  useEffect(() => {
    if (content) {
      setEdit({
        title: {
          text: content?.title?.text || title_,
          css: content?.title?.css || service_contact_title_css_,
        },
        button: {
          text: content?.button?.text || button_,
        },
      });
    }
  }, [content]);

  return (
    <OuterWrap padding="0">
      <div css={banner_container}>
        <ImageBox
          container={{ width: "100%", height: "740px" }}
          icon={{ width: "210px", height: "210px" }}
          borderRadius="none"
          responsive={{
            maxWidth: 1000,
            container: "",
            icon: "width: 110px; height: 108px;",
          }}
        />
        <div css={contents_container}>
          <p css={service_contact_title_css_}>
            {content?.title?.text || title_}
          </p>
          <TemplateButton
            type="round"
            text={content?.button?.text || button_}
          />
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

const contents_container = css`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 120px 112px;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
`;
