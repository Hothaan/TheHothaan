const pool = require('../config/dbConfig');

// 프로젝트 생성
exports.createProject = async (user_email, project_name, project_description) => {
    const result = await pool.query(
        `INSERT INTO projects (user_email, project_name, project_description, created_at, updated_at)
         VALUES (?, ?, ?, NOW(), NOW())`,
        [user_email, project_name, project_description]
    );
    // console.log("result", Number(result.insertId));

    return Number(result.insertId); // 생성된 프로젝트 ID 반환
};

// 선택 항목 저장
exports.addProjectSelection = async (project_id, selection_type, selection_value, selection_option) => {
    await pool.query(
        `INSERT INTO project_selections (project_id, selection_type, selection_value, selection_option, created_at, updated_at)
         VALUES (?, ?, ?, ?, NOW(), NOW())`,
        [project_id, selection_type, selection_value, selection_option]
    );
};

// 프로젝트 기본 정보 가져오기
exports.getProjectById = async (projectId) => {
    const [rows] = await pool.query(
        `SELECT project_name, project_description 
         FROM projects 
         WHERE project_id = ?`,
        [projectId]
    );
    return rows; // 프로젝트 정보 반환
};


// 특정 프로젝트의 선택값들 가져오기
exports.getProjectSelections = async (projectId) => {
    const result = await pool.query(
        `SELECT selection_type, selection_value, selection_option FROM project_selections WHERE project_id = ?`,
        [projectId]
    );
    const selections = Array.isArray(result) ? result : [result];
    return selections;
};