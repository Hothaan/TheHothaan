/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import TextField from "@components/common/form/TextField";
import TextArea from "@components/common/form/TextArea";
import { apiRequestStore } from "@store/apiRequestStore";

interface IformData {
  serviceTitle: string;
  serviceDesc: string;
}

export default function ServiceStep1Page() {
  const { apiRequestData, setApiRequestData } = apiRequestStore();
  const [serviceTitle, setServiceTitle] = useState<string>("");
  const [isDone, setIsDone] = useState<boolean>(false);
  const [formData, setFormData] = useState<IformData>({
    serviceTitle: "",
    serviceDesc: "",
  });

  const serviceTitleData: ItextField = {
    label: "serviceTitle",
    id: "serviceTitle",
    placeholder: "내용입력",
    value: formData.serviceTitle,
    disabled: false,
    onChange: (e) =>
      setFormData((prev) => ({ ...prev, serviceTitle: e.target.value })),
  };

  const textAreaDefault: ItextArea = {
    label: "serviceDesc",
    id: "serviceDesc",
    placeholder: "내용입력",
    value: formData.serviceDesc,
    disabled: false,
    onChange: (e) =>
      setFormData((prev) => ({ ...prev, serviceDesc: e.target.value })),
  };

  useEffect(() => {
    if (formData.serviceTitle !== "" && formData.serviceDesc !== "") {
      setIsDone(true);
    }
  }, [formData]);

  // isDone 넘겨서 다음으로 넘어가기 버튼 활성화

  return (
    <div css={wrap}>
      <div css={input_container}>
        <div css={input_guide_container}>
          <p css={text_left}>
            <span css={gradient_text}>프로젝트 명</span>
            <span css={require_text}>을 작성해주세요.</span>
          </p>
          <p css={[text_left, guide_text]}>생성할 프로젝트명을 입력하세요.</p>
        </div>
        <TextField {...serviceTitleData} />
      </div>
      <div css={input_container}>
        <div css={input_guide_container}>
          <p css={text_left}>
            <span css={require_text}>홈페이지를</span>
            <span css={gradient_text}>설명</span>
            <span css={require_text}>해주세요.</span>
          </p>
        </div>
        <TextArea {...textAreaDefault} />
      </div>
    </div>
  );
}

const wrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  align-self: stretch;
`;

const input_container = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const input_guide_container = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  align-self: stretch;
`;

const text_left = css`
  width: 100%;
  display: flex;
  justify-content: start;
`;

const guide_text = css`
  color: var(--747474, #747474);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const require_text = css`
  font-family: Pretendard;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: var(--383838, #383838);
`;

const gradient_text = css`
  display: inline-block;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  background: linear-gradient(92deg, #56c0fe 2.67%, #6d0ee6 98.39%);
  background-clip: text;
`;
