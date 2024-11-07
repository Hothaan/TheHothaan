/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export interface Ititle {
  title: string;
  weight?: "light" | "bold";
  marginBottom: number;
  transform: "uppercase" | "capitalize";
}

export default function Title(prop: Ititle) {
  const { title, weight, marginBottom, transform } = prop;
  if (weight === "bold") {
    return <p css={title_style_bold(transform, marginBottom)}>{title}</p>;
  } else if (weight === "light") {
    return <p css={title_style_light(transform, marginBottom)}>{title}</p>;
  } else {
    return <p css={title_style_bold(transform, marginBottom)}>{title}</p>;
  }
}

const title_style_bold = (transform: string, marginBottom: number) => css`
  width: 100%;
  text-align: center;
  color: #486284;
  font-family: Inter;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-transform: ${transform};
  margin-bottom: ${marginBottom}px;
`;

const title_style_light = (transform: string, marginBottom: number) => css`
  width: 100%;
  text-align: center;
  color: #486284;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: ${transform};
  margin-bottom: ${marginBottom}px;
`;
