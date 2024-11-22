/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ReactComponent as Image } from "@svgs/template/imageTemplate.svg";
import { ReactComponent as GotoBottom } from "@svgs/template/footerGotoBottom.svg";

export interface Ifooter {
  logo?: string;
}
export default function Footer(prop: Ifooter) {
  const { logo } = prop;
  return (
    <div css={wrap}>
      <div css={[text_wrap, margin_right_62]}>
        <div css={[text_container, gap_16]}>
          <div css={logo_wrap}>
            <div css={logo_container}>
              <Image css={logo_style} />
            </div>
            <p css={logo_text}>{logo || "logo"}</p>
          </div>
          <div css={captions}>
            <p css={[caption, noto_sans_kr]}>
              회사명 : {logo || "회사명입니다"}
            </p>
            <p css={[caption, noto_sans_kr]}>대표자 : 홍길동</p>
            <p css={[caption, noto_sans_kr]}>
              주소 : 서울특별시 강남구 000번길 00 00타워
            </p>
            <p css={[caption, noto_sans_kr]}>사업자등록번호 : 123-45-678910</p>
            <p css={[caption, noto_sans_kr]}>
              통신판매업신고번호 : 제1234-성남분당C-5678호
            </p>
            <p css={[caption, noto_sans_kr]}>개인정보보호책임자 : 홍길동</p>
          </div>
          <div css={caption_width_bar}>
            <p css={[caption, noto_sans_kr, line_height_100]}>
              이메일 : example<span css={montserrat}>@</span>example.com
            </p>
            <span css={divider}></span>
            <p css={[caption, noto_sans_kr]}>
              서비스센터 : <span css={montserrat}>0000-0000</span>
            </p>
          </div>
          <p css={[caption, montserrat]}>© 2024 회사명 ALL RIGHT RESERVED.</p>
        </div>
      </div>
      <div css={[text_container, gap_20, margin_right_202]}>
        <p css={[title, montserrat, font_14]}>CUSTOMER CENTER</p>
        <p css={[text_big, montserrat]}>000-0000-0000</p>
      </div>
      <div css={[text_container, gap_20, margin_right_119]}>
        <p css={[title, montserrat, font_14]}>BANK INFO</p>
        <p css={[text_big, montserrat]}>국민 123-45789-101123</p>
        <p css={[title, montserrat, font_15]}>홍길동</p>
      </div>
      <div css={[text_container, gap_20, margin_right_247]}>
        <p css={[title, montserrat, font_14]}>USE GUIDE</p>
        <p css={[title, montserrat, font_14]}>개인정보처리방침</p>
        <p css={[title, montserrat, font_14]}>이용약관</p>
      </div>
      <GotoBottom />
    </div>
  );
}

const wrap = css`
  display: flex;
  width: 100%;
  max-width: 1920px;
  min-width: 1000px;
  background-color: #9cb0c9;
  padding: 55px 72px 75px 89px;
  @media (max-width: 1919px) {
    justify-content: space-between;
  }
  @media (max-width: 1200px) {
    padding: 55px 70px 75px;
  }
`;

const font_14 = css`
  font-size: 14px;
`;

const font_15 = css`
  font-size: 15px;
`;

const title = css`
  color: #fff;
  font-style: normal;
  font-weight: 500;
  white-space: nowrap;
`;

const text_big = css`
  color: #fff;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  @media (max-width: 1600px) {
    font-size: 24px;
  }
  @media (max-width: 1400px) {
    font-size: 20px;
  }
  @media (max-width: 1200px) {
    font-size: 16px;
  }
`;

const text_wrap = css`
  display: flex;
  align-items: start;
`;

const text_container = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const gap_16 = css`
  gap: 16px;
`;

const gap_20 = css`
  gap: 20px;
`;

const logo_wrap = css`
  display: flex;
  gap: 7.5px;
  align-items: center;
`;

const logo_container = css`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 27.74px;
  height: 27.74px;

  border-radius: 50%;
  background-color: #e2e8ef;
`;

const logo_style = css`
  width: 14px;
  height: 14px;
`;

const logo_text = css`
  color: #fff;
  font-family: Inter;
  font-size: 20.805px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-transform: uppercase;
`;

const captions = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const caption = css`
  color: #fff;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;

  white-space: nowrap;
`;

const noto_sans_kr = css`
  font-family: "Noto Sans KR";
  line-height: normal;
`;

const line_height_100 = css`
  line-height: 100%;
`;

const montserrat = css`
  font-family: "Montserrat";
  line-height: 100%;
  white-space: nowrap;
`;

const caption_width_bar = css`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 1400px) {
    flex-direction: column;
    align-items: start;
  }
`;

const divider = css`
  width: 1px;
  height: 14px;
  background-color: #fff;
  @media (max-width: 1600px) {
    display: none;
  }
`;

const margin_right_62 = css`
  margin-right: 62px;
  @media (max-width: 1919px) {
    margin-right: 0;
  }
`;

const margin_right_202 = css`
  margin-right: 202px;
  @media (max-width: 1919px) {
    margin-right: 0;
  }
`;

const margin_right_119 = css`
  margin-right: 119px;
  @media (max-width: 1919px) {
    margin-right: 0;
  }
`;

const margin_right_247 = css`
  margin-right: 247px;
  @media (max-width: 1919px) {
    margin-right: 0;
  }
`;
