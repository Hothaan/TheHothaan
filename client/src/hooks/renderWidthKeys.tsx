import React from "react";
// import { EmotionJSX } from "@emotion/react/dist/declarations/src/jsx-namespace";

export const renderWithKeys = (content: (string | any)[], key: string) => {
  const flattenArray = (array: any) =>
    array.reduce(
      (acc: any, val: any) =>
        acc.concat(Array.isArray(val) ? flattenArray(val) : val),
      []
    );

  const flatContent = flattenArray(content);

  return flatContent.map((child: any, index: any) => {
    if (
      React.isValidElement(child) &&
      typeof child.type === "string" &&
      (child.type === "br" || child.type === "span")
    ) {
      return React.cloneElement(child, { key: `${key}-${index}` });
    }
    return child;
  });
};
