// TextEditor.tsx
import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "@emotion/styled";

const ToolbarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f3f3f3;
  padding: 8px;
  z-index: 10;
  display: flex;
  gap: 8px;
`;

const TextEditorContainer = styled.div`
  .ql-container {
    display: none;
    border: none; /* Removes border */
  }

  .ql-editor {
    display: none;
    padding: 0; /* Customize padding if necessary */
  }
`;

const applyFormat = (format: string, value: any = true) => {
  const target = document.querySelector(".ql-container");
  if (target) {
    const quill = ReactQuill.Quill.find(target);
    if (quill instanceof Quill) {
      quill.format(format, value);
    }
  }
};

const CustomToolbar = () => (
  <div>
    <button onClick={() => applyFormat("bold")}>Bold</button>
    <button onClick={() => applyFormat("italic")}>Italic</button>
    <button onClick={() => applyFormat("underline")}>Underline</button>
    <button onClick={() => applyFormat("align", "center")}>Center</button>
    {/* Add more buttons as needed */}
  </div>
);

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ content, onChange }) => {
  return (
    <TextEditorContainer>
      <CustomToolbar />
      <ReactQuill
        value={content}
        onChange={onChange}
        modules={{
          toolbar: false,
        }}
      />
    </TextEditorContainer>
  );
};

export default TextEditor;
