/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import useLocationControl from "@hooks/useLocationControl";
import ResponsiveContainer from "@components/common/ui/Container/ResponsiveContainer";
import { TcustomerService } from "./types";
import { Link } from "react-router-dom";

export default function Tab() {
  const { currentLocation, includeLocation } = useLocationControl();
  const [menu, setMenu] = useState<TcustomerService | null>(null);

  const menuData = [
    { menu: "가이드", link: "/customerService/guide" },
    { menu: "매뉴얼", link: "/customerService/manual" },
    { menu: "FAQ", link: "/customerService/faq" },
    { menu: "공지사항", link: "/customerService/notice" },
  ];

  function getCurrentMenu(): TcustomerService {
    return includeLocation("guide")
      ? "가이드"
      : includeLocation("manual")
      ? "매뉴얼"
      : includeLocation("faq")
      ? "FAQ"
      : "공지사항";
  }

  console.log(currentLocation);
  console.log(menu);

  useEffect(() => {
    const result = getCurrentMenu();
    setMenu(result);
  }, [currentLocation]);

  return (
    <div css={container}>
      {menuData.map((item, idx) => (
        <Link css={tab(menu === item.menu)} key={idx} to={item.link}>
          <p css={tab_text(menu === item.menu)}>{item.menu}</p>
        </Link>
      ))}
    </div>
  );
}

const container = css`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 0;
  width: 100%;
  display: flex;
  align-items: center;
`;

const tab = (isSelected: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  border-bottom: 2px solid ${isSelected ? "#119CD4" : "#DEDEDE"};

  transition: 0.3s ease-out;

  &:hover {
    border-bottom: 2px solid #119cd4;
    p {
      color: #119cd4;
    }
  }
`;

const tab_text = (isSelected: boolean) => css`
  color: ${isSelected ? "#119CD4" : "#DEDEDE"};
  padding-bottom: 20px;
  transition: 0.3s ease-out;
`;
