const pool = require('../config/dbConfig');

async function createService({ userId, name, description }) {
    try {
        const result = await pool.query(
            'INSERT INTO services (user_id, name, description) VALUES (?, ?, ?)',
            [userId, name, description]
        );
        return result.insertId;
    } catch (error) {
        throw error;
    }
}

// 템플릿 추가
async function addServiceTemplate({ serviceId, menuName, templateName, generatedText }) {
    const [result] = await pool.query(
        `INSERT INTO templates (service_id, menu_name, template_name, generated_text) VALUES (?, ?, ?, ?)`,
        [serviceId, menuName, templateName, generatedText]
    );
    return result.insertId;
}

// 메뉴 항목 추가
async function addMenuItem({ serviceId, menuName, itemName }) {
    const [result] = await pool.query(
        `INSERT INTO menu_items (service_id, menu_name, item_name) VALUES (?, ?, ?)`,
        [serviceId, menuName, itemName]
    );
    return result.insertId;
}

// async function addServiceOption({ serviceId, device, serviceType, menuStructure }) {
//     try {
//         const result = await pool.query(
//             'INSERT INTO service_options (service_id, device, service_type, menu_structure) VALUES (?, ?, ?, ?)',
//             [serviceId, device, serviceType, JSON.stringify(menuStructure)]
//         );
//         return result.insertId;
//     } catch (error) {
//         throw error;
//     }
// }

// async function addServicePlan({ serviceId, generatedText, menuStructure }) {
//     try {
//         const result = await pool.query(
//             'INSERT INTO service_plans (service_id, generated_text, menu_structure) VALUES (?, ?, ?)',
//             [serviceId, generatedText, JSON.stringify(menuStructure)]
//         );
//         return result.insertId;
//     } catch (error) {
//         throw error;
//     }
// }

module.exports = { createService, addServiceTemplate, addMenuItem };
