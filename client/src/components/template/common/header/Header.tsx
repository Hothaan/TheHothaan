/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { ReactComponent as Image } from "@svgs/template/imageTemplate.svg";
import { ReactComponent as User } from "@svgs/template/userTemplate.svg";
import { ReactComponent as Bag } from "@svgs/template/bagTemplate.svg";
import { ReactComponent as Search } from "@svgs/template/searchTemplate.svg";
import NavItem from "@components/template/commonComponent/NavItem";

export interface Iheader {
  serviceType?: string;
  logo?: string;
  categories?: string[];
}

export default function Header(prop: Iheader) {
  const { serviceType, logo, categories } = prop;

  console.log(categories);

  return (
    <div css={wrap}>
      <div css={logo_wrap}>
        <div css={logo_container}>
          <Image css={logo} />
        </div>
        <p css={logo_text}>{logo || "logo"}</p>
      </div>
      <ul css={nav_container}>
        {categories ? (
          categories.map((category, idx) => (
            <NavItem key={idx} isOption={false} category={category} />
          ))
        ) : (
          <>
            <NavItem isOption={true} />
            <NavItem isOption={true} />
            <NavItem isOption={false} />
            <NavItem isOption={false} />
            <NavItem isOption={false} />
            <NavItem isOption={false} />
          </>
        )}
      </ul>
      <div css={user_container}>
        {serviceType !== "홈페이지·게시판" && serviceType !== "랜딩·소개" && (
          <User />
        )}
        {serviceType === "쇼핑몰" && (
          <div css={bag_container}>
            <Bag />
            <div css={badge_container}>
              <p css={badge_text}>10</p>
            </div>
          </div>
        )}
        <Search />
      </div>
    </div>
  );
}

const wrap = css`
  width: 100%;
  max-width: 1920px;
  min-width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 30px 100px;

  @media (max-width: 1200px) {
    padding: 30px 50px;
  }
`;

const logo_wrap = css`
  display: flex;
  gap: 13px;
  align-items: center;
`;

const logo_container = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;

  border-radius: 50%;
  background-color: #e2e8ef;
`;

const logo = css`
  width: 22px;
  height: 22px;
`;

const logo_text = css`
  color: #486284;
  font-family: Inter;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  @media (max-width: 1300px) {
    font-size: 30px;
  }
`;

const nav_container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;

  @media (max-width: 1300px) {
    gap: 20px;
  }
`;

const nav_item = css`
  display: flex;
  align-items: center;
`;

const nav_text = css`
  color: #486284;
  font-family: Inter;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
  @media (max-width: 1300px) {
    font-size: 16px;
  }
`;

const user_container = css`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 1300px) {
    gap: 10px;
  }
`;

const bag_container = css`
  position: relative;
  margin-right: 10px;
`;

const badge_container = css`
  display: flex;
  padding: 7px 6px;
  align-items: center;

  position: absolute;
  right: -12px;
  bottom: -6.5px;

  border-radius: 40px;
  background: #486284;
`;

const badge_text = css`
  color: var(--FFFFFF, #fff);
  leading-trim: both;
  text-edge: cap;
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;
