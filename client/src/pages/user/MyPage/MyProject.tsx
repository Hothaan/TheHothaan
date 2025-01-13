/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MyPageContainer from "@components/common/ui/Container/MyPageContainer";

type Ttabs = "편집가능" | "다운로드 가능" | "다운로드 기간 만료";

export default function MyProject() {
  const [selectedTab, setSelectedTab] = useState<Ttabs>("편집가능");
  const tabsData: Ttabs[] = ["편집가능", "다운로드 가능", "다운로드 기간 만료"];

  function handleChangeSelectedTab(tab: Ttabs) {
    setSelectedTab(tab);
  }

  const table_data = [
    {
      title:
        "프로젝트명 노출 영역 한줄 초과 시 … 처리 프로젝트명 노출 영역 한줄 초과 시 … 처리  프로젝트명 노출 영역 한줄 초과 시 … 처리",
      lastEditDate: "YYYY.MM.DD",
      registrationDate: "YYYY.MM.DD",
      downloadPeriod: "YYYY.MM.DD ~YYYY.MM.DD",
      download: true,
      editStatus: true,
    },
    {
      title: "프로젝트명 노출 영역 한줄 초과 시 … 처리",
      lastEditDate: "YYYY.MM.DD",
      registrationDate: "YYYY.MM.DD",
      downloadPeriod: "YYYY.MM.DD ~YYYY.MM.DD",
      download: true,
      editStatus: false,
    },
    {
      title: "프로젝트명 노출 영역 한줄 초과 시 … 처리",
      lastEditDate: "YYYY.MM.DD",
      registrationDate: "YYYY.MM.DD",
      downloadPeriod: "YYYY.MM.DD ~YYYY.MM.DD",
      download: true,
      editStatus: false,
    },
    {
      title: "프로젝트명 노출 영역 한줄 초과 시 … 처리",
      lastEditDate: "YYYY.MM.DD",
      registrationDate: "YYYY.MM.DD",
      downloadPeriod: "YYYY.MM.DD ~YYYY.MM.DD",
      download: true,
      editStatus: false,
    },
    {
      title: "프로젝트명 노출 영역 한줄 초과 시 … 처리",
      lastEditDate: "YYYY.MM.DD",
      registrationDate: "YYYY.MM.DD",
      downloadPeriod: "YYYY.MM.DD ~YYYY.MM.DD",
      download: true,
      editStatus: false,
    },
  ];

  return (
    <MyPageContainer title="내 작업">
      <div css={tabs_container_css}>
        {tabsData.map((item, idx) => (
          <p
            css={tab_css(selectedTab === item)}
            key={idx}
            onClick={() => {
              handleChangeSelectedTab(item);
            }}
          >
            {item}
          </p>
        ))}
      </div>
      <div css={data_table_container_css}>
        <table>
          <thead>
            <tr>
              <th css={[th_css, col_641, col_641_th_pd]}>프로젝트명</th>
              <th css={[th_css, col_150, col_150_th_pd]}>마지막 수정일</th>
              <th css={[th_css, col_150, col_150_th_pd]}>등록일</th>
              <th css={[th_css, col_230, col_230_th_pd]}>다운로드 기간</th>
              <th css={[th_css, col_92, col_92_th_pd]}>다운로드</th>
              <th css={[th_css, col_100, col_100_th_pd]}>작업상태</th>
            </tr>
          </thead>
          <tbody>
            {table_data.map((item, idx) => (
              <tr key={idx}>
                <td css={[td_border_css, td_title_css, col_641, col_641_td_pd]}>
                  <Link to="/myPage/myProjectEdit">{item.title}</Link>
                </td>
                <td css={[td_border_css, td_date_css, col_150, col_150_td_pd]}>
                  {item.lastEditDate}
                </td>
                <td css={[td_border_css, td_date_css, col_150, col_150_td_pd]}>
                  {item.registrationDate}
                </td>
                <td css={[td_border_css, td_date_css, col_230, col_230_td_pd]}>
                  {item.downloadPeriod}
                </td>
                <td css={[td_border_css, td_title_css, col_92, col_92_td_pd]}>
                  <button type="button" css={download_btn_css(item.download)}>
                    다운로드
                  </button>
                </td>
                <td css={[td_border_css, td_title_css, col_100, col_100_td_pd]}>
                  {item.editStatus && (
                    <p css={edit_status_css(item.editStatus)}>편집가능</p>
                  )}
                  {!item.editStatus && (
                    <p css={edit_status_css(item.editStatus)}>기간만료</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MyPageContainer>
  );
}

const tabs_container_css = css`
  display: flex;
  width: 100%;
`;
const tab_css = (isSelected: boolean) => css`
  width: 100%;
  padding: 12px;
  border-bottom: 2px solid ${isSelected ? "#119cd4" : "#747474"};
  margin-top: 30px;

  cursor: pointer;

  color: ${isSelected ? "#119cd4" : "#747474"};
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  text-align: center;
`;

const data_table_container_css = css`
  width: 100%;
  max-width: 1520px;
  border-radius: 20px;
  border: 1px solid var(--DEDEDE, #dedede);

  table {
    table-layout: fixed;
    width: 100%;
  }
`;

const th_css = css`
  border-bottom: 1px solid var(--DEDEDE, #dedede);

  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const td_title_css = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;

  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  a {
    color: var(--383838, #383838);
  }
`;

const td_date_css = css`
  color: var(--747474, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const col_641 = css`
  width: 38.5%;

  box-sizing: border-box;
`;

const col_641_th_pd = css`
  padding: 15px 10px 15px 30px;
`;

const col_641_td_pd = css`
  padding: 50px 10px 50px 30px;
`;

const col_150 = css`
  width: 9.86%;
  max-width: 150px;
`;
const col_150_th_pd = css`
  padding: 15px 10px 15px 0;
`;

const col_150_td_pd = css`
  padding: 50px 10px 50px 0;
`;

const col_230 = css`
  width: 15.13%;
  max-width: 230px;
`;

const col_230_th_pd = css`
  padding: 15px 10px 15px 0;
`;

const col_230_td_pd = css`
  padding: 50px 10px 50px 0;
`;

const col_92 = css`
  width: 6.05%;
  max-width: 92px;
`;

const col_92_th_pd = css`
  padding: 15px 10px 15px 0;
`;

const col_92_td_pd = css`
  padding: 50px 10px 50px 0;
`;

const col_100 = css`
  width: 6.57%;
  max-width: 100px;
`;

const col_100_th_pd = css`
  padding: 15px 30px 15px 0;
`;

const col_100_td_pd = css`
  padding: 50px 30px 50px 0;
`;

const td_border_css = css`
  border-bottom: 1px solid var(--DEDEDE, #dedede);
`;

const download_btn_css = (isAvailable: boolean) => css`
  display: flex;
  height: 44px;
  padding: 13px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 50px;
  border: 1px solid var(--DEDEDE, #dedede);
  background: var(--F6F8FF, #f6f8ff);

  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  white-space: nowrap;
`;

const edit_status_css = (isAvailable: boolean) => css`
  cursor: ${isAvailable ? "pointer" : "default"};

  color: ${isAvailable ? "#119cd4" : "#A9AAB8"};
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
