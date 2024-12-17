/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import Title from "../commonComponent/Title";
import { OuterWrap, InnerWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import { ReactComponent as GotoLink } from "@svgs/template/gotoLink.svg";

const component_title_ = "service Introduction";
const component_desc_ = "lorem ipsum, quia dolorem ipsum, quia do";

const item_title_ = "lorem ipsum, quia do ddd";

const item_desc_ = "lorem ipsum";

export interface IserviceIntroductionText {
  title?: string;
  desc?: string;
}

export interface IserviceIntroductionContent {
  title?: {
    text?: string;
    css?: CSSObject;
  };
  desc?: {
    text?: string;
    css?: CSSObject;
  };
}

interface IserviceIntroduction {
  content?: IserviceIntroductionContent | null;
  isEditable?: boolean;
  onChange?: (content: IserviceIntroductionContent) => void;
}

export const service_introduction_title_css_: CSSObject = {
  width: "100%",
  height: "36px",
  overflow: "hidden",
  color: "#486284",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontFamily: "Inter",
  fontSize: "24px",
  fontStyle: "normal",
  fontWeight: "800",
  lineHeight: "normal",
};

export const service_introduction_desc_css_: CSSObject = {
  color: "#7f7f7f",
  fontFamily: "Inter",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "160%",
};

function ServiceIntroductionItem(prop: IserviceIntroduction) {
  const { content, isEditable, onChange } = prop;

  const initial = {
    title: {
      text: content?.title?.text || item_title_,
      css: content?.title?.css || service_introduction_title_css_,
    },
    desc: {
      text: content?.desc?.text || item_desc_,
      css: content?.desc?.css || service_introduction_desc_css_,
    },
  };

  const [serviceIntroduction, setServiceIntroduction] = useState(initial);

  useEffect(() => {
    if (content) {
      setServiceIntroduction(initial);
    }
  }, [content]);

  function handleEdit(
    field: keyof IserviceIntroductionContent,
    updatedText: string,
    updatedCss: CSSObject
  ) {
    const updatedState = {
      ...serviceIntroduction,
      [field]: {
        text: updatedText,
        css: updatedCss,
      },
    };
    setServiceIntroduction(updatedState);
    onChange?.(updatedState);
  }

  return (
    <div css={item}>
      <ImageBox
        container={{ width: "400px", height: "570px" }}
        icon={{ width: "68px", height: "68px" }}
        borderRadius="20px"
        responsive={{
          maxWidth: 1500,
          container: "width: 280px; height: 400px;",
          icon: "width: 50px; height: 50px;",
        }}
      />
      <div css={info_container}>
        <div css={text_container}>
          <p css={content?.title?.css || service_introduction_title_css_}>
            {content?.title?.text || item_title_}
          </p>
          <p css={content?.desc?.css || service_introduction_desc_css_}>
            {content?.desc?.text || item_desc_}
          </p>
        </div>
        <GotoLink css={icon} />
      </div>
    </div>
  );
}

export default function ServiceIntroduction(prop: IserviceIntroduction) {
  const { content, isEditable, onChange } = prop;

  const count = 3;
  return (
    <OuterWrap padding="160px 0">
      <InnerWrap>
        <div css={title_container}>
          <Title
            title={component_title_}
            transform="capitalize"
            marginBottom={20}
          />
          <p css={title_desc}>{component_desc_}</p>
        </div>
        <div css={item_container}>
          {Array.from({ length: count }, (_, index) => (
            <ServiceIntroductionItem
              key={index}
              content={content}
              isEditable={isEditable}
              onChange={onChange}
            />
          ))}
        </div>
      </InnerWrap>
    </OuterWrap>
  );
}

const title_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 50px;
`;

const title_desc = css`
  color: #486284;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 32px */
`;

const item_container = css`
  display: flex;
  align-items: center;
  gap: 90px;
  @media (max-width: 1500px) {
    gap: 30px;
  }
`;

const item = css`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const info_container = css`
  width: 280px;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const text_container = css`
  width: calc(100% - 10px - 32px - 6px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 7px;
`;

const icon = css`
  flex-shrink: 0;
`;
