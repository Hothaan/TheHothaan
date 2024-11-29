/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as BannerIcon1 } from "@svgs/service/bannerIcon1.svg";
import { ReactComponent as BannerIcon2 } from "@svgs/service/bannerIcon2.svg";
import { ReactComponent as BannerIcon3 } from "@svgs/service/bannerIcon3.svg";
import { ReactComponent as ArrowRight } from "@svgs/template/arrowRight.svg";
import { ReactComponent as PreviewGray } from "@svgs/service/previewGray.svg";
import { ReactComponent as Download } from "@svgs//common/download.svg";
import { IbuttonIcon } from "@components/service/button/ButtonIcon";
import ButtonIcon from "@components/service/button/ButtonIcon";
import FullPageModalUneditable from "@components/service/modal/FullPageModalUneditable";
import { generateFiles } from "@api/project/generateFiles";
import axios from "axios";

export type Tformat = "pdf" | "png" | "jpg";
export default function ServiceStep5Page() {
  const isProduction = true; //임시
  const projectId = "395"; //임시

  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isFullpageModalOpen, setIsFullpageModalOpen] = useState(false);

  function handleChangeisFullpageModalOpen(isFullpageModalOpen: boolean) {
    setIsFullpageModalOpen(isFullpageModalOpen);
  }

  const fullPageModal = {
    onClick: handleChangeisFullpageModalOpen,
  };

  const buttonPreview: IbuttonIcon = {
    size: "M",
    icon: <PreviewGray />,
    text: "미리보기",
    onClick: () => {
      setIsFullpageModalOpen(true);
    },
  };

  async function downLoadFiles(format: Tformat) {
    if (!projectId || !format) {
      return;
    }
    try {
      const response = await generateFiles(isProduction, projectId, format);
      if (response.status === 200) {
        const domain = "dolllpitoxic3.mycafe24.com";
        const url = "http://" + domain + response.data.downloadUrl;
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
        } catch (error) {
          console.error("파일 다운로드 중 오류 발생:", error);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  const buttonDonwnloadPdf: IbuttonIcon = {
    size: "XL",
    icon: <Download />,
    text: "PDF 다운로드",
    onClick: () => {
      downLoadFiles("pdf");
    },
  };
  const buttonDonwnloadPng: IbuttonIcon = {
    size: "XL",
    icon: <Download />,
    text: "PNG 다운로드",
    onClick: () => {
      downLoadFiles("png");
    },
  };
  const buttonDonwnloadJpg: IbuttonIcon = {
    size: "XL",
    icon: <Download />,
    text: "JPG 다운로드",
    onClick: () => {
      downLoadFiles("jpg");
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
      {isFullpageModalOpen && <FullPageModalUneditable {...fullPageModal} />}
    </>
  );
}

const wrap = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 100px;
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
  display: flex;
  padding: 80px 100px;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  border-radius: 20px;
  background: var(--F6F8FF, #f6f8ff);
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
