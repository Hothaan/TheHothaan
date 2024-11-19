import { useState, useEffect } from "react";
import Header from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import { IgeneratedText } from "@components/service/modal/FullPageModalEditable";
import Cart from "@components/template/mypage/Cart";

export default function ShoppingMallCart() {
  const localData = localStorage.getItem("generatedTextData");
  const generatedTextData = localData ? JSON.parse(localData) : null;
  const feature = "장바구니";
  const [generatedText, setGeneratedText] = useState<IgeneratedText | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(generatedTextData);
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
      <Cart />
      <Footer />
    </div>
  );
}
