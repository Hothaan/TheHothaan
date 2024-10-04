const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 5001;
const cors = require("cors");
app.use(cors());

console.log("hello!");

// CORS 설정
app.use(
  cors({
    origin: "http://localhost:3000", // 허용할 도메인 설정
    methods: "GET,POST", // 허용할 HTTP 메소드 설정
    credentials: true, // 인증 정보(쿠키, 헤더 등)를 포함한 요청 허용
  })
);

// API 엔드포인트 예시
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// 프로덕션 환경에서 React 정적 파일 제공
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
