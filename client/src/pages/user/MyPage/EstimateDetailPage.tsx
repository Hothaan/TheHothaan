/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import DetailContainer from "@components/common/ui/Container/DetailContainer";
import Button from "@components/common/button/Button";
import { useNavigate } from "react-router-dom";

type Tstatus = "견적요청" | "견적완료";

export default function EstimateDetailPage() {
  const navigate = useNavigate();
  // const status: Tstatus = "견적요청";
  const status: Tstatus = "견적완료";
  const data = {
    name: "홍길동",
    date: "2023.05.05",
  };

  const contentData = {
    goal: { title: "프로젝트 목표", value: "신규 웹사이트 디자인" },
    style: { title: "디자인 스타일", value: "심플/미니멀리즘" },
    theme: { title: "주요 색상 및 테마", value: "블루 / 깔끔한 스타일" },
    moreInfo: { title: "추가정보", value: null },
    url: { title: "참고 사이트", value: "example@url.co.kr" },
  };

  function handleNavigateBack() {
    navigate("/myPage/estimate");
  }

  return (
    <DetailContainer title="받은 견적">
      <div css={content_container}>
        <p css={title_css}>
          <span css={status_css(status)}>{status}</span>
          &nbsp;견적서 요청 분야 노출
        </p>
        <span css={border}></span>
        <div css={name_date_container}>
          <p>{data.name}</p>
          <span css={border_vertical}></span>
          <p>{data.date}</p>
        </div>
        <span css={border}></span>
        {Object.values(contentData).map((item, idx) => (
          <div css={item_container} key={idx}>
            <p css={item_title}>{item.title}</p>
            {item.value && <p css={item_desc}>{item.value}</p>}
          </div>
        ))}
      </div>
      {status === "견적완료" && (
        <>
          <span css={border_dark}></span>
          <div css={name_date_container}>
            <p>{data.name}</p>
            <span css={border_vertical}></span>
            <p>{data.date}</p>
          </div>
          <div css={estimate_container}></div>
        </>
      )}
      <div css={button_container}>
        <Button size="L" bg="gray" text="목록" onClick={handleNavigateBack} />
      </div>
    </DetailContainer>
  );
}

const content_container = css`
  width: 100%;
  min-height: 400px;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 23px;
  align-self: stretch;
`;

const button_container = css`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const title_css = css`
  color: #383838;
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const status_css = (status: Tstatus) => css`
  color: ${status === "견적요청" ? "#119CD4" : "#A9AAB8"};
`;

const border = css`
  width: 100%;
  height: 1px;
  background: #ececec;
`;

const border_dark = css`
  width: 100%;
  height: 1px;
  background: #383838;
`;

const border_vertical = css`
  width: 1px;
  height: 100%;
  background: #ececec;
`;

const name_date_container = css`
  display: flex;
  align-items: center;
  gap: 14px;
  align-self: stretch;

  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const item_container = css``;

const item_title = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 25.5px */
`;

const item_desc = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const estimate_container = css`
  display: flex;
  height: 200px;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;

  border-radius: 10px;
  border: 1px solid var(--ECECEC, #ececec);
  background: var(--FFF, #fff);
`;
