/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import UserPageWrap from "@components/user/ui/UserPageWrap";
import { IuserPageTitle } from "@components/user/ui/UserPageTitle";
import UserPageTitle from "@components/user/ui/UserPageTitle";
import { Link } from "react-router-dom";
import { ItextField } from "@components/common/form/TextField";
import UserTextField from "@components/user/form/UserTextField";
import Button from "@components/common/button/Button";
import { Ibutton } from "@components/common/button/Button";
import ButtonSnsLogin, {
  IbuttonSnsLogin,
} from "@components/user/button/ButtonSnsLogin";
import TextCaption, { ITextCaption } from "@components/common/text/TextCaption";

export default function LoginPage() {
  const userPageTitle: IuserPageTitle = { title: "로그인" };

  const textFieldId: ItextField = {
    size: "small",
    label: "이메일",
    id: "이메일",
    placeholder: "이메일 아이디 입력",
  };
  const textFieldPw: ItextField = {
    size: "small",
    label: "비밀번호",
    id: "비밀번호",
    placeholder: "비밀번호 입력",
  };
  const buttonLogin: Ibutton = {
    size: "full",
    bg: "gray",
    text: "이메일 로그인",
  };
  const buttonKakaoLogin: IbuttonSnsLogin = {
    sns: "kakao",
    onClick: () => {},
  };
  const buttonGoogleLogin: IbuttonSnsLogin = {
    sns: "google",
    onClick: () => {},
  };
  const buttonNaverLogin: IbuttonSnsLogin = {
    sns: "naver",
    onClick: () => {},
  };
  const buttonFacebookLogin: IbuttonSnsLogin = {
    sns: "facebook",
    onClick: () => {},
  };
  const loginCaption: ITextCaption = {
    caption: "로그인 정보를 잊으셨나요?",
  };
  const joinCaption: ITextCaption = {
    caption: "아직 회원가입을 하지 않으셨나요?",
  };

  return (
    <UserPageWrap>
      <div css={container}>
        <UserPageTitle {...userPageTitle} />
        <form css={form_container}>
          <UserTextField {...textFieldId} />
          <UserTextField {...textFieldPw} />
          <Link to="/findId" css={text_align_right}>
            <TextCaption {...loginCaption} />
          </Link>
          <Button {...buttonLogin} />
        </form>
        <div css={sns_login_container}>
          <ButtonSnsLogin {...buttonKakaoLogin} />
          <ButtonSnsLogin {...buttonGoogleLogin} />
          <ButtonSnsLogin {...buttonNaverLogin} />
          <ButtonSnsLogin {...buttonFacebookLogin} />
        </div>
        <div css={link_container}>
          <TextCaption {...joinCaption} />
          <Link to="/join" css={link_blue}>
            회원가입
          </Link>
        </div>
      </div>
    </UserPageWrap>
  );
}

const form_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  align-self: stretch;
`;

const link_container = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const text_align_right = css`
  color: var(--747474, #747474);
  width: 100%;
  text-align: right;
  margin-bottom: 16px;
`;

const link_blue = css`
  color: var(--119CD4, #119cd4);
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 21px */
  letter-spacing: -0.14px;
  text-decoration-line: underline;
`;

const link_gray = css`
  color: var(--747474, #747474);
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  letter-spacing: -0.14px;
`;

const container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
`;

const sns_login_container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
