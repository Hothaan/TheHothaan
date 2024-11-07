/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap } from "../commonComponent/Wrap";
import ImageBox from "../commonComponent/ImageBox";
import { ReactComponent as Image } from "@svgs/template/imageTemplate.svg";
import TemplateButton from "../commonComponent/TemplateButton";

export interface ImainBanner {
  title: string;
  desc: string;
}

export default function Mainbanner(prop: ImainBanner) {
  const { title, desc } = prop;

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
          <p css={h1}>{title}</p>
          <p css={desc_style}>{desc}</p>
          <TemplateButton type="default" text="button" />
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

const h1 = css`
  margin-bottom: 30px;

  color: #486284;
  font-family: Inter;
  font-size: 96px;
  font-style: normal;
  font-weight: 900;
  line-height: 150%; /* 144px */
  text-transform: capitalize;
`;

const desc_style = css`
  word-break: keep-all;
  color: #486284;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 80px;

  max-width: 676px;
`;
