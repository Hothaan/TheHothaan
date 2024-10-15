/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { Theme } from "@emotion/react";
import { Children } from "react";

interface Iprops {
  data: {
    color: string;
    bg: string;
    padding: string;
    borderRadius: string;
    onClick?: () => void;
  };
  children: React.ReactNode;
}

export default function TestButton(props: Iprops) {
  const { color, bg, padding, borderRadius, onClick } = props.data;
  const theme = useTheme();

  const button = css`
    color: ${color};
    background-color: ${bg};
    padding: ${padding};
    border-radius: ${borderRadius};
  `;

  return (
    <button css={button} onClick={onClick}>
      {props.children}
    </button>
  );
}
