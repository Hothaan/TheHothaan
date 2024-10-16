import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <>
      <ul>
        <li>
          <Link to="/test">api 테스트하기</Link>
        </li>
        <li>
          <Link to="/componentGuide">컴포넌트 가이드 보기</Link>
        </li>
      </ul>
    </>
  );
}
