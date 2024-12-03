import React, { useState } from "react";
import TitleSection from "../TitleSection";
import Tab from "../Tab";

const title_ = "공지사항";

export default function NoticePage() {
  return (
    <>
      <TitleSection title={title_} />
      <Tab />
    </>
  );
}
