/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { useEffect, useState } from "react";
import { TserviceDataKey } from "@data/serviceData";
import { makeComponentText } from "@api/test";
import { rolesData } from "@data/componentRolsData";
import { commonStructureData } from "@data/componentStructureData";
import { componentMap } from "@components/template/mapping";
import Loading from "@components/common/loading";
import {
  TDepth1KeyForService,
  TDepth2KeyForService,
  serviceData,
} from "@data/serviceData";

interface IapiRequest<T extends TserviceDataKey> {
  service: T;
  serviceTitle: string;
  serviceDesc: string;
  depth1: TDepth1KeyForService<T>;
  depth2: TDepth2KeyForService<T, TDepth1KeyForService<T>>;
}

const GeneratedComponent: React.FC<{ data: any; depth2: string }> = ({
  data,
  depth2,
}) => {
  const ComponentToRender = componentMap[depth2];

  return (
    <div>
      {ComponentToRender ? (
        <ComponentToRender {...data} />
      ) : (
        <div>make component file first! 🤔</div>
      )}
    </div>
  );
};

export default function TestPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [request, setRequest] = useState<IapiRequest<TserviceDataKey>>({
    service: "shoppingMall",
    serviceTitle: "",
    serviceDesc: "",
    depth1: "main",
    depth2: "main",
  });

  const handleCharacterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRequest({
      service: event.target.value as TserviceDataKey,
      serviceTitle: "",
      serviceDesc: "",
      depth1: "main",
      depth2: "main",
    });
  };

  const handleDepth1Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDepth1 = event.target.value;
  };

  const handleDepth2Change = <T extends TserviceDataKey>(
    event: React.ChangeEvent<HTMLSelectElement>,
    depth1: TDepth1KeyForService<T>
  ) => {
    const selectedDepth2 = event.target.value as TDepth2KeyForService<
      T,
      typeof depth1
    >;
  };

  const [byteLength, setByteLength] = useState<number>(0);
  const MAX_LENGTH = 300;

  const getByteLength = (text: string): number => {
    let byteLength = 0;
    for (let char of text) {
      byteLength += char.charCodeAt(0) > 127 ? 2 : 1;
    }
    return byteLength;
  };

  function handleDescChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const currentByteLength = getByteLength(event.target.value);
    if (currentByteLength <= MAX_LENGTH) {
      setRequest({
        ...request,
        serviceDesc: event.target.value,
      });
      setByteLength(currentByteLength);
    } else {
      setByteLength(MAX_LENGTH);
    }
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRequest({
      ...request,
      serviceTitle: event.target.value,
    });
  }

  const getDepth1Options = (service: TserviceDataKey) => {
    const depth1 = serviceData[service];
    return Object.entries(depth1).map(([key, value]) => (
      <option key={key} value={key}>
        {key}
      </option>
    ));
  };

  // const getDepth2Options = () => {
  //   return depth2.map((item) => (
  //     <option key={item} value={item}>
  //       {item}
  //     </option>
  //   ));
  // };

  const getCharacterOptions = () => {
    return Object.keys(rolesData)
      .filter((key) => key !== "common")
      .map((char) => (
        <option key={char} value={char}>
          {rolesData[char as keyof typeof rolesData].label}
        </option>
      ));
  };

  // async function fetchData() {
  //   if (!loading) {
  //     if (request === "") {
  //       alert("structure is empty!");
  //     } else {
  //       setLoading(true);
  //       setError(null);
  //       try {
  //         const response = await makeComponentText(request);
  //         setData(response);
  //       } catch (error) {
  //         console.error("API 요청 실패:", error);
  //         setError("API 요청에 실패했습니다.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   }
  // }
  return (
    <>
      <div css={pageWrap}>
        <div css={box}>
          <p css={title}>ready to request component text</p>
          <form css={form_container}>
            <div css={flex_row}>
              <div css={input_container}>
                <label htmlFor="title">service title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  onChange={handleTitleChange}
                />
              </div>
              <div css={input_container}>
                <label htmlFor="service">service</label>
                <select
                  name="service"
                  id="service"
                  value={request.service}
                  onChange={handleCharacterChange}
                >
                  {getCharacterOptions()}
                </select>
              </div>
              <div css={input_container}>
                <label htmlFor="depth1">1depth</label>
                <select
                  name="depth1"
                  id="depth1"
                  value={request.depth1}
                  onChange={handleDepth1Change}
                >
                  <option value="">Select 1depth</option>
                  {getDepth1Options(request.service)}
                </select>
              </div>
              <div css={input_container}>
                <label htmlFor="depth2">2depth</label>
                <select
                  name="depth2"
                  id="depth2"
                  value={request.depth2}
                  onChange={(e) => handleDepth2Change(e, request.depth1)} // request.depth1 전달
                >
                  <option value="">Select 2depth</option>
                  {/* {getDepth2Options()} */}
                </select>
              </div>
            </div>
            <div css={input_container}>
              <label htmlFor="character">service desc</label>
              <textarea
                name="desc"
                id="desc"
                maxLength={MAX_LENGTH}
                css={textarea}
                onChange={handleDescChange}
              ></textarea>
              <p css={char_count}>
                {byteLength} / {MAX_LENGTH}
              </p>
            </div>
          </form>
          <div css={code}>
            <pre>{JSON.stringify(request, null, 2)}</pre>
          </div>
        </div>
        <div css={container}>
          <div css={box}>
            <p css={title}>status</p>
            <p>
              {loading
                ? "💬⏳⏱️sending api request ...💬⏳⏱️"
                : error
                ? "😵💥⛔error!😵💥⛔"
                : data
                ? "❤️‍🔥☑️data fetched!☑️❤️‍🔥"
                : "🖱️🖱️🖱️click button to send api request🖱️🖱️🖱️"}
            </p>
          </div>
          <div css={box}>
            <p css={title}>action</p>
            <button
              css={action_button}
              // onClick={() => {
              //   fetchData();
              // }}
            >
              클릭
            </button>
          </div>
        </div>
        <div css={box}>
          <p css={title}>result</p>
          <div css={code}>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
          <div css={component}>
            {data ? (
              <GeneratedComponent data={data} depth2={request.depth2} />
            ) : (
              <div>generate some component! 🤔</div>
            )}
          </div>
        </div>
        <Loading />
      </div>
    </>
  );
}

const action_button = (theme: Theme) => css`
  padding: 8px 16px;
  border-radius: 10px;
  background-color: ${theme.colors.blue.light};
`;

const pageWrap = (theme: Theme) => css`
  width: 50%;
  height: 100%;
  min-height: 100vh;
  background-color: ${theme.colors.mono.gray1};
`;

const container = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
`;

const box = (theme: Theme) => css`
  width: 100%;
  box-sizing: border-box;
  padding: 24px;
  background-color: ${theme.colors.mono.gray2};
  border-bottom: 1px solid ${theme.colors.mono.gray4};
`;

const form_container = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  justify-content: space-between;
`;

const flex_row = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const input_container = css`
  position: relative;
  label {
    display: block;
    margin-bottom: 8px;
  }
`;

const textarea = css`
  width: 100%;
  height: 80px;
`;

const char_count = css`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 14px;
  color: #555;
  text-align: right;
`;

const code = (theme: Theme) => css`
  box-sizing: border-box;
  padding: 24px 16px;
  background-color: ${theme.colors.text};
  color: ${theme.colors.text.dark};
  overflow: scroll;
`;

const title = (theme: Theme) => css`
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
`;

const component = (theme: Theme) => css`
  box-sizing: border-box;
  padding: 24px 16px;
  background-color: ${theme.colors.mono.gray3};
`;
