/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as Image } from "@svgs/template/imageTemplate.svg";

export interface ImainBanner {
  title: string;
  desc: string;
}

export default function Mainbanner(prop: ImainBanner) {
  const { title, desc } = prop;

  return (
    <div css={wrap}>
      <div css={gradient}>
        <div css={container}>
          <p css={h1}>{title}</p>
          <p css={desc_style}>{desc}</p>
          <button css={button}>button</button>
        </div>
        <Image css={icon} />
      </div>
    </div>
  );
}

const wrap = css`
  position: relative;
  width: 1920px;
  height: 860px;
  background-color: #eff2f6;
`;

const gradient = css`
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #9cb0c900 0%, #9cb0c933 100%);
  padding: 212px 132px;
`;

const container = css``;

const icon = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 210px;
  height: 210px;
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
  color: #486284;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 80px;
`;

const button = css`
  display: flex;
  width: 221px;
  height: 82px;
  padding: 18px 63px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  border-radius: 10px;
  background: #486284;

  color: var(--FFFFFF, #fff);

  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
