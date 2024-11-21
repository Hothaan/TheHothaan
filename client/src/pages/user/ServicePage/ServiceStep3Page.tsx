/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect, useRef } from "react";
import { serviceStepStore } from "@store/serviceStepStore";
import { serviceDefaultDataStore } from "@store/serviceDefaultDataStore";
import { IloadingModal } from "@components/common/ui/Modal/LoadingModal";
import LoadingModal from "@components/common/ui/Modal/LoadingModal";
import { Ibutton } from "@components/common/button/Button";
import Button from "@components/common/button/Button";
import MenuConstructBox from "@components/service/menuConstructBox/MenuConstructBox";
import useIsProduction from "@hooks/useIsProduction";
import useNavigation from "@hooks/useNavigation";
import useLocationControl from "@hooks/useLocationControl";
import {
  getServiceTypeMenu,
  IserviceTypeMenuItem,
  TmenuItem,
  TserviceTypeMenu,
} from "@api/service/serviceTypeMenu";
import { createProject } from "@api/project/createProject";
import { generateText } from "@api/project/generateText";
import { generatedTextDataStore } from "@store/generatedTextDataStore";
import { IgeneratedText } from "@components/service/modal/FullPageModalEditable";
import { saveImage } from "@api/image/saveImage";

export type TselectionItem = {
  type: "device" | "service" | "menu" | "feature";
  value: string;
  option?: string;
};

export interface IsendData {
  user_email: string;
  project_name: string;
  project_description: string;
  selections: TselectionItem[];
}

export default function ServiceStep3Page() {
  const { generatedTextData, setGeneratedTextData } = generatedTextDataStore();
  const prevGeneratedTextData = useRef<IgeneratedText[]>([]);

  const { handleNavigation } = useNavigation();
  const { currentLocation } = useLocationControl();
  const totalStep = 5;
  const { steps, setSteps } = serviceStepStore();
  const [currentStep, setCurrentStep] = useState<number>(2);
  const { isProduction } = useIsProduction();
  const [loading, setLoading] = useState(false);
  const { serviceDefaultData } = serviceDefaultDataStore();
  const serviceType = serviceDefaultData.serviceType.number || 1;
  const [formData, setFormData] = useState<TserviceTypeMenu | null>(null);
  const [sendData, setSendData] = useState<IsendData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  async function fetchServiceTypeMenu() {
    if (!loading) {
      setLoading(true);
      try {
        const response = await getServiceTypeMenu(isProduction, serviceType);
        if (response.status === 200) {
          setFormData(
            response.data.map((serviceTypeMenuItem: IserviceTypeMenuItem) => ({
              ...serviceTypeMenuItem,
              items: serviceTypeMenuItem.items.map((menuItem: TmenuItem) => ({
                ...menuItem,
                is_selected: menuItem.is_default,
              })),
            }))
          );
        } else {
          throw new Error("Failed to fetch service type menu");
        }
      } catch (error) {
        console.error("Error fetching service type menu:", error);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const sessionData = window.sessionStorage.getItem("projectData(formData)");
    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      setFormData(parsedData);
    } else {
      fetchServiceTypeMenu();
    }
  }, []);

  useEffect(() => {
    // 새롭게 값이 변경된 경우에만 실행
    if (
      generatedTextData.length > 0 &&
      JSON.stringify(prevGeneratedTextData.current) !==
        JSON.stringify(generatedTextData)
    ) {
      console.log("Generated text data has changed, calling saveImages...");
      saveImages();
    }

    // 현재 값을 ref에 저장하여 다음 렌더링에서 비교
    prevGeneratedTextData.current = generatedTextData;
  }, [generatedTextData]);

  useEffect(() => {
    if (checkAllOptionSelected(formData)) {
      setSteps({
        ...steps,
        step3: true,
      });
    } else {
      setSteps({
        ...steps,
        step3: false,
      });
    }
  }, [formData]);

  useEffect(() => {
    setCurrentStep(parseInt(currentLocation.slice(-1)));
  }, [currentLocation]);

  function handleAddMenu(updatedMenuItems: TmenuItem[], menu_id: number): void {
    if (formData) {
      setFormData((prev: TserviceTypeMenu | null) => {
        if (prev !== null) {
          const update = prev.map((item) => {
            if (item.menu_id === menu_id) {
              return { ...item, items: updatedMenuItems };
            }
            return item;
          });
          return update;
        }
        return prev;
      });
    }
  }

  function handleSelectOption(
    item_name: string,
    option_type: string,
    menu_id: number
  ): void {
    if (formData) {
      setFormData((prev: TserviceTypeMenu | null) => {
        if (prev !== null) {
          const updatedFormData = prev.map((menu) => {
            if (menu.menu_id === menu_id) {
              return {
                ...menu,
                items: menu.items.map((item) => {
                  if (item.item_name === item_name) {
                    return {
                      ...item,
                      options: item.options?.map((option) => {
                        if (option.option_type === option_type) {
                          return {
                            ...option,
                            is_selected: !option.is_selected,
                          };
                        }
                        return option;
                      }),
                    };
                  }
                  return item;
                }),
              };
            }
            return menu;
          });
          return updatedFormData;
        }
        return prev;
      });
    }
  }

  function handleDeleteMenu(menu_id: number, item_name: string): void {
    if (formData) {
      setFormData((prev: TserviceTypeMenu | null) => {
        if (prev !== null) {
          const updatedFormData = prev.map((menu) => {
            if (menu.menu_id === menu_id) {
              return {
                ...menu,
                items: menu.items.map((item) => {
                  if (item.item_name === item_name) {
                    return { ...item, is_selected: false };
                  }
                  return item;
                }),
              };
            }
            return menu;
          });
          return updatedFormData;
        }
        return prev;
      });
    }
  }

  function makeSendData(formData: TserviceTypeMenu | null): void {
    const data = {
      user_email: "test@test.com",
      project_name: serviceDefaultData.serviceTitle,
      project_description: serviceDefaultData.serviceDesc,
      selections: [
        {
          type: "device",
          value: serviceDefaultData.device.text,
        },
        {
          type: "service",
          value: serviceDefaultData.serviceType.text,
        },
      ],
    };

    if (formData) {
      const menuData = formData.map((menu) => {
        const featureData = menu.items
          .filter((item) => item.is_selected)
          .map((item) => {
            if (item.is_option === true) {
              return {
                value: item.item_name,
                option: item.options?.filter(
                  (option) => option.is_selected === true
                )[0].option_type,
              };
            } else {
              return {
                value: item.item_name,
              };
            }
          });
        return { type: "menu", value: menu.menu_name, features: featureData };
      });

      data.selections.push(...menuData);

      setSendData(data as IsendData);
    }
  }

  async function saveData() {
    if (sendData) {
      try {
        const response = await createProject(isProduction, sendData);
        if (response.statusText === "Created") {
          sessionStorage.setItem("projectId", response.data.projectId);
          sessionStorage.setItem(
            "projectData(formData)",
            JSON.stringify(formData)
          );
          sessionStorage.setItem(
            "projectData(sendData)",
            JSON.stringify(sendData)
          );
        }
      } catch (error) {
        console.error("API 요청 실패:", error);
      } finally {
        fetchGeneratedText();
      }
    }
  }

  async function fetchGeneratedText() {
    const projectId = sessionStorage.getItem("projectId");
    if (projectId) {
      try {
        const response = await generateText(isProduction, parseInt(projectId));
        if (response.statusText === "OK") {
          // 상태 업데이트 후 saveImages 실행
          setGeneratedTextData(response.data.responses);
          const data = response.data.responses.map((item: IgeneratedText) => {
            return (item = {
              ...item,
              feature: item.feature.split(" ").join(""),
            });
          });
          localStorage.setItem("generatedTextData", JSON.stringify(data));
        }
      } catch (error) {
        console.error("API 요청 실패:", error);
      } finally {
        console.log("generatedTextData done");
      }
    }
  }

  // useEffect(() => {
  //   if (generatedTextData.length > 0) {
  //     saveImages();
  //   }
  // }, [generatedTextData]);

  async function saveImages() {
    if (generatedTextData.length > 0) {
      setLoading(true);
      try {
        const projectType = serviceDefaultData.serviceType.text as string;
        const listData = generatedTextData.map((item: IgeneratedText) => {
          return item.feature.split(" ").join("");
        });
        const parameterArr = listData.map((item) => `${projectType}-${item}`);
        const dataArr = generatedTextData.map((item) =>
          encodeURIComponent(JSON.stringify(item.content.content))
        );
        const responses = await Promise.all(
          parameterArr.map(async (item, idx) => {
            return await saveImage(isProduction, item, dataArr[idx]);
          })
        );
        if (responses.every((response) => response.statusText === "OK")) {
          const imageNameArr = responses.map(
            (response) => response.data.imageName
          );
          const imageNameMapping = imageNameArr.map((item, idx) => {
            return {
              imageName: item,
              parameter: parameterArr[idx],
            };
          });
          localStorage.setItem("imageName", JSON.stringify(imageNameMapping));
        } else {
          console.error("Some images failed to save.");
        }
      } catch (error) {
        console.error("API 요청 실패:", error);
      } finally {
        console.log(`Navigating to /service/step${currentStep + 1}`);
        setIsModalOpen(false);
        handleNavigation(`/service/step${currentStep + 1}`);
        // setTimeout(() => handleNavigation(`/service/step${currentStep + 1}`), 0);
      }
    }
  }

  useEffect(() => {
    if (sendData) {
      saveData();
    }
  }, [sendData]);

  function checkAllOptionSelected(formData: TserviceTypeMenu | null): boolean {
    if (!formData) return false;

    const selected = formData
      .map((menu) =>
        menu.items.filter((item) => item.is_selected && item.is_option)
      )
      .flat();

    const isDone = selected.map((item) => {
      return item.options?.some((option) => option.is_selected);
    });
    return isDone.every((result) => result === true);
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
      setIsModalOpen(true);
      makeSendData(formData);
    },
    disabled: !steps.step3,
  };

  const loadingModal: IloadingModal = {
    isOpen: isModalOpen,
    content: {
      title:
        serviceDefaultData.serviceTitle === ""
          ? "프로젝트"
          : serviceDefaultData.serviceTitle,
      desc: ["화면을 구성중이에요!", <br key="1" />, "잠시만 기다려주세요"],
    },
    onLoad: () => {},
    onComplete: () => {},
  };

  return (
    <>
      <LoadingModal {...loadingModal} />
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
            {formData &&
              formData.map((menu: IserviceTypeMenuItem, idx) => {
                const data = {
                  data: menu,
                  onAddMenu: handleAddMenu,
                  onSelectOption: handleSelectOption,
                  onDelete: handleDeleteMenu,
                };
                return <MenuConstructBox {...data} key={idx} />;
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
