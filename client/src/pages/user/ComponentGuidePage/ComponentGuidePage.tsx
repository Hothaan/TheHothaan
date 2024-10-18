/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

import TextField from "@components/service/form/TextField";
import TextArea from "@components/service/form/TextArea";
import RadioButton from "@components/service/form/RadioButton";
import Checkbox from "@components/service/form/Checkbox";

import Button from "@components/service/common/button/Button";

import { ReactComponent as Doc } from "@svgs/doc.svg";
import ButtonIcon from "@components/service/common/button/ButtonIcon";

import { ReactComponent as Download } from "@svgs/download.svg";
import ButtonIconAccordion from "@components/service/common/button/ButtonIconAccordion";

import Modal from "@components/service/ui/Modal/Modal";
import ToastPopup from "@components/service/ui/ToastPopup/ToastPopup";

import ButtonStep from "@components/service/common/button/ButtonStep";
import ButtonChooseDepth2 from "@components/service/common/button/ButtonChooseDepth2";
import ButtonAddDepth2 from "@components/service/common/button/ButtonAddDepth2";
import ButtonChooseDevice from "@components/service/common/button/ButtonChooseDevice";
import ButtonChooseService from "@components/service/common/button/ButtonChooseService";

export default function ComponentGuidePage() {
  return (
    <div css={wrap}>
      <div css={navigator_container}>
        <p css={range}>공통</p>
        <ul css={navigator}>
          <li>
            <a href="#commonFormSection">form</a>
          </li>
          <li>
            <a href="#commonButtonSection">button</a>
          </li>
          <li>
            <a href="#commonUiEtcSection">uiEtc</a>
          </li>
        </ul>
        <p css={range}>서비스</p>
        <ul css={navigator}>
          <li>
            <a href="#serviceStep">step</a>
          </li>
          <li>
            <a href="#servicechooseDepth2">chooseDepth2</a>
          </li>
          <li>
            <a href="#servicechooseDepth2Title">chooseDepth2Title</a>
          </li>
          <li>
            <a href="#serviceChooseDevice">chooseDevice</a>
          </li>
          <li>
            <a href="#serviceChooseService">chooseService</a>
          </li>
          <li>
            <a href="#serviceAddMenuToggle">addMenuToggle</a>
          </li>
          <li>
            <a href="#serviceAddMenuModal">addMenuModal</a>
          </li>
        </ul>
      </div>

      <FormSection />
      <ButtonSection />
      <UiEtcSection />
      <StepSection />
      <ChooseDepth2Section />
      <ChooseDeviceSection />
      <ChooseServiceSection />
    </div>
  );
}

const navigator_container = css`
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
  padding: 16px;
  border: 2px solid #dedede;
  border-radius: 24px;
`;

const navigator = css`
  display: flex;
  gap: 24px;
  align-items: center;
  a {
    color: #383838;
  }
`;

const range = css`
  font-size: 24px;
`;

function FormSection() {
  const textFieldDefault: ItextField = {
    label: "textFieldDefault",
    id: "textFieldDefault",
    placeholder: "내용입력",
  };
  const textFieldFocus: ItextField = {
    label: "textFieldFocus",
    id: "textFieldFocus",
  };
  const textFieldDisabled: ItextField = {
    label: "textFieldDisabled",
    id: "textFieldDisabled",
    placeholder: "내용입력",
    disabled: true,
  };
  const textAreaDefault: ItextArea = {
    label: "textAreaDefault",
    id: "textAreaDefault",
    placeholder: "내용입력",
  };
  const textAreaFocus: ItextArea = {
    label: "textAreaFocus",
    id: "textAreaFocus",
  };
  const textAreaDisabled: ItextArea = {
    label: "textAreaDisabled",
    id: "textAreaDisabled",
    disabled: true,
    placeholder: "내용입력",
  };

  const [selectedValue, setSelectedValue] = useState<string>("radioButton1");

  const handleRadioChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedValue(e.currentTarget.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  const [checked, setChecked] = useState(false);

  const radioButton1: IradioButton = {
    id: "radioButton1",
    name: "radioButton1",
    value: "radioButton1",
    label: "radioButton1",
    checked: selectedValue === "radioButton1",
    onChange: handleRadioChange,
    required: true,
  };
  const radioButton2: IradioButton = {
    id: "radioButton2",
    name: "radioButton1",
    value: "radioButton2",
    label: "radioButton2",
    checked: selectedValue === "radioButton2",
    onChange: handleRadioChange,
    required: true,
  };
  const checkbox: Icheckbox = {
    id: "checkbox",
    name: "checkbox",
    label: "checkbox",
    checked: checked,
    onChange: handleCheckboxChange,
  };

  return (
    <div css={category} id="commonFormSection">
      <h5>form</h5>
      <div css={container}>
        <p css={title}>text field default</p>
        <TextField {...textFieldDefault} />
      </div>
      <div css={container}>
        <p css={title}>text field focus</p>
        <TextField {...textFieldFocus} />
      </div>
      <div css={container}>
        <p css={title}>text field disabled</p>
        <TextField {...textFieldDisabled} />
      </div>
      <div css={container}>
        <p css={title}>text area default</p>
        <TextArea {...textAreaDefault} />
      </div>
      <div css={container}>
        <p css={title}>text area focus</p>
        <TextArea {...textAreaFocus} />
      </div>
      <div css={container}>
        <p css={title}>text area disabled</p>
        <TextArea {...textAreaDisabled} />
      </div>
      <div css={container}>
        <p css={title}>radio button</p>
        <RadioButton {...radioButton1} />
        <RadioButton {...radioButton2} />
      </div>
      <div css={container}>
        <p css={title}>check box</p>
        <Checkbox {...checkbox} />
      </div>
    </div>
  );
}

function ButtonSection() {
  const buttonMgradient: Ibutton = {
    size: "M",
    bg: "gradient",
    text: "버튼",
  };
  const buttonXLgradient: Ibutton = {
    size: "XL",
    bg: "gradient",
    text: "다음으로 넘어가기",
  };
  const buttonXLDisabled: Ibutton = {
    size: "XL",
    bg: "gradient",
    text: "다음으로 넘어가기",
    disabled: true,
  };
  const buttonXLWhite: Ibutton = {
    size: "XL",
    bg: "white",
    text: "이전페이지",
  };
  const buttonMgray: Ibutton = {
    size: "M",
    bg: "gray",
    text: "버튼",
  };
  const buttonMblue: Ibutton = {
    size: "M",
    bg: "blue",
    text: "버튼",
  };
  const buttonMicon: IbuttonIcon = {
    size: "M",
    icon: <Doc />,
    text: "버튼",
  };
  const buttonXLicon: IbuttonIcon = {
    size: "XL",
    icon: <Doc />,
    text: "버튼",
  };
  const buttonMiconAccordion: IbuttonIconAccordion = {
    size: "M",
    icon: <Download />,
    text: "버튼",
    onClick: () => {},
    options: [
      { text: "vis 다운로드", onClick: () => {} },
      { text: "PDF 다운로드", onClick: () => {} },
      { text: "JPG 다운로드", onClick: () => {} },
      { text: "PNG 다운로드", onClick: () => {} },
    ],
  };
  const buttonXLiconAccordion: IbuttonIconAccordion = {
    size: "XL",
    icon: <Download />,
    text: "버튼",
    onClick: () => {},
    options: [
      { text: "vis 다운로드", onClick: () => {} },
      { text: "PDF 다운로드", onClick: () => {} },
      { text: "JPG 다운로드", onClick: () => {} },
      { text: "PNG 다운로드", onClick: () => {} },
    ],
  };

  return (
    <div css={category} id="#commonButtonSection">
      <h5>button</h5>
      <div css={container}>
        <p css={title}>buttonM gradient</p>
        <Button {...buttonMgradient} />
      </div>
      <div css={container}>
        <p css={title}>buttonXL gradient</p>
        <Button {...buttonXLgradient} />
      </div>
      <div css={container}>
        <p css={title}>buttonXL disabled</p>
        <Button {...buttonXLDisabled} />
      </div>
      <div css={container}>
        <p css={title}>buttonXL white</p>
        <Button {...buttonXLWhite} />
      </div>
      <div css={container}>
        <p css={title}>buttonM gray</p>
        <Button {...buttonMgray} />
      </div>
      <div css={container}>
        <p css={title}>buttonM blue</p>
        <Button {...buttonMblue} />
      </div>
      <div css={container}>
        <p css={title}>buttonM icon default</p>
        <ButtonIcon {...buttonMicon} />
      </div>
      <div css={container}>
        <p css={title}>buttonXL icon default</p>
        <ButtonIcon {...buttonXLicon} />
      </div>
      <div css={container}>
        <p css={title}>buttonM icon accordicon</p>
        <ButtonIconAccordion {...buttonMiconAccordion} />
      </div>
      <div css={container}>
        <p css={title}>buttonXL icon accordicon</p>
        <ButtonIconAccordion {...buttonXLiconAccordion} />
      </div>
    </div>
  );
}

function UiEtcSection() {
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isToast, setIsToast] = useState(false);

  const buttonOpenModal1: Ibutton = {
    size: "M",
    bg: "gradient",
    text: "모달 열기 1",
    onClick: () => {
      setIsModal1Open(true);
      console.log("open modal");
    },
  };
  const buttonOpenModal2: Ibutton = {
    size: "M",
    bg: "gradient",
    text: "모달 열기 2",
    onClick: () => {
      setIsModal2Open(true);
      console.log("open modal");
    },
  };

  const modal1: Imodal = {
    isOpen: isModal1Open,
    content: "내용입니다 2줄",
    onClick: () => {
      setIsModal1Open(!isModal1Open);
    },
    buttons: [
      {
        size: "M",
        bg: "gradient",
        text: "예",
        onClick: () => {
          setIsModal1Open(!isModal1Open);
        },
      },
      {
        size: "M",
        bg: "gray",
        text: "아니오",
        onClick: () => {
          setIsModal1Open(!isModal1Open);
        },
      },
    ],
  };
  const modal2: Imodal = {
    isOpen: isModal2Open,
    content: "내용입니다 2줄",
    onClick: () => {
      setIsModal2Open(!isModal2Open);
    },
    buttons: [
      {
        size: "M",
        bg: "gray",
        text: "확인",
        onClick: () => {
          setIsModal2Open(!isModal2Open);
        },
      },
    ],
  };

  const buttonToastPopup: Ibutton = {
    size: "M",
    bg: "gradient",
    text: "토스트 굽기",
    onClick: () => {
      setIsToast(true);
    },
  };

  const toast = {
    text: "토스트가 구워졌어요.",
    isToast: isToast,
    setIsToast: setIsToast,
  };

  return (
    <div css={category} id="commonUiEtcSection">
      <h5>ui etc</h5>
      <div css={container}>
        <p css={title}>toast popup</p>
        <Button {...buttonToastPopup} />
        <ToastPopup {...toast} />
        <div css={container}>
          <p css={title}>modal</p>
          <Button {...buttonOpenModal1} />
          <Button {...buttonOpenModal2} />
          <Modal {...modal1} />
          <Modal {...modal2} />
        </div>
      </div>
    </div>
  );
}

function StepSection() {
  const stepActive: IbuttonStep = {
    status: "active",
    step: 1,
    text: "프로젝트 생성",
    onClick: () => {
      console.log("step 1 clicked");
    },
  };
  const stepDisabled: IbuttonStep = {
    status: "disabled",
    step: 1,
    text: "프로젝트 생성",
    onClick: () => {
      console.log("step 1 clicked");
    },
  };
  const stepComplete: IbuttonStep = {
    status: "complete",
    step: 1,
    text: "프로젝트 생성",
    onClick: () => {
      console.log("step 1 clicked");
    },
  };
  return (
    <div css={category} id="serviceStep">
      <h5>step</h5>
      <div css={container}>
        <p css={title}>step button active</p>
        <ButtonStep {...stepActive} />
      </div>
      <div css={container}>
        <p css={title}>step button disabled</p>
        <ButtonStep {...stepDisabled} />
      </div>
      <div css={container}>
        <p css={title}>step button complete</p>
        <ButtonStep {...stepComplete} />
      </div>
    </div>
  );
}

function ChooseDepth2Section() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    notice: false,
    history: true,
    companyInfo: false,
    inquiry: false,
    recruitment: false,
    directions: true,
  });

  const handleRadioChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSelectedValue(e.currentTarget.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };
  // const [depth2, setDepth2] = useState<string | null>(null);

  // function handleAdd() {
  //   setDepth2(selectedValue);
  // }

  // const chooseDepth2Yet: IbuttonChooseDepth2 = {
  //   depth2: null,
  //   options: ["2줄이 넘어가는 텍스트 테스트", "option2", "option3"],
  //   onChoose: () => {},
  //   onAdd: () => {},
  //   onCancel: () => {},
  //   deleteFunction: () => {
  //     console.log("delete function");
  //   },
  //   addDepth2: {
  //     radioButton: {
  //       id: "고객센터",
  //       name: "2depth",
  //       value: "고객센터",
  //       label: "고객센터",
  //       checked: false,
  //       onChange: (e) => {
  //         console.log("radio button change");
  //       },
  //     },
  //     options: [
  //       {
  //         id: "공지사항",
  //         name: "공지사항",
  //         label: "공지사항",
  //         checked: false,
  //         onChange: () => {},
  //       },
  //     ],
  //   },
  // };

  const chooseDepth2: IbuttonChooseDepth2 = {
    depth2: "메뉴 추가",
    options: ["option1", "option2", "option3"],
    onChoose: () => {},
    deleteFunction: () => {
      console.log("delete function");
    },
  };

  // const addDepth2: IbuttonAddDepth2 = {
  //   onClick: () => {
  //     console.log("add depth2 clicked");
  //   },
  // };
  return (
    <div css={category} id="servicechooseDepth2">
      <h5>Depth2</h5>

      <div css={container}>
        <p css={title}>choose Depth2</p>
        <ButtonChooseDepth2 {...chooseDepth2} />
      </div>
      <div css={container}>
        <p css={title}>add Depth2</p>
        {/* <ButtonAddDepth2 {...addDepth2} /> */}
      </div>
    </div>
  );
}

function ChooseDeviceSection() {
  const pc: IbuttonChooseDevice = {
    isSelected: true,
    device: "pc",
  };
  const tablet: IbuttonChooseDevice = {
    isSelected: false,
    device: "tablet",
  };
  const mobile: IbuttonChooseDevice = {
    isSelected: false,
    device: "mobile",
  };
  return (
    <div css={category} id="serviceChooseDevice">
      <h5>choose device</h5>
      <div css={container}>
        <p css={title}>choose device pc</p>
        <ButtonChooseDevice {...pc} />
      </div>
      <div css={container}>
        <p css={title}>choose device tablet</p>
        <ButtonChooseDevice {...tablet} />
      </div>
      <div css={container}>
        <p css={title}>choose device mobile</p>
        <ButtonChooseDevice {...mobile} />
      </div>
    </div>
  );
}

function ChooseServiceSection() {
  const shoppingMall: IbuttonChooseService = {
    isSelected: true,
    service: "shoppingMall",
  };
  const communitySns: IbuttonChooseService = {
    isSelected: false,
    service: "communitySns",
  };
  const dashboardStats: IbuttonChooseService = {
    isSelected: false,
    service: "shoppingMall",
  };
  const intermediaryMatch: IbuttonChooseService = {
    isSelected: false,
    service: "intermediaryMatch",
  };
  const homepageBoard: IbuttonChooseService = {
    isSelected: false,
    service: "homepageBoard",
  };
  const landingIntroduce: IbuttonChooseService = {
    isSelected: false,
    service: "landingIntroduce",
  };
  return (
    <div css={category} id="serviceChooseService">
      <h5>choose service</h5>
      <div css={container}>
        <p css={title}>choose service pc</p>
        <ButtonChooseService {...shoppingMall} />
      </div>
      <div css={container}>
        <p css={title}>choose service tablet</p>
        <ButtonChooseService {...communitySns} />
      </div>
      <div css={container}>
        <p css={title}>choose service mobile</p>
        <ButtonChooseService {...dashboardStats} />
      </div>
      <div css={container}>
        <p css={title}>choose service mobile</p>
        <ButtonChooseService {...intermediaryMatch} />
      </div>
      <div css={container}>
        <p css={title}>choose service mobile</p>
        <ButtonChooseService {...homepageBoard} />
      </div>
      <div css={container}>
        <p css={title}>choose service mobile</p>
        <ButtonChooseService {...landingIntroduce} />
      </div>
    </div>
  );
}

const wrap = css`
  width: 100%;
  padding: 100px;
`;

const container = css`
  margin-bottom: 24px;
`;

const title = css`
  font-size: 20px;
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 16px;
`;

const category = css`
  padding: 24px;
  border: 2px solid #dedede;
  border-radius: 24px;
  margin-bottom: 48px;
  h5 {
    font-size: 32px;
    text-transform: capitalize;
    margin-bottom: 24px;
  }
`;
