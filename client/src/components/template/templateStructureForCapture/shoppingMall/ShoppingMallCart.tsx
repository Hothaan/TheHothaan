import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header, { Iheader } from "@components/template/common/header/Header";
import Footer from "@components/template/common/footer/Footer";
import { IgeneratedText } from "@pages/user/ServicePage/ServiceStep3Page";
import Cart from "@components/template/mypage/Cart";
import { ItemplateMode } from "@components/template/types";
import Loading from "@components/common/ui/Loading/loading";

export default function ShoppingMallCart(prop: ItemplateMode) {
  const { templateMode } = prop;

  /* capture */
  const { data, header } = useParams();
  const decodedData = data ? JSON.parse(decodeURIComponent(data)) : null;
  const decodedHeader = header ? JSON.parse(decodeURIComponent(header)) : null;

  /* render */
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

  const [headerData, setHeaderData] = useState<Iheader | null>(null);

  useEffect(() => {
    const localData = localStorage.getItem("headerData");
    if (localData) {
      const parsedData = JSON.parse(localData);
      setHeaderData(parsedData);
    }
  }, []);

  /* capture */
  if (templateMode === "capture") {
    if (!decodedData || !decodedHeader) {
      return <Loading />;
    }

    return (
      <div className="templateImage">
        <Header
          categories={decodedHeader.categories}
          logo={decodedHeader.logo}
        />
        <Cart data={decodedData} />
        <Footer logo={decodedHeader.logo} />
      </div>
    );
  } else {
    /* render */
    if (!generatedText || !headerData) {
      return <Loading />;
    }

    return (
      <div className="templateImage">
        <Header categories={headerData.categories} logo={headerData.logo} />
        <Cart data={generatedText.content} />
        <Footer logo={headerData.logo} />
      </div>
    );
  }
}
