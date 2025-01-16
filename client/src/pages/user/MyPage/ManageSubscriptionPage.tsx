/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState } from "react";
import MyPageContainer from "@components/common/ui/Container/MyPageContainer";
import Tabs from "@components/common/mypage/Tabs";
import MyPageButton from "@components/common/mypage/MyPageButton";

function SubscriptionList() {
  const planData = {
    name: "Basic Plan",
    status: "구독 중",
    periodDate: "YYYY.MM.DD ~ YYYY.MM.DD",
    period: "(1년)",
    nextPaymentDate: "YYYY.MM.DD",
    nextPaymentCost: "000,000원",
  };
  return (
    <>
      <div css={content_container}>
        <div css={plan_top_container}>
          <div css={plan_name_status_container}>
            <p css={plan_name}>{planData.name}</p>
            <p css={plan_status}>{planData.status}</p>
          </div>
          <MyPageButton text="구독해지" />
        </div>
        <div css={item_container}>
          <p css={item_title}>이용기간</p>
          <p css={item_content}>
            {planData.periodDate}
            <span css={item_content_gray}>&nbsp;{planData.period}</span>
          </p>
        </div>
        <div css={item_container}>
          <p css={item_title}>다음 결제일</p>
          <p css={item_content}>{planData.nextPaymentDate}</p>
        </div>
        <div css={item_container}>
          <p css={item_title}>다음 결제 금액</p>
          <p css={item_content}>{planData.nextPaymentCost}</p>
        </div>
      </div>
      <p css={caption}>
        * 구독 해지의 경우 다음 달부터 정기 구독 결제를 중단할 수 있습니다.
      </p>
    </>
  );
}

function PaymentList() {
  const tableData = [
    {
      plan: "Basic plan",
      cost: "000,000원",
      method: "[우리카드]",
      num: "****-****-****-****",
      date: "YYYY.MM.DD",
    },
    {
      plan: "Basic plan",
      cost: "000,000원",
      method: "[우리카드]",
      num: "****-****-****-****",
      date: "YYYY.MM.DD",
    },
    {
      plan: "Basic plan",
      cost: "000,000원",
      method: "[우리카드]",
      num: "****-****-****-****",
      date: "YYYY.MM.DD",
    },
    {
      plan: "Basic plan",
      cost: "000,000원",
      method: "[우리카드]",
      num: "****-****-****-****",
      date: "YYYY.MM.DD",
    },
    {
      plan: "Basic plan",
      cost: "000,000원",
      method: "[우리카드]",
      num: "****-****-****-****",
      date: "YYYY.MM.DD",
    },
    {
      plan: "Basic plan",
      cost: "000,000원",
      method: "[우리카드]",
      num: "****-****-****-****",
      date: "YYYY.MM.DD",
    },
  ];
  const table_container = css`
    width: 100%;
    border-radius: 20px;
    border: 1px solid var(--DEDEDE, #dedede);

    table {
      table-layout: fixed;
      width: 100%;
    }
  `;

  const col1_th_pd = css`
    padding: 15px 10px 15px 30px;
  `;
  const col2_th_pd = css`
    padding: 15px 10px 15px 0px;
  `;
  const col3_th_pd = css`
    padding: 15px 10px 15px 0px;
  `;
  const col4_th_pd = css`
    padding: 15px 30px 15px 0px;
  `;

  const col1_td_pd = css`
    vertical-align: middle;
    padding: 50px 10px 50px 30px;
  `;
  const col2_td_pd = css`
    vertical-align: middle;
    padding: 50px 10px 50px 0px;
  `;
  const col3_td_pd = css`
    vertical-align: middle;
    padding: 50px 10px 50px 0px;
  `;
  const col4_td_pd = css`
    vertical-align: middle;
    padding: 50px 30px 50px 0px;
  `;

  const th_text = css`
    color: var(--383838, #383838);
    text-align: center;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    border-bottom: 1px solid var(--DEDEDE, #dedede);
  `;

  const td_text = css`
    color: var(--383838, #383838);
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    border-bottom: 1px solid var(--DEDEDE, #dedede);
  `;

  const td_text_light = css`
    color: var(--747474, #747474);
    text-align: center;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    border-bottom: 1px solid var(--DEDEDE, #dedede);
  `;

  const inner_container_center = css`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  return (
    <div css={table_container}>
      <table>
        <thead>
          <tr>
            <th css={[col1_th_pd, th_text]}>구독 플랜</th>
            <th css={[col2_th_pd, th_text]}>결제 금액</th>
            <th css={[col3_th_pd, th_text]}>결제 수단</th>
            <th css={[col4_th_pd, th_text]}>결제 날짜</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, idx) => (
            <tr key={idx}>
              <td css={[col1_td_pd, td_text]}>
                <p>{item.plan}</p>
              </td>
              <td css={[col2_td_pd, td_text]}>
                <p>{item.cost}</p>
              </td>
              <td css={[col3_td_pd, td_text]}>
                <div css={inner_container_center}>
                  <p>{item.method}</p>
                  <p>{item.num}</p>
                </div>
              </td>
              <td css={[col4_td_pd, td_text_light]}>
                <p>{item.date}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ManageSubscriptionPage() {
  const [selectedTab, setSelectedTab] = useState<string>("구독 내역");
  const tabsData = [
    { isSelected: selectedTab === "구독 내역", text: "구독 내역" },
    { isSelected: selectedTab === "결제 내역", text: "결제 내역" },
  ];

  return (
    <MyPageContainer title="구독 관리">
      <Tabs tabsData={tabsData} onClick={setSelectedTab} />
      {selectedTab === "구독 내역" && <SubscriptionList />}
      {selectedTab === "결제 내역" && <PaymentList />}
    </MyPageContainer>
  );
}

const content_container = css`
  display: flex;
  padding: 50px;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  align-self: stretch;

  border-radius: 20px;
  border: 1px solid var(--DEDEDE, #dedede);
`;

const plan_name_status_container = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const plan_top_container = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const plan_name = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const plan_status = css`
  display: flex;
  padding: 9px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 50px;
  background: var(--119CD4, #119cd4);

  color: var(--FFF, #fff);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const item_container = css`
  display: flex;
  height: 50px;
  align-items: center;
  align-self: stretch;
`;

const item_title = css`
  width: 120px;

  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const item_content = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const item_content_gray = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const caption = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 25.5px */
  letter-spacing: -0.17px;
`;
