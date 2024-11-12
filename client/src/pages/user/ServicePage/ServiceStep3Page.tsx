import React from "react";

export default function ServiceStep3Page() {
  return <div>ServiceStep3Page</div>;
}

// /** @jsxImportSource @emotion/react */
// import { css } from "@emotion/react";
// // import { useNavigate, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { serviceStepStore, TserviceStep } from "@store/serviceStepStore";
// import { serviceDefaultDataStore } from "@store/serviceDefaultDataStore";
// import { IloadingModal } from "@components/common/ui/Modal/LoadingModal";
// import LoadingModal from "@components/common/ui/Modal/LoadingModal";
// import { depth1KeyText, Tdepth1KeyTextArr } from "@data/service/depth1/common";
// import { Tboard2depthKey } from "@data/service/depth2/board";
// import { T2depth } from "@data/service/depth2/common";
// import { TmyPage2depthKey } from "@data/service/depth2/mypage";
// import { Ibutton } from "@components/common/button/Button";
// import Button from "@components/common/button/Button";
// import MenuConstructBox from "@components/service/menuConstructBox/MenuConstructBox";
// import { TserviceDataType } from "@data/service/serviceData";
// import { Tproduct2depthKey } from "@data/service/depth2/product";
// import { TcompanyIntro2depthKey } from "@data/service/depth2/companyIntro";
// import { TcustomerService2depthKey } from "@data/service/depth2/customerService";
// import { Tmain2depthKey } from "@data/service/depth2/main";
// import { Tservice2depthKey } from "@data/service/depth2/service";
// import { Tutility2depthKey } from "@data/service/depth2/utility";
// import useIsProduction from "@hooks/useIsProduction";
// import useNavigation from "@hooks/useNavigation";
// import useLocationControl from "@hooks/useLocationControl";

// interface IselectableDepth2DataForm {
//   [key: string]: {
//     depth1: string;
//     selectableDepth2: T2depth[];
//   };
// }

// export default function ServiceStep3Page() {
//   const { handleNavigation } = useNavigation();
//   const { currentLocation } = useLocationControl();

//   const totalStep = 5;
//   const { steps, setSteps } = serviceStepStore();
//   const [currentStep, setCurrentStep] = useState<number>(2);

//   const { serviceDefaultData } = serviceDefaultDataStore();
//   const service = serviceDefaultData.service || 1;

//   const [formData, setFormData] = useState<any>(null);
//   // const [formData, setFormData] = useState<TserviceDataType<typeof service>>(
//   //   serviceData[service] as TserviceDataType<typeof service>
//   // );

//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//   useEffect(() => {
//     if (checkAllOptionSelected(formData)) {
//       setSteps({
//         ...steps,
//         step3: true,
//       });
//     } else {
//       setSteps({
//         ...steps,
//         step3: false,
//       });
//     }
//   }, [formData]);

//   useEffect(() => {
//     setCurrentStep(parseInt(currentLocation.slice(-1)));
//   }, [currentLocation]);

//   function handleAddMenu(
//     updatedDepth2Data: T2depth[],
//     depth1prop: string
//   ): void {
//     setFormData((prev) => {
//       const recentFormData = { ...prev };
//       const recentDepth1 =
//         recentFormData[depth1prop as keyof typeof recentFormData];

//       let newSelectableDepth2: any;

//       switch (depth1prop) {
//         case "board": {
//           const SelectableDepth2 = recentDepth1.selectableDepth2 as {
//             [K in Tboard2depthKey]: T2depth;
//           };

//           updatedDepth2Data.forEach((item) => {
//             const key = item.depth2.eng as Tboard2depthKey;
//             if (SelectableDepth2.hasOwnProperty(key)) {
//               SelectableDepth2[key] = { ...item };
//             }
//           });

//           newSelectableDepth2 = SelectableDepth2;
//           break;
//         }

//         case "companyIntro": {
//           const SelectableDepth2 = recentDepth1.selectableDepth2 as {
//             [K in TcompanyIntro2depthKey]: T2depth;
//           };

//           updatedDepth2Data.forEach((item) => {
//             const key = item.depth2.eng as TcompanyIntro2depthKey;
//             if (SelectableDepth2.hasOwnProperty(key)) {
//               SelectableDepth2[key] = { ...item };
//             }
//           });

//           newSelectableDepth2 = SelectableDepth2;
//           break;
//         }

//         case "customerService": {
//           const SelectableDepth2 = recentDepth1.selectableDepth2 as {
//             [K in TcustomerService2depthKey]: T2depth;
//           };

//           updatedDepth2Data.forEach((item) => {
//             const key = item.depth2.eng as TcustomerService2depthKey;
//             if (SelectableDepth2.hasOwnProperty(key)) {
//               SelectableDepth2[key] = { ...item };
//             }
//           });

//           newSelectableDepth2 = SelectableDepth2;
//           break;
//         }

//         case "main": {
//           const selectableDepth2 = recentDepth1.selectableDepth2 as {
//             [K in Tmain2depthKey]: T2depth;
//           };

//           updatedDepth2Data.forEach((item) => {
//             const key = item.depth2.eng as Tmain2depthKey;
//             if (selectableDepth2.hasOwnProperty(key)) {
//               selectableDepth2[key] = { ...item };
//             }
//           });

//           newSelectableDepth2 = selectableDepth2;
//           break;
//         }

//         case "myPage": {
//           const selectableDepth2 = recentDepth1.selectableDepth2 as {
//             [K in TmyPage2depthKey]: T2depth;
//           };

//           updatedDepth2Data.forEach((item) => {
//             const key = item.depth2.eng as TmyPage2depthKey;
//             if (selectableDepth2.hasOwnProperty(key)) {
//               selectableDepth2[key] = { ...item };
//             }
//           });

//           newSelectableDepth2 = selectableDepth2;
//           break;
//         }

//         case "product": {
//           const selectableDepth2 = recentDepth1.selectableDepth2 as {
//             [K in Tproduct2depthKey]: T2depth;
//           };

//           updatedDepth2Data.forEach((item) => {
//             const key = item.depth2.eng as Tproduct2depthKey;
//             if (selectableDepth2.hasOwnProperty(key)) {
//               selectableDepth2[key] = { ...item };
//             }
//           });

//           newSelectableDepth2 = selectableDepth2;
//           break;
//         }

//         case "service": {
//           const selectableDepth2 = recentDepth1.selectableDepth2 as {
//             [K in Tservice2depthKey]: T2depth;
//           };

//           updatedDepth2Data.forEach((item) => {
//             const key = item.depth2.eng as Tservice2depthKey;
//             if (selectableDepth2.hasOwnProperty(key)) {
//               selectableDepth2[key] = { ...item };
//             }
//           });

//           newSelectableDepth2 = selectableDepth2;
//           break;
//         }

//         case "utility": {
//           const selectableDepth2 = recentDepth1.selectableDepth2 as {
//             [K in Tutility2depthKey]: T2depth;
//           };

//           updatedDepth2Data.forEach((item) => {
//             const key = item.depth2.eng as Tutility2depthKey;
//             if (selectableDepth2.hasOwnProperty(key)) {
//               selectableDepth2[key] = { ...item };
//             }
//           });

//           newSelectableDepth2 = selectableDepth2;
//           break;
//         }

//         default:
//           console.error(`Unknown depth1prop: ${depth1prop}`);
//           return prev;
//       }

//       recentDepth1.selectableDepth2 = newSelectableDepth2;
//       recentFormData[depth1prop as keyof typeof recentFormData] = recentDepth1;

//       return recentFormData;
//     });
//   }

//   function handleDeleteMenu(depth1prop: string, depth2prop: string): void {
//     setFormData((prev) => {
//       const recentFormData = { ...prev };
//       const recentDepth1 =
//         recentFormData[depth1prop as keyof typeof recentFormData];

//       if (!recentDepth1) return prev;

//       const newSelectableDepth2 = { ...recentDepth1.selectableDepth2 } as {
//         [K in Tservice2depthKey]: T2depth;
//       };

//       Object.keys(newSelectableDepth2).forEach((key) => {
//         const depth2Item = newSelectableDepth2[key as Tservice2depthKey];

//         if (depth2Item.depth2.eng === depth2prop) {
//           newSelectableDepth2[key as Tservice2depthKey] = {
//             ...depth2Item,
//             isSelected: false,
//           };
//         }
//       });

//       recentDepth1.selectableDepth2 = newSelectableDepth2;
//       recentFormData[depth1prop as keyof typeof recentFormData] = recentDepth1;

//       return recentFormData;
//     });
//   }

//   function handleOptionChange(
//     depth1Eng: string,
//     depth2Eng: string,
//     optionKor: string
//   ) {
//     setFormData((prev) => {
//       const recentFormData = { ...prev };
//       const recentDepth1 =
//         recentFormData[depth1Eng as keyof typeof recentFormData];

//       if (!recentDepth1) return prev;

//       const newSelectableDepth2 = { ...recentDepth1.selectableDepth2 } as {
//         [K in Tservice2depthKey]: T2depth;
//       };

//       Object.keys(newSelectableDepth2).forEach((key) => {
//         const depth2Item = newSelectableDepth2[key as Tservice2depthKey];

//         if (depth2Item.depth2.eng === depth2Eng && depth2Item.options) {
//           const updatedOptions = depth2Item.options.map((option) => {
//             return option.kor === optionKor
//               ? { ...option, isSelected: true }
//               : option;
//           });

//           newSelectableDepth2[key as Tservice2depthKey] = {
//             ...depth2Item,
//             options: updatedOptions,
//           };
//         }
//       });

//       recentDepth1.selectableDepth2 = newSelectableDepth2;
//       recentFormData[depth1Eng as keyof typeof recentFormData] = recentDepth1;

//       return recentFormData;
//     });
//   }

//   function saveDataInStore(formData: IselectableDepth2DataForm) {
//     //어떻게 저장할건지 송이님과 논의해서 결정해야할듯
//   }

//   function checkAllOptionSelected(
//     formData: TserviceDataType<typeof service>
//   ): boolean {
//     return Object.entries(formData).some(([key1, value1]) => {
//       if (value1.selectableDepth2) {
//         return Object.entries(value1.selectableDepth2).some(
//           ([key2, value2]) => {
//             return (
//               value2.options &&
//               value2.options.some((option) => option.isSelected)
//             );
//           }
//         );
//       }
//       return false;
//     });
//   }

//   const prevButtonData: Ibutton = {
//     size: "XL",
//     bg: "white",
//     text: "이전 페이지",
//     onClick: () => {
//       handleNavigation(`/service/step${currentStep - 1}`);
//     },
//     disabled: false,
//   };

//   const nextButtonData: Ibutton = {
//     size: "XL",
//     bg: "gradient",
//     text: "다음으로 넘어가기",
//     onClick: () => {
//       setIsModalOpen(true);
//       // saveDataInStore(formData);
//       // handleNavigation(`/service/step${currentStep + 1}`);
//     },
//     disabled: !steps.step3,
//   };

//   const loadingModal: IloadingModal = {
//     isOpen: isModalOpen,
//     content: {
//       title:
//         serviceDefaultData.serviceTitle === ""
//           ? "프로젝트"
//           : serviceDefaultData.serviceTitle,
//       desc: ["화면을 구성중이에요!", <br key="1" />, "잠시만 기다려주세요"],
//     },
//     onLoad: () => {},
//     onComplete: () => {},
//   };

//   return (
//     <>
//       <LoadingModal {...loadingModal} />
//       <div css={wrap}>
//         <div css={input_container}>
//           <div css={input_guide_container}>
//             <div css={text_container}>
//               <p css={text_center}>
//                 <span css={require_text}>
//                   선택한 서비스를 토대로 메뉴를 구성했어요👏🏻
//                 </span>
//               </p>
//               <p css={text_center}>
//                 <span css={require_text}>추가로 필요한 &nbsp;</span>
//                 <span css={gradient_text}>메뉴와 추가 기능을 구성</span>
//                 <span css={require_text}>해주세요.</span>
//               </p>
//             </div>
//             <p css={[text_center, guide_text]}>
//               *추가 기능 미 설정 시 기본 타입으로 제공 됩니다.
//             </p>
//           </div>
//           <div css={select_container}>
//             {Object.entries(formData).map(([key, value]) => {
//               const data = {
//                 depth1: {
//                   kor: depth1KeyText[key as Tdepth1KeyTextArr].kor,
//                   eng: depth1KeyText[key as Tdepth1KeyTextArr].eng,
//                 },
//                 data: value,
//                 onAddMenu: handleAddMenu,
//                 onSelectOption: handleOptionChange,
//                 onDelete: handleDeleteMenu,
//               };
//               return <MenuConstructBox {...data} key={key} />;
//             })}
//           </div>
//         </div>
//       </div>
//       <section css={button_wrap}>
//         <div css={button_container}>
//           {currentStep !== 1 && <Button {...prevButtonData} />}
//           {currentStep !== totalStep && <Button {...nextButtonData} />}
//         </div>
//       </section>
//     </>
//   );
// }

// const button_wrap = css`
//   width: 100%;
//   margin: 0 auto;
//   padding: 80px 0 100px;
// `;

// const button_container = css`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   gap: 10px;
// `;

// const wrap = css`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 80px;
//   align-self: stretch;
// `;

// const text_container = css`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;

// const input_container = css`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   gap: 60px;
// `;

// const input_guide_container = css`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 14px;
//   align-self: stretch;
// `;

// const text_center = css`
//   width: 100%;
//   display: flex;
//   justify-content: center;
// `;

// const select_container = css`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   gap: 20px;
//   align-self: stretch;
// `;

// const guide_text = css`
//   color: var(--747474, #747474);
//   font-family: Pretendard;
//   font-size: 17px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: normal;
// `;

// const require_text = css`
//   font-family: Pretendard;
//   font-size: 30px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: normal;
//   color: var(--383838, #383838);
// `;

// const gradient_text = css`
//   display: inline-block;
//   font-size: 30px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: normal;

//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;

//   background: linear-gradient(92deg, #56c0fe 2.67%, #6d0ee6 98.39%);
//   background-clip: text;
// `;
