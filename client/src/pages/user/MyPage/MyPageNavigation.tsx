/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { ReactElement, useState } from "react";
import { ReactComponent as MyInformation } from "@svgs/myPage/myInformation.svg";
import { ReactComponent as MyProject } from "@svgs/myPage/myProject.svg";
import { ReactComponent as MyEstimate } from "@svgs/myPage/myEstimate.svg";
import { ReactComponent as ManagePlan } from "@svgs/myPage/managePlan.svg";
import { ReactComponent as PersonalInquiry } from "@svgs/myPage/personalInquiry.svg";
import { ReactComponent as LogOut } from "@svgs/myPage/logOut.svg";

export type TmypageNavigationMenu =
  | "내 정보"
  | "내 작업"
  | "받은 견적"
  | "구독 관리"
  | "1:1 문의"
  | "로그아웃";

export interface ImyPageNavigationMenuButton {
  icon: ReactElement;
  menu: TmypageNavigationMenu;
  isSelected: boolean;
  onClick: () => void;
}

function MyPageNavigationMenuButton(prop: ImyPageNavigationMenuButton) {
  const { icon, menu, isSelected, onClick } = prop;

  const menu_button = (isSelected: boolean) => css`
    display: flex;
    padding: 15px 14px;
    align-items: center;
    gap: 5px;
    align-self: stretch;
    cursor: pointer;

    transition: 0.4s ease-in-out;

    border-radius: 6px;
    background: var(
      --Linear,
      linear-gradient(
        90deg,
        ${isSelected ? "#56c0fe -1.67%, #6d0ee6 98.33%" : "transparent"}
      )
    );
  `;

  const icon_container = (isSelected: boolean) => css`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg * {
      fill: ${isSelected ? "#fff" : "#747474"};
    }
  `;

  const menu_style = (isSelected: boolean) => css`
    color: ${isSelected ? "#fff" : "#747474"};
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  `;

  return (
    <li css={menu_button(isSelected)} onClick={onClick}>
      <div css={icon_container(isSelected)}>{icon}</div>
      <p css={menu_style(isSelected)}>{menu}</p>
    </li>
  );
}

export default function MyPageNavigation() {
  const [selectedMenu, setSelectedMenu] =
    useState<TmypageNavigationMenu>("내 정보");

  const menuDatas: ImyPageNavigationMenuButton[] = [
    {
      icon: <MyInformation />,
      menu: "내 정보",
      isSelected: selectedMenu === "내 정보",
      onClick: () => {
        handleMenuClick("내 정보");
      },
    },
    {
      icon: <MyProject />,
      menu: "내 작업",
      isSelected: selectedMenu === "내 작업",
      onClick: () => {
        handleMenuClick("내 작업");
      },
    },
    {
      icon: <MyEstimate />,
      menu: "받은 견적",
      isSelected: selectedMenu === "받은 견적",
      onClick: () => {
        handleMenuClick("받은 견적");
      },
    },
    {
      icon: <ManagePlan />,
      menu: "구독 관리",
      isSelected: selectedMenu === "구독 관리",
      onClick: () => {
        handleMenuClick("구독 관리");
      },
    },
    {
      icon: <PersonalInquiry />,
      menu: "1:1 문의",
      isSelected: selectedMenu === "1:1 문의",
      onClick: () => {
        handleMenuClick("1:1 문의");
      },
    },
    {
      icon: <LogOut />,
      menu: "로그아웃",
      isSelected: selectedMenu === "로그아웃",
      onClick: () => {
        handleMenuClick("로그아웃");
      },
    },
  ];

  const handleMenuClick = (menu: TmypageNavigationMenu) => {
    setSelectedMenu(menu);
  };

  return (
    <aside css={container}>
      <p css={title}>마이페이지</p>
      <ul css={menu_container}>
        {menuDatas.map((item, idx) => (
          <MyPageNavigationMenuButton {...item} key={idx} />
        ))}
      </ul>
    </aside>
  );
}

const container = css`
  display: flex;
  width: 300px;
  height: calc(100vh - 80px);
  padding: 50px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  flex-shrink: 0;

  border-right: 1px solid var(--ECECEC, #ececec);
  background: var(--F6F8FF, #f6f8ff);
`;

const title = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const menu_container = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
`;
