const path = require('path');
const fs = require('fs');
const winston = require('winston');

// 환경 변수로부터 로그 폴더 경로를 가져옵니다.
const logDirectory = process.env.LOG_DIRECTORY || './logs';

// 로그 폴더가 존재하지 않으면 생성합니다.
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // 날짜 포맷 추가
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDirectory, 'combined.log') }),
    new winston.transports.File({ filename: path.join(logDirectory, 'warning.log'), level: 'warning' }),
  ],
});

// 콘솔에도 출력하고 싶으면 다음 코드 추가
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

module.exports = logger;
