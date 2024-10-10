/** @jsxImportSource @emotion/react */
import css from "@emotion/styled";

import { generateComponentText } from "@api/test";
import { useEffect, useState } from "react";

export default function Header() {
  const [data, setData] = useState<{ title: string; navigation: any } | null>(
    null
  );
  useEffect(() => {
    // generateComponentText({
    //   character: "common",
    //   role: "header",
    // });
    const fetchData = async () => {
      try {
        const response = await generateComponentText({
          character: "common",
          role: "header",
        });
        setData(response); // 받은 데이터를 state에 저장
      } catch (error) {
        console.error("API 요청 실패:", error);
      }
    };

    fetchData(); // 함수 호출
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  // data 객체를 구조분해 할당하여 사용
  const { title, navigation } = data;

  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}
