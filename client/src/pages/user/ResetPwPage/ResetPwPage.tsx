/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import UserPageWrap from "@components/user/ui/UserPageWrap";
import { ReactComponent as Lock } from "@svgs/findPwPage/lock.svg";
import TextField from "@components/common/form/TextField";
import UserPwTextField, {
  IuserPwTextField,
} from "@components/user/form/UserPwTextField";
import Button from "@components/common/button/Button";
import UserEmailTextField from "@components/user/form/UserEmailTextField";
import { ItextField } from "@components/common/form/TextField";
import UserVerifyTextField, {
  IuserVerifyTextField,
} from "@components/user/form/UserVerifyTextField";
import UserTextField from "@components/user/form/UserTextField";
import UserConfirmPwTextField, {
  IuserConfirmPwTextField,
} from "@components/user/form/UserConfirmPwTextField";

export default function ResetPwPage() {
  const [isExistUser, setIsExistUser] = useState(true);
  const [isPwError, setIsPwError] = useState(false);
  const [isPwConformError, setIsPwConformError] = useState(false);
  const [formData, setFormData] = useState({
    pw: "",
    confirmPw: "",
  });
  const [formCheck, setFormCheck] = useState({
    isPwSame: false,
  });

  function handleResetPw() {
    console.log("reset password");
  }

  function handleChangePw(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, pw: e.target.value });
    if (e.target.value !== "") {
      const sanitizer =
        /^(?=(?:.*[A-Za-z].*[\d]|.*[A-Za-z].*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]|.*[\d].*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]))(?=(?:.*[A-Za-z].*[\d]|.*[A-Za-z].*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]|.*[\d].*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]))[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,20}$/;

      if (!sanitizer.test(e.target.value)) {
        setIsPwError(true);
      } else {
        setIsPwError(false);
      }
    } else {
      setIsPwError(false);
    }
  }

  function handleChangePwConfirmw(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, confirmPw: e.target.value });

    if (e.target.value !== "") {
      const sanitizer =
        /^(?=(?:.*[A-Za-z].*[\d]|.*[A-Za-z].*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]|.*[\d].*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]))(?=(?:.*[A-Za-z].*[\d]|.*[A-Za-z].*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]|.*[\d].*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]))[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,20}$/;

      if (!sanitizer.test(e.target.value)) {
        setIsPwConformError(true);
      } else {
        setIsPwConformError(false);
      }
    } else {
      setIsPwConformError(false);
    }
  }

  function handleCheckIsPwConfirmError() {
    if (formData.confirmPw !== "" && formData.pw !== "") {
      if (formData.confirmPw === formData.pw) {
        setFormCheck((prev) => ({ ...prev, isPwSame: true }));
      } else {
        setFormCheck((prev) => ({ ...prev, isPwSame: false }));
      }
    } else {
      setFormCheck((prev) => ({ ...prev, isPwSame: false }));
    }
  }

  const textFieldPw: IuserPwTextField = {
    size: "small",
    label: "비밀번호",
    id: "비밀번호",
    placeholder: "비밀번호를 입력해주세요.",
    type: "password",
    value: formData.pw,
    onChange: handleChangePw,
    isError: isPwError,
  };

  console.log(formData.pw);
  console.log(isPwError);

  const textFieldConfirmPw: IuserConfirmPwTextField = {
    size: "small",
    label: "비밀번호 확인",
    id: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호를 확인해주세요.",
    value: formData.confirmPw,
    onChange: handleChangePwConfirmw,
    isError: isPwConformError,
    isPwSame: formCheck.isPwSame,
  };

  useEffect(() => {
    handleCheckIsPwConfirmError();
  }, [formData.pw, formData.confirmPw]);

  return (
    <UserPageWrap>
      <div css={container}>
        <div css={information_container}>
          <Lock />
          <p css={title}>비밀번호 재설정</p>
          <p css={desc}>새로 사용하기를 원하는 비밀번호를 입력해주세요.</p>
        </div>

        <form css={form_container}>
          <div css={pw_container}>
            <UserPwTextField {...textFieldPw} />
            <UserConfirmPwTextField {...textFieldConfirmPw} />
          </div>
          <Button
            size="full"
            bg="gradient"
            text="완료"
            disabled={!formCheck.isPwSame}
            onClick={handleResetPw}
          />
        </form>
      </div>
    </UserPageWrap>
  );
}

const container = css`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const pw_container = css`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const big_title = css`
  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 39px */
`;

const tabs_container = css`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 10px;
`;

const tab = (isLocationHere: boolean) => css`
  display: flex;
  padding: 12px 0px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex: 1 0 0;

  border-bottom: 2px solid ${isLocationHere ? "#119cd4" : "#DEDEDE"};
`;

const tab_text = (isLocationHere: boolean) => css`
  color: ${isLocationHere ? " #119cd4" : "#747474"};
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const information_container = css`
  display: flex;
  padding: 30px 0px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

const form_container = css`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`;

const title = css`
  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 31.2px */
`;

const desc = css`
  color: var(--747474, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 25.5px */
`;

const desc_bold = css`
  font-weight: 700;
`;

const email_sample = css`
  display: flex;
  padding: 15px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  border-radius: 10px;
  border: 1px solid var(--DEDEDE, #dedede);
  background: var(--F6F8FF, #f6f8ff);

  color: var(--747474, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 26px */
`;

const button_container = css`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;
