const pool = require('../config/dbConfig');

// 특정 아이템 이름으로 옵션 가져오기
async function getOptionsByItemName(itemName) {
  try {
    const rows = await pool.query(
      'SELECT * FROM service_item_options WHERE name = ?',
      [itemName]
    );
    return Array.isArray(rows) ? rows : [rows]; // 배열이 아닐 경우 배열로 변환하여 반환
  } catch (error) {
    throw error;
  }
}

module.exports = { getOptionsByItemName };
