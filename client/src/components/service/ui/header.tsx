/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as LogoDark } from "@svgs/logoDark.svg";
import { ReactComponent as ChevDown } from "@svgs/chevDown.svg";
import { ReactComponent as Crown } from "@svgs/bxs-crown.svg";
import useLocationControl from "@hooks/useLocationControl";
import PlanBadge from "@components/service/common/PlanBadge";
import { useUserInfoStore } from "@store/userInfoStore";

interface MenuItem {
  kor: string;
  eng: string;
  link: string;
  depth2?: SubMenuItem[];
}

interface SubMenuItem {
  kor: string;
  eng: string;
  link: string;
}

const menu: MenuItem[] = [
  { kor: "서비스", eng: "service", link: "/service" },
  { kor: "견적", eng: "estimate", link: "/estimate" },
  { kor: "플랜안내", eng: "pricing", link: "/planIntro" },
  {
    kor: "고객센터",
    eng: "support",
    link: "/customerService",
    depth2: [
      { kor: "고객지원", eng: "support", link: "/customerService/support" },
      { kor: "이용가이드", eng: "guide", link: "/customerService/guide" },
      { kor: "매뉴얼", eng: "manual", link: "/customerService/manual" },
      { kor: "FAQ", eng: "FAQ", link: "/customerService/faq" },
      { kor: "공지사항", eng: "notice", link: "/customerService/notice" },
    ],
  },
];

interface IuserMenu {
  isLogin: boolean;
  userInfo: TuserInfo;
}

const UserMenu = ({ isLogin, userInfo }: IuserMenu) => {
  const { removeUserInfo } = useUserInfoStore();
  const { includeLocation } = useLocationControl();

  interface IuserMenuItem {
    text: string;
    link?: string;
    onClick?: () => void;
  }

  function handleLogout() {
    removeUserInfo();
  }

  const userMenu: IuserMenuItem[] = [
    { text: "내 정보", link: "/myPage" },
    { text: "내 작업", link: "/myProject" },
    { text: "받은 견적", link: "/estimateHistory" },
    { text: "구독 관리", link: "/managePlan" },
    { text: "1:1 문의", link: "/personalInquiry" },
    { text: "로그아웃", onClick: handleLogout },
  ];

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

  const user_menu_btn = (theme: Theme) => css`
    display: flex;
    align-items: center;
    gap: 5px;
    p {
      font-family: Pretendard;
      font-size: 15px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      color: ${theme.colors.text.dark};
      .user_name {
        color: ${theme.colors.text.blue};
      }
    }
  `;

  const user_not_memeber = (theme: Theme) => css`
    display: flex;
    gap: 30px;
    a {
      color: ${theme.colors.mono.gray4};
      font-size: 15px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  `;

  const user_menu_layer = (theme: Theme) => css`
    position: absolute;
    top: calc(100% + 17px);
    display: flex;
    width: 150px;
    padding: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 16px;
  `;

  if (isLogin) {
    return (
      <div css={user_member}>
        <div css={user_menu_wrapper}>
          <button css={user_menu_btn}>
            <p>
              <span className="user_name">{userInfo.name}</span>님
            </p>
            <ChevDown />
          </button>
          <ul css={user_menu_layer}>
            {userMenu.map((menuItem) => (
              <li key={menuItem.text}>
                {menuItem.link && (
                  <Link
                    to={menuItem.link}
                    className={includeLocation(menuItem.link) ? "selected" : ""}
                  >
                    <p>{menuItem.text}</p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <span css={user_divider}></span>
        <PlanBadge {...userInfo} />
      </div>
    );
  } else {
    return (
      <div css={user_not_memeber}>
        <Link to="/">로그인</Link>
        <Link to="/">회원가입</Link>
      </div>
    );
  }
};

export default function Header() {
  const theme = useTheme();
  const { includeLocation } = useLocationControl();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isLogin = true;
  const userInfo: TuserInfo = {
    name: "홍길동",
    plan: "pro",
    term: "월간",
  };

  function handleMouseEnter() {
    setIsDropdownOpen(true);
  }
  function handleMouseLeave() {
    setIsDropdownOpen(false);
  }

  return (
    <header css={header(theme)}>
      <div css={logo_container}>
        <Link to="/">
          <h1>TheHotHaan</h1>
          <LogoDark css={logo} />
        </Link>
      </div>
      <nav>
        <ul css={nav}>
          {menu.map((item) => (
            <li
              key={item.eng}
              css={hover}
              onMouseEnter={item.depth2 ? handleMouseEnter : undefined}
            >
              <Link
                to={item.link}
                css={depth1_btn(theme)}
                className={includeLocation(item.link) ? "selected" : ""}
              >
                <p className="link">{item.kor}</p>
              </Link>
              {item.depth2 && isDropdownOpen && (
                <ul
                  css={depth2_container(theme)}
                  className="depth2_container"
                  onMouseLeave={item.depth2 ? handleMouseLeave : undefined}
                >
                  {item.depth2.map((subItem) => (
                    <li key={subItem.eng} css={depth2_menu_container(theme)}>
                      <Link
                        to={subItem.link}
                        css={depth2_menu(theme)}
                        className={
                          includeLocation(subItem.link) ? "selected" : ""
                        }
                      >
                        <p className="link">{subItem.kor}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <UserMenu isLogin={isLogin} userInfo={userInfo} />
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

const logo_container = css`
  text-indent: -999999rem;
  h1 {
    height: 0;
  }
`;

const logo = css`
  width: 130px;
  height: auto;
`;

const nav = css`
  display: flex;
  gap: 30px;
`;

const hover = css`
  position: relative;
`;

const depth1_btn = (theme: Theme) => css`
  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  font-size: 17px;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  transition: 0.3s ease;
  &:hover {
    background-color: ${theme.colors.blue.bg};
    > .link {
      color: ${theme.colors.text.blue};
    }
  }

  > .link {
    color: ${theme.colors.text.dark};
  }
  &.selected {
    background-color: ${theme.colors.blue.bg};
    > .link {
      color: ${theme.colors.text.blue};
    }
  }
`;

const depth2_container = (theme: Theme) => css`
  position: absolute;
  top: calc(100% + 17px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 140px;
  border: 1px solid var(--DEDEDE, #dedede);
`;

const depth2_menu_container = (theme: Theme) => css`
  width: 100%;
`;

const depth2_menu = (theme: Theme) => css`
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  background-color: ${theme.colors.mono.white};
  .link {
    color: var(--383838, #383838);
  }
  transition: 0.3s ease;
  &:hover {
    background-color: ${theme.colors.blue.bg};
    > .link {
      color: ${theme.colors.text.blue};
    }
  }
  &.selected {
    background-color: ${theme.colors.blue.bg};
    > .link {
      color: ${theme.colors.text.blue};
    }
  }
`;
