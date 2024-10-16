/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import { ReactComponent as Instagram } from "@svgs/instagram.svg";
import { ReactComponent as Facebook } from "@svgs/facebook.svg";
import { ReactComponent as Youtube } from "@svgs/youtube.svg";
import { ReactElement } from "react";

interface IsnsBtnItem {
  icon: ReactElement;
  link: string;
}

const snsBtnList: IsnsBtnItem[] = [
  { icon: <Instagram />, link: "/instagram" },
  { icon: <Facebook />, link: "/facebook" },
  { icon: <Youtube />, link: "/youtube" },
];

export default function SnsBtnList() {
  return (
    <ul css={sns_list}>
      {snsBtnList.map((btn) => (
        <SnsBtn key={btn.link} icon={btn.icon} link={btn.link} />
      ))}
    </ul>
  );
}

const sns_list = css`
  display: flex;
  gap: 10px;
`;

function SnsBtn({ icon, link }: IsnsBtnItem) {
  return (
    <li css={sns_btn}>
      <Link to={link}>{icon}</Link>
    </li>
  );
}

const sns_btn = css`
  display: flex;
  width: 50px;
  height: 50px;
  padding: 20px 13px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 40px;
  background: var(--ECECEC, #ececec);
`;
