// models/service_options.js
const pool = require('../config/dbConfig');

// 모든 서비스 옵션 가져오기
async function getAllServiceOptions() {
  try {
    const [rows] = await pool.query('SELECT * FROM service_options');
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { getAllServiceOptions };
