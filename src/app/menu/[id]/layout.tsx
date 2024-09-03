"use client";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { useParams, useRouter } from "next/navigation";
import { useContext, useMemo, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
} from "@mui/material";
import { subMenuData } from "@src/common/data/subMenuData";
import { IGlobalContext, IMenuData, ISummary } from "@src/common/types";
import { GlobalContext, SubMenuContext } from "@src/common/utils";

export default function SubMenuLayout(
  props: Readonly<{ children?: JSX.Element }>
) {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const { cartItems, setCartItems } = useContext(
    GlobalContext
  ) as IGlobalContext;
  const params = useParams();
  const router = useRouter();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const subMenu = subMenuData.filter(
    (data) => data.menuId === parseInt(params.id as string)
  );
  const tabs = Array.from(new Set(subMenu.map((tab) => tab.type))).map(
    (item, i) => ({
      name: item,
      id: i,
    })
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
        value={useMemo(
          () => ({ tabValue: value, menuData: subMenu, tabs }),
          [subMenu, tabs, value]
        )}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            {tabs.map((tab) => (
              <Tab label={tab.name.toUpperCase()} key={tab.id} />
            ))}
          </Tabs>
        </Box>
        {props.children}
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
                if (typeof window !== "undefined") {
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
}
