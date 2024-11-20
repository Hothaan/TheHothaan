/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { IbuttonChooseDeviceOption } from "@components/service/button/ButtonChooseDeviceOption";
import ButtonChooseDeviceOption from "@components/service/button/ButtonChooseDeviceOption";
import { IbuttonChooseServiceType } from "@components/service/button/ButtonChooseServiceType";
import ButtonChooseServiceType from "@components/service/button/ButtonChooseServiceType";
import { serviceStepStore } from "@store/serviceStepStore";
import { serviceDefaultDataStore } from "@store/serviceDefaultDataStore";
import { Ibutton } from "@components/common/button/Button";
import Button from "@components/common/button/Button";
import useIsProduction from "@hooks/useIsProduction";
import useNavigation from "@hooks/useNavigation";
import useLocationControl from "@hooks/useLocationControl";
import { getServiceTypes, IserviceTypes } from "@api/service/serviceTypes";
import { getDeviceOptions, IdeviceOptions } from "@api/service/deviceOptions";

interface IformData {
  device: { number: number | null; text: string | null };
  service: { number: number | null; text: string | null };
}

export default function ServiceStep2Page() {
  const { handleNavigation } = useNavigation();
  const { currentLocation } = useLocationControl();

  const totalStep: number = 5;
  const { steps, setSteps } = serviceStepStore();
  const [currentStep, setCurrentStep] = useState<number>(2);

  const { isProduction } = useIsProduction();
  const [loading, setLoading] = useState(false);
  const { serviceDefaultData } = serviceDefaultDataStore();
  const [formData, setFormData] = useState<IformData>({
    device: {
      number: null,
      text: null,
    },
    service: {
      number: null,
      text: null,
    },
  });

  const [serviceTypes, setServiceTypes] = useState<IserviceTypes[] | null>(
    null
  );
  const [deviceOptions, setDeviceOptions] = useState<IdeviceOptions[] | null>(
    null
  );

  useEffect(() => {
    if (window.sessionStorage.getItem("serviceData") !== null) {
      const sessionData = JSON.parse(
        window.sessionStorage.getItem("serviceData") as string
      );
      setFormData({
        device: sessionData.device,
        service: sessionData.serviceType,
      });
    }
    // if (
    //   serviceDefaultData.device.number &&
    //   serviceDefaultData.device.text &&
    //   serviceDefaultData.serviceType.number &&
    //   serviceDefaultData.serviceType.text
    // ) {
    //   setFormData({
    //     device: {
    //       number: serviceDefaultData.device.number,
    //       text: serviceDefaultData.device.text,
    //     },
    //     service: {
    //       number: serviceDefaultData.serviceType.number,
    //       text: serviceDefaultData.serviceType.text,
    //     },
    //   });
    // }
  }, []);

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
      formData.device.number &&
      formData.device.text &&
      formData.service.text &&
      formData.service.number
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

  function saveDataInStore(formData: IformData) {
    if (formData.device && formData.service) {
      const { serviceDefaultData, setServiceDefaultData } =
        serviceDefaultDataStore.getState();
      setServiceDefaultData({
        ...serviceDefaultData,
        device: formData.device,
        serviceType: formData.service,
      });
      sessionStorage.setItem(
        "serviceData",
        JSON.stringify({
          ...serviceDefaultData,
          device: formData.device,
          serviceType: formData.service,
        })
      );
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
    isSelected: formData.device.number === 1,
    onClick: () => {
      setFormData((prev) => ({ ...prev, device: { number: 1, text: "PC" } }));
    },
  };
  const tablet: IbuttonChooseDeviceOption = {
    id: 2,
    name: deviceOptions?.filter((item) => item.id === 2)[0].name || "Tablet",
    isSelected: formData.device.number === 2,
    onClick: () => {
      setFormData((prev) => ({
        ...prev,
        device: { number: 2, text: "Tablet" },
      }));
    },
  };
  const mobile: IbuttonChooseDeviceOption = {
    id: 3,
    name: deviceOptions?.filter((item) => item.id === 3)[0].name || "Mobile",
    isSelected: formData.device.number === 3,
    onClick: () => {
      setFormData((prev) => ({
        ...prev,
        device: { number: 3, text: "Mobile" },
      }));
    },
  };

  const shoppingMall: IbuttonChooseServiceType = {
    id: 1,
    name: serviceTypes?.filter((item) => item.id === 1)[0].name || "쇼핑몰",
    description:
      serviceTypes?.filter((item) => item.id === 1)[0].description ||
      "상품을 등록하고 판매해요",
    isSelected: formData.service.number === 1,
    onClick: () => {
      setFormData((prev) => ({
        ...prev,
        service: { number: 1, text: "쇼핑몰" },
      }));
    },
  };
  const communitySns: IbuttonChooseServiceType = {
    id: 2,
    name:
      serviceTypes?.filter((item) => item.id === 2)[0].name || "커뮤니티·sns",
    description:
      serviceTypes?.filter((item) => item.id === 2)[0].description ||
      "게시판을 통해 소통해요",
    isSelected: formData.service.number === 2,
    onClick: () => {
      setFormData((prev) => ({
        ...prev,
        service: { number: 2, text: "커뮤니티·sns" },
      }));
    },
  };
  const intermediaryMatch: IbuttonChooseServiceType = {
    id: 3,
    name: serviceTypes?.filter((item) => item.id === 3)[0].name || "중개·매칭",
    description:
      serviceTypes?.filter((item) => item.id === 3)[0].description ||
      "플랫폼을 제작해요",
    isSelected: formData.service.number === 3,

    onClick: () => {
      setFormData((prev) => ({
        ...prev,
        service: { number: 3, text: "중개·매칭" },
      }));
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
    isSelected: formData.service.number === 4,

    onClick: () => {
      setFormData((prev) => ({
        ...prev,
        service: { number: 4, text: "홈페이지·게시판" },
      }));
    },
  };
  const landingIntroduce: IbuttonChooseServiceType = {
    id: 5,
    name: serviceTypes?.filter((item) => item.id === 5)[0].name || "랜딩·소개",
    description:
      serviceTypes?.filter((item) => item.id === 5)[0].description ||
      "제품을 소개해요",
    isSelected: formData.service.number === 5,
    onClick: () => {
      setFormData((prev) => ({
        ...prev,
        service: { number: 4, text: "랜딩·소개" },
      }));
    },
  };

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
