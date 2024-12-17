/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import Logo from "../Header/Logo";
import CompanyNav from "./CompanyNav";
import SnsBtnList from "./SnsBtnList";
import Information from "./Information";

export default function Footer() {
  return (
    <footer css={footer}>
      <div css={container}>
        <div css={top_container}>
          <div css={company_menu_container}>
            <Logo />
            <CompanyNav />
          </div>
          <SnsBtnList />
        </div>
        <Information />
      </div>
    </footer>
  );
}

const footer = css`
  width: 100%;
  padding: 40px 100px;
  border-top: 1px solid var(--DEDEDE, #dedede);
  background: var(--FFFFFF, #fff);
`;

const container = css`
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
`;

const top_container = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;

const company_menu_container = css`
  display: flex;
  align-items: center;
  gap: 30px;
`;
