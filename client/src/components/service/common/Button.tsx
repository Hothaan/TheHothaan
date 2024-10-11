/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { Theme } from "@emotion/react";
import { Children } from "react";

interface Iprops {
  data: {
    color: string;
    padding: string;
    borderRadius: string;
    onClick: () => void;
  };
  children: React.ReactNode;
}

export default function TestButton(props: Iprops) {
  const { color, padding, borderRadius, onClick } = props.data;
  const theme = useTheme();

  const button = (theme: Theme) => css`
    background-color: ${theme.colors.secondary};
    color: ${theme.colors[color]};
    padding: ${padding};
    border-radius: ${borderRadius};
  `;

  return (
    <button css={button(theme)} onClick={onClick}>
      {props.children}
    </button>
  );
}
