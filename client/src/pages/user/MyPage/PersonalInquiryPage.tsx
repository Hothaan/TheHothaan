/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "@components/common/table/Pagination";
import MyPageContainer from "@components/common/ui/Container/MyPageContainer";
import Button from "@components/common/button/Button";
import Tabs from "@components/common/mypage/Tabs";
import MyPageButton from "@components/common/mypage/MyPageButton";
import { renderWithKeys } from "@hooks/renderWidthKeys";
import { EmotionJSX } from "@emotion/react/dist/declarations/src/jsx-namespace";

export default function PersonalInquiryPage() {
  const initial_table_data: ItableData[] = [
    {
      title:
        "1:1 문의 제목 노출 영역 한줄 초과 시 … 처리 1:1 문의 제목 노출 영역 한줄 초과 시 … 처리 1:1 문의 제목 노출 영역 한줄 초과 시 … 처리 1:1 문의 제목 노출 영역 한줄 초과 시 … 처리",
      date: "YYYY.MM.DD",
      isReplied: true,
      isOpen: false,
      content: {
        category: "문의 분류",
        title: "1:1 문의 제목 노출 영역",
        content: [
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
        ],
        isImg: true,
      },
      reply: {
        title: "1:1 문의 답변 노출 영역",
        content: [
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
        ],
      },
    },
    {
      title:
        "1:1 문의 제목 노출 영역 한줄 초과 시 … 처리 1:1 문의 제목 노출 영역 한줄 초과 시 … 처리 1:1 문의 제목 노출 영역 한줄 초과 시 … 처리 1:1 문의 제목 노출 영역 한줄 초과 시 … 처리",
      date: "YYYY.MM.DD",
      isReplied: true,
      isOpen: false,
      content: {
        category: "문의 분류",
        title: "1:1 문의 제목 노출 영역",
        content: [
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
        ],
        isImg: true,
      },
      reply: {
        title: "1:1 문의 답변 노출 영역",
        content: [
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
        ],
      },
    },
    {
      title:
        "1:1 문의 제목 노출 영역 한줄 초과 시 … 처리 1:1 문의 제목 노출 영역 한줄 초과 시 … 처리 1:1 문의 제목 노출 영역 한줄 초과 시 … 처리 1:1 문의 제목 노출 영역 한줄 초과 시 … 처리",
      date: "YYYY.MM.DD",
      isReplied: false,
      isOpen: false,
      content: {
        category: "문의 분류",
        title: "1:1 문의 제목 노출 영역",
        content: [
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
        ],
        isImg: true,
      },
      reply: null,
    },
    {
      title:
        "1:1 문의 제목 노출 영역 한줄 초과 시 … 처리 1:1 문의 제목 노출 영역 한줄 초과 시 … 처리 1:1 문의 제목 노출 영역 한줄 초과 시 … 처리 1:1 문의 제목 노출 영역 한줄 초과 시 … 처리",
      date: "YYYY.MM.DD",
      isReplied: true,
      isOpen: false,
      content: {
        category: "문의 분류",
        title: "1:1 문의 제목 노출 영역",
        content: [
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
        ],
        isImg: true,
      },
      reply: {
        title: "1:1 문의 답변 노출 영역",
        content: [
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
        ],
      },
    },
    {
      title:
        "1:1 문의 제목 노출 영역 한줄 초과 시 … 처리 1:1 문의 제목 노출 영역 한줄 초과 시 … 처리 1:1 문의 제목 노출 영역 한줄 초과 시 … 처리 1:1 문의 제목 노출 영역 한줄 초과 시 … 처리",
      date: "YYYY.MM.DD",
      isReplied: true,
      isOpen: false,
      content: {
        category: "문의 분류",
        title: "1:1 문의 제목 노출 영역",
        content: [
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
        ],
        isImg: true,
      },
      reply: {
        title: "1:1 문의 답변 노출 영역",
        content: [
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
          <br />,
          `내용 노출 영역`,
        ],
      },
    },
  ];
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState<ItableData[]>(initial_table_data);
  function handleChangePage(page: number) {
    setCurrentPage(page);
  }

  function handleIsOpen(idx: number) {
    const newData = tableData.map((item, index) =>
      index === idx ? { ...item, isOpen: !item.isOpen } : item
    );
    setTableData(newData);
  }

  interface ItableData {
    title: string;
    date: string;
    isReplied: boolean;
    isOpen: boolean;
    content: {
      category: string;
      title: string;
      content: (string | EmotionJSX.Element)[];
      isImg: boolean;
    };
    reply: { title: string; content: (string | EmotionJSX.Element)[] } | null;
  }

  return (
    <div css={container}>
      <div css={title_container}>
        <p css={title_css}>1:1 문의</p>
        <Button
          size="L"
          bg="gray"
          text="1:1 문의"
          onClick={() => {
            navigate("/myPage/personalInquiryRegister");
          }}
        />
      </div>
      <div css={data_table_container_css}>
        <table>
          <thead>
            <tr>
              <th css={[th_text_css, col1_th_pd, col1_width]}>제목목</th>
              <th css={[th_text_css, col2_th_pd, col2_width]}>등록일일</th>
              <th css={[th_text_css, col3_th_pd, col3_width]}>답변상태</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 &&
              tableData.map((item, idx) => (
                <>
                  <tr
                    key={idx}
                    css={pointer}
                    onClick={() => {
                      handleIsOpen(idx);
                    }}
                  >
                    <td css={[td_title_css, col1_td_pd]}>{item.title}</td>
                    <td css={[td_date_css, col2_td_pd]}>{item.date}</td>
                    <td css={[td_edit_status_css(item.isReplied), col3_td_pd]}>
                      {item.isReplied ? "답변완료" : "답변 전"}
                    </td>
                  </tr>
                  {item.isOpen && (
                    <tr key={idx}>
                      <td
                        css={[
                          idx === tableData.length - 1
                            ? col1_td_colspan3_last_pd
                            : col1_td_colspan3_pd,
                        ]}
                        colSpan={3}
                      >
                        <div css={content_reply_container}>
                          <div css={content_container}>
                            <p css={content_category}>
                              {item.content.category}
                            </p>
                            <p css={content_title}>{item.content.title}</p>
                            <p css={content_content}>
                              {renderWithKeys(item.content.content, `content`)}
                            </p>
                            {item.content.isImg && (
                              <p css={content_img}>Image1.png</p>
                            )}
                          </div>

                          {item.isReplied && item.reply?.content && (
                            <>
                              <span css={border}></span>
                              <div css={reply_container}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M14 13L8 13L8 6H6L6 14C6 14.2652 6.10536 14.5196 6.29289 14.7071C6.48043 14.8946 6.73478 15 7 15L14 15V18L19 14L14 10V13Z"
                                    fill="#A9AAB8"
                                  />
                                </svg>
                                <div css={reply_inner_container}>
                                  <p css={content_title}>{item.reply?.title}</p>
                                  <p css={content_content}>
                                    {renderWithKeys(
                                      item.reply?.content,
                                      `reply-content`
                                    )}
                                  </p>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
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
    </div>
  );
}

const pointer = css`
  cursor: pointer;
`;

const container = css`
  position: relative;

  width: 100%;
  display: flex;
  padding: 50px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  background: var(--FFF, #fff);
`;

const title_css = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const title_container = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const pagination_container = css`
  width: 100%;
  display: flex;
  justify-content: center;
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

const td_edit_status_css = (status: boolean) => css`
  color: ${status ? "#119cd4" : "#A9AAB8"};
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
`;

const col1_width = css``;

const col2_width = css`
  width: 200px;
`;
const col3_width = css`
  width: 200px;
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

const col1_td_colspan3_pd = css`
  padding: 30px;
  border-top: 1px solid var(--DEDEDE, #dedede);
  border-bottom: 1px solid var(--DEDEDE, #dedede);
`;
const col1_td_colspan3_last_pd = css`
  padding: 30px;
  border-top: 1px solid var(--DEDEDE, #dedede);
`;

const content_reply_container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const content_container = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const reply_container = css`
  display: flex;
  gap: 10px;
`;

const reply_inner_container = css`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const border = css`
  display: block;
  width: 100%;
  height: 1px;
  background: #ececec;
`;

const content_category = css`
  overflow: hidden;
  color: var(--119CD4, #119cd4);
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const content_title = css`
  overflow: hidden;
  color: var(--383838, #383838);
  text-overflow: ellipsis;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const content_content = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const content_img = css`
  color: var(--A9AAB8, #a9aab8);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
