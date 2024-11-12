import axios from "axios";

export type ToptionItem = {
  is_selected: boolean;
  option_type: string;
};

export type TmenuItem = {
  item_id: number;
  item_name: string;
  is_default: boolean;
  is_option: boolean;
  is_selected: boolean;
  options?: ToptionItem[];
};

export interface IserviceTypeMenuItem {
  menu_id: number;
  menu_name: string;
  items: TmenuItem[];
}

export type TserviceTypeMenu = IserviceTypeMenuItem[];

export const getServiceTypeMenu = async (
  isProduction: boolean,
  serviceTypesId: number
) => {
  try {
    const response = await axios.get(
      `http://${
        isProduction ? "dolllpitoxic3.mycafe24.com" : "localhost:5001"
      }/api/service/${serviceTypesId}/menus`
    );
    return response;
  } catch (error) {
    console.error("서버 요청 중 오류가 발생했습니다: ", error);
    throw error;
  }
};
