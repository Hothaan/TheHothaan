const pool = require('../config/dbConfig');

// 프로젝트 생성
exports.createProject = async (user_email, project_name, project_description) => {
  const result = await pool.query(
    `INSERT INTO projects (user_email, project_name, project_description, created_at, updated_at)
         VALUES (?, ?, ?, NOW(), NOW())`,
    [user_email, project_name, project_description],
  );
  // console.log("result", Number(result.insertId));

  return Number(result.insertId); // 생성된 프로젝트 ID 반환
};

// 선택 항목 저장
exports.addProjectSelection = async (project_id, selection_type, selection_value) => {
  const result = await pool.query(
    `INSERT INTO project_selections (project_id, selection_type, selection_value, created_at, updated_at)
         VALUES (?, ?, ?, NOW(), NOW())`,
    [project_id, selection_type, selection_value],
  );
  return Number(result.insertId); // 생성된 selection_id 반환
};

// feature 항목 저장
exports.addProjectFeature = async (menu_selection_id, feature_name, feature_option) => {
  await pool.query(
    `INSERT INTO project_selection_features (menu_selection_id, feature_name, feature_option, created_at, updated_at)
         VALUES (?, ?, ?, NOW(), NOW())`,
    [menu_selection_id, feature_name, feature_option],
  );
};

// feature content 업데이트
exports.updateFeatureContent = async (featureId, content, styleString) => {
  try {
    const result = await pool.query(
      `UPDATE project_selection_features SET content = ?, style = ?, updated_at = NOW() WHERE feature_id = ?`,
      [content, styleString, featureId],
    );
    return result;
  } catch (error) {
    console.error('DB Update Error:', error);
    throw error;
  }
};

// feature content 조회
exports.getFeatureContent = async (featureId) => {
  const [rows] = await pool.query(
    `SELECT content 
         FROM project_selection_features 
         WHERE feature_id = ?`,
    [featureId],
  );
  return rows.length > 0 ? JSON.parse(rows[0].content) : null;
};

// 프로젝트 기본 정보 가져오기
exports.getProjectById = async (projectId) => {
  const [rows] = await pool.query(
    `SELECT project_name, project_description 
         FROM projects 
         WHERE project_id = ?`,
    [projectId],
  );
  return rows; // 프로젝트 정보 반환
};

// 특정 프로젝트의 선택값들 가져오기
exports.getProjectSelections = async (projectId) => {
  const result = await pool.query(
    `SELECT selection_id, selection_type, selection_value FROM project_selections WHERE project_id = ?`,
    [projectId],
  );
  const selections = Array.isArray(result) ? result : [result];
  return selections;
};

// 특정 menu의 feature 목록 가져오기
exports.getProjectFeatures = async (menuSelectionId) => {
  const features = await pool.query(
    `SELECT feature_id, feature_name, feature_option 
         FROM project_selection_features 
         WHERE menu_selection_id = ?`,
    [menuSelectionId],
  );
  return features;
};

// 특정 프로젝트의 모든 feature 정보 가져오기
exports.getProjectFeaturesWithId = async (projectId) => {
  const query = `
        SELECT 
            psf.feature_id, 
            psf.menu_selection_id, 
            psf.feature_name, 
            psf.feature_option, 
            psf.content AS content,
            psf.style AS style,
            ps.selection_value AS menu
        FROM project_selection_features psf
        JOIN project_selections ps 
        ON ps.selection_id = psf.menu_selection_id
        WHERE ps.project_id = ?
    `;
  const rows = await pool.query(query, [projectId]);
  const result = Array.isArray(rows) ? rows : [rows];
  // console.log("Features from DB:", result);
  return result;
};

// 파일 정보 저장
exports.addFileRecord = async (projectId, featureId, fileType, action_url, filePath, fileUrl) => {
  const result = await pool.query(
    `INSERT INTO project_files (project_id, feature_id, file_type, action_url, file_path, file_url) VALUES (?, ?, ?, ?, ?, ?)`,
    [projectId, featureId, fileType, action_url, filePath, fileUrl],
  );
  return result.insertId;
};

exports.updateFileRecord = async (projectId, featureId, fileType, action_url, filePath, fileUrl) => {
  const result = await pool.query(
    `UPDATE project_files SET file_type = ?, action_url = ?, file_path = ?, file_url = ? WHERE project_id = ? AND feature_id = ?`,
    [fileType, action_url, filePath, fileUrl, projectId, featureId],
  );
  return result;
};

// 프로젝트 파일 정보 가져오기
exports.getFilesByProject = async (projectId) => {
  const rows = await pool.query(`SELECT * FROM project_files WHERE project_id = ?`, [projectId]);
  const result = Array.isArray(rows) ? rows : [rows];
  return result;
};

exports.getFileByProjectAndFeature = async (projectId, featureId) => {
  const rows = await pool.query(`SELECT * FROM project_files WHERE project_id = ? AND feature_id = ? LIMIT 1`, [
    projectId,
    featureId,
  ]);
  return rows.length > 0 ? rows[0] : null;
};
