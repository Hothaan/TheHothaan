import TestCom from "@components/TestCom";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [message, setMessage] = useState("");
  const [wellcome, setWellcome] = useState("");

  useEffect(() => {
    fetch("/api/message")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data:", error));

    fetch("/api/wellcome")
      .then((response) => response.json())
      .then((data) => setWellcome(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(message);

  return (
    <>
      <h1>{message}</h1>
      <h1>{wellcome}</h1>
      <TestCom />
    </>
  );
}
