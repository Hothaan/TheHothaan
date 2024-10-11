// emotion.d.ts
import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      [key: string]: string;
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    spacing: (factor: number) => string; // spacing 함수
  }
}
