// controllers/serviceController.js
const ServiceEnvironment = require('../models/service_environment');
const ServiceTypes = require('../models/service_type');
const ServiceMenu = require('../models/service_menu');
const ServiceItemOptions = require('../models/service_item_options');

exports.getDeviceOptions = async (req, res) => {
    try {
        const environments = await ServiceEnvironment.getAllEnvironmentOptions();
        res.json(environments);
    } catch (error) {
        res.status(500).json({ error: '디바이스 환경을 가져오는 중 에러가 발생했습니다.' });
    }
};

exports.getServiceTypes = async (req, res) => {
    try {
        const serviceTypes = await ServiceTypes.getAllTypes();
        res.json(serviceTypes);
    } catch (error) {
        res.status(500).json({ error: '서비스 종류를 가져오는 중 에러가 발생했습니다.' });
    }
};


// 특정 서비스 타입의 메뉴와 하위 아이템 가져오기
exports.getMenusWithItems = async (req, res) => {
    const { serviceTypeId } = req.params;
    try {
        const rows = await ServiceMenu.getMenusWithItems(serviceTypeId);

        // 데이터를 상위 메뉴별로 그룹화
        const result = await rows.reduce(async (accPromise, row) => {
            const acc = await accPromise;
            const { menu_id, menu_name, item_id, item_name, is_default, is_option } = row;

            // 상위 메뉴가 이미 존재하면 추가하지 않고 하위 메뉴만 추가
            let menu = acc.find(m => m.menu_id === menu_id);
            if (!menu) {
                menu = {
                    menu_id,
                    menu_name,
                    items: []
                };
                acc.push(menu);
            }

            // 하위 메뉴 아이템이 존재하는 경우만 추가
            if (item_id) {
                const item = {
                    item_id,
                    item_name,
                    is_default: !!is_default,
                    is_option: !!is_option
                };

                // is_option이 true인 경우 해당 아이템의 옵션 리스트를 추가
                if (is_option) {
                    const options = await ServiceItemOptions.getOptionsByItemName(item_name);
                    item.options = options.map(option => ({
                        option_type: option.option_type,
                        is_selected: !!option.is_selected,
                        structure: option.structure
                    }));
                }

                menu.items.push(item);
            }

            return acc;
        }, Promise.resolve([]));

        res.json(result);
    } catch (error) {
        console.error('Error fetching menus with items:', error);
        res.status(500).json({ error: '메뉴와 하위 아이템을 가져오는 중 에러가 발생했습니다.' });
    }
};

