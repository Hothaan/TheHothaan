/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/button/Button";

export default function JoinSuccessPage() {
  const navigate = useNavigate();
  function handleMoveToMainPage() {
    navigate("/");
  }
  return (
    <div css={container}>
      <div css={top_container}>
        <div css={check_icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="19"
            viewBox="0 0 24 19"
            fill="none"
          >
            <path
              d="M7.83738 14.0504L2.35438 8.56743L0 10.9218L7.83738 18.7592L24 2.59656L21.6456 0.242188L7.83738 14.0504Z"
              fill="#119CD4"
            />
          </svg>
        </div>
        <p css={title}>회원가입 완료👍</p>
        <p css={desc}>더핫한 회원이 되신것을 환영해요.</p>
      </div>
      <div css={button_container}>
        <Button
          text="홈 화면으로"
          size="full"
          bg="gradient"
          onClick={handleMoveToMainPage}
        />
      </div>
    </div>
  );
}

const container = css`
  margin: 80px auto 0;
  min-height: calc(100vh - 211px - 80px);

  display: flex;
  width: 340px;
  height: 100%;
  padding: 60px 0px 100px 0px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
  flex: 1 0 0;
`;

const top_container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

const title = css`
  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; /* 39px */
`;

const desc = css`
  color: var(--747474, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 26px */
`;

const check_icon = css`
  display: flex;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 50px;
  background: var(--F6F8FF, #f6f8ff);
`;
const button_container = css`
  width: 100%;
`;
