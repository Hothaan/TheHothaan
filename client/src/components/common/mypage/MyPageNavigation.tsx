/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { ReactElement, useEffect, useState } from "react";
import { useUserInfoStore } from "@store/userInfoStore";
import { ReactComponent as MyInformation } from "@svgs/myPage/myInformation.svg";
import { ReactComponent as MyProject } from "@svgs/myPage/myProject.svg";
import { ReactComponent as MyEstimate } from "@svgs/myPage/myEstimate.svg";
import { ReactComponent as ManagePlan } from "@svgs/myPage/managePlan.svg";
import { ReactComponent as PersonalInquiry } from "@svgs/myPage/personalInquiry.svg";
import { ReactComponent as LogOut } from "@svgs/myPage/logOut.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type TmypageNavigationMenu =
  | "내 정보"
  | "내 작업"
  | "받은 견적"
  | "구독 관리"
  | "1:1 문의"
  | "로그아웃";

export interface ImyPageNavigationMenuButton {
  icon: ReactElement;
  link: string | null;
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
  const location = useLocation();
  const navigate = useNavigate();
  const { removeUserInfo, isLogin } = useUserInfoStore();
  const [selectedMenu, setSelectedMenu] =
    useState<TmypageNavigationMenu>("내 정보");

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  const menuDatas: ImyPageNavigationMenuButton[] = [
    {
      icon: <MyInformation />,
      link: "/myPage/myInfo",
      menu: "내 정보",
      isSelected: location.pathname === "/myPage/myInfo",
      onClick: () => {
        handleMenuClick("내 정보");
      },
    },
    {
      icon: <MyProject />,
      link: "/myPage/myProject",
      menu: "내 작업",
      isSelected:
        location.pathname === "/myPage/myProject" ||
        location.pathname === "/myPage/myProjectEdit",
      onClick: () => {
        handleMenuClick("내 작업");
      },
    },
    {
      icon: <MyEstimate />,
      link: "/myPage/estimate",
      menu: "받은 견적",
      isSelected:
        location.pathname === "/myPage/estimate" ||
        location.pathname === "/myPage/estimateDetail",
      onClick: () => {
        handleMenuClick("받은 견적");
      },
    },
    {
      icon: <ManagePlan />,
      link: "/myPage/manageSubscription",
      menu: "구독 관리",
      isSelected: location.pathname === "/myPage/manageSubscription",
      onClick: () => {
        handleMenuClick("구독 관리");
      },
    },
    {
      icon: <PersonalInquiry />,
      link: "/myPage/personalInquiry",
      menu: "1:1 문의",
      isSelected:
        location.pathname === "/myPage/personalInquiry" ||
        location.pathname === "/myPage/personalInquiryRegister",
      onClick: () => {
        handleMenuClick("1:1 문의");
      },
    },
    {
      icon: <LogOut />,
      link: null,
      menu: "로그아웃",
      isSelected: location.pathname === "/myPage/logout",
      onClick: () => {
        removeUserInfo();
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
        {menuDatas.map((item, idx) => {
          if (item.link) {
            return (
              <Link to={item.link} key={idx}>
                <MyPageNavigationMenuButton {...item} />
              </Link>
            );
          } else {
            return <MyPageNavigationMenuButton {...item} />;
          }
        })}
      </ul>
    </aside>
  );
}

const container = css`
  display: flex;
  width: 300px;
  height: calc(100vh - 80px - 211px);
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

  a {
    width: 100%;
  }
`;
