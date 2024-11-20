import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import Mainbanner from "@components/template/main/Mainbanner";
import ProductListMain from "@components/template/main/ProductListMain";
import Review from "@components/template/product/Review";
import ServiceIntroduction from "@components/template/service/ServiceIntroduction";
import ServiceContact from "@components/template/service/ServiceContact";
import { IgeneratedText } from "@components/service/modal/FullPageModalEditable";

export default function ShoppingMallMain() {
  const { data } = useParams();
  const decodedData = data ? JSON.parse(decodeURIComponent(data)) : null;
  // const [generatedTextData, setGeneratedTextData] = useState<
  //   IgeneratedText[] | null
  // >(null);
  // const feature = "메인";
  // const [generatedText, setGeneratedText] = useState<IgeneratedText | null>(
  //   null
  // );
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const localData = localStorage.getItem("generatedTextData");
  //   if (localData) {
  //     const parsedData = JSON.parse(localData);
  //     setGeneratedTextData(parsedData);
  //   }
  // }, []);

  // function getGeneratedText(
  //   generatedTextData: IgeneratedText[]
  // ): IgeneratedText | undefined {
  //   const data = generatedTextData.find((item) => item.feature === feature);
  //   return data;
  // }

  // useEffect(() => {
  //   if (generatedTextData && generatedTextData.length > 0 && !generatedText) {
  //     const data = getGeneratedText(generatedTextData);
  //     if (data) {
  //       setGeneratedText(data);
  //       setLoading(false);
  //     }
  //   }
  // }, [decodedData]);

  if (!decodedData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="templateImage">
      <Header />
      <Mainbanner
        isEditable={true}
        title={decodedData?.title}
        desc={decodedData?.desc}
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
