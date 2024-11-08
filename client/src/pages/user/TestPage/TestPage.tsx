/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { useState } from "react";
import { TserviceDataKey } from "@data/service/serviceData";
import { makeComponentTextTest, makeComponentTextTestWithUrl } from "@api/test";
import { rolesData } from "@data/components/componentRolsData";
import { TDepth1KeyForService, serviceData } from "@data/service/serviceData";
import { TallDepth1Keys } from "@data/service/depth1/common";
import { T2depth, Tall2depthKeys } from "@data/service/depth2/common";
import { componentStructureData } from "@data/components/componentStructureData";
import GenerateComponent from "@components/template/generateComponent";

export interface IapiRequest<T extends TserviceDataKey> {
  service: T;
  serviceTitle: string;
  serviceDesc: string;
  depth1: TallDepth1Keys;
  depth2: Tall2depthKeys;
  component: string;
  structure: string;
}

export default function TestPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [request, setRequest] = useState<IapiRequest<TserviceDataKey>>({
    service: "shoppingMall",
    serviceTitle: "더핫한",
    serviceDesc: "기획안 생성 플랫폼",
    depth1: "main",
    depth2: "main",
    component: "mainBanner",
    structure: "{title: string; desc: string; }",
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
      component: "",
      structure: "",
    });
  };

  const handleDepth1Change = <T extends TserviceDataKey>(
    service: T,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDepth1 = event.target.value;

    const validDepth1Keys = Object.keys(serviceData[request.service]) as Array<
      TDepth1KeyForService<T>
    >;

    if (validDepth1Keys.includes(selectedDepth1 as TDepth1KeyForService<T>)) {
      const serviceDataEntry =
        serviceData[service][selectedDepth1 as TDepth1KeyForService<T>];

      if (typeof serviceDataEntry === "object" && serviceDataEntry !== null) {
        const validDepth2Keys = Object.keys(
          serviceDataEntry
        ) as Tall2depthKeys[];

        setRequest({
          ...request,
          depth1: selectedDepth1 as TallDepth1Keys,
          depth2: validDepth2Keys[0],
        });
      } else {
        console.error("Invalid serviceDataEntry for selected depth1.");
      }
    } else {
      console.error("Invalid depth1 value selected.");
    }
  };

  const handleDepth2Change = <T extends TserviceDataKey>(
    service: T,
    depth1: any,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDepth2 = event.target.value;
    const validDepth1Keys = Object.keys(serviceData[service]) as Array<
      TDepth1KeyForService<T>
    >;

    if (validDepth1Keys.includes(depth1 as TDepth1KeyForService<T>)) {
      setRequest({
        ...request,
        depth2: selectedDepth2 as Tall2depthKeys,
      });
    } else {
      console.error("Invalid depth1 value selected for service.");
    }
  };

  const handleComponentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRequest({
      ...request,
      component: event.target.value,
      structure: componentStructureData[event.target.value],
    });
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

  function hasSelectableDepth2<T>(
    obj: T
  ): obj is T & { selectableDepth2: { [key: string]: T2depth } } {
    return obj && typeof obj === "object" && "selectableDepth2" in obj;
  }

  const getDepth2Options = <T extends TserviceDataKey>(
    service: T,
    depth1: TDepth1KeyForService<T> | string
  ) => {
    const depth2 = serviceData[service][depth1 as TDepth1KeyForService<T>];

    if (hasSelectableDepth2(depth2)) {
      const selectable = depth2.selectableDepth2;
      return Object.entries(selectable).map(([key]) => (
        <option key={key} value={key}>
          {key}
        </option>
      ));
    }
    return null;
  };

  const getComponentOptions = <T extends TserviceDataKey>(
    service: T,
    depth1: TDepth1KeyForService<T> | string
  ) => {
    const depth2 = serviceData[service][depth1 as TDepth1KeyForService<T>];

    if (hasSelectableDepth2(depth2)) {
      const selectable = depth2.selectableDepth2;
      return Object.entries(selectable).map(([key]) => (
        <option key={key} value={key}>
          {key}
        </option>
      ));
    }
    return null;
  };

  const getCharacterOptions = () => {
    return Object.keys(rolesData)
      .filter((key) => key !== "common")
      .map((char) => (
        <option key={char} value={char}>
          {rolesData[char as keyof typeof rolesData].label}
        </option>
      ));
  };

  function handleEmptyRequestFields(
    request: IapiRequest<TserviceDataKey>
  ): boolean {
    const isAnyFieldEmpty = Object.values(request).some(
      (value) => value === ""
    );
    return isAnyFieldEmpty ? true : false;
  }

  function getIsProcduction(): boolean {
    if (window.location.host === "localhost:3000") {
      return false;
    } else if (window.location.host === "dolllpitoxic3.mycafe24.com") {
      return true;
    } else {
      return false;
    }
  }

  async function fetchData() {
    if (!loading) {
      if (handleEmptyRequestFields(request)) {
        alert("인풋을 제대로 안채웠거나, structure가 없습니다.");
      } else {
        setLoading(true);
        setError(null);
        try {
          const isProduction: boolean = getIsProcduction();
          // const response = await makeComponentTextTest(request);
          const response = await makeComponentTextTestWithUrl(
            request,
            isProduction
          );
          console.log(response);
          setData(response);
        } catch (error) {
          console.error("API 요청 실패:", error);
          setError("API 요청에 실패했습니다.");
        } finally {
          setLoading(false);
        }
      }
    }
  }

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
                  value={request.serviceTitle}
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
                  onChange={(e) => {
                    handleDepth1Change(request.service, e);
                  }}
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
                  onChange={(e) => {
                    handleDepth2Change(request.service, request.depth1, e);
                  }}
                >
                  <option value="">Select 2depth</option>
                  {getDepth2Options(request.service, request.depth1)}
                </select>
              </div>
              <div css={input_container}>
                <label htmlFor="component">component</label>
                <select
                  name="component"
                  id="component"
                  value={request.component}
                  onChange={handleComponentChange}
                >
                  {/* <option value="">Select component</option> */}
                  <option value={"mainBanner"}>mainBanner</option>
                </select>
              </div>
            </div>
            <div css={input_container}>
              <label htmlFor="desc">service desc</label>
              <textarea
                name="desc"
                id="desc"
                maxLength={MAX_LENGTH}
                css={textarea}
                value={request.serviceDesc}
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
              onClick={() => {
                fetchData();
              }}
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
        </div>
      </div>
      <div css={component}>
        {data ? (
          <GenerateComponent {...request} />
        ) : (
          <div>generate some component! 🤔</div>
        )}
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
  width: 100%;
  height: 100%;
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
  background-color: ${theme.colors.mono.gray3};
`;
