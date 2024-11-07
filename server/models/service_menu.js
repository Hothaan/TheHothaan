const pool = require('../config/dbConfig');

// 특정 서비스 타입의 메뉴와 하위 아이템 가져오기
async function getMenusWithItems(serviceTypeId) {
    const query = `
        SELECT m.id AS menu_id, m.name AS menu_name, mi.id AS item_id, mi.name AS item_name, mi.is_default, mi.is_option
        FROM service_menu AS m
        LEFT JOIN service_menu_items AS mi ON m.id = mi.menu_id
        WHERE m.service_type_id = ?
        ORDER BY m.id, mi.id
    `;
    const rows = await pool.query(query, [serviceTypeId]);
    return Array.isArray(rows) ? rows : [rows]; // 배열이 아닐 경우 배열로 변환하여 반환
    // return rows;
}

module.exports = { getMenusWithItems };
