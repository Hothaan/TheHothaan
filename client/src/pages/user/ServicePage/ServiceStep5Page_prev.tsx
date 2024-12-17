/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as Doc } from "@svgs//service/doc.svg";
import { ReactComponent as Preview } from "@svgs/service/preview.svg";
import { IbuttonIcon } from "@components/service/button/ButtonIcon";
import ButtonIcon from "@components/service/button/ButtonIcon";
import TemplateSlide from "@components/service/templateSlide/TemplateSlide";
import { ReactComponent as Download } from "@svgs//common/download.svg";
import { IbuttonIconAccordion } from "@components/service/button/ButtonIconAccordion";
import ButtonIconAccordion from "@components/service/button/ButtonIconAccordion";

export default function ServiceStep5Page() {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);

  const buttonEstimate: IbuttonIcon = {
    size: "XL",
    icon: <Doc />,
    text: "견적요청",
    onClick: () => {},
  };

  const buttonDownload: IbuttonIconAccordion = {
    size: "XL",
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

  const buttonPreview: IbuttonIcon = {
    size: "XL",
    icon: <Preview />,
    text: "미리보기",
    onClick: () => {
      navigate("/service/preview");
    },
  };

  useEffect(() => {
    setCurrentStep(parseInt(location.pathname.slice(-1)));
  }, [location.pathname]);

  return (
    <>
      <section>
        <TemplateSlide />
      </section>
      <section css={button_wrap}>
        <div css={button_container}>
          <ButtonIcon {...buttonEstimate} />
          <ButtonIconAccordion {...buttonDownload} />
          <ButtonIcon {...buttonPreview} />
        </div>
      </section>
    </>
  );
}

const button_wrap = css`
  width: 100%;
  margin: 0 auto;
  padding: 80px 0 100px;
`;

const button_container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;
