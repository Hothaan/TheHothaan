import React, { useState } from "react";
import TitleSection from "../TitleSection";
import Tab from "../Tab";

const title_ = "FAQ";

export default function FaqPage() {
  return (
    <>
      <TitleSection title={title_} />
      <Tab />
    </>
  );
}
