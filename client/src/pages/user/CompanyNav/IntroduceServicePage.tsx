/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import CompanyNavPageContainer from "@components/common/ui/Container/CompanyNavPageContainer";
import { renderWithKeys } from "@hooks/renderWidthKeys";

export default function IntroduceServicePage() {
  const data = [
    {
      title: `제1조 목적`,
      desc: [
        `본 이용약관은 “핫한”(이하 "사이트")의 서비스의 이용조건과 운영에 관한 제반 사항 규정을 목적으로 합니다.`,
      ],
    },
    {
      title: `제2조용어의 정의`,
      desc: [
        `본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다.`,
        <br />,
        `① 회원 : 사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서, 사이트와의 이용계약을 체결하고 사이트를 이용하는 이용자를 말합니다.`,
        <br />,
        `② 이용계약 : 사이트 이용과 관련하여 사이트와 회원간에 체결 하는 계약을 말합니다.`,
        <br />,
        `③ 회원 아이디(이하 "ID") : 회원의 식별과 회원의 서비스 이용을 위하여 회원별로 부여하는 고유한 문자와 숫자의 조합을 말합니다.`,
        <br />,
        `④ 비밀번호 : 회원이 부여받은 ID와 일치된 회원임을 확인하고 회원의 권익 보호를 위하여 회원이 선정한 문자와 숫자의 조합을 말합니다.`,
        <br />,
        `⑤ 운영자 : 서비스에 홈페이지를 개설하여 운영하는 운영자를 말합니다.`,
        <br />,
        `⑥ 해지 : 회원이 이용계약을 해약하는 것을 말합니다.`,
      ],
    },
    {
      title: `제1조 목적`,
      desc: [
        `본 이용약관은 “핫한”(이하 "사이트")의 서비스의 이용조건과 운영에 관한 제반 사항 규정을 목적으로 합니다.`,
      ],
    },
    {
      title: `제2조용어의 정의`,
      desc: [
        `본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다.`,
        <br />,
        `① 회원 : 사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서, 사이트와의 이용계약을 체결하고 사이트를 이용하는 이용자를 말합니다.`,
        <br />,
        `② 이용계약 : 사이트 이용과 관련하여 사이트와 회원간에 체결 하는 계약을 말합니다.`,
        <br />,
        `③ 회원 아이디(이하 "ID") : 회원의 식별과 회원의 서비스 이용을 위하여 회원별로 부여하는 고유한 문자와 숫자의 조합을 말합니다.`,
        <br />,
        `④ 비밀번호 : 회원이 부여받은 ID와 일치된 회원임을 확인하고 회원의 권익 보호를 위하여 회원이 선정한 문자와 숫자의 조합을 말합니다.`,
        <br />,
        `⑤ 운영자 : 서비스에 홈페이지를 개설하여 운영하는 운영자를 말합니다.`,
        <br />,
        `⑥ 해지 : 회원이 이용계약을 해약하는 것을 말합니다.`,
      ],
    },
    {
      title: `제1조 목적`,
      desc: [
        `본 이용약관은 “핫한”(이하 "사이트")의 서비스의 이용조건과 운영에 관한 제반 사항 규정을 목적으로 합니다.`,
      ],
    },
    {
      title: `제2조용어의 정의`,
      desc: [
        `본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다.`,
        <br />,
        `① 회원 : 사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서, 사이트와의 이용계약을 체결하고 사이트를 이용하는 이용자를 말합니다.`,
        <br />,
        `② 이용계약 : 사이트 이용과 관련하여 사이트와 회원간에 체결 하는 계약을 말합니다.`,
        <br />,
        `③ 회원 아이디(이하 "ID") : 회원의 식별과 회원의 서비스 이용을 위하여 회원별로 부여하는 고유한 문자와 숫자의 조합을 말합니다.`,
        <br />,
        `④ 비밀번호 : 회원이 부여받은 ID와 일치된 회원임을 확인하고 회원의 권익 보호를 위하여 회원이 선정한 문자와 숫자의 조합을 말합니다.`,
        <br />,
        `⑤ 운영자 : 서비스에 홈페이지를 개설하여 운영하는 운영자를 말합니다.`,
        <br />,
        `⑥ 해지 : 회원이 이용계약을 해약하는 것을 말합니다.`,
      ],
    },
    {
      title: `제1조 목적`,
      desc: [
        `본 이용약관은 “핫한”(이하 "사이트")의 서비스의 이용조건과 운영에 관한 제반 사항 규정을 목적으로 합니다.`,
      ],
    },
    {
      title: `제2조용어의 정의`,
      desc: [
        `본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다.`,
        <br />,
        `① 회원 : 사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한 자로서, 사이트와의 이용계약을 체결하고 사이트를 이용하는 이용자를 말합니다.`,
        <br />,
        `② 이용계약 : 사이트 이용과 관련하여 사이트와 회원간에 체결 하는 계약을 말합니다.`,
        <br />,
        `③ 회원 아이디(이하 "ID") : 회원의 식별과 회원의 서비스 이용을 위하여 회원별로 부여하는 고유한 문자와 숫자의 조합을 말합니다.`,
        <br />,
        `④ 비밀번호 : 회원이 부여받은 ID와 일치된 회원임을 확인하고 회원의 권익 보호를 위하여 회원이 선정한 문자와 숫자의 조합을 말합니다.`,
        <br />,
        `⑤ 운영자 : 서비스에 홈페이지를 개설하여 운영하는 운영자를 말합니다.`,
        <br />,
        `⑥ 해지 : 회원이 이용계약을 해약하는 것을 말합니다.`,
      ],
    },
  ];
  return (
    <CompanyNavPageContainer maxWidth={1200} title="회사소개">
      <div css={content_container}>
        {data.map((item, idx) => (
          <div key={idx} css={item_container}>
            <p css={title_css}>{item.title}</p>
            <p css={desc_css}>{renderWithKeys(item.desc, `desc-${idx}`)}</p>
          </div>
        ))}
      </div>
    </CompanyNavPageContainer>
  );
}

const content_container = css`
  display: flex;
  padding-bottom: 70px;
  width: 100%;
  flex-direction: column;
  align-items: start;
  gap: 30px;
`;

const item_container = css`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const title_css = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const desc_css = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
