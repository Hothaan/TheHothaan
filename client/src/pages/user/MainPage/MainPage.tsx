/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import MainBanner from "./MainBanner";
import ServiceIntro1 from "./ServiceIntro1";
import ServiceIntro2 from "./ServiceIntro2";
import ServiceIntro3 from "./ServiceIntro3";
import ServiceIntro4 from "./ServiceIntro4";

function DevelopeLink() {
  return (
    <ul>
      <li>update check (10.25)</li>
      <li>
        <Link to="/test">api 테스트하기</Link>
      </li>
      <li>
        <Link to="/componentGuide">컴포넌트 가이드 보기</Link>
      </li>
      <li>
        <Link to="/templateComponentGuide">템플릿 컴포넌트 가이드 보기</Link>
      </li>
    </ul>
  );
}

export default function MainPage() {
  return (
    <>
      {/* <DevelopeLink /> */}
      <MainBanner />
      <ServiceIntro1 />
      <ServiceIntro2 />
      <ServiceIntro3 />
      <ServiceIntro4 />
    </>
  );
}
