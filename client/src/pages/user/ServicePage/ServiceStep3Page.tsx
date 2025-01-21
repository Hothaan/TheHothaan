/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useRef } from "react";
import { saveImageDb } from "@api/image/saveImageDb";
import { serviceStepStore } from "@store/serviceStepStore";
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
import Loading from "@components/common/ui/Loading/loading";
import { IserviceInfo } from "./ServiceStep1Page";
import { IserviceData } from "./ServiceStep2Page";
import { AxiosResponse } from "axios";
import { getFeatureData } from "@api/project/getFeatureData";
import { IfetchedfeatureResponseData } from "@components/template/types";

/* 임시 */
export interface IgeneratedText {
  feature_id: string;
  menu: string;
  feature: string;
  option: string | null;
  content: any;
  success?: boolean;
}

export interface IfeatureResponseData {
  featureResponseData: IgeneratedText;
}

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
  const [isFail, setIsFail] = useState(false);
  // const [generatedTextData, setGeneratedTextData] = useState<
  //   IgeneratedText[] | null
  // >(null);
  const { handleNavigation } = useNavigation();
  const { currentLocation } = useLocationControl();
  const totalStep = 5;
  const { steps, setSteps } = serviceStepStore();
  const [currentStep, setCurrentStep] = useState<number>(2);
  const { isProduction } = useIsProduction();
  // const isProduction = true;
  const [featureData, setFeatureData] = useState<
    IfetchedfeatureResponseData[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [serviceInfo, setServiceInfo] = useState<IserviceInfo | null>(null);
  const [serviceDefaultData, setServiceDefaultData] =
    useState<IserviceData | null>(null);
  const [formData, setFormData] = useState<TserviceTypeMenu | null>(null);
  const [sendData, setSendData] = useState<IsendData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [isReady, setIsReady] = useState<boolean>(false);
  const [isImageSaved, setIsImgageSaved] = useState<boolean>(false);

  useEffect(() => {
    const sessionData = sessionStorage.getItem("serviceData");
    if (sessionData) {
      setServiceDefaultData(JSON.parse(sessionData));
    } else {
      setIsFail(true);
    }
  }, []);

  useEffect(() => {
    const sessionData = sessionStorage.getItem("serviceInfo");
    if (sessionData) {
      setServiceInfo(JSON.parse(sessionData));
    } else {
      setIsFail(true);
    }
  }, []);

  // useEffect(() => {
  //   const localData = localStorage.getItem("generatedTextData");
  //   if (localData) {
  //     setGeneratedTextData(JSON.parse(localData));
  //   }
  // }, []);

  async function fetchServiceTypeMenu() {
    if (
      !loading &&
      serviceDefaultData &&
      serviceDefaultData.serviceType.number
    ) {
      setLoading(true);
      try {
        const response = await getServiceTypeMenu(
          isProduction,
          serviceDefaultData.serviceType.number
        );
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
        // window.location.href = "/error";
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (serviceDefaultData) {
      const sessionData = sessionStorage.getItem("projectData(formData)");
      if (sessionData) {
        const parsedData = JSON.parse(sessionData);
        setFormData(parsedData);
      } else {
        fetchServiceTypeMenu();
      }
    }
  }, [serviceDefaultData]);

  // useEffect(() => {
  //   if (isReady && generatedTextData && generatedTextData.length > 0) {
  //     console.log("Generated text data has changed, calling saveImages...");
  //     saveImages();
  //   }
  // }, [isReady]);

  useEffect(() => {
    if (featureData) {
      console.log("Generated text data has changed, calling saveImages...");
      saveImages();
    }
  }, [featureData]);

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
    if (serviceDefaultData && serviceInfo) {
      const data = {
        user_email: "test@test.com",
        project_name: serviceInfo.serviceTitle,
        project_description: serviceInfo.serviceDesc,
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
        // window.location.href = "/error";
      } finally {
        fetchGeneratedText();
      }
    }
  }

  async function fetchGeneratedText() {
    const projectId = sessionStorage.getItem("projectId");

    if (!projectId || isNaN(parseInt(projectId))) {
      console.error("Invalid or missing projectId:", projectId);
      return;
    }

    try {
      console.log(`Calling generateText API with projectId: ${projectId}`);
      const response = await generateText(isProduction, parseInt(projectId));

      if (response.status === 200) {
        const data = response.data.featureResponseData
          .map((item: IgeneratedText) => {
            const { menu, feature, feature_id, content } = item || {};
            if (!menu || !feature) {
              console.error("Invalid featureResponseData:", item);
              return null;
            }
            return {
              menu,
              feature: feature.split(" ").join(""),
              feature_id: feature_id || null,
              content,
            };
          })
          .filter(Boolean);
        if (data.length > 0) {
          fetchFeatureData(isProduction, projectId);
        } else {
          console.error("No valid data found in featureResponseData");
        }
      } else if (response.status === 404) {
        console.error("해당 프로젝트를 찾을 수 없습니다.");
      } else if (response.status === 500) {
        console.log("텍스트 생성 실패");
      }
    } catch (error) {
      console.error("Error fetching generated text:", error);
      // window.location.href = "/error";
    } finally {
    }
  }

  async function fetchFeatureData(isProduction: boolean, projectId: string) {
    try {
      const response = await getFeatureData(isProduction, projectId);
      if (response.status === 200) {
        const data = response.data.featureResponseData.map(
          (item: IfetchedfeatureResponseData) => {
            return {
              ...item,
              feature: item.feature.split(" ").join(""),
            };
          }
        );
        setFeatureData(data);
        console.log(data);
      } else {
        console.error("getFeatureData error", response.status);
      }
    } catch (error) {
      console.error(error);
      // window.location.href = "/error";
    }
  }

  async function saveImages() {
    const projectId = sessionStorage.getItem("projectId");
    console.log(projectId);
    console.log(featureData);
    console.log(serviceDefaultData);
    if (
      !projectId ||
      !featureData ||
      featureData.length === 0 ||
      !serviceDefaultData
    ) {
      console.error("Missing required data for saveImages");
      return;
    }

    const projectType = serviceDefaultData.serviceType.text as string;
    const featureId = featureData.map((item) => item.feature_id);
    const parameterArr = featureData.map(
      (item) => `${projectType}-${item.feature}`
    );
    console.log(parameterArr);

    try {
      const responses = await Promise.allSettled(
        parameterArr.map((url, idx) =>
          saveImageDb(true, url, projectId, featureId[idx].toString())
        )
      );

      // Filter fulfilled responses
      const fulfilledResponses = responses.filter(
        (res): res is PromiseFulfilledResult<AxiosResponse<any>> =>
          res.status === "fulfilled"
      );

      // Filter rejected responses
      const rejectedResponses = responses.filter(
        (res): res is PromiseRejectedResult => res.status === "rejected"
      );

      console.log("fulfilledResponses:", fulfilledResponses);
      console.log("rejectedResponses:", rejectedResponses);

      if (fulfilledResponses.length > 0) {
        const imageNameMapping = fulfilledResponses.map((res, idx) => ({
          imageName: res.value.data.imageName,
          parameter: parameterArr[idx],
        }));
        const imageUrlMapping = fulfilledResponses.map((res, idx) => ({
          imageUrl: res.value.data.url,
          parameter: parameterArr[idx],
        }));

        localStorage.setItem("imageName", JSON.stringify(imageNameMapping));
        localStorage.setItem("imageUrl", JSON.stringify(imageUrlMapping));
      }

      if (rejectedResponses.length > 0) {
        console.error(
          "Some image save requests failed:",
          rejectedResponses.map((res) => res.reason)
        );
      } else if (rejectedResponses.length === 0) {
        setIsImgageSaved(true);
      }
    } catch (error) {
      console.error("Error saving images:", error);
      // // window.location.href = "/error";
      return null;
    } finally {
    }
  }

  useEffect(() => {
    if (isImageSaved) {
      setLoading(false);
      setIsModalOpen(false);
      if (steps.step3 && currentStep < totalStep) {
        handleNavigation(`/service/step${currentStep + 1}`);
      } else {
        console.error("Navigation aborted: invalid step conditions");
      }
    }
  }, [isImageSaved]);

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
      title: serviceInfo?.serviceTitle || "프로젝트",
      desc: ["화면을 구성중이에요!", <br key="1" />, "잠시만 기다려주세요"],
    },
    bubble: "화면을 구성하고 있어요!",
  };

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

  if (!formData) {
    return <Loading />;
  }

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
