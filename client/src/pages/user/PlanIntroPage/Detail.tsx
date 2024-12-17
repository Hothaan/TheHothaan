/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import ResponsiveContainer from "@components/common/ui/Container/ResponsiveContainer";
import { ReactComponent as Checked } from "@svgs/planIntro/checked.svg";
import { ReactComponent as UnChecked } from "@svgs/planIntro/unChecked.svg";

function Table() {
  const table = css`
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  `;

  const th = (width: string) => css`
    width: ${width};
    padding: 20px 0;
    border-bottom: 2px solid var(--383838, #383838);
  `;

  const th_text = css`
    color: var(--383838, #383838);
    text-align: center;
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `;

  const td = (width: string) => css`
    width: ${width};
    padding: 20px 0;
    border-bottom: 1px solid var(--DEDEDE, #dedede);
  `;

  const td_text = (isBold: boolean, isCenter: boolean) => css`
    color: var(--383838, #383838);
    text-align: ${isCenter ? "center" : "left"};
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: ${isBold ? 700 : 400};
    line-height: normal;
  `;

  const padding_top_20px = css`
    padding-top: 40px;
  `;

  return (
    <table css={table}>
      <thead>
        <tr>
          <th css={th("100%")}></th>
          <th css={th("230px")}>
            <p css={th_text}>free</p>
          </th>
          <th css={th("230px")}>
            <p css={th_text}>basic</p>
          </th>
          <th css={th("230px")}>
            <p css={th_text}>pro</p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td css={[td("100%"), padding_top_20px]}>
            <p css={td_text(true, false)}>프로젝트</p>
          </td>
          <td css={[td("230px"), padding_top_20px]}></td>
          <td css={[td("230px"), padding_top_20px]}></td>
          <td css={[td("230px"), padding_top_20px]}></td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false, false)}>편집 프로젝트</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>1개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>10개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(true, true)}>무제한</p>
          </td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false, false)}>프로젝트 당 보드</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>2개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>20개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(true, true)}>무제한</p>
          </td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false, false)}>기본 자동 생성 기능</p>
          </td>
          <td css={td("230px")}>
            <Checked />
          </td>
          <td css={td("230px")}>
            <Checked />
          </td>
          <td css={td("230px")}>
            <Checked />
          </td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false, false)}>데이터 분석 기능</p>
          </td>
          <td css={td("230px")}>
            <Checked />
          </td>
          <td css={td("230px")}>
            <Checked />
          </td>
          <td css={td("230px")}>
            <Checked />
          </td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false, false)}>맞춤형 분석 기능</p>
          </td>
          <td css={td("230px")}>
            <UnChecked />
          </td>
          <td css={td("230px")}>
            <Checked />
          </td>
          <td css={td("230px")}>
            <Checked />
          </td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false, false)}>더핫한 플러그인</p>
          </td>
          <td css={td("230px")}>
            <UnChecked />
          </td>
          <td css={td("230px")}>
            <Checked />
          </td>
          <td css={td("230px")}>
            <Checked />
          </td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false, false)}>템플릿 제공 유형</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>기본 템플릿</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>고급형</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>고급형</p>
          </td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false, false)}>템플릿 개수</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>20개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>00개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>무제한</p>
          </td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false, false)}>Figma 변환</p>
          </td>
          <td css={td("230px")}>
            <UnChecked />
          </td>
          <td css={td("230px")}>
            <Checked />
          </td>
          <td css={td("230px")}>
            <Checked />
          </td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false, false)}>Chat GPT 연동</p>
          </td>
          <td css={td("230px")}>
            <UnChecked />
          </td>
          <td css={td("230px")}>
            <Checked />
          </td>
          <td css={td("230px")}>
            <Checked />
          </td>
        </tr>
        <tr>
          <td css={[td("100%"), padding_top_20px]}>
            <p css={td_text(true, false)}>기타</p>
          </td>
          <td css={[td("230px"), padding_top_20px]}></td>
          <td css={[td("230px"), padding_top_20px]}></td>
          <td css={[td("230px"), padding_top_20px]}></td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false, false)}>편집 프로젝트</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>1개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>10개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>무제한</p>
          </td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false, false)}>프로젝트 당 보드</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>2개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>20개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>무제한</p>
          </td>
        </tr>
        <tr>
          <td css={[td("100%"), padding_top_20px]}>
            <p css={td_text(true, false)}>기타</p>
          </td>
          <td css={[td("230px"), padding_top_20px]}></td>
          <td css={[td("230px"), padding_top_20px]}></td>
          <td css={[td("230px"), padding_top_20px]}></td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false, false)}>편집 프로젝트</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>1개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>10개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>무제한</p>
          </td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false, false)}>프로젝트 당 보드</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>2개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>20개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false, true)}>무제한</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default function Detail() {
  return (
    <ResponsiveContainer>
      <div css={container}>
        <div css={title_container}>
          <p css={title}>상세비교</p>
          <p css={desc}>업무 환경에 필요한 기능을 비교하고 선택하세요.</p>
        </div>
        <Table />
        <ul css={caption_container}>
          <li css={caption}>
            <span css={circle}></span>
            <p css={caption_text}>이용안내 설명글입니다.</p>
          </li>
          <li css={caption}>
            <span css={circle}></span>
            <p css={caption_text}>
              요금은 1인 기준이며 구성원 추가 시 즉시 과금됩니다. (세금 별도)
            </p>
          </li>
          <li css={caption}>
            <span css={circle}></span>
            <p css={caption_text}>
              요금제는 결제 완료 시점부터 이용이 시작되며, 사용일자별 정가 기준
              금액으로 환산하여 환불이 가능합니다.
            </p>
          </li>
        </ul>
      </div>
    </ResponsiveContainer>
  );
}

const caption_container = css`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
`;

const caption = css`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
`;

const circle = css`
  display: block;
  border-radius: 50%;
  width: 3px;
  height: 3px;
  background-color: #747474;
`;

const caption_text = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 25.5px */
`;

const container = css`
  width: 100%;
  padding-bottom: 100px;
  gap: 24px;
`;

const title_container = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const title = css`
  color: var(--383838, #383838);
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const desc = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
