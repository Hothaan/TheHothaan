// emotion.d.ts
import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      blue: {
        light: string;
        bg: string;
      };
      purple: {
        bg: string;
        light: string;
        deep: string;
      };
      mono: {
        white: string;
        gray1: string;
        gray2: string;
        gray3: string;
        gray4: string;
      };
      text: {
        light: string;
        dark: string;
        blue: string;
      };
    };
    makeLinearGradient: (
      deg: number,
      color1: string,
      percentage1: number,
      color2: string,
      percentage2: number
    ) => string;
  }
}
