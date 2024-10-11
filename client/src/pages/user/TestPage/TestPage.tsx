/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import { useEffect, useState } from "react";
import Header from "@components/service/common/Header";
import TestButton from "@components/service/common/Button";
import { makeComponentText } from "@api/test";
import { rolesData } from "@data/componentRolsData";
import { commonStructureData } from "@data/componentStructureData";
import { componentMap } from "@components/service/mapping/mapping";

interface Irequest {
  character: keyof typeof rolesData;
  isCommon: boolean;
  role: string;
  structure: string;
}

const GeneratedComponent: React.FC<{ data: any; role: string }> = ({
  data,
  role,
}) => {
  const ComponentToRender = componentMap[role];

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

  const [request, setRequest] = useState<Irequest>({
    character: "shoppingMall",
    isCommon: false,
    role: "",
    structure: "",
  });

  const handleCharacterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRequest({
      ...request,
      character: event.target.value as keyof typeof rolesData,
      isCommon: false,
      role: "",
      structure: "",
    });
  };

  const handleIsCommonChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequest({
      ...request,
      isCommon: event.target.checked,
      role: "",
    });
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = event.target.value;

    let selectedStructure = "";

    if (request.isCommon) {
      if (selectedRole in commonStructureData.common) {
        selectedStructure =
          commonStructureData.common[selectedRole as keyof IStructure];
      }
    } else {
      switch (request.character) {
        case "shoppingMall":
          if (selectedRole in commonStructureData.shoppingMall) {
            selectedStructure =
              commonStructureData.shoppingMall[
                selectedRole as keyof IStructure
              ];
          }

          break;
        case "communitySns":
          if (selectedRole in commonStructureData.communitySns) {
            selectedStructure =
              commonStructureData.communitySns[
                selectedRole as keyof IStructure
              ];
          }
          break;
        default:
          selectedStructure = "";
      }
    }

    setRequest((prevRequest) => ({
      ...prevRequest,
      role: selectedRole,
      structure: selectedStructure,
    }));

    if (selectedStructure === "") {
      alert(
        "structure is empty.please fill structure in /client/src/data/componentStructureData.ts first!"
      );
      setRequest((prevRequest) => ({
        ...prevRequest,
        role: "",
        structure: "",
      }));
    }
  };

  const getRoleOptions = () => {
    const roles = request.isCommon
      ? rolesData.common.roles
      : rolesData[request.character].roles;
    return roles.map((role) => (
      <option key={role} value={role}>
        {role}
      </option>
    ));
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

  async function fetchData() {
    if (!loading) {
      if (request.structure === "") {
        alert("structure is empty!");
      } else {
        setLoading(true);
        setError(null);
        try {
          const response = await makeComponentText(request);
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

  const testButton = {
    color: "text",
    padding: "8px 16px",
    size: "18px",
    borderRadius: "8px",
    onClick: () => {
      fetchData();
    },
  };

  return (
    <>
      <div css={pageWrap}>
        <div css={box}>
          <p css={title}>ready to request component text</p>
          <form css={form_container}>
            <div css={input_container}>
              <label htmlFor="character">Web Page Character</label>
              <select
                name="character"
                id="character"
                value={request.character}
                onChange={handleCharacterChange}
              >
                {getCharacterOptions()}
              </select>
            </div>

            <div css={input_container}>
              <label htmlFor="isCommon">Is Common Component?</label>
              <input
                type="checkbox"
                name="isCommon"
                id="isCommon"
                checked={request.isCommon}
                onChange={handleIsCommonChange}
              />
            </div>

            <div css={input_container}>
              <label htmlFor="role">Component Role</label>
              <select
                name="role"
                id="role"
                value={request.role}
                onChange={handleRoleChange}
              >
                <option value="">Select a Role</option>
                {getRoleOptions()}
              </select>
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
            <TestButton data={testButton}>test button</TestButton>
          </div>
        </div>
        <div css={box}>
          <p css={title}>result</p>
          <div css={code}>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
          <div css={component}>
            {data ? (
              <GeneratedComponent data={data} role={request.role} />
            ) : (
              <div>generate some component! 🤔</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const pageWrap = css`
  width: 50%;
`;

const container = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
`;

const box = (theme: Theme) => css`
  width: 100%;
  box-sizing: border-box;
  padding: 24px;
  background-color: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.secondary};
`;

const form_container = css`
  display: flex;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
`;

const input_container = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const code = (theme: Theme) => css`
  box-sizing: border-box;
  padding: 24px 16px;
  background-color: ${theme.colors.text};
  color: ${theme.colors.background};
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
  background-color: ${theme.colors.secondary};
`;