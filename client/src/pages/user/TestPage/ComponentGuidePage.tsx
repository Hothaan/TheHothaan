/** @jsxImportSource @emotion/react */
import { css, Theme, useTheme } from "@emotion/react";

import TextField from "@components/service/form/TextField";
import TextArea from "@components/service/form/TextArea";

import Button from "@components/service/common/button/Button";

import { ReactComponent as Doc } from "@svgs/doc.svg";
import ButtonIcon from "@components/service/common/button/ButtonIcon";

import { ReactComponent as Download } from "@svgs/download.svg";
import ButtonIconAccordion from "@components/service/common/button/ButtonIconAccordion";
import { useState } from "react";

import Modal from "@components/service/ui/Modal/Modal";

const textFieldDefault = {
  label: "textFieldDefault",
  id: "textFieldDefault",
  placeholder: "내용입력",
};
const textFieldFocus = { label: "textFieldFocus", id: "textFieldFocus" };
const textFieldDisabled = {
  label: "textFieldDisabled",
  id: "textFieldDisabled",
  placeholder: "내용입력",
  disabled: true,
};
const textAreaDefault = {
  label: "textAreaDefault",
  id: "textAreaDefault",
  placeholder: "내용입력",
};
const textAreaFocus = {
  label: "textAreaFocus",
  id: "textAreaFocus",
};
const textAreaDisabled = {
  label: "textAreaDisabled",
  id: "textAreaDisabled",
  disabled: true,
  placeholder: "내용입력",
};

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

export default function ComponentGuidePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonOpenModal: Ibutton = {
    size: "M",
    bg: "gradient",
    text: "모달 열기",
    onClick: () => {
      setIsModalOpen(true);
      console.log("open modal");
    },
  };

  const modal: Imodal = {
    isOpen: isModalOpen,
    content: "내용입니다 2줄",
    onClick: () => {
      setIsModalOpen(!isModalOpen);
      console.log("close modal");
    },
    buttons: [
      { size: "M", bg: "gradient", text: "예" },
      { size: "M", bg: "gray", text: "아니오" },
    ],
  };

  return (
    <div css={wrap}>
      <div css={category}>
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
      </div>
      <div css={category}>
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
      <div css={category}>
        <h5>modal</h5>
        <div css={container}>
          <p css={title}>modal</p>
          <Button {...buttonOpenModal} />
          <Modal {...modal} />
        </div>
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
