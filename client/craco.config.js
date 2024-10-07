// const path = require("path");

// module.exports = {
//   webpack: {
//     alias: {
//       "@images": path.resolve(__dirname, "public/assets/images"),
//       "@svgs": path.resolve(__dirname, "src/images"),
//       "@components": path.resolve(__dirname, "src/components"),
//       "@data": path.resolve(__dirname, "src/data"),
//       "@pages": path.resolve(__dirname, "src/pages"),
//       "@hooks": path.resolve(__dirname, "src/hooks"),
//     },
//   },
// };
const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: ".",
        tsConfigPath: "tsconfig.paths.json",
        debug: false,
      },
    },
  ],
};
