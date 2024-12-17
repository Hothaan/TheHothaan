/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { Link } from "react-router-dom";

export interface IcompanyMenuItem {
  text: string;
  link: string;
}

const companyMenu: IcompanyMenuItem[] = [
  { text: "회사소개", link: "/introduceCompany" },
  { text: "서비스 소개서", link: "/introduceService" },
  { text: "이용약관", link: "/termOfUse" },
  { text: "개인정보 처리방침", link: "/privacyPolicy" },
];

export default function CompanyNav() {
  return (
    <ul css={company_menu}>
      {companyMenu.map((menu, idx) => (
        <li
          key={menu.link}
          className={idx < companyMenu.length - 1 ? "border" : ""}
        >
          <Link to={menu.link}>
            <p className="link">{menu.text}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

const company_menu = css`
  display: flex;
  align-item: center;
  gap: 20px;
  li.border {
    padding-right: 20px;
    border-right: 1px solid var(--ECECEC, #ececec);
  }
  a {
    color: var(--747474, #747474);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
