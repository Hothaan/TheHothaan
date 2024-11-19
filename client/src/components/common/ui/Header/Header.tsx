/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Logo from "./Logo";
import GlobalNav from "./GlobalNav";
import UserMenu from "./UserMenu";
import useLocationControl from "@hooks/useLocationControl";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentLocation } = useLocationControl();
  const [isMain, setIsMain] = useState(currentLocation === "/");
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    setIsScrolledPast(scrollY > 880);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMain) {
      if (isScrolledPast) {
        setIsMain(false);
      } else {
        setIsMain(true);
      }
    }
  }, [isMain, isScrolledPast]);

  return (
    <header css={header(isMain)}>
      <Logo isMain={isMain} />
      <GlobalNav isMain={isMain} />
      <UserMenu isMain={isMain} />
    </header>
  );
}

const header = (isMain: boolean) => css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 80px;
  padding: 20px 100px;
  border-bottom: 1px solid #eaeaea;
  background-color: ${isMain ? "transparent" : "#fff"};
`;
