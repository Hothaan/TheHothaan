/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as Arrow } from "@svgs/template/breadCrumbleArrow.svg";

export interface IbreadCrumble {
  path1: string;
  path2: string;
}

export default function BreadCrumble(prop: IbreadCrumble) {
  const { path1, path2 } = prop;
  return (
    <div css={bread_crumble}>
      <p css={path}>{path1}</p>
      <Arrow />
      <p css={path}>{path2}</p>
    </div>
  );
}

const bread_crumble = css`
  display: flex;
  align-items: center;
  gap: 11px;
`;

const path = css`
  color: #9d9d9d;
  text-align: center;
  leading-trim: both;
  text-edge: cap;

  /* 13 */
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 20.8px */
`;
