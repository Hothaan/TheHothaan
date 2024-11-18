import { useState, useEffect } from "react";
import Header from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import Mainbanner from "@components/template/main/Mainbanner";
import ProductListMain from "@components/template/main/ProductListMain";
import Review from "@components/template/product/Review";
import ServiceIntroduction from "@components/template/service/ServiceIntroduction";
import ServiceContact from "@components/template/service/ServiceContact";
import { IgeneratedText } from "@components/service/modal/FullPageModalEditable";
import { generatedTextDataStore } from "@store/generatedTextDataStore";

export default function ShoppingMallMain() {
  const { generatedTextData } = generatedTextDataStore();
  const feature = "메인";
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
    if (generatedTextData.length > 0) {
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
    <div>
      <Header />
      <Mainbanner
        title={generatedText?.content?.content?.title}
        desc={generatedText?.content?.content?.desc}
      />
      <ProductListMain option="main" />
      <Review />
      <ServiceIntroduction />
      <ProductListMain option="list" />
      <ServiceContact />
      <Footer />
    </div>
  );
}
/*
1.
구조를 feature 마다 미리 저장해두고
구조에 맞는 컴포넌트마다 text를 넘겨줘서 렌더링
*/
