/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
import { ReactComponent as Edit } from "@svgs/service/edit.svg";
import { ReactComponent as Preview } from "@svgs/service/previewGray.svg";
import ButtonArrowIconControler, {
  IbuttonArrowControler,
} from "../button/ButtonArrowIconControler";

export default function Navigation() {
  const [isFullpageModalOpen, setIsFullpageModalOpen] = useState(false);

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

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<string>(listData[0].title);

  function handleSelectItem(e: React.MouseEvent<HTMLLIElement>) {
    const idx = parseInt(e.currentTarget.dataset.idx || "0");
    if (idx !== null) {
      setSelectedItem(listData[idx].title);
    }
  }

  function handleSelectPrevItem() {
    if (currentIdx === 0) {
      return;
    } else {
      setSelectedItem(listData[currentIdx - 1].title);
      setCurrentIdx(currentIdx - 1);
    }
  }

  function handleNextPrevItem() {
    if (currentIdx === listData.length - 1) {
      return;
    } else {
      setSelectedItem(listData[currentIdx + 1].title);
      setCurrentIdx(currentIdx + 1);
    }
  }

  const buttonSelectPrevItemAside: IbuttonArrowControler = {
    currentIdx: currentIdx,
    total: listData.length - 1,
    direction: "up",
    onClick: () => {
      handleSelectPrevItem();
    },
  };

  const buttonSelectNextItemAside: IbuttonArrowControler = {
    currentIdx: currentIdx,
    total: listData.length - 1,
    direction: "down",
    onClick: () => {
      handleNextPrevItem();
    },
  };

  function handleChangeisFullpageModalOpen(isFullpageModalOpen: boolean) {
    setIsFullpageModalOpen(isFullpageModalOpen);
  }

  function handleOpenFullPageModalEditable() {
    setIsFullpageModalOpen(true);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullpageModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <aside css={side_nav}>
      <div css={list_title_container}>
        <Preview />
        <p css={list_title}>모든화면</p>
      </div>
      <ul css={list}>
        {listData.map((item, idx) => (
          <li
            css={[list_item, list_item_color(selectedItem === item.title)]}
            onClick={handleSelectItem}
            onDoubleClick={handleOpenFullPageModalEditable}
            data-idx={idx}
          >
            <div css={image_container}></div>
            <div css={list_item_info_container(selectedItem === item.title)}>
              <p css={list_item_title}>{item.title}</p>
              {selectedItem === item.title && <Edit />}
            </div>
          </li>
        ))}
      </ul>
      <div css={aside_controler}>
        <ButtonArrowIconControler {...buttonSelectPrevItemAside} />
        <p css={pagination}>
          {listData.findIndex((item) => item.title === selectedItem) + 1}/
          {listData.length}
        </p>
        <ButtonArrowIconControler {...buttonSelectNextItemAside} />
      </div>
      <p css={caption}>
        내용을 수정하시려면
        <br /> <span css={text_blue}>썸네일을 더블클릭</span>하세요
      </p>
    </aside>
  );
}
const side_nav = css`
  display: flex;
  width: 200px;
  flex-shrink: 0;
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
  height: 150px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border-radius: 10px;
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

const list_item_info_container = (isSelected: boolean) => css`
  position: absolute;
  bottom: 2px;
  left: 2px;
  right: 2px;

  display: flex;
  height: 38px;
  padding: 10px 14px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 0 0 8px 8px;
  background: ${isSelected
    ? "linear-gradient(to right, #3b82f6, #a855f7)"
    : "rgba(0, 0, 0, 0.70)"};
`;

const list_item_title = css`
  color: var(--FFF, #fff);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const image_container = css`
  width: 100%;
  display: flex;
  height: 100%;
  align-items: flex-start;
  gap: 14px;
  align-self: stretch;
  flex-wrap: wrap;
  background-color: #f6f6f6;
`;
const preview_container = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const pagination = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const aside_controler = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const caption = css`
  width: 100%;
  color: var(--747474, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const text_blue = css`
  color: #119cd4;
`;
