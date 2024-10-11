import { Link } from "react-router-dom";
import Header from "@components/service/common/Header";
import TestButton from "@components/service/common/Button";

export default function MainPage() {
  return (
    <>
      <Link to="/test">api 테스트하기</Link>
    </>
  );
}
