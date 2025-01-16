/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import UserPageWrap from "@components/user/ui/UserPageWrap";
import { ReactComponent as People } from "@svgs/findIdPage/people.svg";
import TextField from "@components/common/form/TextField";
import Button from "@components/common/button/Button";

export default function FindIdPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [findUserSwitch, setFindUserSwitch] = useState(false);
  const [isExistUser, setIsExistUser] = useState(true);

  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      return false;
    }

    if (!emailRegex.test(email)) {
      return false;
    }

    return true;
  }

  function handleIsLocationHere(pathname: string): boolean {
    if (location.pathname === pathname) {
      return true;
    } else {
      return false;
    }
  }

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  }

  function handleConfirmId() {
    setFindUserSwitch(true);
  }

  function handleNavigateToJoinPage() {
    navigate("/join");
  }

  function handleReset() {
    setEmail("");
    setFindUserSwitch(false);
  }

  function handleNavigateToLoginPage() {
    navigate("/login");
  }

  function handleNavigateToFindPwPage() {
    navigate("/findPw");
  }

  return (
    <UserPageWrap>
      <div css={container}>
        <div css={tabs_container}>
          <Link to="/findId" css={tab(handleIsLocationHere("/findId"))}>
            <p css={tab_text(handleIsLocationHere("/findId"))}>아이디 찾기</p>
          </Link>
          <Link to="/findPw" css={tab(handleIsLocationHere("/findPw"))}>
            <p css={tab_text(handleIsLocationHere("/findPw"))}>비밀번호 찾기</p>
          </Link>
        </div>
        {!findUserSwitch && (
          <div css={information_container}>
            <People />
            <p css={title}>아이디 찾기</p>
            <p css={desc}>
              더핫한은 이메일을 <span css={desc_bold}>아이디</span>로
              사용합니다. <br />
              소유하고 계신 계정정보를 입력해보세요. <br />
              회원가입 여부를 확인해드립니다.
            </p>
          </div>
        )}
        {findUserSwitch && !isExistUser && (
          <div css={information_container}>
            <p css={title}>계정안내</p>
            <p css={desc}>더핫한에 등록되어있지 않은 계정입니다.</p>
            <p css={email_sample}>{email}</p>
          </div>
        )}
        {findUserSwitch && isExistUser && (
          <div css={information_container}>
            <p css={title}>계정안내</p>
            <p css={desc}>회원가입 하신 이메일은 다음과 같습니다.</p>
            <p css={email_sample}>{email}</p>
          </div>
        )}
        {!findUserSwitch && (
          <form css={form_container}>
            <TextField
              size="normal"
              label="이메일"
              id="이메일"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={handleChangeEmail}
            />
            <Button
              size="full"
              bg="gradient"
              text="확인"
              disabled={email === ""}
              onClick={handleConfirmId}
            />
          </form>
        )}
        {findUserSwitch && !isExistUser && (
          <div css={button_container}>
            <Button
              size="L"
              bg="gradient"
              text="회원가입"
              onClick={handleNavigateToJoinPage}
            />
            <Button
              size="L"
              bg="white"
              text="다시 확인"
              onClick={handleReset}
            />
          </div>
        )}
        {findUserSwitch && isExistUser && (
          <div css={button_container}>
            <Button
              size="L"
              bg="gradient"
              text="로그인"
              onClick={handleNavigateToLoginPage}
            />
            <Button
              size="L"
              bg="white"
              text="비밀번호 찾기"
              onClick={handleNavigateToFindPwPage}
            />
          </div>
        )}
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
