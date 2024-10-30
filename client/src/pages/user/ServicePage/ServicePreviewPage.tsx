/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import ButtonArrowIcon from "@components/service/button/ButtonArrowIcon";
import { IbuttonArrow } from "@components/service/button/ButtonArrowIcon";
import { ReactComponent as Doc } from "@svgs/doc.svg";
import { ReactComponent as Preview } from "@svgs/previewGradient.svg";
import { IbuttonIcon } from "@components/service/button/ButtonIcon";
import ButtonIcon from "@components/service/button/ButtonIcon";
import { ReactComponent as Download } from "@svgs/download.svg";
import { IbuttonIconAccordion } from "@components/service/button/ButtonIconAccordion";
import ButtonIconAccordion from "@components/service/button/ButtonIconAccordion";
import { useState } from "react";

export default function ServicePreviewPage() {
  const navigate = useNavigate();
  const buttonArrowIcon: IbuttonArrow = {
    direction: "left",
    onClick: () => {
      navigate(-1);
    },
  };

  const buttonEstimate: IbuttonIcon = {
    size: "M",
    icon: <Doc />,
    text: "견적요청",
    onClick: () => {
      console.log("견적요청 페이지로 이동");
    },
  };

  const buttonDownload: IbuttonIconAccordion = {
    size: "M",
    icon: <Download />,
    text: "다운로드",
    onClick: () => {},
    options: [
      { text: "vis 다운로드", onClick: () => {} },
      { text: "PDF 다운로드", onClick: () => {} },
      { text: "JPG 다운로드", onClick: () => {} },
      { text: "PNG 다운로드", onClick: () => {} },
    ],
  };

  interface IlistItem {
    title: string;
    image?: React.ReactElement;
  }

  const listData: IlistItem[] = [
    { title: "메인" },
    { title: "상품" },
    { title: "공지사항" },
    { title: "FAQ" },
  ];

  const [selectedItem, setSelectedItem] = useState<string>(listData[0].title);

  function handleSelectItem(e: React.MouseEvent) {
    let title = e.currentTarget.querySelector("p")?.innerText;
    if (title) {
      setSelectedItem(title);
    }
  }

  return (
    <div css={wrap}>
      <div css={title_section}>
        <div css={title_container}>
          <ButtonArrowIcon {...buttonArrowIcon} />
          <p css={title}>프로젝트명</p>
        </div>
        <div css={button_container}>
          <ButtonIcon {...buttonEstimate} />
          <ButtonIconAccordion {...buttonDownload} />
        </div>
      </div>
      <div css={main}>
        <aside css={side_nav}>
          <div css={list_title_container}>
            <Preview />
            <p css={list_title}>모든화면</p>
          </div>
          <ul css={list}>
            {listData.map((item) => (
              <li
                css={[list_item, list_item_color(selectedItem === item.title)]}
                onClick={handleSelectItem}
              >
                <p css={list_item_title(selectedItem === item.title)}>
                  {item.title}
                </p>
                <div css={image_container}></div>
              </li>
            ))}
          </ul>
        </aside>
        <div css={preview_container}>
          <div css={preview}></div>
          <div css={controller}></div>
        </div>
      </div>
    </div>
  );
}

const wrap = css`
  margin-bottom: 100px;
`;

const title_section = css`
  display: flex;
  justify-content: space-between;
  padding-bottom: 60px;
  margin-bottom: 60px;
  border-bottom: 1px solid #ececec;
`;
const title_container = css`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const title = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const button_container = css`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;
const main = css`
  width: 100%;
  display: flex;
  gap: 100px;
`;
const side_nav = css`
  display: flex;
  width: 200px;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
`;

const list_title_container = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const list_title = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const list = css`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 14px;
`;
const list_item = css`
  cursor: pointer;

  width: 100%;

  display: flex;
  padding: 14px;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  align-self: stretch;

  border-radius: 10px;
  // border: 2px solid var(--DEDEDE, #dedede);
  position: relative;
  border: 2px solid transparent;
  background: var(--FFF, #fff);

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 10px;
    padding: 2px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const list_item_color = (isSelected: boolean) => css`
  &:before {
    background: ${isSelected
      ? "linear-gradient(to right, #3b82f6, #a855f7)"
      : "linear-gradient(to right, #dedede, #dedede)"};
  }
`;

const list_item_title = (isSelected: boolean) => css`
  color: ${isSelected ? "#383838" : "#747474"};
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const image_container = css`
  width: 100%;

  display: flex;
  height: 100px;
  align-items: flex-start;
  gap: 14px;
  align-self: stretch;
  flex-wrap: wrap;

  border: 1px solid var(--DEDEDE, #dedede);
  background: url(<path-to-image>) lightgray 50% / cover no-repeat, #f6f6f6;
`;
const preview_container = css`
  width: 100%;
`;
const preview = css`
  width: 100%;
  display: flex;
  height: 3806px;
  padding: 20px;
  align-items: flex-start;
  gap: 14px;

  border-radius: 20px;
  border: 1px solid var(--DEDEDE, #dedede);
  background: url(<path-to-image>) lightgray 50% / cover no-repeat, #f6f6f6;
`;
const controller = css``;
