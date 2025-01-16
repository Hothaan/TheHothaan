/** @jsxImportSource @emotion/react */
import { css, CSSObject } from "@emotion/react";
import CompanyNavPageContainer from "@components/common/ui/Container/CompanyNavPageContainer";
import { renderWithKeys } from "@hooks/renderWidthKeys";

export default function PrivacyPolicyPage() {
  const data = [
    {
      title: `제1조 목적`,
      desc: [
        `회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.`,
      ],
      sub: [
        {
          title: `1. 홈페이지 회원 가입 및 관리`,
          desc: `회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별․인증, 회원자격 유지․관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정 이용 방지, 만 14세 미만 아동의 개인정보처리 시 법정대리인의 동의 여부 확인, 각종 고지․통지, 고충 처리 등을 목적으로 개인정보를 처리합니다.`,
        },
        {
          title: `2. 재화 또는 서비스 제공`,
          desc: `물품 배송, 서비스 제공, 계약서 및 청구서 발송, 콘텐츠 제공, 맞춤서비스 제공, 본인인증, 연령인증, 요금 결제 및 정산, 채권추심 등을 목적으로 개인정보를 처리합니다.`,
        },
        {
          title: `3. 고충 처리`,
          desc: `민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락․통지, 처리 결과 통보 등의 목적으로 개인정보를 처리합니다.`,
        },
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
    <CompanyNavPageContainer maxWidth={1200} title="개인정보처리방침">
      <div css={content_container}>
        {data.map((item, idx) => (
          <div key={idx} css={content_inner_container}>
            <div css={item_container}>
              <p css={title_css}>{item.title}</p>
              <p css={desc_css}>{renderWithKeys(item.desc, `desc-${idx}`)}</p>
            </div>
            {item.sub &&
              item.sub.map((item, idx) => (
                <div key={idx}>
                  <p css={sub_title_css}>{item.title}</p>
                  <p css={sub_desc_css}>{item.desc}</p>
                </div>
              ))}
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

const content_inner_container = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: start;
  gap: 14px;
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

const sub_title_css = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: 200%; /* 22.1px */
`;

const desc_css = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const sub_desc_css = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
`;
