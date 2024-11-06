/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serviceDefaultDataStore } from "@store/serviceDefaultDataStore";
import ButtonArrowIcon from "@components/service/button/ButtonArrowIcon";
import { IbuttonArrow } from "@components/service/button/ButtonArrowIcon";
import { ReactComponent as Edit } from "@svgs/service/edit.svg";
import { ReactComponent as Preview } from "@svgs/service/previewGray.svg";
import { IloadingModal } from "@components/common/ui/Modal/LoadingModal";
import LoadingModal from "@components/common/ui/Modal/LoadingModal";
import ButtonFullPage, {
  IbuttonFullPage,
} from "@components/service/button/ButtonFullPage";
import { Ibutton } from "@components/common/button/Button";
import Button from "@components/common/button/Button";
import FullPageModalEditable from "@components/service/modal/FullPageModalEditable";
// import FullPageModal from "@components/service/modal/FullPageModal";
import ButtonArrowIconControler, {
  IbuttonArrowControler,
} from "@components/service/button/ButtonArrowIconControler";

export default function ServicePreviewPage() {
  const { serviceDefaultData } = serviceDefaultDataStore();
  const [isFullpageModalOpen, setIsFullpageModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const navigate = useNavigate();
  const buttonPrevPage: IbuttonArrow = {
    direction: "left",
    onClick: () => {
      navigate(-1);
    },
  };

  const nextButtonData: Ibutton = {
    size: "XL",
    bg: "gradient",
    text: "기획안 생성하기 👀✨",
    onClick: () => {
      setIsLoadingModalOpen(true);
    },
    disabled: false,
  };

  const loadingModal: IloadingModal = {
    isOpen: isLoadingModalOpen,
    content: {
      title:
        serviceDefaultData.serviceTitle === ""
          ? "프로젝트"
          : serviceDefaultData.serviceTitle,
      desc: [
        "기획안 파일을 생성 중이예요!",
        <br key="1" />,
        "잠시만 기다려주세요",
      ],
    },
    onLoad: () => {},
    onComplete: () => {},
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

  const buttonSelectPrevItem: IbuttonArrowControler = {
    currentIdx: currentIdx,
    total: listData.length - 1,
    direction: "left",
    onClick: () => {
      handleSelectPrevItem();
    },
  };

  const buttonSelectPrevItemAside: IbuttonArrowControler = {
    currentIdx: currentIdx,
    total: listData.length - 1,
    direction: "up",
    onClick: () => {
      handleSelectPrevItem();
    },
  };

  const buttonSelectNextItem: IbuttonArrowControler = {
    currentIdx: currentIdx,
    total: listData.length - 1,
    direction: "right",
    onClick: () => {
      handleNextPrevItem();
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

  const buttonFullPage: IbuttonFullPage = {
    onClick: () => {
      setIsFullpageModalOpen(true);
    },
  };

  function handleChangeisFullpageModalOpen(isFullpageModalOpen: boolean) {
    setIsFullpageModalOpen(isFullpageModalOpen);
  }

  function handleOpenFullPageModalEditable() {
    setIsFullpageModalOpen(true);
  }

  const fullPageModal = {
    onClick: handleChangeisFullpageModalOpen,
  };

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
    <>
      <div css={wrap}>
        <div css={title_section}>
          <div css={title_container}>
            <ButtonArrowIcon {...buttonPrevPage} />
            <p css={title}>프로젝트명</p>
          </div>
          <div css={button_container}>
            <Button {...nextButtonData} />
          </div>
        </div>
        <div css={main}>
          <aside css={side_nav}>
            <div css={list_title_container}>
              <Preview />
              <p css={list_title}>모든화면</p>
            </div>
            <ul css={list}>
              {listData.map((item, idx) => (
                <li
                  css={[
                    list_item,
                    list_item_color(selectedItem === item.title),
                  ]}
                  onClick={handleSelectItem}
                  onDoubleClick={handleOpenFullPageModalEditable}
                  data-idx={idx}
                >
                  <div css={image_container}></div>
                  <div
                    css={list_item_info_container(selectedItem === item.title)}
                  >
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
          <div css={preview_container}>
            <div css={preview}></div>
            <div css={controller}>
              <ButtonArrowIconControler {...buttonSelectPrevItem} />
              <p css={pagination}>
                {listData.findIndex((item) => item.title === selectedItem) + 1}/
                {listData.length}
              </p>
              <ButtonArrowIconControler {...buttonSelectNextItem} />
              <ButtonFullPage {...buttonFullPage} />
            </div>
          </div>
        </div>
      </div>
      {isLoadingModalOpen && <LoadingModal {...loadingModal} />}
      {isFullpageModalOpen && <FullPageModalEditable {...fullPageModal} />}
    </>
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
  font-size: 15px;
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
const controller = css`
  position: fixed;
  left: calc(50% + 100px);
  transform: translateX(-50%);
  bottom: 60px;
  display: flex;
  height: 44px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;
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
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const text_blue = css`
  color: #119cd4;
`;
