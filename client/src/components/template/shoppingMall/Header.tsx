/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as Image } from "@svgs/template/imageTemplate.svg";
import { ReactComponent as ChevDown } from "@svgs/template/chevDownTemplate.svg";
import { ReactComponent as User } from "@svgs/template/userTemplate.svg";
import { ReactComponent as Bag } from "@svgs/template/bagTemplate.svg";
import { ReactComponent as Search } from "@svgs/template/searchTemplate.svg";

export default function Header() {
  return (
    <div css={wrap}>
      <div css={logo_wrap}>
        <div css={logo_container}>
          <Image css={logo} />
        </div>
        <p css={logo_text}>logo</p>
      </div>
      <ul css={nav_container}>
        <li css={nav_item}>
          <p css={nav_text}>category</p>
          <ChevDown />
        </li>
        <li css={nav_item}>
          <p css={nav_text}>category</p>
          <ChevDown />
        </li>
        <li css={nav_item}>
          <p css={nav_text}>category</p>
        </li>
        <li css={nav_item}>
          <p css={nav_text}>category</p>
        </li>
        <li css={nav_item}>
          <p css={nav_text}>category</p>
        </li>
      </ul>
      <div css={user_container}>
        <User />
        <div css={bag_container}>
          <Bag />
          <div css={badge_container}>
            <p css={badge_text}>10</p>
          </div>
        </div>

        <Search />
      </div>
    </div>
  );
}

const wrap = css`
  width: 100%;
  display: flex;
  max-width: 1920px;
  justify-content: space-between;
  align-items: center;

  padding: 30px 100px;
`;

const logo_wrap = css`
  display: flex;
  gap: 13px;
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
`;

const nav_container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
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
`;

const user_container = css`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const bag_container = css`
  position: relative;
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
