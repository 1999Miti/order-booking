"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { subMenuData } from "@/common/data/subMenuData";
import { useParams, useRouter } from "next/navigation";
import { createContext } from "react";
import {
  IGlobalContext,
  IMenuData,
  ISubMenuData,
  ISummary,
} from "@/common/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from "@mui/material";
import { GlobalContext } from "../layout";

export const SubMenuContext = createContext<ISubMenuData | null>(null);

const SubMenuLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const { cartItems, setCartItems } = React.useContext(
    GlobalContext
  ) as IGlobalContext;
  const params = useParams();
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const generateBillSummary = (
    items: IMenuData[]
  ): { summary: ISummary; totalAmount: number } => {
    const summary: ISummary = {};
    let totalAmount = 0;
    items.forEach((item) => {
      const { name, price } = item;
      const priceAmount = parseFloat(price.replace(" ₹", ""));

      if (summary[name]) {
        summary[name].count += 1;
      } else {
        summary[name] = { count: 1, price: priceAmount };
      }

      totalAmount += priceAmount;
    });

    return { summary, totalAmount };
  };

  const { summary, totalAmount } = generateBillSummary(cartItems);

  return (
    <Box sx={{ width: "100%" }}>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Link
          href="#"
          component={"a"}
          onClick={() => router.replace("/menu")}
          underline="hover"
        >
          Go to menu
        </Link>
        {cartItems.length > 0 && (
          <Button
            size="medium"
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            Confirm order
          </Button>
        )}
      </Box>
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
        <Dialog
          fullWidth
          maxWidth={"md"}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirm order?"}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              display={"flex"}
              flexDirection={"column"}
            >
              {Object.keys(summary)?.map((itemName, i) => {
                const item = summary[itemName];
                return (
                  <Box sx={{ color: "black" }} key={i}>
                    {item.count > 1 ? `${itemName} x${item.count}` : itemName}
                  </Box>
                );
              })}
              <Box
                sx={{ color: "black", marginTop: "1rem" }}
              >{`Total Amount: ${totalAmount} ₹`}</Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button
              onClick={() => {
                if (window !== undefined) {
                  window.alert("Place order");
                }
                setCartItems([]);
                setOpen(false);
              }}
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </SubMenuContext.Provider>
    </Box>
  );
};

export default SubMenuLayout;
