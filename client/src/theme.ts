import { Theme } from "@emotion/react";

export const theme: Theme = {
  colors: {
    blue: {
      light: "#56C0FE",
      bg: "#EEF7FD",
    },
    purple: {
      bg: "#D9D7EF",
      light: "#9D14DC",
      deep: "#6100F3",
    },
    mono: {
      white: "#FFFFFF",
      gray1: "#F6F6F6",
      gray2: "#ECECEC",
      gray3: "#DEDEDE",
      gray4: "#747474",
    },

    text: {
      light: "#A9AAB8",
      dark: "#383838",
      blue: "#119CD4",
    },
  },
  makeLinearGradient: (deg, color1, percentage1, color2, percentage2) =>
    `linear-gradient(${deg}deg, ${color1} ${percentage1}%, ${color2} ${percentage2}%)`,
};
