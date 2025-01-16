/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "@components/common/table/Pagination";
import MyPageContainer from "@components/common/ui/Container/MyPageContainer";
import Tabs from "@components/common/mypage/Tabs";
import { TtabsData } from "@components/common/mypage/Tabs";

type Ttags = "전체" | "견적요청" | "견적완료";

export default function MyEstimatePage() {
  const [selectedTab, setSelectedTab] = useState<string>("견적요청");
  const [selectedTag, setSelectedTag] = useState<Ttags>("전체");
  const [currentPage, setCurrentPage] = useState(1);

  const tabsData: TtabsData[] = [
    { isSelected: selectedTab === "견적요청", text: "견적요청" },
    { isSelected: selectedTab === "서비스 견적", text: "서비스 견적" },
  ];

  const tagsData: Ttags[] = ["전체", "견적요청", "견적완료"];

  function handleChangeSelectedTag(tag: Ttags) {
    setSelectedTag(tag);
  }

  function handleChangePage(page: number) {
    setCurrentPage(page);
  }

  interface ItableData {
    title: string;
    date: string;
    editStatus: Ttags;
  }

  const table_data: ItableData[] = [
    {
      title: "견적서 요청 분야 노출",
      date: "YYYY.MM.DD",
      editStatus: "견적요청",
    },
    {
      title: "견적서 요청 분야 노출",
      date: "YYYY.MM.DD",
      editStatus: "견적완료",
    },
    {
      title: "견적서 요청 분야 노출",
      date: "YYYY.MM.DD",
      editStatus: "견적완료",
    },
    {
      title: "견적서 요청 분야 노출",
      date: "YYYY.MM.DD",
      editStatus: "견적완료",
    },
    {
      title: "견적서 요청 분야 노출",
      date: "YYYY.MM.DD",
      editStatus: "견적완료",
    },
  ];

  // const table_data: ItableData[] = [];

  return (
    <MyPageContainer title="받은 견적">
      <Tabs tabsData={tabsData} onClick={setSelectedTab} />
      <div css={tag_container}>
        {tagsData.map((item, idx) => (
          <p
            css={tag_css(selectedTag === item)}
            key={idx}
            onClick={() => {
              handleChangeSelectedTag(item);
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
              <th css={[th_text_css, col1_th_pd, col1_width]}>프로젝트명</th>
              <th css={[th_text_css, col2_th_pd, col2_width]}>요청일</th>
              <th css={[th_text_css, col3_th_pd, col3_width]}>작업상태</th>
            </tr>
          </thead>
          <tbody>
            {table_data.length > 0 &&
              table_data.map((item, idx) => (
                <tr key={idx}>
                  <td css={[td_title_css, col1_td_pd]}>
                    <Link to="/myPage/estimateDetail">{item.title}</Link>
                  </td>
                  <td css={[td_date_css, col2_td_pd]}>{item.date}</td>
                  <td css={[td_edit_status_css(item.editStatus), col3_td_pd]}>
                    {item.editStatus}
                  </td>
                </tr>
              ))}
            {table_data.length === 0 && (
              <tr>
                <td colSpan={3} css={empty_table_data_td}>
                  <p css={empty_table_data_text}>
                    생성된 프로젝트가 없습니다.
                    <br />
                    새로운 프로젝트를 생성해보세요.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div css={pagination_container}>
        <Pagination
          paddingTop={0}
          currentPage={currentPage}
          totalPages={10}
          onPageChange={handleChangePage}
        />
      </div>
    </MyPageContainer>
  );
}

const pagination_container = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const tag_container = css`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const tag_css = (isSelected: boolean) => css`
  display: flex;
  padding: 9px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 50px;
  background: ${isSelected ? "#119CD4" : "#f6f8ff"};

  cursor: pointer;

  color: ${isSelected ? "#fff" : "#747474"};
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const data_table_container_css = css`
  width: 100%;
  border-radius: 20px;
  border: 1px solid var(--DEDEDE, #dedede);

  table {
    table-layout: fixed;
    width: 100%;
  }
`;

const th_text_css = css`
  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  border-bottom: 1px solid var(--DEDEDE, #dedede);
`;

const td_title_css = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;

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

const td_edit_status_css = (status: string) => css`
  color: ${status === "견적요청" ? "#119cd4" : "#A9AAB8"};
  font-family: Pretendard;
  font-size: 17px;
`;

const col1_width = css``;

const col2_width = css`
  width: 150px;
`;
const col3_width = css`
  width: 100px;
`;

const col1_th_pd = css`
  padding: 15px 10px 15px 30px;
`;
const col1_td_pd = css`
  padding: 50px 0px 50px 30px;
`;
const col2_th_pd = css`
  padding: 15px 10px 15px 0px;
`;
const col2_td_pd = css`
  padding: 50px 10px 50px 0px;
`;
const col3_th_pd = css`
  padding: 15px 30px 15px 0px;
`;
const col3_td_pd = css`
  padding: 50px 30px 50px 0px;
`;

const empty_table_data_td = css`
  padding: 128px 30px;
`;

const empty_table_data_text = css`
  // position: absolute;
  width: 100%;
  color: var(--747474, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 22.1px */
`;
