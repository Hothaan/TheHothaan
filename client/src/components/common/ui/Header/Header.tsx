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
      setIsMain(true);
    } else {
      setIsMain(false);
    }
  }, [isMain]);

  useEffect(() => {
    if (currentLocation === "/") {
      setIsMain(true);
    } else {
      setIsMain(false);
    }
  }, [currentLocation]);

  if (isMain) {
    return (
      <header css={header(!isScrolledPast)}>
        <Logo isMain={!isScrolledPast} />
        <GlobalNav isMain={!isScrolledPast} />
        <UserMenu isMain={!isScrolledPast} />
      </header>
    );
  }

  return (
    <header css={header(false)}>
      <Logo isMain={false} />
      <GlobalNav isMain={false} />
      <UserMenu isMain={false} />
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
