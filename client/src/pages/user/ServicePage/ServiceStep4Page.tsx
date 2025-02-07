/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
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
import { imageNameStore } from "@store/imageNameStore";
import { imageUrlStore } from "@store/imageUrlStore";
/* api */
import { getFeatureData } from "@api/project/getFeatureData";
import { generateFiles } from "@api/project/generateFiles";
/* svgs */
import { ReactComponent as Edit } from "@svgs/service/edit.svg";
import { ReactComponent as Preview } from "@svgs/service/previewGray.svg";
/* hooks */
import useIsProduction from "@hooks/useIsProduction";
import useNavigation from "@hooks/useNavigation";
/* etc */
import { IserviceData } from "./ServiceStep2Page";
import { IserviceInfo } from "./ServiceStep1Page";
import axios from "axios";

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
  const [projectId, setProjectId] = useState<string | null>(null);
  const [serviceInfo, setServiceInfo] = useState<IserviceInfo | null>(null);
  const [serviceDefaultData, setServiceDefaultData] =
    useState<IserviceData | null>(null);
  const [listData, setListData] = useState<string[]>([]);
  const [isFullpageModalOpen, setIsFullpageModalOpen] = useState(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const navigate = useNavigate();
  const { imageName, setImageName } = imageNameStore();
  const { imageUrl, setImageUrl } = imageUrlStore();
  // const [imageNameArr, setImageNameArr] = useState<string[]>(imageName);
  // const [imageUrlArr, setImageUrlArr] = useState<string[]>(imageUrl);
  const [featureData, setFeatureData] = useState<
    IfetchedfeatureResponseData[] | null
  >(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<string>(listData[0]);
  const [isFail, setIsFail] = useState(false);

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
      // window.location.href = "/error";
    }
  }

  useEffect(() => {
    const sessionData = sessionStorage.getItem("serviceInfo");
    if (sessionData) {
      setServiceInfo(JSON.parse(sessionData));
    }
  }, []);

  useEffect(() => {
    const sessionData = sessionStorage.getItem("serviceData");
    if (sessionData) {
      setServiceDefaultData(JSON.parse(sessionData));
    }
  }, []);

  useEffect(() => {
    const sessionData = sessionStorage.getItem("projectId");
    if (sessionData) {
      setProjectId(JSON.parse(sessionData));
    } else {
      setIsFail(true);
    }
  }, []);

  useEffect(() => {
    if (projectId) {
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
    if (featureData) {
      return featureData.map((item: IfetchedfeatureResponseData) => {
        return item.feature;
      });
    }
  }

  useEffect(() => {
    const data = makeListData();
    if (data) {
      setListData(data);
    }
  }, [featureData]);

  useEffect(() => {
    if (listData) {
      setSelectedItem(listData[0]);
    }
  }, [listData]);

  // useEffect(() => {
  //   const localData = localStorage.getItem("imageName");
  //   if (localData) {
  //     setImageNameArr(JSON.parse(localData));
  //   }
  // }, [selectedItem]);

  // useEffect(() => {
  //   const localData = localStorage.getItem("imageUrl");
  //   if (localData) {
  //     setImageUrlArr(JSON.parse(localData));
  //   }
  // }, [selectedItem]);

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

  // const [isFileGenerated, setIsFileGenerated] = useState<boolean>(false);

  // useEffect(() => {
  //   if (isLoadingModalOpen) {
  //     generateTemplateFiles();
  //   }
  // }, [isLoadingModalOpen]);

  // useEffect(() => {
  //   if (isFileGenerated) {
  //     setIsLoadingModalOpen(false);
  //     navigate("/service/step5");
  //   }
  // }, [isFileGenerated]);

  // async function generateTemplateFiles() {
  //   if (!projectId) {
  //     return;
  //   }
  //   try {
  //     const pdfResponse = await generateFiles(isProduction, projectId, "pdf");
  //     const pngResponse = await generateFiles(isProduction, projectId, "png");
  //     const jpgResponse = await generateFiles(isProduction, projectId, "jpg");

  //     if (pdfResponse.status === 200) {
  //       const domain = "dolllpitoxic3.mycafe24.com";
  //       const url = "http://" + domain + pdfResponse.data.downloadUrl;
  //       localStorage.setItem("pdf", url);
  //     } else {
  //     }
  //     if (pngResponse.status === 200) {
  //       const domain = "dolllpitoxic3.mycafe24.com";
  //       const url = "http://" + domain + pdfResponse.data.downloadUrl;
  //       localStorage.setItem("png", url);
  //     } else {
  //     }
  //     if (jpgResponse.status === 200) {
  //       const domain = "dolllpitoxic3.mycafe24.com";
  //       const url = "http://" + domain + pdfResponse.data.downloadUrl;
  //       localStorage.setItem("jpg", url);
  //     } else {
  //     }

  //     if (
  //       pdfResponse.status === 200 &&
  //       pdfResponse.status === 200 &&
  //       pdfResponse.status === 200
  //     ) {
  //       setIsFileGenerated(true);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     // window.location.href = "/error";
  //   } finally {
  //   }
  // }

  const fullPageModal = useMemo(
    () => ({
      imageUrlArr: imageUrl,
      imageNameArr: imageName,
      projectType: serviceDefaultData?.serviceType?.text || "쇼핑몰",
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
      serviceDefaultData,
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
