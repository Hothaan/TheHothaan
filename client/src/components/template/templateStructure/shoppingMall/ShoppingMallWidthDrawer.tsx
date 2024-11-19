import { useState, useEffect } from "react";
import Header from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import { IgeneratedText } from "@components/service/modal/FullPageModalEditable";
import WithDrawer from "@components/template/mypage/WithDrawer";

export default function ShoppingMallWidthDrawer() {
  const localData = localStorage.getItem("generatedTextData");
  const generatedTextData = localData ? JSON.parse(localData) : null;
  const feature = "회원탈퇴";
  const [generatedText, setGeneratedText] = useState<IgeneratedText | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (generatedTextData) {
      setLoading(false);
    }
  }, [generatedTextData]);

  function getGeneratedText(
    generatedTextData: IgeneratedText[]
  ): IgeneratedText | undefined {
    const data = generatedTextData.find((item) => item.feature === feature);
    return data;
  }

  useEffect(() => {
    if (generatedTextData && generatedTextData.length > 0) {
      const data = getGeneratedText(generatedTextData);
      if (data) {
        setGeneratedText(data);
      }
    }
  }, [generatedTextData]);

  if (loading || !generatedText) {
    return <div>Loading...</div>;
  }

  return (
    <div className="templateImage">
      <Header />
      <WithDrawer />
      <Footer />
    </div>
  );
}
