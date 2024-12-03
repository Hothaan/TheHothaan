import React, { useState } from "react";
import TitleSection from "../TitleSection";
import Tab from "../Tab";

const title_ = "매뉴얼";

export default function ManualPage() {
  return (
    <>
      <TitleSection title={title_} />
      <Tab />
    </>
  );
}
