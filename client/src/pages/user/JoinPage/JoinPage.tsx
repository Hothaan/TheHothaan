/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import UserPageWrap from "@components/user/ui/UserPageWrap";
import { IuserPageTitle } from "@components/user/ui/UserPageTitle";
import UserPageTitle from "@components/user/ui/UserPageTitle";
import { Link } from "react-router-dom";
import { ItextField } from "@components/common/form/TextField";
import UserTextField from "@components/user/form/UserTextField";
import TextField from "@components/common/form/TextField";
import Button from "@components/common/button/Button";
import { Ibutton } from "@components/common/button/Button";
import UserFormLabel, {
  IuserFormLabel,
} from "@components/user/form/UserFormLabel";
import { Icheckbox } from "@components/common/form/Checkbox";
import Checkbox from "@components/common/form/Checkbox";
import UserVerifyTextField, {
  IuserVerifyTextField,
} from "@components/user/form/UserVerifyTextField";
import TextCaption, { ITextCaption } from "@components/common/text/TextCaption";
import { useState } from "react";
import UserCheckboxAccordion, {
  IcheckboxAccordion,
} from "@components/user/form/UserCheckboxAccordion";

export default function JoinPage() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    pw: "",
    confirmPw: "",
    Terms: {
      all: {
        term0: false,
      },
      required: {
        term1: false,
        term2: false,
        term3: false,
      },
      optional: {
        term4: false,
      },
    },
  });
  const [formCheck, setFormCheck] = useState({
    isIdVerified: false,
    isPwSame: false,
    isRequiredTermsAllChecked: false,
  });

  const userPageTitle: IuserPageTitle = { title: "회원가입" };

  const textFieldId: IuserVerifyTextField = {
    textField: {
      size: "small",
      label: "아이디 (이메일)",
      id: "이메일",
      placeholder: "example@thehothan.com",
    },
    button: {
      size: "full",
      bg: "gray",
      disabled: true,
      text: "인증",
      onClick: () => {},
    },
  };
  const textFieldName: ItextField = {
    size: "small",
    label: "이름",
    id: "이름",
    placeholder: "이름을 입력해주세요.",
  };
  const textFieldPw: ItextField = {
    size: "small",
    label: "비밀번호",
    id: "비밀번호",
    placeholder: "비밀번호를 입력해주세요.",
  };
  const textFieldConfirmPw: ItextField = {
    size: "small",
    label: "비밀번호 확인",
    id: "비밀번호 확인",
    placeholder: "비밀번호를 확인해주세요.",
  };
  const captionPw: ITextCaption = {
    caption: "영문,숫자,특수문자 중 2가지 혼합 6~20자",
  };
  const confirmLabel: IuserFormLabel = {
    label: "약관 동의",
  };

  const handleCheckAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      Terms: {
        ...prevFormData.Terms,
        all: {
          ...prevFormData.Terms.all,
          term0: checked,
        },
      },
    }));

    // formCheck 상태 업데이트
    setFormCheck((prevFormCheck) => ({
      ...prevFormCheck,
      isRequiredTermsAllChecked: checked,
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setFormData((prevFormData) => {
      let updatedFormData = { ...prevFormData };

      // 모든 체크박스 처리
      if (name === "term0") {
        updatedFormData.Terms.all.term0 = checked;
      } else if (name === "term1" || name === "term2" || name === "term3") {
        updatedFormData.Terms.required[name] = checked;
      } else if (name === "term4") {
        updatedFormData.Terms.optional.term4 = checked;
      }

      return updatedFormData;
    });

    // `isRequiredTermsAllChecked` 업데이트 로직
    setFormCheck((prevFormCheck) => {
      const allRequiredChecked = Object.values(formData.Terms.required).every(
        Boolean
      );
      const isAllChecked = allRequiredChecked && formData.Terms.optional.term4;

      return {
        ...prevFormCheck,
        isRequiredTermsAllChecked: isAllChecked,
      };
    });
  };

  const checkAll: Icheckbox = {
    id: "term0",
    name: "term0",
    label: "모두 동의합니다.",
    checked: formData.Terms.all.term0,
    onChange: handleCheckAllChange,
    padding: "8px 0",
  };

  const checkTerm1: IcheckboxAccordion = {
    id: "term1",
    name: "term1",
    label: "만 14세 이상입니다.",
    checked: formData.Terms.required.term1,
    required: true,
    onChange: handleCheckboxChange,
    padding: "8px 0",
    content:
      "Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.",
  };
  const checkTerm2: IcheckboxAccordion = {
    id: "term2",
    name: "term2",
    label: "개인정보 수집 및 이용에 동의합니다.",
    checked: formData.Terms.required.term2,
    required: true,
    onChange: handleCheckboxChange,
    padding: "8px 0",
    content:
      "Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.",
  };
  const checkTerm3: IcheckboxAccordion = {
    id: "term3",
    name: "term3",
    label: "이용약관에 동의합니다.",
    checked: formData.Terms.required.term3,
    required: true,
    onChange: handleCheckboxChange,
    padding: "8px 0",
    content:
      "Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.",
  };
  const checkTerm4: IcheckboxAccordion = {
    id: "term2",
    name: "term2",
    label: "마케팅 정보 수신에 동의합니다.",
    checked: formData.Terms.optional.term4,
    required: false,
    onChange: handleCheckboxChange,
    padding: "8px 0",
    content:
      "Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.",
  };

  const buttonConfirm: Ibutton = {
    size: "full",
    bg: "gray",
    disabled: true,
    text: "이용약관 동의 후 회원가입",
  };

  return (
    <UserPageWrap>
      <div css={container}>
        <UserPageTitle {...userPageTitle} />
        <form css={form_container}>
          <UserVerifyTextField {...textFieldId} />
          <UserTextField {...textFieldName} />
          <UserTextField {...textFieldPw} />
          <TextField {...textFieldConfirmPw} />
          <div css={text_align_left}>
            <TextCaption {...captionPw} />
          </div>
          <div css={text_align_left}>
            <UserFormLabel {...confirmLabel} />
            <div css={checkAll_container}>
              <Checkbox {...checkAll} />
            </div>
            <div css={term_list}>
              <UserCheckboxAccordion {...checkTerm1} />
              <UserCheckboxAccordion {...checkTerm2} />
              <UserCheckboxAccordion {...checkTerm3} />
              <UserCheckboxAccordion {...checkTerm4} />
            </div>
          </div>
        </form>
        <Button {...buttonConfirm} />
      </div>
    </UserPageWrap>
  );
}

const form_container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  align-self: stretch;
`;

const checkAll_container = css`
  width: 100%;
  border-bottom: 1px solid #dedede;
`;

const term_list = css``;

const text_align_left = css`
  width: 100%;
  text-align: left;
`;

const container = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
