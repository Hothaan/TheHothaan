/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { Ibutton } from "@components/common/button/Button";
import Button from "@components/common/button/Button";
import { Tplan } from "@pages/user/MainPage/ServiceIntro8";
// import { ReactComponent as ModalClose } from "@svgs/planIntro/modalClose.svg";

export interface Imodal {
  isOpen: boolean;
  plan: Tplan;
  onClick: () => void;
}

export default function PlanPaymentModal(prop: Imodal) {
  const { isOpen, plan, onClick } = prop;

  if (!isOpen) return null;

  return (
    <div css={modal_bg} onClick={onClick}>
      <div
        css={modal}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div css={top_container}>
          <p css={modal_title}>플랜 결제하기</p>
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="30" height="30" rx="15" fill="#F6F8FF" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.91846 19.4418L19.362 9.99822L19.9185 10.5547L10.4749 19.9982L9.91846 19.4418Z"
              fill="#747474"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.6378 10L20.0814 19.4435L19.5249 20L10.0814 10.5565L10.6378 10Z"
              fill="#747474"
            />
          </svg>
        </div>
        <div css={bottom_container}>
          <div css={left_container}>
            <div css={info_container}>
              <div css={price_info_container}>
                <p css={price_info_title}>가격 정보</p>
                <div css={plan_box}>
                  <p css={plan_text}>{plan} plan</p>
                  <div css={plan_price_caption_container}>
                    <p css={plan_price_text}>000,000원</p>
                    <p css={plan_price_caption_text}>매월/원금액(VAT 포함)</p>
                  </div>
                </div>
              </div>
              <div css={calc_container}>
                <span css={border}></span>
                <div css={calc_item_container}>
                  <p css={calc_title}>할인 금액액</p>
                  <p css={sale_price}>-0,000원</p>
                </div>
                <span css={border}></span>
                <div css={calc_item_container}>
                  <p css={calc_title}>결제 금액</p>
                  <p css={total_price}>000,000원 / 매월</p>
                </div>
                <span css={border}></span>
              </div>
            </div>
            <div css={caption_container}>
              <p css={caption}>
                <span css={caption_circle}></span>
                <span
                  css={caption_text}
                >{`정기 결제는 [마이페이지 > 구독 관리]에서 구독을 해지할 수 있습니다.`}</span>
              </p>
              <p css={caption}>
                {" "}
                <span css={caption_circle}></span>
                <span
                  css={caption_text}
                >{` 본인 인증 시 제공되는 정보는 인증 기관에서 수집하며, 인증 수단 외의 용도로 사용하지 않습니다.`}</span>
              </p>
            </div>
          </div>
          <div css={right_container}>
            <div css={card_info_container}>
              <p css={price_info_title}>결제 카드</p>
              <div css={card_container}>
                <p css={card_number_text}>카드번호</p>
                <div css={card_box}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M36 20H0V16H36V20Z"
                      fill="#A9AAB8"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20 0V36H16L16 0H20Z"
                      fill="#A9AAB8"
                    />
                  </svg>
                  <p css={register_card_text}>카드 등록하기</p>
                </div>
              </div>
            </div>
            <div css={button_container}>
              <Button text="취소" size="L" bg="white" />
              <Button text="카드등록" size="L" bg="white" disabled={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const modal_bg = css`
  position: fixed;
  z-index: 6;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
`;

const modal = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  width: 1020px;
  height: 640px;
  padding: 30px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 30px;

  border-radius: 20px;
  overflow: hidden;
  background: var(--FFFFFF, #fff);
`;

const top_container = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const bottom_container = css`
  display: flex;
  align-items: flex-start;
  gap: 40px;
  flex: 1 0 0;
  align-self: stretch;
`;

const left_container = css`
  display: flex;
  width: 520px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const right_container = css`
  display: flex;
  width: 400px;
  padding: 0px 20px 30px 40px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;

  border-left: 1px solid var(--DEDEDE, #dedede);
  background: var(--FFF, #fff);
`;

const card_info_container = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const info_container = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 70px;
  align-self: stretch;
`;

const caption_container = css``;

const caption = css`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const caption_text = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;

const caption_circle = css`
  display: block;
  width: 2px;
  height: 2px;
  background-color: #747474;
  border-radius: 50%;
`;

const price_info_container = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
`;

const calc_container = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const calc_item_container = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const calc_title = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const total_price = css`
  color: var(--119CD4, #119cd4);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const sale_price = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const border = css`
  width: 100%;
  height: 1px;
  background: #dedede;
`;

const modal_title = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const price_info_title = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const plan_box = css`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;

  border-radius: 10px;
  border: 1px solid var(--ECECEC, #ececec);
  background: var(--F6F8FF, #f6f8ff);
`;

const plan_text = css`
  color: var(--119CD4, #119cd4);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  text-transform: Capitalized;
`;

const plan_price_caption_container = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const plan_price_text = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const plan_price_caption_text = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const card_container = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const card_number_text = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const card_box = css`
  display: flex;
  padding: 60px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 14px;
  align-self: stretch;

  border-radius: 10px;
  border: 1px solid var(--DEDEDE, #dedede);
  background: var(--FFF, #fff);
`;

const register_card_text = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const button_container = css`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;
