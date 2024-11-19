import { useState, useEffect } from "react";
import Header from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import Mainbanner from "@components/template/main/Mainbanner";
import ProductListMain from "@components/template/main/ProductListMain";
import Review from "@components/template/product/Review";
import ServiceIntroduction from "@components/template/service/ServiceIntroduction";
import ServiceContact from "@components/template/service/ServiceContact";
import { IgeneratedText } from "@components/service/modal/FullPageModalEditable";

export default function ShoppingMallMain() {
  const localData = localStorage.getItem("generatedTextData");
  const generatedTextData = localData ? JSON.parse(localData) : null;
  const feature = "메인";
  const [generatedText, setGeneratedText] = useState<IgeneratedText | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // console.log(localData);
  // 대체 여기의 어느부분에서 계속 업데이트가 일어나는걸까

  // 그리고 캡쳐는 왜 또 안될까,...^^ 왜 렌더링 인식을 못하니
  // 파라미터가 띄어쓰기 되어있으면 인식을 못하나?

  function getGeneratedText(
    generatedTextData: IgeneratedText[]
  ): IgeneratedText | undefined {
    const data = generatedTextData.find((item) => item.feature === feature);
    return data;
  }

  useEffect(() => {
    if (generatedTextData && generatedTextData.length > 0) {
      setLoading(false);
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
      <Mainbanner
        isEditable={true}
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
