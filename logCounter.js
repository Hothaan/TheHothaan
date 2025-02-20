// const fs = require("fs");
// const path = require("path");

// // 로그 파일 경로
// const logFilePath = path.join(
//   "C:/Users/osw01/Desktop/logs-10min",
//   "combined.log"
// );

// // 로그 파일 읽기
// fs.readFile(logFilePath, "utf8", (err, data) => {
//   if (err) {
//     console.error("Error reading log file:", err);
//     return;
//   }

//   // 로그 항목을 줄 단위로 분리
//   const logEntries = data.split("\n").filter(Boolean);

//   // 초기화
//   let totalCountSum = 0;
//   let successCountSum = 0;
//   let failureCountSum = 0;

//   // 각 로그 항목 분석
//   logEntries.forEach((entry) => {
//     try {
//       const log = JSON.parse(entry);
//       totalCountSum += log.totalCount || 0;
//       successCountSum += log.successCount || 0;
//       failureCountSum += log.failureCount || 0;
//     } catch (error) {
//       console.log(entry);
//       console.error("Error parsing log entry:", error);
//     }
//   });

//   // 결과 출력
//   console.log("Total Count:", totalCountSum);
//   console.log("Success Count:", successCountSum);
//   console.log("Failure Count:", failureCountSum);

//   // 성공율 계산 및 출력
//   const successRate = (successCountSum / totalCountSum) * 100;
//   console.log("Success Rate:", successRate.toFixed(2) + "%");
// });
