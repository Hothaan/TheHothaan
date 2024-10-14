/** @jsxImportSource @emotion/react */
import React from "react";
import type { IHeader } from "../../../types/componentStructure";

function Header(props: IHeader) {
  if (!props.title && !props.navigation) {
    return <div>nothing to show 🤔</div>;
  }

  return (
    <header>
      <h1>{props.title || "loading"}</h1>
      <nav>
        <ul>
          {props.navigation
            ? props.navigation.map((item) => <li key={item}>{item}</li>)
            : "loading"}
        </ul>
      </nav>
    </header>
  );
}

export default React.memo(Header);
