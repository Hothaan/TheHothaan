import TestCom from "@components/TestCom";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/message")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <h1>{message}</h1>
      <TestCom />
    </>
  );
}
