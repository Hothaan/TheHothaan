import { useEffect, useState } from "react";
import Header from "@components/service/common/Header";
import MyButton from "@components/service/common/Button";
import { makeComponentText } from "@api/test";
import { Istructure, structure } from "@components/service/common/Header";

export default function MainPage() {
  const [data, setData] = useState<Istructure | null>(null);

  async function fetchData() {
    if (!data) {
      try {
        const response = await makeComponentText({
          character: "shoppingMall",
          isCommon: true,
          role: "header",
          structure: structure,
        });
        setData(response);
      } catch (error) {
        console.error("API 요청 실패:", error);
      }
    } else {
      alert("already fetched");
    }
  }

  const testButton = {
    color: "text",
    padding: "8px 16px",
    size: "18px",
    borderRadius: "8px",
    onClick: () => {
      fetchData();
    },
  };

  return (
    <>
      <p>click button for api test</p>
      <hr />
      <Header title={data?.title} navigation={data?.navigation} />
      <hr />
      <MyButton css={testButton}>test button</MyButton>
    </>
  );
}
