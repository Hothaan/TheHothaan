/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import PlanBadge from "@components/common/ui/Header/PlanBadge";
import { useUserInfoStore } from "@store/userInfoStore";
import useLocationControl from "@hooks/useLocationControl";
import { ReactComponent as ChevDown } from "@svgs//common/chevDown.svg";

export interface IuserMenu {
  isMain: boolean;
}

export interface IuserMenuItem {
  text: string;
  link?: string;
  onClick?: () => void;
}

export default function UserMenu(prop: IuserMenu) {
  const { isMain } = prop;
  const theme = useTheme();
  const { removeUserInfo } = useUserInfoStore();
  const { includeLocation } = useLocationControl();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userInfo, isLogin } = useUserInfoStore();

  const userMenu: IuserMenuItem[] = [
    { text: "내 정보", link: "/myPage/myInfo" },
    { text: "내 작업", link: "/myPage/myProject" },
    { text: "받은 견적", link: "/myPage/estimate" },
    { text: "구독 관리", link: "/myPage/manageSubscription" },
    { text: "1:1 문의", link: "/myPage/personalInquiry" },
    { text: "로그아웃", onClick: removeUserInfo },
  ];

  function handleDropdownOpen(event: React.MouseEvent) {
    setIsDropdownOpen(!isDropdownOpen);
  }

  if (isLogin) {
    return (
      <div css={user_member}>
        <div css={user_menu_wrapper}>
          <button
            css={user_menu_btn(theme, isMain)}
            onClick={handleDropdownOpen}
          >
            <p>
              <span className="user_name">{userInfo.name}</span>님
            </p>
            <ChevDown css={chevIcon(theme, isMain)} />
          </button>
          {isDropdownOpen && (
            <ul css={user_menu_layer}>
              {userMenu.map((menuItem) => {
                return menuItem.link ? (
                  <li
                    key={menuItem.text}
                    className={includeLocation(menuItem.link) ? "selected" : ""}
                    onClick={handleDropdownOpen}
                  >
                    <Link to={menuItem.link}>
                      <p>{menuItem.text}</p>
                    </Link>
                  </li>
                ) : (
                  <li
                    key={menuItem.text}
                    onClick={(event) => {
                      handleDropdownOpen(event);
                      if (menuItem.onClick) {
                        menuItem.onClick();
                      }
                    }}
                    css={button}
                  >
                    <p>{menuItem.text}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <span css={user_divider}></span>
        <PlanBadge {...userInfo} />
      </div>
    );
  } else {
    return (
      <div css={user_not_memeber(theme, isMain)}>
        <Link to="/login">로그인</Link>
        <Link to="/join">회원가입</Link>
      </div>
    );
  }
}

const user_member = css`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const user_divider = (theme: Theme) => css`
  width: 1px;
  height: 16px;
  background-color: ${theme.colors.mono.gray2};
`;

const user_menu_wrapper = css`
  position: relative;
`;

const user_menu_btn = (theme: Theme, isMain: boolean) => css`
  display: flex;
  align-items: center;
  gap: 5px;
  p {
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    color: ${isMain ? "#fff" : theme.colors.text.dark};
    .user_name {
      color: ${theme.colors.text.blue};
    }
  }
`;
const chevIcon = (theme: Theme, isMain: boolean) => css`
  path {
    fill: ${isMain ? "#fff" : theme.colors.text.dark};
  }
`;

const user_not_memeber = (theme: Theme, isMain: boolean) => css`
  display: flex;
  gap: 30px;
  a {
    color: ${isMain ? "#fff" : theme.colors.mono.gray4};
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

const user_menu_layer = (theme: Theme) => css`
  position: absolute;
  z-index: 10;
  top: calc(100% + 18px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 150px;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  border-radius: 10px;
  border: 1px solid ${theme.colors.mono.gray3};
  background: var(--FFFFFF, #fff);
  box-shadow: 0px 4px 14px 0px rgba(0, 0, 0, 0.1);
  a,
  p {
    color: ${theme.colors.text.dark};
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    transition: color 0.3s ease;
  }
  li:hover a,
  li:hover p {
    color: ${theme.colors.text.blue};
  }
  li.selected a,
  li.selected p {
    color: ${theme.colors.text.blue};
  }
`;

const button = css`
  cursor: pointer;
`;
