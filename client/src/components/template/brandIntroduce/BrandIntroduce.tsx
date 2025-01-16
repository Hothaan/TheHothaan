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
  brandIntroduceBannerTitle: string;
  brandIntroduceBannerDesc: string;
  brandIntroduceItemTitle: string;
  brandIntroduceItemDesc: string;
}

export interface IbrandIntroduceStyle {
  brandIntroduceBannerTitle: CSSObject;
  brandIntroduceBannerDesc: CSSObject;
  brandIntroduceItemTitle: CSSObject;
  brandIntroduceItemDesc: CSSObject;
}

interface IbrandIntroduce {
  content?: IbrandIntroduceContent | null;
  style?: IbrandIntroduceContent | null;
  isEditable?: boolean;
  onChangeContent?: (content: IbrandIntroduceContent) => void;
  onChangeStyle?: (content: IbrandIntroduceContent) => void;
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
  const { content, style, isEditable, onChangeContent, onChangeStyle } = prop;

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
      <p css={style?.brandIntroduceItemTitle || brandIntroduce_item_title_css}>
        {content?.brandIntroduceItemTitle || item_title_}
      </p>
      <p css={style?.brandIntroduceItemDesc || brandIntroduce_item_desc_css}>
        {content?.brandIntroduceItemDesc || item_desc_}
      </p>
    </div>
  );
}

export default function BrandIntroduce(prop: IbrandIntroduce) {
  const { isEditable, content, style, onChangeContent, onChangeStyle } = prop;

  const count = 2;

  const initial = {
    brandIntroduceBannerTitle: {
      text: content?.brandIntroduceBannerTitle,
      css: content?.brandIntroduceBannerTitle,
    },
    brandIntroduceBannerDesc: {
      text: content?.brandIntroduceBannerDesc,
      css: content?.brandIntroduceBannerDesc,
    },
    brandIntroduceItemTitle: {
      text: content?.brandIntroduceItemTitle,
      css: content?.brandIntroduceItemTitle,
    },
    brandIntroduceItemDesc: {
      text: content?.brandIntroduceItemDesc,
      css: content?.brandIntroduceItemDesc,
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
          <p
            css={
              edit?.brandIntroduceBannerTitle?.css ||
              brandIntroduce_banner_title_css
            }
          >
            {edit?.brandIntroduceBannerTitle?.text || banner_title_}
          </p>
          <p
            css={
              edit?.brandIntroduceBannerDesc?.css ||
              brandIntroduce_banner_desc_css
            }
          >
            {edit?.brandIntroduceBannerDesc?.text || banner_desc_}
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
                // onChange={onChange}
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
