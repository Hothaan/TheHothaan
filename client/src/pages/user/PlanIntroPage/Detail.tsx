/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
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

  const td_text = (isBold: boolean) => css`
    color: var(--383838, #383838);
    font-family: Pretendard;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
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
          <td css={td("100%")}>
            <p css={td_text(true)}>프로젝트</p>
          </td>
          <td css={td("230px")}></td>
          <td css={td("230px")}></td>
          <td css={td("230px")}></td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false)}>편집 프로젝트</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false)}>1개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false)}>10개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(true)}>무제한</p>
          </td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false)}>프로젝트 당 보드</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false)}>2개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(false)}>20개</p>
          </td>
          <td css={td("230px")}>
            <p css={td_text(true)}>무제한</p>
          </td>
        </tr>
        <tr>
          <td css={td("100%")}>
            <p css={td_text(false)}>기본 자동 생성 기능</p>
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
          <td>데이터 분석 기능</td>
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
          <td>맞춤형 분석 기능</td>
          <td>
            <UnChecked />
          </td>
          <td>
            <Checked />
          </td>
          <td>
            <Checked />
          </td>
        </tr>
        <tr>
          <td>더핫한 플러그인</td>
          <td>
            <UnChecked />
          </td>
          <td>
            <Checked />
          </td>
          <td>
            <Checked />
          </td>
        </tr>
        <tr>
          <td>템플릿 제공 유형</td>
          <td>기본 템플릿</td>
          <td>고급형</td>
          <td>고급형</td>
        </tr>
        <tr>
          <td>템플릿 개수</td>
          <td>20개</td>
          <td>00개</td>
          <td>무제한</td>
        </tr>
        <tr>
          <td>Figma 변환</td>
          <td>
            <UnChecked />
          </td>
          <td>
            <Checked />
          </td>
          <td>
            <Checked />
          </td>
        </tr>
        <tr>
          <td>Chat GPT 연동</td>
          <td>
            <UnChecked />
          </td>
          <td>
            <Checked />
          </td>
          <td>
            <Checked />
          </td>
        </tr>
        <tr>
          <td>기타</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>편집 프로젝트</td>
          <td>1개</td>
          <td>10개</td>
          <td>무제한</td>
        </tr>
        <tr>
          <td>프로젝트 당 보드</td>
          <td>2개</td>
          <td>20개</td>
          <td>무제한</td>
        </tr>
        <tr>
          <td>기타</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>편집 프로젝트</td>
          <td>1개</td>
          <td>10개</td>
          <td>무제한</td>
        </tr>
        <tr>
          <td>프로젝트 당 보드</td>
          <td>2개</td>
          <td>20개</td>
          <td>무제한</td>
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
      </div>
    </ResponsiveContainer>
  );
}

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
