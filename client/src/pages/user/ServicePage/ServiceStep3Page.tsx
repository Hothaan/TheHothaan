/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { serviceStepStore, TserviceStep } from "@store/serviceStepStore";
import { serviceDefaultDataStore } from "@store/serviceDefaultDataStore";
import { serviceData } from "@data/service/serviceData";
import { depth1KeyText, Tdepth1KeyTextArr } from "@data/service/depth1/common";
import { T2depth } from "@data/service/depth2/common";
import { Ibutton } from "@components/common/button/Button";
import Button from "@components/common/button/Button";
import MenuConstructBox from "@components/service/menuConstructBox/MenuConstructBox";
import { IselectableDepth2 } from "@components/service/button/ButtonAddDepth2";

interface IselectableDepth2DataForm {
  [key: string]: {
    depth1: string;
    selectableDepth2: IselectableDepth2[];
  };
}

export default function ServiceStep3Page() {
  const { steps, setSteps } = serviceStepStore();
  const { serviceDefaultData } = serviceDefaultDataStore();
  const depth1 =
    serviceDefaultData.service !== "" &&
    serviceData[serviceDefaultData.service];

  function makeInitialFormData() {
    const result: { [key: string]: any } = {};

    Object.entries(depth1).map(([key1, value]) => {
      let eng = depth1KeyText[key1 as Tdepth1KeyTextArr].eng;
      let kor = depth1KeyText[key1 as Tdepth1KeyTextArr].kor;
      let depth2 = value;

      let selectableDepth2 = Object.entries(depth2).map(([key2, value]) => {
        const keyValue = value as T2depth;
        return {
          isDefault: keyValue.isDefault,
          isSelected: keyValue.isDefault,
          depth2: { eng: keyValue.eng, kor: keyValue.kor },
          options: keyValue.options || null,
        };
      });

      result[key1] = {
        depth1: { kor: kor, eng: eng },
        selectableDepth2,
      };
    });

    return result;
  }

  let initialFormData = makeInitialFormData();

  const [formData, setFormData] =
    useState<IselectableDepth2DataForm>(initialFormData);

  console.log(formData);

  function handleAddMenu(
    updatedDepth2Data: IselectableDepth2[],
    depth1prop: string
  ): void {
    setFormData((prev) => {
      const updatedFormData = { ...prev };
      const updatedDepth1 = {
        ...updatedFormData[depth1prop as Tdepth1KeyTextArr],
      };

      updatedDepth1.selectableDepth2 = updatedDepth2Data;
      updatedFormData[depth1prop as Tdepth1KeyTextArr] = updatedDepth1;

      return updatedFormData;
    });
  }

  function handleDeleteMenu(depth1prop: string, depth2prop: string): void {
    setFormData((prev) => {
      const updatedFormData = { ...prev };
      const updatedDepth1 = {
        ...updatedFormData[depth1prop as Tdepth1KeyTextArr],
      };

      const updatedSelectableDepth2 = updatedDepth1.selectableDepth2.map(
        (item) => {
          if (item.depth2.eng === depth2prop) {
            return { ...item, isSelected: false };
          }
          return item;
        }
      );

      updatedDepth1.selectableDepth2 = updatedSelectableDepth2;
      updatedFormData[depth1prop as Tdepth1KeyTextArr] = updatedDepth1;

      return updatedFormData;
    });
  }

  function handleOptionChange(
    depth1Eng: string,
    depth2Eng: string,
    optionKor: string
  ) {
    console.log(depth1Eng, depth2Eng, optionKor);
    setFormData((prev) => {
      const updatedFormData = { ...prev };

      const updatedDepth1 = {
        ...updatedFormData[depth1Eng as Tdepth1KeyTextArr],
      };

      if (!updatedDepth1) {
        console.error(`depth1Eng (${depth1Eng}) is invalid.`);
        return prev;
      }

      console.log(updatedDepth1.selectableDepth2);

      const updatedSelectableDepth2 = updatedDepth1.selectableDepth2.map(
        (depth2Item) => {
          if (depth2Item.depth2.eng === depth2Eng && depth2Item.options) {
            const updatedOptions = depth2Item.options.map((option) => {
              if (option.kor === optionKor) {
                return { ...option, isSelected: true };
              }
              return option;
            });
            return { ...depth2Item, options: updatedOptions };
          }
          return depth2Item;
        }
      );

      updatedDepth1.selectableDepth2 = updatedSelectableDepth2;
      updatedFormData[depth1Eng as Tdepth1KeyTextArr] = updatedDepth1;

      return updatedFormData;
    });
  }

  const totalStep = 5;
  const [currentStep, setCurrentStep] = useState<number>(2);
  const navigate = useNavigate();
  const location = useLocation();

  function handleNavigation(path: string) {
    navigate(path);
  }

  function isDisabled(steps: TserviceStep, currentStep: number): boolean {
    switch (currentStep) {
      case 1:
        return !steps.step1;
      case 2:
        return !steps.step2;
      case 3:
        return !steps.step3;
      case 4:
        return !steps.step4;
      case 5:
        return !steps.step5;
      default:
        return false;
    }
  }

  function saveDataInStore(formData: IselectableDepth2DataForm) {
    //어떻게 저장할건지 송이님과 논의해서 결정해야할듯
    // if (formData.device !== "" && formData.service !== "") {
    //   const { data, setData } = serviceDefaultDataStore.getState();
    //   setData({
    //     ...data,
    //     device: formData.device,
    //     service: formData.service,
    //   });
    //   console.log(
    //     "Updated store data:",
    //     serviceDefaultDataStore.getState().data
    //   );
    // }
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
    disabled: isDisabled(steps, currentStep),
  };

  useEffect(() => {
    setCurrentStep(parseInt(location.pathname.slice(-1)));
  }, [location.pathname]);

  useEffect(() => {
    if (formData.device && formData.service) {
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

  return (
    <>
      <div css={wrap}>
        <div css={input_container}>
          <div css={input_guide_container}>
            <div css={text_container}>
              <p css={text_center}>
                <span css={require_text}>
                  선택한 서비스를 토대로 메뉴를 구성했어요👏🏻
                </span>
              </p>
              <p css={text_center}>
                <span css={require_text}>추가로 필요한 &nbsp;</span>
                <span css={gradient_text}>메뉴와 추가 기능을 구성</span>
                <span css={require_text}>해주세요.</span>
              </p>
            </div>
            <p css={[text_center, guide_text]}>
              *추가 기능 미 설정 시 기본 타입으로 제공 됩니다.
            </p>
          </div>
          <div css={select_container}>
            {Object.entries(depth1).map(([key, value]) => {
              const data = {
                depth1: {
                  kor: depth1KeyText[key as Tdepth1KeyTextArr].kor,
                  eng: depth1KeyText[key as Tdepth1KeyTextArr].eng,
                },
                data: value,
                onAddMenu: handleAddMenu,
                onSelectOption: handleOptionChange,
                onDelete: handleDeleteMenu,
              };
              return <MenuConstructBox {...data} key={key} />;
            })}
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

const text_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const input_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 60px;
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
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

const guide_text = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
