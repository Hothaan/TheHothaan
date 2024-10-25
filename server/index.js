// require("dotenv").config();
// const express = require("express");
// const path = require("path");
// const app = express();
// const port = process.env.PORT || 5001;
// const cors = require("cors");
// app.use(cors());

// console.log("hello!");

// const apiKey = process.env.REACT_APP_API_KEY_DEV;

// // CORS 설정
// app.use(
//   cors({
//     origin: "http://localhost:3000", // 허용할 도메인 설정
//     methods: "GET,POST", // 허용할 HTTP 메소드 설정
//     credentials: true, // 인증 정보(쿠키, 헤더 등)를 포함한 요청 허용
//   })
// );

// // API 엔드포인트 예시
// app.get("/api/message", (req, res) => {
//   res.json({ message: "Hello from the backend!" });
// });
// app.get("/api/wellcome", (req, res) => {
//   res.json({ message: "wellcome wellcome wellcome" });
// });

// // 프로덕션 환경에서 React 정적 파일 제공
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/build", "index.html"));
//   });
// }

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

require("dotenv").config();
const express = require("express");
const axios = require("axios"); // OpenAI API 호출을 위한 axios
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json()); // JSON 요청을 처리하기 위한 미들웨어

const apiKey = process.env.REACT_APP_API_KEY_DEV;

// OpenAI API 호출을 처리하는 엔드포인트
app.post("/api/openai", async (req, res) => {
  const { service, serviceTitle, serviceDesc, depth1, depth2, structure } =
    req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `assistantConfig for ${service}`, // 여기에 적합한 설정을 넣으세요
          },
          {
            role: "user",
            content: `generate text for the ${depth1} menu ${depth2} page component of the ${service} web page name ${serviceTitle}, according to the ${structure} structure. Refer to the description of the web page created by the client: ${serviceDesc}. Don't put any explanations other than the structure you set. answer with JSON format only. value must be korean`,
          },
        ],
        temperature: 1,
        top_p: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    // OpenAI의 응답을 클라이언트로 전송
    res.json(JSON.parse(response.data.choices[0].message.content));
  } catch (error) {
    console.error("API 요청 중 오류가 발생했습니다: ", error);
    res.status(500).json({ error: "OpenAI API 요청 실패" });
  }
});

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
