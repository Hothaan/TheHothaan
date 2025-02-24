/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect, useRef } from "react";
/* components */
import { IloadingModal } from "@components/common/ui/Modal/LoadingModal";
import LoadingModal from "@components/common/ui/Modal/LoadingModal";
import ToastPopup from "@components/common/ui/ToastPopup/ToastPopup";
import { templateMapForCapture } from "@components/template/templateMapping";
import { IfetchedfeatureResponseData } from "@components/template/types";
import Button, { Ibutton } from "@components/common/button/Button";
import NavigationEditable from "../navigation/NavigationEditable";
/* svgs */
import { ReactComponent as LogoLight } from "@svgs/common/logoLight.svg";
/* store */
import { serviceInfoStore } from "@store/serviceInfoStore";
import { serviceDataStore } from "@store/serviceDataStore";
import { imageNameStore } from "@store/imageNameStore";
import { imageUrlStore } from "@store/imageUrlStore";
import { projectIdStore } from "@store/projectIdStore";
import { featureDataStore } from "@store/featureDataStore";
/* api */
import { getFeatureData } from "@api/project/getFeatureData";
import { updateFeatureData } from "@api/project/updateFeatureData";
import { saveImageDb } from "@api/image/saveImageDb";
/* etc */
import { AxiosResponse } from "axios";

interface IFullPageModal {
  imageUrlArr: string[] | null;
  imageNameArr: string[] | null;
  projectType: string;
  listData: string[];
  selectedItem: string;
  featureData: IfetchedfeatureResponseData[] | null;
  isOpen: boolean;
  onClick: (isModalOpen: boolean) => void;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

export default function FullPageModalEditable(prop: IFullPageModal) {
  const {
    imageUrlArr,
    imageNameArr,
    projectType,
    listData,
    featureData,
    selectedItem,
    isOpen,
    onClick,
    setSelectedItem,
  } = prop;

  const { serviceInfo, setServiceInfo } = serviceInfoStore();
  const { serviceData, setServiceData } = serviceDataStore();
  const { projectId, setProjectId } = projectIdStore();
  const { imageName, setImageName } = imageNameStore();
  const { imageUrl, setImageUrl } = imageUrlStore();
  const [isInitalToast, setisInitalToast] = useState(true);
  const [isSavedToast, setisSavedToast] = useState(false);
  const [instance, setInstance] = useState<
    IfetchedfeatureResponseData[] | null
  >(featureData);
  const { setFeatureData } = featureDataStore();
  const isProduction = true;
  const [isImageSaved, setIsImgageSaved] = useState<boolean>(false);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const [templateKey, setTemplateKey] = useState<string>(
    `${projectType}-${selectedItem}`
  );
  const TemplateToRender = templateMapForCapture[templateKey];
  const [isFail, setIsFail] = useState(false);

  const initialToast = {
    text: "✅ ESC를 누르거나 상단 우측 축소 버튼을 눌러 풀화면 화면 종료할 수 있어요.",
    isToast: isInitalToast,
    setIsToast: setisInitalToast,
  };

  const savedToast = {
    text: "✅ 수정사항을 저장 완료했어요.",
    isToast: isSavedToast,
    setIsToast: setisSavedToast,
  };

  useEffect(() => {
    setTemplateKey(`${projectType}-${selectedItem}`);
  }, [selectedItem]);

  const [isSaved, setIsSaved] = useState<boolean>(false);

  const buttonSave: Ibutton = {
    size: "full",
    bg: "gradient",
    text: "저장",
    onClick: () => {
      setIsLoadingModalOpen(true);
    },
  };

  useEffect(() => {
    localStorage.removeItem("changedContent");
    localStorage.removeItem("changedStyle");
  }, [isOpen]);

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

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // 최초 렌더링 시에는 실행되지 않음
    }
    if (featureData) {
      saveImages();
    }
  }, [featureData]);

  useEffect(() => {
    if (isImageSaved) {
      setIsLoadingModalOpen(false);
      onClick(false);
    }
  }, [isImageSaved]);

  async function updateChangedFeatureData(
    isProduction: boolean,
    featureId: string,
    changedContent: any,
    changedStyle: any
  ): Promise<number> {
    try {
      const response = await updateFeatureData(
        isProduction,
        featureId,
        changedContent,
        changedStyle
      );
      if (response?.status === 200) {
        return response.status;
      } else {
        console.error("updateChangedFeatureData error", response.status);
        return response.status; // 200이 아닌 경우에도 반환 (예: 400, 500 등)
      }
    } catch (error) {
      console.error(error);
      // 에러 발생 시 임의의 에러 코드를 반환하거나 별도의 처리를 할 수 있음
      return -1;
    }
  }

  async function updateAllFeatures(changedDataArr: any[]) {
    if (changedDataArr.length > 0) {
      // 각 호출은 Promise<number>를 반환
      const updatePromises = changedDataArr.map((item) =>
        updateChangedFeatureData(
          isProduction,
          item.featureId,
          item.content,
          item.style
        )
      );
      const statuses = await Promise.all(updatePromises);
      const allSuccessful = statuses.every((status) => status === 200);
      if (allSuccessful) {
        console.log("모든 업데이트가 성공적으로 완료되었습니다.");
        console.log("변경된 데이터를 다시 가져옵니다.");
        if (projectId) {
          fetchFeatureData(isProduction, projectId);
        }
      } else {
        console.log("업데이트 중 일부 오류가 발생하였습니다.", statuses);
      }
    }
  }

  async function saveImages() {
    if (!projectId || !instance || instance.length === 0 || !serviceData) {
      console.error("Missing required data for saveImages");
      return;
    }

    const projectType = serviceData.serviceType.text as string;
    const featureId = instance.map((item) => item.feature_id);
    const feature = instance.map((item) => item.feature);
    const parameterArr = instance.map(
      (item) => `${projectType}-${item.feature}`
    );
    try {
      const responses = await Promise.allSettled(
        parameterArr.map((url, idx) =>
          saveImageDb(
            true,
            url,
            projectId,
            featureId[idx].toString(),
            feature[idx]
          )
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
      if (fulfilledResponses.length > 0) {
        const imageNameOnlyMapping = fulfilledResponses.map(
          (res, idx) => res.value.data.imageName
        );

        const imageUrlOnlyMapping = fulfilledResponses.map(
          (res, idx) => res.value.data.url
        );
        setImageName(imageNameOnlyMapping);
        setImageUrl(imageUrlOnlyMapping);
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
      // window.location.href = "/error";
      return null;
    } finally {
    }
  }

  function saveChangedContent() {
    let changedDataArr: any[] = [];
    let changedContentArr: any[] = [];
    let changedStyleArr: any[] = [];

    const changedContent = localStorage.getItem("changedContent");
    if (changedContent) {
      const parsed = JSON.parse(changedContent);
      if (parsed) changedContentArr = Object.values(parsed);
    }
    const changedStyle = localStorage.getItem("changedStyle");
    if (changedStyle) {
      const parsed = JSON.parse(changedStyle);
      changedStyleArr = Object.values(parsed);
    }

    if (changedContentArr.length > 0) {
      changedDataArr = changedContentArr.map((item) => {
        const { featureId, content } = item;
        const style = changedStyleArr.find(
          (styleItem) => styleItem.featureId === featureId
        ).style;
        const updatedContent = Object.fromEntries(
          Object.entries(content).map(([key, value]) => [
            key,
            value === "" ? "lorem ipsum, quia do" : value,
          ])
        );
        return {
          featureId: featureId,
          content: updatedContent,
          style: style,
        };
      });
    } else if (changedStyleArr.length > 0) {
      changedDataArr = changedStyleArr.map((item) => {
        const { featureId, style } = item;
        const content = changedContentArr.find(
          (contentItem) => contentItem.featureId === featureId
        ).content;
        const updatedContent = Object.fromEntries(
          Object.entries(content).map(([key, value]) => [
            key,
            value === "" ? "lorem ipsum" : value,
          ])
        );
        return {
          featureId: featureId,
          content: updatedContent,
          style: style,
        };
      });
    }

    if (changedDataArr.length > 0 && projectId) {
      updateAllFeatures(changedDataArr);
      // changedDataArr.forEach((item) => {
      //   updateChangedFeatureData(
      //     isProduction,
      //     item.featureId,
      //     item.content,
      //     item.style
      //   );
      // });
    }

    // const timer = setTimeout(() => {
    //   setIsSaved(true);
    //   setisSavedToast(true);
    // }, 3000);
    // return () => clearTimeout(timer);
  }

  useEffect(() => {
    if (isSaved) {
      setIsLoadingModalOpen(false);
    }
  }, [isSaved]);

  useEffect(() => {
    if (isLoadingModalOpen) {
      saveChangedContent();
    } else {
      setIsSaved(false);
    }
  }, [isLoadingModalOpen]);

  const loadingModal: IloadingModal = {
    isOpen: isLoadingModalOpen,
    bubble: "열심히 수정 중!",
    content: {
      title: (serviceInfo && serviceInfo.serviceTitle) || "프로젝트",
      desc: [
        "기획안 파일을 수정 중이예요!",
        <br key="1" />,
        "잠시만 기다려주세요",
      ],
    },
    onLoad: () => {},
    onComplete: () => {},
  };

  const navigationEditable = {
    imageUrlArr: imageUrlArr,
    imageNameArr: imageNameArr,
    listData: listData,
    selectedItem: selectedItem,
    setSelectedItem: setSelectedItem,
  };

  const buttonClose: Ibutton = {
    size: "full",
    bg: "gray",
    text: "닫기",
    onClick: () => {
      onClick(false);
    },
  };

  return (
    <>
      <NavigationEditable {...navigationEditable} />
      <div css={wrap}>
        <div css={title_bar}>
          <LogoLight />
          <p css={title}>{serviceInfo?.serviceTitle || "프로젝트"}</p>
          <div css={button_wrap}>
            <div css={button_container}>
              <Button {...buttonSave} />
            </div>
            <div css={button_container}>
              <Button {...buttonClose} />
            </div>
          </div>
        </div>
        <div css={content_wrap}>
          <div css={content_container}>
            <div css={content} className="content">
              {TemplateToRender && <TemplateToRender />}
            </div>
          </div>
        </div>
      </div>
      <ToastPopup {...initialToast} />
      <ToastPopup {...savedToast} />
      {isLoadingModalOpen && <LoadingModal {...loadingModal} />}
    </>
  );
}

const wrap = css`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--383838, #383838);
`;

const title_bar = css`
  position: relative;

  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  background: var(--161616, #161616);
`;

const title = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: var(--FFF, var(--FFFFFF, #fff));
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const button_wrap = css`
  display: flex;
  gap: 20px;
`;
const button_container = css`
  width: 100px;
  display: flex;
  gap: 20px;
`;

const content_wrap = css`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (min-width: 1921px) {
    padding-left: 220px;
  }
`;

const content_container = css`
  width: 100%;
  height: calc(100vh - 70px);
  max-width: 1920px;
`;

const content = css`
  width: 100%;
  max-width: 1920px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: #fff;
`;
