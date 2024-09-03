import { createContext } from "react";
import { IGlobalContext, ISubMenuData } from "./types";

export const GlobalContext = createContext<IGlobalContext | null>(null);

const defaultSubMenuContextValue = {
  tabValue: Number.NaN,
  tabs: [],
  menuData: [],
};

export const SubMenuContext = createContext<ISubMenuData>(
  defaultSubMenuContextValue
);
