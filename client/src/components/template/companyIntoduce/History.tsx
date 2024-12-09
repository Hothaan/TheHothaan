/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { OuterWrap } from "../commonComponent/Wrap";

const item_desc_ =
  "lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non";

export interface IhistoryItem {
  year?: string;
  desc?: string;
  isSelected?: boolean;
  isLast?: boolean;
}

function HistoryItem(prop: IhistoryItem) {
  const { year, desc, isSelected, isLast } = prop;
  return (
    <li css={history_item}>
      <p css={year_style}>{year}</p>
      <div css={circle_container}>
        <span css={circle(isSelected)}></span>
      </div>

      <p css={desc_style(isSelected, isLast)}>{desc}</p>
    </li>
  );
}

export default function History() {
  const itemDatas: IhistoryItem[] = [
    { year: "2021", desc: item_desc_, isSelected: true },
    { year: "2020", desc: item_desc_ },
    { year: "2018", desc: item_desc_ },
    { year: "2016", desc: item_desc_ },
    { year: "2015", desc: item_desc_ },
    { year: "2014", desc: item_desc_, isLast: true },
  ];

  return (
    <OuterWrap padding="200px 0">
      <div css={container}>
        <ul css={history_list}>
          {itemDatas.map((item, idx) => (
            <HistoryItem key={idx} {...item} />
          ))}
        </ul>
      </div>
    </OuterWrap>
  );
}

const container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const history_list = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const history_item = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 24px;
`;

const year_style = css`
  color: #486284;
  font-family: "Kumbh Sans";
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const desc_style = (isSelected?: boolean, isLast?: boolean) => css`
  position: relative;

  max-width: 600px;
  color: #486284;

  /* h2_middle */
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  padding-bottom: ${isLast ? "0px" : isSelected ? "240px" : "140px"};

  &:after {
    display: block;
    content: "";
    width: 1px;
    height: 100%;
    position: absolute;
    background-color: ${isSelected ? "#486284" : "#D6D6D6"};
    top: 20px;
    left: -34px;
  }
`;

const circle_container = css`
  display: flex;
  align-items: center;
  height: 54px;
`;

const circle = (isSelected?: boolean) => css`
  position: relative;

  width: 20px;
  height: 20px;
  display: block;
  border: 5px solid ${isSelected ? "#486284" : "#D6D6D6"};
  background-color: #fff;
  border-radius: 50%;

  &:before {
    display: block;
    content: "";
    z-index: 1;
    width: 10px;
    height: 10px;
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
