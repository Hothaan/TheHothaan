// models/service_environment.js
const pool = require('../config/dbConfig');

// 모든 서비스 종류 가져오기
async function getAllTypes() {
    try {
        const rows = await pool.query('SELECT * FROM service_type');
        return Array.isArray(rows) ? rows : [rows]; // 배열이 아닐 경우 배열로 변환하여 반환
    } catch (error) {
        throw error;
    }
}


module.exports = { getAllTypes };
