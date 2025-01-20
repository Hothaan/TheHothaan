const pool = require('../config/dbConfig');

// components 테이블에서 component 구조 정보 가져오기
exports.getComponentDetails = async (menuName, featureName, serviceType) => {
  const [rows] = await pool.query(
    `SELECT c.structure, c.service_type, c.content, c.feature_name as depth2, s.name as depth1, c.cnt
         FROM components c
         INNER JOIN sections s ON c.section_id = s.section_id
         WHERE s.name = ? AND c.feature_name = ? AND c.service_type = ?`,
    [menuName, featureName, serviceType],
  );
  return rows; // 일치하는 첫 번째 결과를 반환
};
