/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap, ContentsWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";

export interface IbrandIntroduceItem {
  title?: string;
  desc?: string;
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

      <p css={item_title}>{title || "title"}</p>
      <p css={item_desc}>{desc || "description"}</p>
    </div>
  );
}

export interface IbrandIntroduce {
  isEditable?: boolean;
  title?: string;
  desc?: string;
}

export default function BrandIntroduce(prop: IbrandIntroduce) {
  const { isEditable, title, desc } = prop;

  const ItemDatas: IbrandIntroduceItem[] = [
    {
      title: title || "headline h1",
      desc:
        desc ||
        "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non",
    },
    {
      title: title || "headline h1",
      desc:
        desc ||
        "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia nonlorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non",
    },
  ];
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
          {/* <p css={pass_h1}>{title}</p> */}
          <p css={pass_h1}>{title || "headline h1"}</p>
          {/* <p css={desc_style}>{desc}</p> */}
          <p css={desc_style}>
            {desc ||
              "lorem ipsum, quia dolor sit, amet,consectetur, adipisci velit, sed quia non"}
          </p>
        </div>
      </div>
      <OuterWrap padding="290px">
        <ContentsWrap>
          <div css={item_container}>
            {ItemDatas.map((item) => (
              <BrandIntroduceItem {...item} />
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
