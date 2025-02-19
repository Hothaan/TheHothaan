import { CSSObject } from "@emotion/react";

export default function useEditTemplate() {
  const updateStyle = (source: any, initial: any) => {
    return Object.keys(initial).reduce((acc, key) => {
      const value = source?.[key];
      acc[key] = value === "" ? initial[key] : value ?? initial[key];
      return acc;
    }, {} as any);
  };

  const updateInitialContent = (source: any, initial: any) => {
    return Object.keys(initial).reduce((acc, key) => {
      const value = source?.[key];

      if (value === undefined || value === null || value === "") {
        acc[key] = initial[key];
      } else {
        acc[key] = value;
      }
      console.log(acc);
      return acc;
    }, {} as any);
  };

  const updateContentTest = (source: any, initial: any) => {
    return Object.keys(initial).reduce((acc, key) => {
      const value = source?.[key];
      if (value !== undefined && value !== null) {
        acc[key] = value;
      } else {
        acc[key] = acc[key] ?? "";
      }

      return acc;
    }, {} as any);
  };

  const updateContent = (source: any, initial: any, isFirstRender: boolean) => {
    return Object.keys(initial).reduce((acc, key) => {
      const value = source?.[key];

      if (
        isFirstRender &&
        (value === undefined || value === null || value === "")
      ) {
        acc[key] = initial[key]; // ✅ 최초 렌더링에서는 initial 값 적용
      } else if (value !== undefined && value !== null) {
        acc[key] = value; // ✅ 이후에는 원래 값 유지
      } else {
        acc[key] = acc[key] ?? ""; // ✅ 이전 값 유지, 단 undefined/null이면 ""로 설정
      }

      return acc;
    }, {} as any);
  };

  const shallowEqual = (objA: any, objB: any) => {
    if (Object.is(objA, objB)) return true;
    if (
      typeof objA !== "object" ||
      typeof objB !== "object" ||
      objA === null ||
      objB === null
    )
      return false;

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;

    return keysA.every((key) => objA[key] === objB[key]);
  };

  const handleEditContent = (
    key: string,
    value: string,
    handle: (value: any) => void,
    onChange: (key: string, value: string) => void
  ) => {
    handle((prev: any) => ({
      ...prev,
      [key]: value,
    }));
    onChange?.(key, value);
  };

  const handleEditStyle = (
    key: string,
    value: CSSObject,
    handle: (value: any) => void,
    onChange: (key: string, value: CSSObject) => void
  ) => {
    handle((prev: any) => ({
      ...prev,
      [key]: value,
    }));
    onChange?.(key, value);
  };

  return {
    updateStyle,
    updateContent,
    updateContentTest,
    shallowEqual,
    handleEditContent,
    handleEditStyle,
    updateInitialContent,
  };
}
