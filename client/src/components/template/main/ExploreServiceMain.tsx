/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useEffect, useState } from "react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import EditableText from "@components/service/editableText/EditableText";

const title_ = "Lorem ipsum dolorsit amet consectetur";

const button_ = "Lorem ipsum dolor";

const item_title_ = "Explore";

const item_button_ = "Explore";

export interface IexploreServiceText {
  title?: string;
  button?: string;
  exploreTitle?: string;
  exploreButton?: string;
}

export interface IexploreServiceContent {
  title?: {
    text?: string;
    css?: CSSObject;
  };
  button?: {
    text?: string;
    css?: CSSObject;
  };
  exploreTitle?: {
    text?: string;
    css?: CSSObject;
  };
  exploreButton?: {
    text?: string;
    css?: CSSObject;
  };
}

interface IexploreService {
  content?: IexploreServiceContent | null;
  isEditable?: boolean;
  onChange?: (content: IexploreServiceContent) => void;
}

export const explore_service_title_css_: CSSObject = {
  marginBottom: "30px",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "50px",
  fontStyle: "normal",
  fontWeight: "800",
  lineHeight: "normal",
  textTransform: "capitalize",
  width: "100%",
  textAlign: "center",
};

export const explore_service_button_css_: CSSObject = css`
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 50px;
  border: 1px solid var(--Neutral-10, #486284);
  background: var(--Neutral-10, #486284);

  color: var(--Neutral-0, #fff);

  /* h2_small */
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 32px */
`;

export const explore_service_explore_title_css_ = css`
  color: var(--Neutral-10, #486284);

  /* body/small */
  font-family: "DM Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: 0.5px;
`;

export const explore_service_explore_button_css_ = css`
  display: flex;
  width: 380px;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 50px;
  border: 1px solid var(--Neutral-10, #486284);
  background: #fff;

  color: var(--Neutral-10, #486284);

  /* body/small */
  font-family: "DM Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  letter-spacing: 0.5px;
`;

export default function ExploreServiceMain(prop: IexploreService) {
  const { content, isEditable, onChange } = prop;

  const initial = {
    title: {
      text: content?.title?.text || title_,
      css: content?.title?.css || explore_service_title_css_,
    },
    button: {
      text: content?.title?.text || button_,
      css: content?.title?.css || explore_service_button_css_,
    },
    exploreTitle: {
      text: content?.title?.text || item_title_,
      css: content?.title?.css || explore_service_explore_title_css_,
    },
    exploreButton: {
      text: content?.title?.text || item_button_,
      css: content?.title?.css || explore_service_explore_button_css_,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (content) {
      setEdit(initial);
    }
  }, [content]);

  function handleEdit(
    field: keyof IexploreServiceContent,
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

  const count = 3;

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
          <div css={text_container}>
            {isEditable ? (
              <EditableText
                text={edit?.title?.text || title_}
                isTextArea={false}
                defaultCss={edit?.title?.css || explore_service_title_css_}
              />
            ) : (
              <p css={explore_service_title_css_}>
                {edit?.title?.text || title_}
              </p>
            )}
            <ul css={explore_list}>
              {Array.from({ length: count }, (_, index) => (
                <li css={explore_item} key={index}>
                  <p
                    css={
                      edit?.exploreTitle?.css ||
                      explore_service_explore_title_css_
                    }
                  >
                    {edit?.exploreTitle?.text || item_title_}
                  </p>
                  <p
                    css={
                      edit?.exploreButton?.css ||
                      explore_service_explore_button_css_
                    }
                  >
                    {edit?.exploreButton?.text || item_button_}
                  </p>
                </li>
              ))}
            </ul>
            <div css={edit?.button?.css || explore_service_button_css_}>
              {edit?.button?.text || button_}
            </div>
          </div>
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
  align-items: center;
  justify-content: center;
`;

const text_container = css`
  max-width: 550px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const explore_list = css`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;

  margin-bottom: 40px;
`;

const explore_item = css`
  display: flex;
  align-items: center;
  gap: 16px;
`;
