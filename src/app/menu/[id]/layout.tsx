"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { subMenuData } from "@/common/data/subMenuData";
import { useParams, useRouter } from "next/navigation";
import { createContext } from "react";
import { ISubMenuData } from "@/common/types";
import { Link } from "@mui/material";

export const SubMenuContext = createContext<ISubMenuData | null>(null);

const SubMenuLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [value, setValue] = React.useState(0);
  const params = useParams();
  const router = useRouter();
  const subMenu = subMenuData.filter(
    (data) => data.menuId === parseInt(params.id as string)
  );
  const tabs = Array.from(new Set(subMenu.map((tab) => tab.type))).map(
    (item, i) => {
      return {
        name: item,
        id: i,
      };
    }
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Link href="#" component={'a'} onClick={() => router.replace('/menu') } underline="hover">Go to menu</Link>
      <Box marginBottom={"1rem"} />
      <SubMenuContext.Provider
        value={{ tabValue: value, menuData: subMenu, tabs: tabs }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            {tabs.map((tab, index) => {
              return <Tab label={tab.name.toUpperCase()} key={tab.id} />;
            })}
          </Tabs>
        </Box>
        {children}
      </SubMenuContext.Provider>
    </Box>
  );
};

export default SubMenuLayout;
