const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "The Hothaan API", // API 이름
    version: "1.0.0", // API 버전
    description: "API documentation for The Hothaan", // API 설명
  },
  servers: [
    {
      url:
        process.env.NODE_ENV === "production"
          ? "http://dolllpitoxic3.mycafe24.com"
          : "http://localhost:5001",
      description:
        process.env.NODE_ENV === "production"
          ? "Production Server"
          : "Development Server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // API 파일 경로 설정
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
