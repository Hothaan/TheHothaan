import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import { IgeneratedText } from "@components/service/modal/FullPageModalEditable";
import WithDrawer from "@components/template/mypage/WithDrawer";
import Loading from "@components/common/ui/Loading/loading";

export default function ShoppingMallWidthDrawer() {
  const [generatedTextData, setGeneratedTextData] = useState<
    IgeneratedText[] | null
  >(null);
  const feature = "회원탈퇴";
  const [generatedText, setGeneratedText] = useState<IgeneratedText | null>(
    null
  );

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
      <WithDrawer />
      <Footer />
    </div>
  );
}
