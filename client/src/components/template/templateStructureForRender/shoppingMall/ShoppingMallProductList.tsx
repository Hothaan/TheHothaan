import { useState, useEffect } from "react";
import Header from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import { IgeneratedText } from "@components/service/modal/FullPageModalEditable";
import ProductList from "@components/template/product/ProductList";
import Loading from "@components/common/ui/Loading/loading";

export default function ShoppingMallProductList() {
  // const { data } = useParams();
  // const decodedData = data ? JSON.parse(decodeURIComponent(data)) : null;
  const feature = "상품목록";
  const [generatedTextData, setGeneratedTextData] = useState<
    IgeneratedText[] | null
  >(null);
  const [generatedText, setGeneratedText] = useState<IgeneratedText | null>(
    null
  );
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      }
    }
  }, [generatedTextData]);

  if (!generatedText) {
    return <Loading />;
  }

  console.log(generatedText.content.content.categories);

  return (
    <div className="templateImage">
      <Header />
      {generatedText.content.content.categories &&
      generatedText.content.content.categories.length > 0 ? (
        <ProductList categories={generatedText.content.content.categories} />
      ) : (
        <ProductList />
      )}
      <Footer />
    </div>
  );
}
