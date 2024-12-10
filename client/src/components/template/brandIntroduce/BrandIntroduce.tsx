/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";

const banner_title_ = "headline h1";
const banner_title_className = "brand_introduce_banner_title";

const banner_desc_ =
  "lorem ipsum, quia dolor sit, amet,consectetur, adipisci velit, sed quia non";
const banner_desc_className = "brand_introduce_banner_desc";

const content_title_ = "headline h1";
const content_title_className = "brand_introduce_content_title";

const content_desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";
const content_desc_className = "brand_introduce_content_desc";

export interface IbrandIntroduceText {
  banner?: { title?: string; desc?: string };
  content?: IbrandIntroduceItem;
}

interface IbrandIntroduceItem {
  title?: string;
  desc?: string;
}

interface IbrandIntroduce extends IbrandIntroduceText {
  isEditable?: boolean;
}

function BrandIntroduceItem(prop: IbrandIntroduceItem) {
  const { title, desc } = prop;
  const item_container = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  `;

  const item_title = css`
    color: #486284;

    /* H1 */
    font-family: Inter;
    font-size: 96px;
    font-style: normal;
    font-weight: 900;
    line-height: 150%; /* 144px */
    text-transform: capitalize;
  `;

  const item_desc = css`
    color: #486284;

    /* h2_middle */
    font-family: Inter;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  `;

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
      <p css={item_title} className={content_title_className}>
        {title || content_title_}
      </p>
      <p css={item_desc} className={content_desc_className}>
        {desc || content_desc_}
      </p>
    </div>
  );
}

export default function BrandIntroduce(prop: IbrandIntroduce) {
  const { isEditable, banner, content } = prop;

  const count = 2;

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
          <p css={pass_h1} className={banner_title_className}>
            {banner?.title || banner_title_}
          </p>
          <p css={desc_style} className={banner_desc_className}>
            {banner?.desc || banner_desc_}
          </p>
        </div>
      </div>
      <OuterWrap padding="290px">
        <ContentsWrap>
          <div css={item_container}>
            {Array.from({ length: count }, (_, index) => (
              <BrandIntroduceItem
                key={index}
                title={content?.title || content_title_}
                desc={content?.desc || content_desc_}
              />
            ))}
          </div>
        </ContentsWrap>
      </OuterWrap>
    </OuterWrap>
  );
}

const item_container = css`
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

const pass_h1: Record<string, string> = {
  marginBottom: "30px",
  color: "#486284",
  fontFamily: "Inter",
  fontSize: "96px",
  fontStyle: "normal",
  fontWeight: "900",
  lineHeight: "150%",
  textTransform: "capitalize",
};

const desc_style = css`
  text-align: center;
  word-break: keep-all;
  color: #486284;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  // margin-bottom: 80px;

  max-width: 676px;
`;
