/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import { Link } from "react-router-dom";

export default function MyProjectEdit() {
  const data = {
    title: "쇼핑몰 기획안 프로젝트명입니다",
    registerDate: "YYYY.MM.DD",
    lastEditDate: "YYYY.MM.DD",
    downloadPeriod: "YYYY.MM.DD ~ YYYY.MM.DD",
    editStatus: true,
    service: "커머스",
    function: ["커머스", "지도", "일반 콘텐츠", "검색"],
    device: "웹(pc)",
    rf: "rfrul.con",
    desc: "작성한 홈페이지 설명 노출",
  };
  return (
    <div css={container}>
      <Link to="/myPage/myProject" css={go_to_prev_button}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M15 16.5L10.707 12.207L15 7.914L13.586 6.5L7.879 12.207L13.586 17.914L15 16.5Z"
            fill="#747474"
          />
        </svg>
        <p>내 작업</p>
      </Link>
      <div css={project_container}>
        <p css={project_title_css}>{data.title}</p>
        <span css={border}></span>
        <div css={item_container}>
          <p css={item_title_css}>등록일</p>
          <p css={item_desc_css}>{data.registerDate}</p>
        </div>
        <div css={item_container}>
          <p css={item_title_css}>최종수정일</p>
          <p css={item_desc_css}>{data.lastEditDate}</p>
        </div>
        <div css={item_container}>
          <p css={item_title_css}>다운로드 기간</p>
          <p css={item_desc_css}>{data.downloadPeriod}</p>
        </div>
        <div css={item_container}>
          <p css={item_title_css}>작업상태</p>
          <p css={item_edit_status_css(data.editStatus)}>
            {data.editStatus ? "편집가능" : "기간만료"}
          </p>
        </div>
        <div css={item_container}>
          <p css={item_title_css}>서비스분야</p>
          <div css={item_tag_container}>
            <p css={item_tag_css}>{data.service}</p>
          </div>
        </div>
        <div css={item_container}>
          <p css={item_title_css}>기능</p>
          <div css={item_tag_container}>
            {data.function &&
              data.function.length > 0 &&
              data.function.map((item, idx) => (
                <p css={item_tag_css} key={idx}>
                  {item}
                </p>
              ))}
          </div>
        </div>
        <div css={item_container}>
          <p css={item_title_css}>디바이스</p>
          <p css={item_desc_css}>{data.device}</p>
        </div>
        <div css={item_container}>
          <p css={item_title_css}>홈페이지 RF</p>
          <p css={item_desc_css}>{data.rf}</p>
        </div>
        <div css={item_container}>
          <p css={item_title_css}>홈페이지 설명</p>
          <p css={item_desc_css}>{data.desc}</p>
        </div>
      </div>
      <div css={button_container}>
        <button type="button" css={button("dark")}>
          편집하기
        </button>
        <button type="button" css={button("light")}>
          다운로드
        </button>
      </div>
      <div css={image_container}></div>
    </div>
  );
}

const container = css`
  display: flex;
  width: 100%;
  padding: 50px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`;

const go_to_prev_button = css`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: stretch;

  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const project_container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

const button_container = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const image_container = css`
  width: 100%;
  height: 500px;

  border-radius: 20px;
  border: 1px solid var(--DEDEDE, #dedede);
  background: var(--ECECEC, #ececec);
`;

const project_title_css = css`
  display: flex;
  height: 50px;
  align-items: center;
  align-self: stretch;

  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const border = css`
  width: 100%;
  height: 1px;
  background: #ececec;
`;

const item_container = css`
  display: flex;
  height: 50px;
  align-items: center;
  align-self: stretch;
`;

const item_title_css = css`
  width: 120px;

  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const item_desc_css = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const item_edit_status_css = (status: boolean) => css`
  color: ${status ? "#119CD4" : "#383838"};
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const item_tag_container = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const item_tag_css = css`
  display: flex;
  width: 100px;
  padding: 7px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 6px;
  border: 1px solid var(--DEDEDE, #dedede);
  background: var(--FFF, #fff);
`;

const button = (color: "dark" | "light") => css`
  display: flex;
  width: 190px;
  height: 50px;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 10px;
  background: ${color === "dark" ? "#383838" : "#fff"};
  border: ${color === "dark" ? "0" : "1px"} solid var(--747474, #747474);

  color: ${color === "dark" ? "#fff" : "#383838"};
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
