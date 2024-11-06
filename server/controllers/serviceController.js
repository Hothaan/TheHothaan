// server/controllers/serviceController.js
const {
    createService,
    addServiceOption,
    addServicePlan
} = require('../models/serviceModel');

// 서비스 생성
async function createServiceHandler(req, res) {
    const { userId, name, description } = req.body;

    try {
        const serviceId = await createService({ userId, name, description });
        res.status(201).json({ message: 'Service created successfully', serviceId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating service', error });
    }
}

// 템플릿 추가
async function addTemplateHandler(req, res) {
    const { serviceId, menuName, templateName, generatedText } = req.body;

    try {
        const templateId = await addServiceTemplate({ serviceId, menuName, templateName, generatedText });
        res.status(201).json({ message: 'Template added successfully', templateId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding template', error });
    }
}

// 메뉴 항목 추가
async function addMenuItemHandler(req, res) {
    const { serviceId, menuName, itemName } = req.body;

    try {
        const menuItemId = await addMenuItem({ serviceId, menuName, itemName });
        res.status(201).json({ message: 'Menu item added successfully', menuItemId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding menu item', error });
    }
}

module.exports = { createServiceHandler, addTemplateHandler, addMenuItemHandler };
