/** @jsxImportSource @emotion/react */
import { makeComponentText } from "@api/test";
import { useEffect, useState } from "react";

interface Istructure {
  title: string;
  navigation: string[];
}

const structure = `{ title: string; navigation: string[]; }`;

export default function Header() {
  const [data, setData] = useState<Istructure | null>(null);
  useEffect(() => {
    const fetchData = async () => {
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
    };

    if (!data) {
      fetchData();
    }
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { title, navigation } = data;

  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <ul>
          {navigation.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
