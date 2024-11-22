import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import { IgeneratedText } from "@components/service/modal/FullPageModalEditable";
import Cart from "@components/template/mypage/Cart";
import Loading from "@components/common/ui/Loading/loading";

export default function ShoppingMallCart() {
  const [generatedTextData, setGeneratedTextData] = useState<
    IgeneratedText[] | null
  >(null);
  const feature = "장바구니";
  const [generatedText, setGeneratedText] = useState<IgeneratedText | null>(
    null
  );

  useEffect(() => {
    const localData = localStorage.getItem("generatedTextData");
    if (localData) {
      const parsedData = JSON.parse(localData);
      setGeneratedTextData(parsedData);
    }
  }, []);

  function getGeneratedText(
    generatedTextData: IgeneratedText[]
  ): IgeneratedText | undefined {
    const data = generatedTextData.find((item) => item.feature === feature);
    return data;
  }

  useEffect(() => {
    if (generatedTextData && generatedTextData.length > 0 && !generatedText) {
      const data = getGeneratedText(generatedTextData);
      if (data) {
        setGeneratedText(data);
      }
    }
  }, [generatedTextData]);

  if (!generatedText) {
    return <Loading />;
  }

  return (
    <div className="templateImage">
      <Header />
      <Cart data={generatedText.content.content} />
      <Footer />
    </div>
  );
}
