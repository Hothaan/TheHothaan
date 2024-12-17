/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";

export interface ItextField {
  width: string;
  height: string;
}
export default function TemplateTextField(prop: ItextField) {
  const { width, height } = prop;
  return <div css={container(width, height)}></div>;
}

const container = (width: string, height: string) => css`
  width: ${width};
  height: ${height};

  border: 1px solid #486284;
  background: rgba(255, 255, 255, 0);
`;
