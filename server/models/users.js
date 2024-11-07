const pool = require('../config/dbConfig');

// DB TABLE : "users"

// 회원가입
async function registerUser(userData) {
  const { email, name, password } = userData;
  try {
    const result = await pool.query(
      `INSERT INTO users (email, name, password) VALUES (?, ?, ?)`,
      [email, name, password]
    );
    return result;
  } catch (error) {
    throw error;
  }
}

// 아이디 중복 확인 함수
async function checkUseremailExists(useremail) {
  const [rows] = await pool.query('SELECT COUNT(*) as count FROM users WHERE email = ?', [useremail]);
  if (rows && rows.count) {
    return Number(rows.count) > 0; // 아이디가 있으면 true 반환, 없으면 false 반환
  } else {
    return false; // 예상치 못한 경우 false 반환
  }
}

// 이메일 인증 상태 업데이트 함수
async function updateEmailVerified(email) {
  try {
    const result = await pool.query('UPDATE users SET email_verified = 1 WHERE email = ?', [email]);
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = { registerUser, checkUseremailExists, updateEmailVerified };
