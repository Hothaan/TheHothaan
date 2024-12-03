import React, { useState } from "react";
import TitleSection from "../TitleSection";
import Tab from "../Tab";

const title_ = "가이드";

export default function GuidePage() {
  return (
    <>
      <TitleSection title={title_} />
      <Tab />
    </>
  );
}
