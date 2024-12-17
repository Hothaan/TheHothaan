/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { ReactComponent as Arrow } from "@svgs/template/accordionArrow.svg";

export interface ItemplateAccordion {
  text: string;
  isOpen: boolean;
}

export default function TemplateAccordion(prop: ItemplateAccordion) {
  const { text, isOpen } = prop;
  return (
    <div css={accordion}>
      <p css={text_style}>{text}</p>
      <Arrow css={icon(isOpen)} />
    </div>
  );
}

const accordion = css`
  display: flex;
  padding: 18px 12px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  border-bottom: 1px solid #e9e9e9;
`;

const text_style = css`
  color: #486284;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: uppercase;
`;

const icon = (isOpen: boolean) => css`
  transform: ${isOpen ? "rotate(180deg)" : "none"};
`;
