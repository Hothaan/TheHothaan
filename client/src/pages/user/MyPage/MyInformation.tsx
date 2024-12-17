/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import Button, { Ibutton } from "@components/common/button/Button";
import MyPageButton from "./MyPageButton";
import Checkbox, { Icheckbox } from "@components/common/form/Checkbox";

export default function MyInformation() {
  const saveButton: Ibutton = {
    size: "L",
    bg: "gray",
    text: "저장하기",
  };

  const marketingCheckBox: Icheckbox = {
    id: "marketing",
    name: "marketing",
    label: "마케팅 정보 수신에 동의합니다.",
    checked: true,
    onChange: () => {},
    padding: "0",
  };

  return (
    <div css={container}>
      <p css={title}>내 정보</p>
      <ul css={information_container}>
        <li css={information_row}>
          <div css={information_inner_container}>
            <p css={information_title}>이름</p>
            <p css={information_desc}>홍길동</p>
          </div>
        </li>
        <li css={information_row}>
          <div css={information_inner_container}>
            <p css={information_title}>아이디(이메일)</p>
            <p css={information_desc}>example@thehothan.com</p>
          </div>
        </li>
        <li css={information_row}>
          <div css={information_inner_container}>
            <p css={information_title}>비밀번호</p>
            <MyPageButton text="변경하기" />
          </div>
        </li>
        <li css={information_row}>
          <div css={information_inner_container}>
            <p css={information_title}>본인인증</p>
            <p css={information_desc}>example@thehothan.com</p>
            <MyPageButton text="재인증하기" />
          </div>
        </li>
        <li css={information_row}>
          <div css={information_inner_container}>
            <p css={information_title}>이용중인 서비스</p>
            <p css={information_desc}>현재 구독중인 서비스가 없습니다.</p>
          </div>
          <MyPageButton text="구독하러 가기" />
        </li>
        <li css={information_row}>
          <div css={information_inner_container}>
            <p css={information_title}>내 카드 정보</p>
            <p css={information_desc}>신한카드 0000-0000-****-0000</p>
          </div>
          <MyPageButton text="카드  변경" />
        </li>
        <li css={information_row}>
          <div css={information_inner_container}>
            <p css={information_title}>뉴스레터</p>
            <p css={information_desc}>구독중</p>
          </div>
          <MyPageButton text="구독취소" />
        </li>
        <li css={information_row}>
          <div css={[information_inner_container, width_100, align_start]}>
            <p css={information_title}>마케팅 활용동의</p>
            <div css={information_cotent_container}>
              <Checkbox {...marketingCheckBox} />
              <p css={information_caption}>
                특별 혜택 소식, 신규 이벤트 정보, 뉴스레터 등 광고성 정보를
                받아보실 수 있습니다.
              </p>
            </div>
          </div>
        </li>
        <li css={information_row}>
          <div css={information_inner_container}>
            <p css={information_title}>SNS 가입경로</p>
            <img src={`/assets/images/kakao.png`} alt="kakao" />
            <p css={information_desc}>카카오톡</p>
          </div>
        </li>
      </ul>
      <div css={button_container}>
        <Button {...saveButton} />
      </div>
    </div>
  );
}

const container = css`
  width: 100%;
  display: flex;
  padding: 50px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  flex: 1 0 0;
  background: var(--FFF, #fff);
`;

const title = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const information_container = css`
  width: 100%;
  display: flex;
  padding: 50px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;

  border-radius: 20px;
  border: 1px solid var(--DEDEDE, #dedede);
`;

const information_row = css`
  width: 100%;
  display: flex;
  padding: 15px 0;
  align-items: center;
  justify-content: space-between;
`;

const information_inner_container = css`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const width_100 = css`
  width: 100%;
`;

const align_start = css`
  align-items: start;
`;

const button_container = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const information_title = css`
  width: 120px;
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const information_cotent_container = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const information_desc = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const information_caption = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 25.5px */
  letter-spacing: -0.17px;
`;
