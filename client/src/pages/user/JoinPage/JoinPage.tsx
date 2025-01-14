/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState, useEffect, useCallback } from "react";
import UserPageWrap from "@components/user/ui/UserPageWrap";
import { IuserPageTitle } from "@components/user/ui/UserPageTitle";
import UserPageTitle from "@components/user/ui/UserPageTitle";
import { ItextField } from "@components/common/form/TextField";
import UserTextField from "@components/user/form/UserTextField";
import UserVerifyTextCodeField from "@components/user/form/UserVerifyTextCodeField";
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
import { IuserVerifyCodeField } from "@components/user/form/UserVerifyTextCodeField";
import TextCaption, { ITextCaption } from "@components/common/text/TextCaption";
import UserCheckboxAccordion, {
  IcheckboxAccordion,
} from "@components/user/form/UserCheckboxAccordion";

export default function JoinPage() {
  const [formData, setFormData] = useState({
    id: "",
    code: "",
    name: "",
    pw: "",
    confirmPw: "",
    Terms: {
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

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [formCheck, setFormCheck] = useState({
    verifySwitch: false,
    isIdVerified: false,
    isPwSame: false,
    isRequiredTermsAllChecked: false,
  });

  useEffect(() => {
    const allRequiredChecked = Object.values(formData.Terms.required).every(
      Boolean
    );
    const allChecked = allRequiredChecked && formData.Terms.optional.term4;

    setIsAllChecked(allChecked);
  }, [formData.Terms]);

  const [time, setTime] = useState<number | null>(null);

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }

  function handleChangeId(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, id: e.target.value });
  }
  function handleChangeCode(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, code: e.target.value });
  }
  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, name: e.target.value });
  }
  function handleChangePw(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, pw: e.target.value });
  }
  function handleChangePwConfirmw(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, confirmPw: e.target.value });
  }
  function handleVerifyEmail() {
    setFormCheck((prev) => ({ ...prev, verifySwitch: true }));
    setTime(180);
    console.log("Verify email");
  }
  function handleRemoveEmail() {
    setFormData({ ...formData, id: "" });
    setFormCheck({ ...formCheck, isIdVerified: false, verifySwitch: false });
  }

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (formCheck.verifySwitch && time === null) {
      setTime(180);
    }

    if (time !== null && time > 0) {
      timer = setTimeout(() => setTime((prev) => (prev as number) - 1), 1000);
    }

    return () => clearTimeout(timer);
  }, [time, formCheck.verifySwitch]);

  const userPageTitle: IuserPageTitle = { title: "회원가입" };

  const textFieldId: IuserVerifyTextField = {
    textField: {
      size: "small",
      label: "아이디 (이메일)",
      id: "이메일",
      value: formData.id,
      placeholder: "example@thehothan.com",
      onChange: handleChangeId,
      isVerified: formCheck.isIdVerified,
      disabled: formCheck.verifySwitch,
    },
    button: {
      size: "full",
      bg: formCheck.verifySwitch ? "white" : "gray",
      disabled: formData.id === "",
      text: formCheck.verifySwitch ? "수정" : "인증",
      onClick: () => {
        if (formCheck.verifySwitch) {
          handleRemoveEmail();
        } else {
          handleVerifyEmail();
        }
      },
    },
  };
  const textFieldCode: IuserVerifyCodeField = {
    textField: {
      size: "small",
      label: "인증번호",
      id: "인증번호",
      value: formData.code,
      placeholder: "인증번호를 입력해주세요.",
      onChange: handleChangeCode,
      ms: time ? formatTime(time) : "",
    },
    button: {
      size: "full",
      bg: "gray",
      text: "확인",
      onClick: () => {
        if (formCheck.verifySwitch) {
          handleRemoveEmail();
        } else {
          handleVerifyEmail();
        }
      },
    },
  };
  const textFieldName: ItextField = {
    size: "small",
    label: "이름",
    id: "이름",
    placeholder: "이름을 입력해주세요.",
    value: formData.name,
    onChange: handleChangeName,
  };
  const textFieldPw: ItextField = {
    size: "small",
    label: "비밀번호",
    id: "비밀번호",
    placeholder: "비밀번호를 입력해주세요.",
    type: "password",
    value: formData.pw,
    onChange: handleChangePw,
  };
  const textFieldConfirmPw: ItextField = {
    size: "small",
    label: "비밀번호 확인",
    id: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호를 확인해주세요.",
    value: formData.confirmPw,
    onChange: handleChangePwConfirmw,
  };
  const captionPw: ITextCaption = {
    caption: "영문,숫자,특수문자 중 2가지 혼합 6~20자",
  };
  const confirmLabel: IuserFormLabel = {
    label: "약관 동의",
  };

  console.log(isAllChecked);
  console.log(formData.Terms);

  const handleCheckAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      Terms: {
        required: {
          term1: checked,
          term2: checked,
          term3: checked,
        },
        optional: {
          term4: checked,
        },
      },
    }));
  };

  const handleTerm1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      Terms: {
        ...prevFormData.Terms,
        required: { ...prevFormData.Terms.required, term1: checked },
      },
    }));
  };
  const handleTerm2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      Terms: {
        ...prevFormData.Terms,
        required: { ...prevFormData.Terms.required, term2: checked },
      },
    }));
  };
  const handleTerm3Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      Terms: {
        ...prevFormData.Terms,
        required: { ...prevFormData.Terms.required, term3: checked },
      },
    }));
  };
  const handleTerm4Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      Terms: {
        ...prevFormData.Terms,
        optional: { ...prevFormData.Terms.optional, term4: checked },
      },
    }));
  };

  const checkAll: Icheckbox = {
    id: "term0",
    name: "term0",
    label: "모두 동의합니다.",
    checked: isAllChecked,
    onChange: handleCheckAllChange,
    padding: "8px 0",
  };

  const checkTerm1: IcheckboxAccordion = {
    id: "term1",
    name: "term1",
    label: "만 14세 이상입니다.",
    checked: formData.Terms.required.term1,
    required: true,
    onChange: handleTerm1Change,
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
    onChange: handleTerm2Change,
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
    onChange: handleTerm3Change,
    padding: "8px 0",
    content:
      "Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium mollitia pariatur esse nam. Laudantium dolorem ea asperiores cum dolores consequuntur odio odit quod nam eveniet. Eveniet veniam in magni placeat.",
  };
  const checkTerm4: IcheckboxAccordion = {
    id: "term4",
    name: "term4",
    label: "마케팅 정보 수신에 동의합니다.",
    checked: formData.Terms.optional.term4,
    required: false,
    onChange: handleTerm4Change,
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
          {formCheck.verifySwitch && (
            <UserVerifyTextCodeField {...textFieldCode} />
          )}
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
