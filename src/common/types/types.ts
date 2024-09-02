import { SetStateAction } from "react";

export interface IMenuData {
  menuId: number;
  type: string;
  subMenuId: number;
  name: string;
  description: string;
  price: string;
}

export interface ISubMenuData {
  tabValue: number;
  menuData: IMenuData[];
  tabs: {
    name: string;
    id: number;
  }[];
}

export interface IGlobalContext {
  cartItems: IMenuData[];
  addItem: (data: IMenuData) => void;
  removeItem: (data: IMenuData) => void;
  setCartItems: React.Dispatch<SetStateAction<IMenuData[]>>;
}

export interface ISummaryItem {
  count: number;
  price: number;
}

export interface ISummary {
  [key: string]: ISummaryItem;
}
