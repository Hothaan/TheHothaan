/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import UserPageWrap from "@components/user/ui/UserPageWrap";
// import { ReactComponent as Lock } from "@svgs/findPwPage/lock.svg";
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

  function handleResetPw() {}

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
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="50" height="50" rx="25" fill="#F6F8FF" />
            <path
              d="M25 15C22.243 15 20 17.243 20 20V23H19C18.4696 23 17.9609 23.2107 17.5858 23.5858C17.2107 23.9609 17 24.4696 17 25V33C17 33.5304 17.2107 34.0391 17.5858 34.4142C17.9609 34.7893 18.4696 35 19 35H31C31.5304 35 32.0391 34.7893 32.4142 34.4142C32.7893 34.0391 33 33.5304 33 33V25C33 24.4696 32.7893 23.9609 32.4142 23.5858C32.0391 23.2107 31.5304 23 31 23H30V20C30 17.243 27.757 15 25 15ZM22 20C22 18.346 23.346 17 25 17C26.654 17 28 18.346 28 20V23H22V20ZM26 30.723V33H24V30.723C23.6504 30.5228 23.3697 30.2213 23.1948 29.8584C23.02 29.4954 22.9593 29.0879 23.0207 28.6898C23.0821 28.2916 23.2627 27.9214 23.5388 27.6279C23.8148 27.3345 24.1733 27.1316 24.567 27.046C24.8594 26.9813 25.1626 26.9832 25.4542 27.0513C25.7459 27.1194 26.0185 27.2521 26.252 27.4397C26.4855 27.6272 26.6739 27.8647 26.8034 28.1348C26.9328 28.4049 27 28.7005 27 29C26.9994 29.3497 26.9067 29.6932 26.7311 29.9956C26.5556 30.2981 26.3034 30.549 26 30.723Z"
              fill="#119CD4"
            />
          </svg>

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
