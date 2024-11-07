// models/service_menu_items.js
const pool = require('../config/dbConfig');

// 특정 메뉴의 하위 항목 가져오기
async function getMenuItemsByMenuId(menuId) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM service_menu_items WHERE menu_id = ?',
      [menuId]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = { getMenuItemsByMenuId };
