/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoDark } from "@svgs/common/logoDark.svg";
import { ReactComponent as LogoLight } from "@svgs/common/logoLight.svg";

export interface Ilogo {
  isMain?: boolean;
}

export default function Logo(prop: Ilogo) {
  const { isMain } = prop;

  return (
    <div css={logo_container}>
      <Link to="/">
        <h1>TheHotHaan</h1>
        {isMain ? <LogoLight css={logo} /> : <LogoDark css={logo} />}
      </Link>
    </div>
  );
}

const logo_container = css`
  text-indent: -999999rem;
  h1 {
    height: 0;
  }
`;

const logo = css`
  width: 180px;
  height: auto;
`;
