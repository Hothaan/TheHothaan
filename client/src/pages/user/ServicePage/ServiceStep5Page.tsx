/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
/* components */
import LoadingModal, {
  IloadingModal,
} from "@components/common/ui/Modal/LoadingModal";
import { IbuttonIcon } from "@components/service/button/ButtonIcon";
import ButtonIcon from "@components/service/button/ButtonIcon";
import FullPageModalUneditable from "@components/service/modal/FullPageModalUneditable";
/* svgs */
import { ReactComponent as BannerIcon1 } from "@svgs/service/bannerIcon1.svg";
import { ReactComponent as BannerIcon2 } from "@svgs/service/bannerIcon2.svg";
import { ReactComponent as BannerIcon3 } from "@svgs/service/bannerIcon3.svg";
import { ReactComponent as ArrowRight } from "@svgs/template/arrowRight.svg";
import { ReactComponent as PreviewGray } from "@svgs/service/previewGray.svg";
import { ReactComponent as Download } from "@svgs//common/download.svg";
/* api */
import { generateFiles } from "@api/project/generateFiles";
import { getFeatureData } from "@api/project/getFeatureData";
/* store */
import { projectIdStore } from "@store/projectIdStore";
import { serviceInfoStore } from "@store/serviceInfoStore";
import { serviceDataStore } from "@store/serviceDataStore";
import { imageNameStore } from "@store/imageNameStore";
import { imageUrlStore } from "@store/imageUrlStore";
import { pngStore } from "@store/pngStore";
import { jpgStore } from "@store/jpgStore";
import { pdfStore } from "@store/pdfStore";
import { featureDataStore } from "@store/featureDataStore";

/* etc */
import axios from "axios";
import { IfetchedfeatureResponseData } from "@components/template/types";

export type Tformat = "pdf" | "png" | "jpg";
export default function ServiceStep5Page() {
  const isProduction = true; //임시
  const { projectId, setProjectId } = projectIdStore();
  const { serviceInfo, setServiceInfo } = serviceInfoStore();
  const { serviceData, setServiceData } = serviceDataStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [isFullpageModalOpen, setIsFullpageModalOpen] = useState(false);
  const { featureData, setFeatureData } = featureDataStore();
  // const [featureData, setFeatureData] = useState<
  //   IfetchedfeatureResponseData[] | null
  // >(null);
  const [listData, setListData] = useState<string[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<string>(listData[0]);
  const { imageName, setImageName } = imageNameStore();
  const { imageUrl, setImageUrl } = imageUrlStore();
  const { png, setPng } = pngStore();
  const { jpg, setJpg } = jpgStore();
  const { pdf, setPdf } = pdfStore();
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
    if (projectId) {
      fetchFeatureData(isProduction, projectId);
    }
  }, [projectId]);

  function handleChangeisFullpageModalOpen(isFullpageModalOpen: boolean) {
    setIsFullpageModalOpen(isFullpageModalOpen);
  }

  const buttonPreview: IbuttonIcon = {
    size: "M",
    icon: <PreviewGray />,
    text: "미리보기",
    onClick: () => {
      setIsFullpageModalOpen(true);
    },
  };

  async function downloadFile(url: string) {
    try {
      const response = await axios.get(url, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "기획안";
      link.click();

      URL.revokeObjectURL(downloadUrl);

      setIsLoadingModalOpen(false);
    } catch (error) {
      console.error("파일 다운로드 중 오류 발생:", error);
      // window.location.href = "/error";
    }
  }

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

  async function generateNdownloadFile(format: Tformat) {
    if (!projectId || !format) {
      return;
    }
    setIsLoadingModalOpen(true);
    const alreadyDownloaded = (): string | null => {
      switch (format) {
        case "pdf":
          return pdf ? pdf : null;
        case "png":
          return png ? png : null;
        case "jpg":
          return jpg ? jpg : null;
        default:
          return null;
      }
    };
    // const localData = localStorage.getItem(format);
    if (typeof alreadyDownloaded === "string") {
      downloadFile(alreadyDownloaded);
    } else {
      try {
        const response = await generateFiles(isProduction, projectId, format);
        if (response.status === 200) {
          const domain = "dolllpitoxic3.mycafe24.com";
          const url = "http://" + domain + response.data.downloadUrl;
          switch (format) {
            case "pdf":
              setPdf(url);
              break;
            case "png":
              setPng(url);
              break;
            case "jpg":
              setJpg(url);
              break;
            default:
              break;
          }
          // localStorage.setItem(format, url);
          downloadFile(url);
        }
      } catch (error) {
        console.log(error);
        // window.location.href = "/error";
      } finally {
      }
    }
  }

  const buttonDonwnloadPdf: IbuttonIcon = {
    size: "XL",
    icon: <Download />,
    text: "PDF 다운로드",
    onClick: () => {
      generateNdownloadFile("pdf");
    },
  };
  const buttonDonwnloadPng: IbuttonIcon = {
    size: "XL",
    icon: <Download />,
    text: "PNG 다운로드",
    onClick: () => {
      generateNdownloadFile("png");
    },
  };
  const buttonDonwnloadJpg: IbuttonIcon = {
    size: "XL",
    icon: <Download />,
    text: "JPG 다운로드",
    onClick: () => {
      generateNdownloadFile("jpg");
    },
  };

  useEffect(() => {
    setCurrentStep(parseInt(location.pathname.slice(-1)));
  }, [location.pathname]);

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

  const loadingModal: IloadingModal = {
    isOpen: isLoadingModalOpen,
    content: {
      title: (serviceInfo && serviceInfo.serviceTitle) || "프로젝트",
      desc: ["파일을 생성 중이예요!", <br key="1" />, "잠시만 기다려주세요"],
    },
    bubble: "파일 생성 중!",
  };

  return (
    <>
      <div css={wrap}>
        <div css={title_container}>
          <p css={title}>다운로드 파일 유형 선택</p>
          <div css={preview_button_container}>
            <ButtonIcon {...buttonPreview} />
          </div>
        </div>
        <div css={button_wrap}>
          <div css={speech_bubble_container}>
            <div css={bubble}>
              <p css={speech}>
                <span css={high_light}>더핫한이 만든 기획서</span>가 마음에
                드시나요? <br />
                그렇다면 <span css={high_light}>다운로드</span> 할 수 있게
                준비해 드렸어요!
              </p>
            </div>
            <img
              src="/assets/images/serviceIntro1/speechBalloon.png"
              alt="speechBalloon"
              css={triangle}
            />
          </div>
          <img src="/assets/images/serviceStep5/ai.png" alt="ai" css={ai} />
          <div css={button_container}>
            <ButtonIcon {...buttonDonwnloadPdf} />
            <ButtonIcon {...buttonDonwnloadPng} />
            <ButtonIcon {...buttonDonwnloadJpg} />
          </div>
        </div>
        <div css={banner_wrap}>
          <div css={contents_container}>
            <div css={contents_item}>
              <p css={contents_text}>기획부터</p>
              <BannerIcon1 />
            </div>
            <div css={contents_item}>
              <p css={contents_text}>기획부터</p>
              <BannerIcon2 />
            </div>
            <div css={contents_item}>
              <p css={contents_text}>기획부터</p>
              <BannerIcon3 />
            </div>
          </div>
          <Link to="/estimate" css={link}>
            견적요청 바로가기
            <ArrowRight />
          </Link>
        </div>
      </div>
      {isLoadingModalOpen && <LoadingModal {...loadingModal} />}
      {isFullpageModalOpen && (
        <FullPageModalUneditable
          imageUrlArr={imageUrl}
          imageNameArr={imageName}
          projectType={
            (serviceData && serviceData.serviceType.text) || "자유형"
          }
          listData={listData}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          onClick={handleChangeisFullpageModalOpen}
        />
      )}
    </>
  );
}

const wrap = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 100px;
`;

const speech_bubble_container = css`
  position: absolute;

  bottom: calc(100% + 60px);
  left: 90px;
`;

const bubble = css`
  border-radius: 50px;
  background-color: #119cd4;
  padding: 20px 19px;
`;

const speech = css`
  color: #fff;
  font-family: Pretendard;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const high_light = css`
  color: #fffa9a;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const triangle = css`
  position: absolute;
  top: calc(100% - 4px);
  right: 50%;
`;

const title_container = css`
  position: relative;
  width: 100%;
  height: 50px;
`;

const title = css`
  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const button_wrap = css`
  position: relative;

  display: flex;
  padding: 80px 100px;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  border-radius: 20px;
  background: var(--F6F8FF, #f6f8ff);
`;

const ai = css`
  position: absolute;
  z-index: 1;
  top: -30px;
  left: 140px;
`;

const button_container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const preview_button_container = css`
  position: absolute;
  top: 0;
  right: 0;
`;

const banner_wrap = css`
  display: flex;
  padding: 30px 50px;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;

  background: var(
    --Linear,
    linear-gradient(90deg, #56c0fe -1.67%, #6d0ee6 98.33%)
  );
`;

const contents_container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const contents_item = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const contents_text = css`
  color: var(--FFF, #fff);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const link = css`
  display: flex;
  align-items: center;
  gap: 10px;

  color: var(--FFF, #fff);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;

  svg * {
    fill: #dedede;
  }
`;
