/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import useLocationControl from "@hooks/useLocationControl";

export interface IGlobalNav {
  isMain: boolean;
}

export interface ImenuItem {
  kor: string;
  eng: string;
  include?: string;
  link: string;
  depth2?: IsubMenuItem[];
}

export interface IsubMenuItem {
  kor: string;
  eng: string;
  link: string;
}

export const menu: ImenuItem[] = [
  {
    kor: "서비스",
    eng: "service",
    link: "/service/step1",
    include: "/service",
  },
  { kor: "견적", eng: "estimate", link: "/estimate" },
  { kor: "플랜안내", eng: "pricing", link: "/planIntro" },
  {
    kor: "고객센터",
    eng: "support",
    link: "/customerService",
    depth2: [
      // { kor: "고객지원", eng: "support", link: "/customerService/support" },
      { kor: "이용가이드", eng: "guide", link: "/customerService/guide" },
      { kor: "매뉴얼", eng: "manual", link: "/customerService/manual" },
      { kor: "FAQ", eng: "FAQ", link: "/customerService/faq" },
      { kor: "공지사항", eng: "notice", link: "/customerService/notice" },
    ],
  },
];

export default function GlobalNav(prop: IGlobalNav) {
  const { isMain } = prop;
  const theme = useTheme();
  const { includeLocation } = useLocationControl();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleMouseEnter() {
    setIsDropdownOpen(true);
  }
  function handleMouseLeave() {
    setIsDropdownOpen(false);
  }

  return (
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
              css={depth1_btn(theme, isMain)}
              className={
                includeLocation(item.include ? item.include : item.link)
                  ? "selected"
                  : ""
              }
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
  );
}

const nav = css`
  display: flex;
  gap: 30px;
`;

const hover = css`
  position: relative;
`;

const depth1_btn = (theme: Theme, isMain: boolean) => css`
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
    color: ${isMain ? "#fff" : theme.colors.text.dark};
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
  z-index: 10;
  top: calc(100% + 19px);
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
