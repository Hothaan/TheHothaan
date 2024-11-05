require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const setupSwagger = require("./swagger");

const openAIRoutes = require("./routes/openAI");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 5001;

// CORS 설정
app.use(
  cors({
    origin: ["http://localhost:3000", "http://dolllpitoxic3.mycafe24.com"], // 허용할 도메인 목록 추가
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true, // 인증 정보(쿠키, 헤더 등)를 포함한 요청 허용
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON 요청을 처리하기 위한 미들웨어
app.use(express.json());

// 엔드포인트 경로 설정
app.use("/api/openai", openAIRoutes);
app.use("/api/user", userRoutes);

// Swagger 문서화
setupSwagger(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
