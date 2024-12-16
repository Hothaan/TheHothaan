/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import { useEffect, useState } from "react";

const banner_title_ = "headline h1";
const banner_title_className = "brand_introduce_banner_title";

const banner_desc_ =
  "lorem ipsum, quia dolor sit, amet,consectetur, adipisci velit, sed quia non";
const banner_desc_className = "brand_introduce_banner_desc";

const item_title_ = "headline h1";
const item_title_className = "brand_introduce_content_title";

const item_desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";
const item_desc_className = "brand_introduce_content_desc";

export interface IbrandIntroduceText {
  banner?: { title?: string; desc?: string };
  item?: { title?: string; desc?: string };
}

export interface IbrandIntroduceContent {
  banner?: {
    title?: string;
    titleCss?: Record<string, string>;
    desc?: string;
    descCss?: Record<string, string>;
  };
  item?: {
    title?: string;
    titleCss?: Record<string, string>;
    desc?: string;
    descCss?: Record<string, string>;
  };
}

interface IbrandIntroduceItemText {
  title?: string;
  desc?: string;
}

interface IbrandIntroduceItemContent extends IbrandIntroduceItemText {
  titleCss?: Record<string, string>;
  descCss?: Record<string, string>;
}

interface IbrandIntroduce {
  content?: IbrandIntroduceContent | null;
  isEditable?: boolean;
  onChange?: (content: IbrandIntroduceContent) => void;
}

export const brandIntroduce_item_title_css: Record<string, string> = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",
  textTransform: "capitalize",
};

export const brandIntroduce_item_desc_css: Record<string, string> = {
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "32px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "normal",
};

export const brandIntroduce_banner_title_css: Record<string, string> = {
  marginBottom: "30px",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",
  textTransform: "capitalize",
};

export const brandIntroduce_banner_desc_css: Record<string, string> = {
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

function BrandIntroduceItem(prop: IbrandIntroduceItemContent) {
  const { title, titleCss, desc, descCss } = prop;

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
      <p css={titleCss} className={item_title_className}>
        {title || item_title_}
      </p>
      <p css={descCss} className={item_desc_className}>
        {desc || item_desc_}
      </p>
    </div>
  );
}

export default function BrandIntroduce(prop: IbrandIntroduce) {
  const { isEditable, content, onChange } = prop;

  const count = 2;

  const [editBannerTitle, setEditBannerTitle] = useState(
    content?.banner?.title || banner_title_
  );
  const [editBannerTitleCss, setEditBannerTitleCss] = useState(
    content?.banner?.titleCss || brandIntroduce_banner_title_css
  );
  const [editBannerDesc, setEditBannerDesc] = useState(
    content?.banner?.desc || banner_desc_
  );
  const [editBannerDescCss, setEditBannerDescCss] = useState(
    content?.banner?.descCss || brandIntroduce_banner_desc_css
  );

  const [editItemTitle, setEditItemTitle] = useState(
    content?.item?.title || item_title_
  );
  const [editItemTitleCss, setEditItemTitleCss] = useState(
    content?.item?.titleCss || brandIntroduce_item_title_css
  );
  const [editItemDesc, setEditItemDesc] = useState(
    content?.item?.desc || item_desc_
  );
  const [editItemDescCss, setEditItemDescCss] = useState(
    content?.item?.descCss || brandIntroduce_item_desc_css
  );

  useEffect(() => {
    if (content && content !== undefined) {
      setEditBannerTitle(content?.banner?.title || banner_title_);
      setEditBannerTitleCss(
        content?.banner?.titleCss || brandIntroduce_banner_title_css
      );
      setEditBannerDesc(content?.banner?.desc || banner_desc_);
      setEditBannerDescCss(
        content?.banner?.descCss || brandIntroduce_banner_desc_css
      );
      setEditItemTitle(content?.item?.title || item_title_);
      setEditItemTitleCss(
        content?.item?.titleCss || brandIntroduce_item_title_css
      );
      setEditItemDesc(content?.item?.desc || item_desc_);
      setEditItemDescCss(
        content?.item?.descCss || brandIntroduce_item_desc_css
      );
    }
  }, [content]);

  function handleEditBannerTitle(
    updatedText: string,
    updatedCss: Record<string, string>
  ) {
    const newContent = {
      ...content,
      banner: {
        ...content?.banner,
        title: updatedText,
        titleCss: updatedCss,
      },
    };
    setEditBannerTitle(updatedText);
    setEditBannerTitleCss(updatedCss);
    onChange?.(newContent);
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
          <p
            css={editBannerTitleCss || brandIntroduce_banner_title_css}
            className={banner_title_className}
          >
            {editBannerTitle || banner_title_}
          </p>
          <p
            css={editBannerDescCss || brandIntroduce_banner_desc_css}
            className={banner_desc_className}
          >
            {editBannerDesc || banner_desc_}
          </p>
        </div>
      </div>
      <OuterWrap padding="290px">
        <ContentsWrap>
          <div css={item_wrap}>
            {Array.from({ length: count }, (_, index) => (
              <BrandIntroduceItem
                key={index}
                title={editItemTitle || item_title_}
                titleCss={editItemTitleCss || brandIntroduce_item_title_css}
                desc={editItemDesc || item_desc_}
                descCss={editItemDescCss || brandIntroduce_item_desc_css}
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
