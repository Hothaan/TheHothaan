import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import styled from "@emotion/styled";

const EditorContainer = styled.div`
  position: relative;
  display: inline-block;
`;

interface TextEditorProps {
  initialValue: string;
  onChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef(null);

  const handleEditorChange = (content: string) => {
    onChange(content);
  };

  return (
    <EditorContainer>
      <Editor
        apiKey="your-api-key" // Replace with your TinyMCE API key
        initialValue={initialValue}
        inline={true}
        init={{
          menubar: false,
          toolbar:
            "fontselect fontsizeselect | bold italic underline strikethrough | forecolor | alignleft aligncenter alignright",
        }}
        onEditorChange={handleEditorChange}
      />
    </EditorContainer>
  );
};

export default TextEditor;
