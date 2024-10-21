/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from "@emotion/react";
import Logo from "./Logo";
import GlobalNav from "./GlobalNav";
import UserMenu from "./UserMenu";

export default function Header() {
  const theme = useTheme();

  return (
    <header css={header(theme)}>
      <Logo />
      <GlobalNav />
      <UserMenu />
    </header>
  );
}

const header = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 80px;
  padding: 20px 100px;
  border-bottom: 1px solid #eaeaea;
  background-color: ${theme.colors.mono.white};
`;
