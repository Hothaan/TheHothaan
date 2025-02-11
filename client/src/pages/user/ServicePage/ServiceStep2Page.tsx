/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect } from "react";
/* components */
import { IbuttonChooseDeviceOption } from "@components/service/button/ButtonChooseDeviceOption";
import ButtonChooseDeviceOption from "@components/service/button/ButtonChooseDeviceOption";
import { IbuttonChooseServiceType } from "@components/service/button/ButtonChooseServiceType";
import ButtonChooseServiceType from "@components/service/button/ButtonChooseServiceType";
import { Ibutton } from "@components/common/button/Button";
import Button from "@components/common/button/Button";
import Loading from "@components/common/ui/Loading/loading";
/* hooks */
import useIsProduction from "@hooks/useIsProduction";
import useNavigation from "@hooks/useNavigation";
import useLocationControl from "@hooks/useLocationControl";
import { useStep3to2 } from "@hooks/backStep";
/* api */
import { getServiceTypes, IserviceTypes } from "@api/service/serviceTypes";
import { getDeviceOptions, IdeviceOptions } from "@api/service/deviceOptions";
/* store */
import { serviceInfoStore } from "@store/serviceInfoStore";
import { serviceStepStore } from "@store/serviceStepStore";
import { serviceDataStore } from "@store/serviceDataStore";

export interface IserviceDatainterface {
  device: {
    number: number | null;
    text: string | null;
  };
  serviceType: {
    number: number | null;
    text: string | null;
  };
}

export default function ServiceStep2Page() {
  const [isFail, setIsFail] = useState(false);
  const step3to2 = useStep3to2();
  const { serviceInfo, setServiceInfo } = serviceInfoStore();
  const { serviceData, setServiceData } = serviceDataStore();
  const { handleNavigation } = useNavigation();
  const { currentLocation } = useLocationControl();

  const totalStep: number = 5;
  const { steps, setSteps } = serviceStepStore();
  const [currentStep, setCurrentStep] = useState<number>(2);

  const { isProduction } = useIsProduction();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<IserviceDatainterface | null>(
    serviceData
  );

  useEffect(() => {
    step3to2();
  }, []);

  useEffect(() => {
    if (serviceInfo.serviceTitle === "" || serviceInfo.serviceDesc === "") {
      setIsFail(true);
    } else {
      setIsFail(false);
    }
  }, [serviceInfo]);

  const [serviceTypes, setServiceTypes] = useState<IserviceTypes[] | null>(
    null
  );
  const [deviceOptions, setDeviceOptions] = useState<IdeviceOptions[] | null>(
    null
  );

  async function fetchServiceTypes() {
    if (!loading) {
      setLoading(true);
      try {
        const response = await getServiceTypes(isProduction);
        if (response.status === 200) {
          setServiceTypes(response.data);
        } else {
          console.error("API 요청 실패");
        }
      } catch (error) {
        console.error("API 요청 실패:", error);
        // window.location.href = "/error";
      } finally {
        setLoading(false);
      }
    }
  }

  async function fetchDeviceOptions() {
    if (!loading) {
      setLoading(true);
      try {
        const response = await getDeviceOptions(isProduction);
        if (response.status === 200) {
          setDeviceOptions(response.data);
        } else {
          console.error("API 요청 실패");
        }
      } catch (error) {
        console.error("API 요청 실패:", error);
        // window.location.href = "/error";
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchServiceTypes();
    fetchDeviceOptions();
  }, []);

  useEffect(() => {
    if (
      formData &&
      formData.device.number &&
      formData.device.text &&
      formData.serviceType.text &&
      formData.serviceType.number
    ) {
      setSteps({
        ...steps,
        step2: true,
      });
    } else {
      setSteps({
        ...steps,
        step2: false,
      });
    }
  }, [formData]);

  useEffect(() => {
    setCurrentStep(parseInt(currentLocation.slice(-1)));
  }, [currentLocation]);

  function saveDataInStore(formData: IserviceDatainterface | null) {
    if (formData?.device && formData?.serviceType) {
      setServiceData(formData);
    }
  }

  const prevButtonData: Ibutton = {
    size: "XL",
    bg: "white",
    text: "이전 페이지",
    onClick: () => {
      handleNavigation(`/service/step${currentStep - 1}`);
    },
    disabled: false,
  };

  const nextButtonData: Ibutton = {
    size: "XL",
    bg: "gradient",
    text: "다음으로 넘어가기",
    onClick: () => {
      saveDataInStore(formData);
      handleNavigation(`/service/step${currentStep + 1}`);
    },
    disabled: !steps.step2,
  };

  const pc: IbuttonChooseDeviceOption = {
    id: 1,
    name: deviceOptions?.filter((item) => item.id === 1)[0].name || "PC",
    isSelected: formData ? formData.device.number === 1 : false,
    onClick: () => {
      setFormData((prev: any) => {
        if (prev) {
          return {
            ...prev,
            device: { number: 1, text: "PC" },
          };
        } else {
          return {
            device: { number: 1, text: "PC" },
            serviceType: { number: null, text: null },
          };
        }
      });
    },
  };
  const tablet: IbuttonChooseDeviceOption = {
    id: 2,
    name: deviceOptions?.filter((item) => item.id === 2)[0].name || "Tablet",
    isSelected: formData ? formData.device.number === 2 : false,
    isDisabled: true,
    onClick: () => {
      // setFormData((prev) => ({
      //   ...prev,
      //   device: { number: 2, text: "Tablet" },
      // }));
    },
  };
  const mobile: IbuttonChooseDeviceOption = {
    id: 3,
    name: deviceOptions?.filter((item) => item.id === 3)[0].name || "Mobile",
    isSelected: formData ? formData.device.number === 3 : false,
    isDisabled: true,
    onClick: () => {
      // setFormData((prev) => ({
      //   ...prev,
      //   device: { number: 3, text: "Mobile" },
      // }));
    },
  };

  const shoppingMall: IbuttonChooseServiceType = {
    id: 1,
    name: serviceTypes?.filter((item) => item.id === 1)[0].name || "쇼핑몰",
    description:
      serviceTypes?.filter((item) => item.id === 1)[0].description ||
      "상품을 등록하고 판매해요",
    isSelected: formData ? formData.serviceType.number === 1 : false,
    onClick: () => {
      setFormData((prev: any) => {
        if (prev) {
          return {
            ...prev,
            serviceType: { number: 1, text: "쇼핑몰" },
          };
        } else {
          return {
            device: { number: null, text: null },
            serviceType: { number: 1, text: "쇼핑몰" },
          };
        }
      });
    },
  };
  const communitySns: IbuttonChooseServiceType = {
    id: 2,
    name:
      serviceTypes?.filter((item) => item.id === 2)[0].name || "커뮤니티·sns",
    description:
      serviceTypes?.filter((item) => item.id === 2)[0].description ||
      "게시판을 통해 소통해요",
    isSelected: formData ? formData.serviceType.number === 2 : false,
    onClick: () => {
      setFormData((prev: any) => {
        if (prev) {
          return {
            ...prev,
            serviceType: { number: 2, text: "커뮤니티·sns" },
          };
        } else {
          return {
            device: { number: null, text: null },
            serviceType: { number: 2, text: "커뮤니티·sns" },
          };
        }
      });
    },
  };
  const intermediaryMatch: IbuttonChooseServiceType = {
    id: 3,
    name: serviceTypes?.filter((item) => item.id === 3)[0].name || "중개·매칭",
    description:
      serviceTypes?.filter((item) => item.id === 3)[0].description ||
      "플랫폼을 제작해요",
    isSelected: formData ? formData.serviceType.number === 3 : false,

    onClick: () => {
      setFormData((prev: any) => {
        if (prev) {
          return {
            ...prev,
            serviceType: { number: 3, text: "중개·매칭" },
          };
        } else {
          return {
            device: { number: null, text: null },
            serviceType: { number: 3, text: "중개·매칭" },
          };
        }
      });
    },
  };
  const homepageBoard: IbuttonChooseServiceType = {
    id: 4,
    name:
      serviceTypes?.filter((item) => item.id === 4)[0].name ||
      "홈페이지·게시판",
    description:
      serviceTypes?.filter((item) => item.id === 4)[0].description ||
      "회사를 소개해요",
    isSelected: formData ? formData.serviceType.number === 4 : false,

    onClick: () => {
      setFormData((prev: any) => {
        if (prev) {
          return {
            ...prev,
            serviceType: { number: 4, text: "홈페이지·게시판" },
          };
        } else {
          return {
            device: { number: null, text: null },
            serviceType: { number: 4, text: "홈페이지·게시판" },
          };
        }
      });
    },
  };
  const landingIntroduce: IbuttonChooseServiceType = {
    id: 5,
    name: serviceTypes?.filter((item) => item.id === 5)[0].name || "랜딩·소개",
    description:
      serviceTypes?.filter((item) => item.id === 5)[0].description ||
      "제품을 소개해요",
    isSelected: formData ? formData.serviceType.number === 5 : false,
    onClick: () => {
      setFormData((prev: any) => {
        if (prev) {
          return {
            ...prev,
            serviceType: { number: 5, text: "랜딩·소개" },
          };
        } else {
          return {
            device: { number: null, text: null },
            serviceType: { number: 5, text: "랜딩·소개" },
          };
        }
      });
    },
  };

  useEffect(() => {
    if (isFail) {
      window.confirm(
        "프로젝트 생성을 건너뛰고 접근하셨습니다. 스탭 1부터 진행해주세요."
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

  return (
    <>
      <div css={wrap}>
        <div css={input_container}>
          <div css={input_guide_container}>
            <p css={text_center}>
              <span css={require_text}>제작할&nbsp;</span>
              <span css={gradient_text}>디바이스 환경</span>
              <span css={require_text}>을 선택해주세요.</span>
            </p>
          </div>
          <div css={select_container}>
            <ButtonChooseDeviceOption {...pc} />
            <ButtonChooseDeviceOption {...tablet} />
            <ButtonChooseDeviceOption {...mobile} />
          </div>
        </div>
        <div css={input_container}>
          <div css={input_guide_container}>
            <p css={text_center}>
              <span css={require_text}>제작하고자 하는&nbsp;</span>
              <span css={gradient_text}>서비스를 선택&nbsp;</span>
              <span css={require_text}>해주세요.</span>
            </p>
          </div>
          <div css={select_container}>
            <ButtonChooseServiceType {...shoppingMall} />
            <ButtonChooseServiceType {...communitySns} />
            <ButtonChooseServiceType {...intermediaryMatch} />
            <ButtonChooseServiceType {...homepageBoard} />
            <ButtonChooseServiceType {...landingIntroduce} />
          </div>
        </div>
      </div>
      <section css={button_wrap}>
        <div css={button_container}>
          {currentStep !== 1 && <Button {...prevButtonData} />}
          {currentStep !== totalStep && <Button {...nextButtonData} />}
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

const wrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  align-self: stretch;
`;

const input_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const input_guide_container = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  align-self: stretch;
`;

const text_center = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const select_container = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  gap: 14px;
  align-self: stretch;
  flex-wrap: wrap;
`;

const require_text = css`
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: var(--383838, #383838);
`;

const gradient_text = css`
  display: inline-block;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  background: linear-gradient(92deg, #56c0fe 2.67%, #6d0ee6 98.39%);
  background-clip: text;
`;
