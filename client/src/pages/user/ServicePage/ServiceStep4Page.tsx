/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
/* components */
import ButtonArrowIcon from "@components/service/button/ButtonArrowIcon";
import { IbuttonArrow } from "@components/service/button/ButtonArrowIcon";
import { IloadingModal } from "@components/common/ui/Modal/LoadingModal";
import LoadingModal from "@components/common/ui/Modal/LoadingModal";
import ButtonFullPage, {
  IbuttonFullPage,
} from "@components/service/button/ButtonFullPage";
import { Ibutton } from "@components/common/button/Button";
import Button from "@components/common/button/Button";
import FullPageModalEditable from "@components/service/modal/FullPageModalEditable";
import ButtonArrowIconControler, {
  IbuttonArrowControler,
} from "@components/service/button/ButtonArrowIconControler";
import Loading from "@components/common/ui/Loading/loading";
import { IfetchedfeatureResponseData } from "@components/template/types";
/* store */
import { projectIdStore } from "@store/projectIdStore";
import { serviceInfoStore } from "@store/serviceInfoStore";
import { serviceDataStore } from "@store/serviceDataStore";
import { imageNameStore } from "@store/imageNameStore";
import { imageUrlStore } from "@store/imageUrlStore";
import { featureDataStore } from "@store/featureDataStore";
import { imageDataStore } from "@store/imageDataStore";
/* api */
import { getFeatureData } from "@api/project/getFeatureData";
/* svgs */
import { ReactComponent as Edit } from "@svgs/service/edit.svg";
import { ReactComponent as Preview } from "@svgs/service/previewGray.svg";
/* hooks */
import useIsProduction from "@hooks/useIsProduction";
import useNavigation from "@hooks/useNavigation";
import { useStep5to4 } from "@hooks/backStep";
/* etc */
import { TimageData } from "@store/imageDataStore";

export type TimageName = {
  imageName: string;
  parameter: string;
};

export type TimageUrl = {
  imageUrl: string;
  parameter: string;
};

export type Tformat = "pdf" | "png" | "jpg";

export default function ServicePreviewPage() {
  const { handleNavigation } = useNavigation();
  // const { isProduction } = useIsProduction();
  const isProduction = true;
  const { projectId, setProjectId } = projectIdStore();
  const { serviceInfo, setServiceInfo } = serviceInfoStore();
  const { serviceData, setServiceData } = serviceDataStore();
  const [listData, setListData] = useState<string[]>([]);
  const [isFullpageModalOpen, setIsFullpageModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const navigate = useNavigate();
  const step5to4 = useStep5to4();
  const { imageName, setImageName } = imageNameStore();
  const { imageUrl, setImageUrl } = imageUrlStore();
  const { imageData, setImageData } = imageDataStore();
  const { featureData, setFeatureData } = featureDataStore();
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<string>(listData[0]);
  const [isFail, setIsFail] = useState(false);

  useEffect(() => {
    step5to4();
  }, []);

  async function fetchFeatureData(isProduction: boolean, projectId: string) {
    try {
      const response = await getFeatureData(isProduction, projectId);
      if (response.status === 200) {
        const data = response.data.featureResponseData.map(
          (item: IfetchedfeatureResponseData) => {
            return { ...item, feature: item.feature.split(" ").join("") };
          }
        );
        setFeatureData(data);
      } else {
        console.error("getFeatureData error", response.status);
        setIsFail(true);
      }
    } catch (error) {
      console.error(error);
      setIsFail(true);
      window.location.href = "/error";
    }
  }

  useEffect(() => {
    if (!projectId) {
      setIsFail(true);
    } else {
      fetchFeatureData(isProduction, projectId);
    }
  }, [projectId]);

  const buttonPrevPage: IbuttonArrow = {
    direction: "left",
    onClick: () => {
      navigate(-1);
    },
  };

  function navigateToStep5() {
    navigate("/service/step5");
  }

  const nextButtonData: Ibutton = {
    size: "XL",
    bg: "gradient",
    text: "기획안 생성하기 👀✨",
    onClick: () => {
      navigateToStep5();
      // setIsLoadingModalOpen(true);
    },
    disabled: false,
  };

  const loadingModal: IloadingModal = {
    isOpen: isLoadingModalOpen,
    content: {
      title: (serviceInfo && serviceInfo.serviceTitle) || "프로젝트",
      desc: [
        "기획안 파일을 생성 중이예요!",
        <br key="1" />,
        "잠시만 기다려주세요",
      ],
    },
    bubble: "나만의 기획안 생성 중!",
    type: "clock",
  };

  function makeListData() {
    if (imageData) {
      return imageData.map((item: TimageData) => {
        return item.feature;
      });
    }
  }

  useEffect(() => {
    const data = makeListData();
    if (data) {
      setListData(data);
    }
  }, [imageData]);

  useEffect(() => {
    if (listData) {
      setSelectedItem(listData[0]);
    }
  }, [listData]);

  function handleSelectItem(e: React.MouseEvent<HTMLLIElement>) {
    const idx = parseInt(e.currentTarget.dataset.idx || "0");
    if (idx !== null) {
      setSelectedItem(listData[idx]);
    }
  }

  function handleSelectPrevItem() {
    if (currentIdx === 0) {
      return;
    } else {
      setSelectedItem(listData[currentIdx - 1]);
      setCurrentIdx(currentIdx - 1);
    }
  }

  function handleNextPrevItem() {
    if (currentIdx === listData.length - 1) {
      return;
    } else {
      setSelectedItem(listData[currentIdx + 1]);
      setCurrentIdx(currentIdx + 1);
    }
  }

  const buttonSelectPrevItem: IbuttonArrowControler = {
    currentIdx: currentIdx,
    total: listData.length - 1,
    direction: "left",
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      handleSelectPrevItem();
    },
  };

  const buttonSelectPrevItemAside: IbuttonArrowControler = {
    currentIdx: currentIdx,
    total: listData.length - 1,
    direction: "up",
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      handleSelectPrevItem();
    },
  };

  const buttonSelectNextItem: IbuttonArrowControler = {
    currentIdx: currentIdx,
    total: listData.length - 1,
    direction: "right",
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      handleNextPrevItem();
    },
  };

  const buttonSelectNextItemAside: IbuttonArrowControler = {
    currentIdx: currentIdx,
    total: listData.length - 1,
    direction: "down",
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      handleNextPrevItem();
    },
  };

  const buttonFullPage: IbuttonFullPage = {
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsFullpageModalOpen(true);
    },
  };

  const buttonEdit: Ibutton = {
    size: "full",
    bg: "gradient",
    text: "수정하기 ✍️",
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsFullpageModalOpen(true);
    },
  };

  function handleChangeisFullpageModalOpen(isFullpageModalOpen: boolean) {
    setIsFullpageModalOpen(isFullpageModalOpen);
  }

  function handleOpenFullPageModalEditable(feature: string) {
    setIsFullpageModalOpen(true);
    setSelectedItem(feature);
  }

  const fullPageModal = useMemo(
    () => ({
      imageUrlArr: imageUrl,
      imageNameArr: imageName,
      projectType: serviceData?.serviceType?.text || "쇼핑몰",
      listData: listData,
      selectedItem: selectedItem,
      featureData: featureData,
      isOpen: isFullpageModalOpen,
      onClick: handleChangeisFullpageModalOpen,
      setSelectedItem: setSelectedItem,
    }),
    [
      isFullpageModalOpen,
      imageUrl,
      imageName,
      serviceData,
      listData,
      selectedItem,
      featureData,
    ]
  );

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

  useEffect(() => {
    if (!isFullpageModalOpen) {
      localStorage.removeItem("changedContent");
      localStorage.removeItem("changedStyle");
    }
  }, [isFullpageModalOpen]);

  useEffect(() => {
    if (isFail) {
      window.confirm(
        "프로젝트가 생성을 건너뛰고 접근하셨습니다. 스탭 1부터 진행해주세요."
      );
      const timer = setTimeout(() => {
        handleNavigation("/service/step1");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isFail]);

  if (isFail) {
    return <Loading />;
  }

  if (!imageUrl || !imageName) {
    return <Loading />;
  }

  return (
    <>
      <div css={wrap}>
        <div css={title_section}>
          <div css={title_container}>
            <ButtonArrowIcon {...buttonPrevPage} />
            <p css={title}>{serviceInfo?.serviceTitle}</p>
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
              {isProduction === true ? (
                imageUrl && listData.length > 0 ? (
                  listData.map((item, idx) => (
                    <li
                      css={[list_item, list_item_color(selectedItem === item)]}
                      onClick={handleSelectItem}
                      onDoubleClick={() => {
                        handleOpenFullPageModalEditable(item);
                      }}
                      data-idx={idx}
                      key={idx}
                    >
                      <div css={image_container}>
                        <img
                          src={imageUrl[idx]}
                          alt="template thumbnail"
                          css={image_style}
                        />
                      </div>
                      <div
                        css={list_item_info_container(selectedItem === item)}
                      >
                        <p css={list_item_title}>{item}</p>
                        {selectedItem === item && <Edit />}
                      </div>
                    </li>
                  ))
                ) : (
                  <Loading />
                )
              ) : imageName && listData.length > 0 ? (
                listData.map((item, idx) => (
                  <li
                    css={[list_item, list_item_color(selectedItem === item)]}
                    onClick={handleSelectItem}
                    onDoubleClick={() => {
                      handleOpenFullPageModalEditable(item);
                    }}
                    data-idx={idx}
                    key={idx}
                  >
                    <div css={image_container}>
                      <img
                        src={`/images/${imageName[idx]}`}
                        alt="template thumbnail"
                        css={image_style}
                      />
                    </div>
                    <div css={list_item_info_container(selectedItem === item)}>
                      <p css={list_item_title}>{item}</p>
                      {selectedItem === item && <Edit />}
                    </div>
                  </li>
                ))
              ) : (
                <Loading />
              )}
            </ul>
            <div css={aside_controler}>
              <ButtonArrowIconControler {...buttonSelectPrevItemAside} />
              <p css={pagination}>
                {listData.findIndex((item) => item === selectedItem) + 1}/
                {listData.length}
              </p>
              <ButtonArrowIconControler {...buttonSelectNextItemAside} />
            </div>
            <p css={caption}>
              내용을 수정하시려면
              <br /> <span css={text_blue}>썸네일을 더블클릭</span>하세요
              <br />
              {featureData &&
                featureData.length > 0 &&
                `(${featureData.length}건 중 `}
              {listData && listData.length > 0 && (
                <>
                  <span css={text_blue}>{`${listData.length}`}</span>
                  <span>건 생성 성공)</span>
                </>
              )}
            </p>
          </aside>
          <div
            css={preview_container}
            onClick={() => {
              handleOpenFullPageModalEditable(
                listData[listData.findIndex((item) => item === selectedItem)]
              );
            }}
          >
            {isProduction === true ? (
              imageUrl && listData.length > 0 ? (
                <div css={preview}>
                  <img
                    src={
                      imageUrl[
                        listData.findIndex((item) => item === selectedItem)
                      ] || ""
                    }
                    alt="template thumbnail"
                    css={preview_style}
                  />
                </div>
              ) : (
                <Loading />
              )
            ) : imageName && listData.length > 0 ? (
              <div css={preview}>
                <img
                  src={`/images/${
                    imageName[
                      listData.findIndex((item) => item === selectedItem)
                    ] || ""
                  }`}
                  alt="template thumbnail"
                  css={preview_style}
                />
              </div>
            ) : (
              <Loading />
            )}

            <div css={controller}>
              <ButtonArrowIconControler {...buttonSelectPrevItem} />
              <p css={pagination}>
                {listData.findIndex((item) => item === selectedItem) + 1}/
                {listData.length}
              </p>
              <ButtonArrowIconControler {...buttonSelectNextItem} />
              <ButtonFullPage {...buttonFullPage} />
              <Button {...buttonEdit} />
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

  border-radius: 12px;
  position: relative;
  border: 2px solid transparent;
  background: var(--FFF, #fff);
  overflow: hidden;

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
  overflow: hidden;
`;

const image_style = css`
  object-fit: cover;
  width: 100%;
`;
const preview_container = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  cursor: pointer;
`;
const preview = css`
  width: 100%;
  display: flex;
  overflow: hidden;
  align-items: flex-start;
  gap: 14px;
  border-radius: 20px;
  border: 1px solid var(--DEDEDE, #dedede);

  position: relative;

  &:after {
    position: absolute;
    content: "";
    display: block;

    inset: 0px;
    border-radius: 20px;
    padding: 3px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    pointer-events: none;
    background: linear-gradient(to right, transparent);
  }

  &:hover {
    border: 1px solid transparent;
    &:after {
      background: linear-gradient(to right, #56c0fe -1.67%, #6d0ee6 98.33%);
    }
  }
`;

const preview_style = css`
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
`;
const controller = css`
  position: fixed;
  left: calc(50% + 100px);
  transform: translateX(-50%);
  bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  align-self: stretch;
  background-color: #fff;
  padding: 16px 32px;
  border-radius: 40px;
  box-shadow: 0px 327px 91px 0px rgba(0, 0, 0, 0),
    0px 209px 84px 0px rgba(0, 0, 0, 0.01),
    0px 118px 71px 0px rgba(0, 0, 0, 0.05),
    0px 52px 52px 0px rgba(0, 0, 0, 0.09), 0px 13px 29px 0px rgba(0, 0, 0, 0.1);
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
