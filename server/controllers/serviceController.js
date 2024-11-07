// controllers/serviceController.js
const ServiceEnvironment = require('../models/service_environment');
const ServiceTypes = require('../models/service_type');
const ServiceMenu = require('../models/service_menu');
const ServiceMenuItems = require('../models/service_menu_items');
// const ServiceOptions = require('../models/service_options');
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
      const result = rows.reduce((acc, row) => {
        const { menu_id, menu_name, item_id, item_name, is_default } = row;
  
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
          menu.items.push({
            item_id,
            item_name,
            is_default: !!is_default
          });
        }
  
        return acc;
      }, []);
  
      res.json(result);
    } catch (error) {
      console.error('Error fetching menus with items:', error);
      res.status(500).json({ error: '메뉴와 하위 아이템을 가져오는 중 에러가 발생했습니다.' });
    }
  };

