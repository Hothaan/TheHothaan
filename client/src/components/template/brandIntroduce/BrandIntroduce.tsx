/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import { useEffect, useState } from "react";
import { on } from "stream";

const banner_title_ = "headline h1";

const banner_desc_ =
  "lorem ipsum, quia dolor sit, amet,consectetur, adipisci velit, sed quia non";

const item_title_ = "headline h1";

const item_desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IbrandIntroduceText {
  banner?: { title?: string; desc?: string };
  item?: { title?: string; desc?: string };
}

export interface IbrandIntroduceContent {
  bannerTitle?: {
    text?: string;
    css?: CSSObject;
  };
  bannerDesc?: {
    text?: string;
    css?: CSSObject;
  };
  itemTitle?: {
    text?: string;
    css?: CSSObject;
  };
  itemDesc?: {
    text?: string;
    css?: CSSObject;
  };
}

interface IbrandIntroduce {
  content?: IbrandIntroduceContent | null;
  isEditable?: boolean;
  onChange?: (content: IbrandIntroduceContent) => void;
}

export const brandIntroduce_item_title_css: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",
  textTransform: "capitalize",
};

export const brandIntroduce_item_desc_css: CSSObject = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
};

export const brandIntroduce_banner_title_css: CSSObject = {
  marginBottom: "30px",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",
  textTransform: "capitalize",
};

export const brandIntroduce_banner_desc_css: CSSObject = {
  textAlign: "center",
  wordBreak: "keep-all",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
  maxWidth: "676px",
};

function BrandIntroduceItem(prop: IbrandIntroduce) {
  const { content, isEditable, onChange } = prop;

  return (
    <div css={item_container}>
      <ImageBox
        container={{ width: "100%", height: "905px" }}
        icon={{ width: "100px", height: "100px" }}
        borderRadius="none"
        responsive={{
          maxWidth: 1000,
          container: "",
          icon: "width: 100px; height: 100px;",
        }}
      />
      <p css={content?.itemTitle?.css || brandIntroduce_item_title_css}>
        {content?.itemTitle?.text || item_title_}
      </p>
      <p css={content?.itemDesc?.css || brandIntroduce_item_desc_css}>
        {content?.itemDesc?.text || item_desc_}
      </p>
    </div>
  );
}

export default function BrandIntroduce(prop: IbrandIntroduce) {
  const { isEditable, content, onChange } = prop;

  const count = 2;

  const initial = {
    bannerTitle: {
      text: content?.bannerTitle?.text,
      css: content?.bannerTitle?.css,
    },
    bannerDesc: {
      text: content?.bannerDesc?.text,
      css: content?.bannerDesc?.css,
    },
    itemTitle: {
      text: content?.itemTitle?.text,
      css: content?.itemTitle?.css,
    },
    itemDesc: {
      text: content?.itemDesc?.text,
      css: content?.itemDesc?.css,
    },
  };

  const [edit, setEdit] = useState(initial);

  useEffect(() => {
    if (content) {
      setEdit(initial);
    }
  }, [content]);

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
          <p css={edit?.bannerTitle?.css || brandIntroduce_banner_title_css}>
            {edit?.bannerTitle?.text || banner_title_}
          </p>
          <p css={edit?.bannerDesc?.css || brandIntroduce_banner_desc_css}>
            {edit?.bannerDesc?.text || banner_desc_}
          </p>
        </div>
      </div>
      <OuterWrap padding="290px">
        <ContentsWrap>
          <div css={item_wrap}>
            {Array.from({ length: count }, (_, index) => (
              <BrandIntroduceItem
                key={index}
                content={content}
                isEditable={isEditable}
                onChange={onChange}
              />
            ))}
          </div>
        </ContentsWrap>
      </OuterWrap>
    </OuterWrap>
  );
}

const item_wrap = css`
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

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
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const item_container = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;
