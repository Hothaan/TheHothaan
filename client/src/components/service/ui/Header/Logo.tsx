/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoDark } from "@svgs/logoDark.svg";

export default function Logo() {
  return (
    <div css={logo_container}>
      <Link to="/">
        <h1>TheHotHaan</h1>
        <LogoDark css={logo} />
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
  width: 130px;
  height: auto;
`;
