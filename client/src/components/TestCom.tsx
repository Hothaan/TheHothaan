/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export default function TestCom() {
  return (
    <div>
      TestCom
      <Post>hi</Post>
    </div>
  );
}

const Post = styled.div`
  font-size: 1.2rem;
  background-color: #f8f9fa;
  padding: 1rem;
`;
