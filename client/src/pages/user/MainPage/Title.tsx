/** @jsxImportSource @emotion/react */
import React from "react";
import { css, CSSObject } from "@emotion/react";

export interface ItitleGradient {
  title: string;
}

export function TitleGradient(prop: ItitleGradient) {
  const { title } = prop;
  return <p css={title_gradient}>{title}</p>;
}

type TtitleColor = "white" | "black";

export interface Ititle {
  title: string;
  color: TtitleColor;
  highLight?: string;
}

export function Title(prop: Ititle) {
  const { title, color, highLight } = prop;
  if (highLight !== undefined) {
    const parts = title.split(highLight);

    const highLight_style = css`
      background: linear-gradient(90deg, #56c0fe 30%, #6d0ee6 70.54%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `;

    return (
      <p css={title_style(color)}>
        {parts.map((item, idx) => (
          <React.Fragment key={idx}>
            {item}
            {idx < parts.length - 1 && (
              <span css={highLight_style}>{highLight}</span>
            )}
          </React.Fragment>
        ))}
      </p>
    );
  } else {
    return <p css={title_style(color)}>{title}</p>;
  }
}

const title_gradient = css`
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */

  background: var(
    --Linear,
    linear-gradient(90deg, #56c0fe -1.67%, #6d0ee6 98.33%)
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const title_style = (color: TtitleColor) => css`
  color: ${color === "black" ? "#383838" : "#fff"};
  font-family: Pretendard;
  font-size: 45px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 67.5px */
`;
