/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import DetailContainer from "@components/common/ui/Container/DetailContainer";
import Button from "@components/common/button/Button";
import MyPageButton from "@components/common/mypage/MyPageButton";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useUserInfoStore } from "@store/userInfoStore";
import TextFArea from "@components/common/form/TextArea";

interface IformData {
  category: string;
  name: string;
  title: string;
  content: string;
  file: any;
}

export default function PersonalInquiryRegisterPage() {
  const { userInfo } = useUserInfoStore();
  const initialFormData = {
    category: "",
    name: userInfo.name || "",
    title: "",
    content: "",
    file: null,
  };
  const [formData, setFormData] = useState<IformData>(initialFormData);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [byteLength, setByteLength] = useState<number>(0);
  const category_options = ["카테고리1", "카테고리2", "카테고리3"];
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const MAX_LENGTH = 500;

  function getByteLength(text: string): number {
    let byteLength = 0;
    for (let char of text) {
      byteLength += char.charCodeAt(0) > 127 ? 2 : 1;
    }
    return byteLength;
  }

  function handleChangeIsSelectOpen() {
    setIsSelectOpen(!isSelectOpen);
  }

  function handleChangeSelectedCategory(category: string) {
    setFormData({ ...formData, category: category });
  }

  function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, title: e.target.value });
  }

  function handleChangeContent(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const currentByteLength = getByteLength(e.target.value);
    if (currentByteLength <= MAX_LENGTH) {
      setFormData({ ...formData, content: e.target.value });
      setByteLength(currentByteLength);
    } else {
      setByteLength(MAX_LENGTH);
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFileName(file?.name || "");
    setFormData({ ...formData, file: file });
  };

  function handleSearchFile() {
    inputRef.current?.click();
  }

  function handleRemoveFile() {
    setFormData({ ...formData, file: null });
    setFileName("");
  }

  return (
    <DetailContainer title="1:1 문의하기">
      <form css={content_container}>
        <div css={input_container}>
          <label css={label}>문의 분류</label>
          <div
            css={select_input_container(isSelectOpen)}
            onClick={handleChangeIsSelectOpen}
          >
            <div css={select_input_selected_container}>
              {formData.category === "" ? (
                <p css={select_input_placeholder}>선택</p>
              ) : (
                <p>{formData.category}</p>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M16 9L11.707 13.293L7.414 9L6 10.414L11.707 16.121L17.414 10.414L16 9Z"
                  fill="#A9AAB8"
                />
              </svg>
            </div>
            {isSelectOpen && (
              <ul css={select_input_options_container}>
                {category_options.map((item, idx) => (
                  <li
                    key={idx}
                    css={select_input_option(formData.category === item)}
                    onClick={() => {
                      handleChangeSelectedCategory(item);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div css={input_container}>
          <label css={label}>문의 분류</label>
          <p css={value}>{formData.name}</p>
        </div>
        <div css={input_container}>
          <label css={label}>제목</label>
          <input
            type="text"
            value={formData.title}
            onChange={handleChangeTitle}
            css={text_input}
          />
        </div>
        <div css={input_container}>
          <label css={label}>내용</label>
          <div css={textarea_container}>
            <textarea
              value={formData.content}
              onChange={handleChangeContent}
              css={textarea_input}
            />
            <p css={char_count}>
              {byteLength}/{MAX_LENGTH}
            </p>
          </div>
        </div>
        <div css={input_container}>
          <label css={label}>첨부파일</label>
          <input
            type="file"
            name="file"
            id="file"
            ref={inputRef}
            onChange={handleFileChange}
            css={display_none}
          />
          <div css={custom_file_input_container}>
            <div onClick={handleSearchFile}>
              <MyPageButton text="찾아보기" />
            </div>
            {fileName !== "" && (
              <div css={file_name_container}>
                <p>{fileName}</p>
                <div css={delete_button} onClick={handleRemoveFile}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.918458 9.44176L10.362 -0.00177805L10.9185 0.554688L1.47492 9.99822L0.918458 9.44176Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.63783 1.14308e-06L11.0814 9.44353L10.5249 10L1.08137 0.556467L1.63783 1.14308e-06Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
      <div css={button_container}>
        <Button size="L" bg="white" text="취소" />
        <Button size="L" bg="gray" text="등록" />
      </div>
    </DetailContainer>
  );
}

const content_container = css`
  display: flex;
  padding: 50px;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;

  border-radius: 20px;
  border: 1px solid var(--DEDEDE, #dedede);
`;

const display_none = css`
  display: none;
`;

const file_name_container = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const delete_button = css`
  display: flex;
  width: 24px;
  height: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  cursor: pointer;

  border-radius: 90px;
  background: var(--383838, #383838);
`;

const button_container = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
`;

const input_container = css`
  display: flex;
  min-height: 50px;
  align-items: center;
  align-self: stretch;
`;

const custom_file_input_container = css`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const textarea_container = css`
  width: calc(100% - 120px);
  position: relative;
`;

const label = css`
  width: 120px;

  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const value = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const text_input = css`
  display: flex;
  width: calc(100% - 120px);
  height: 50px;
  padding: 10px 14px;
  align-items: center;

  border-radius: 7px;
  border: 1px solid var(--DEDEDE, #dedede);
  background: var(--FFF, #fff);

  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
`;

const textarea_input = css`
  width: 100%;
  height: 200px;
  padding: 20px;

  border-radius: 6px;
  border: 1px solid var(--DEDEDE, #dedede);
  background: var(--FFF, #fff);

  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  line-height: normal;
`;

const select_input_container = (isOpen: boolean) => css`
  display: flex;
  width: 300px;
  padding: 10px 14px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  position: relative;

  border-radius: ${isOpen ? "7px 7px 0 0" : "7px"};
  border: 1px solid var(--DEDEDE, #dedede);
  background: var(--FFF, #fff);
`;

const select_input_selected_container = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
`;

const select_input_placeholder = css`
  color: var(--383838, #383838);
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const select_input_options_container = css`
  width: 300px;
  border-radius: 0 0 7px 7px;
  border: 1px solid var(--DEDEDE, #dedede);
  background: var(--FFF, #fff);

  position: absolute;
  top: 100%;
  left: -1px;
`;

const select_input_option = (isSelected: boolean) => css`
  padding: 14px;

  cursor: pointer;

  transition: 0.3s ease;

  color: ${isSelected ? "#119CD4" : "#383838"};

  &:hover {
    background-color: #dedede;
  }
`;

const char_count = css`
  position: absolute;

  bottom: 20px;
  right: 20px;
  color: var(--747474, #747474);
  text-align: center;
  font-family: Pretendard;
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
