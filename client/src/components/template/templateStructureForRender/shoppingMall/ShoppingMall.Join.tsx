import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import { IgeneratedText } from "@components/service/modal/FullPageModalEditable";
import Join from "@components/template/utility/Join";
import Loading from "@components/common/ui/Loading/loading";

export default function ShoppingMallJoin() {
  // const { data } = useParams();
  // const decodedData = data ? JSON.parse(decodeURIComponent(data)) : null;
  const [generatedTextData, setGeneratedTextData] = useState<
    IgeneratedText[] | null
  >(null);
  const feature = "회원가입";
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

  return (
    <div className="templateImage">
      <Header />
      <Join />
      <Footer />
    </div>
  );
}
