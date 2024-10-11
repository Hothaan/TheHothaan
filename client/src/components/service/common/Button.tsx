/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { Theme } from "@emotion/react";
import { Children } from "react";

interface Iprops {
  css: {
    color: string;
    padding: string;
    borderRadius: string;
    onClick: () => void;
  };
  children: React.ReactNode;
}

export default function MyButton(props: Iprops) {
  const { color, padding, borderRadius, onClick } = props.css;
  const theme = useTheme();

  const button = (theme: Theme) => css`
    background-color: ${theme.colors.background};
    color: ${theme.colors[color]};
    padding: ${padding};
    border-radius: ${borderRadius};
    &:hover {
      background-color: ${theme.colors.secondary};
    }
  `;

  return (
    <button css={button(theme)} onClick={onClick}>
      {props.children}
    </button>
  );
}
