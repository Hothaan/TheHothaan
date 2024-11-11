// 환경 설정 로드
require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"
});

const express = require("express");
const cors = require("cors");
const path = require("path");

const setupSwagger = require("./swagger");

const openAIRoutes = require("./routes/openAI");
const userRoutes = require("./routes/user");
const imageRoutes = require("./routes/image");
const serviceRoutes = require("./routes/service");
const projectRoutes = require("./routes/project");

const app = express();
const port = process.env.PORT || 5001;

app.use(
  cors({
    // origin: ["http://localhost:3000", "http://dolllpitoxic3.mycafe24.com"], // 허용할 도메인 목록 추가
    origin: process.env.CORS_ORIGIN,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true, // 인증 정보(쿠키, 헤더 등)를 포함한 요청 허용
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 캐시 방지 헤더 설정 (API 요청에만 적용)
app.use("/api", (req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

// JSON 요청을 처리하기 위한 미들웨어
app.use(express.json());

// 엔드포인트 경로 설정
app.use("/api/openai", openAIRoutes);
app.use("/api/user", userRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/project", projectRoutes);

// /var/www/images 경로를 "/images" URL로 접근할 수 있도록 설정
app.use('/images', express.static(path.join('/var/www/images')));

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
