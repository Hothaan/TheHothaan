import { useEffect, useState } from "react";
import MyButton from "@components/service/common/Button";

export default function MainPage() {
  return (
    <>
      <p>hello world</p>
      <MyButton css={testButton}>test button</MyButton>
    </>
  );
}

const testButton = {
  color: "text",
  padding: "8px 16px",
  size: "18px",
  borderRadius: "8px",
  onClick: () => console.log("Button clicked!"),
};
