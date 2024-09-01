"use client";
import { SubMenuContext } from "@/app/menu/[id]/layout";
import { GlobalContext } from "@/app/menu/layout";
import {
  StyledButton,
  StyledInput,
} from "@/common/components/StyledComponents";
import useResize from "@/common/hooks/useResize";
import { IGlobalContext, IMenuData, ISubMenuData } from "@/common/types";
import {
  Alert,
  Box,
  Button,
  Grid2,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import React, { useContext, useState } from "react";

const SubMenuList = () => {
  const { width } = useResize();
  const [open, setOpen] = useState(false);
  const isMobile = width && width < 800;
  const { addItems, cartItems } = useContext(GlobalContext) as IGlobalContext;
  const { tabValue, tabs, menuData } = useContext(
    SubMenuContext
  ) as ISubMenuData;

  const getCurrentTab = () => {
    return tabs.filter((tab) => tab.id === tabValue);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const addOrRemoveItem = (data: IMenuData) => {
    const existingItem = cartItems.filter(
      (item) => item.subMenuId === data.subMenuId
    );
    if (existingItem?.length > 0) {
      return (
        <Grid2 container>
          <Grid2 display={"flex"} flexDirection={"row"}>
            <StyledButton>-</StyledButton>
            <StyledInput value={6} />
            <StyledButton onClick={() => console.log("add")}>+</StyledButton>
          </Grid2>
        </Grid2>
      );
    } else {
      return (
        <>
          <Button
            size="medium"
            variant="contained"
            color="secondary"
            onClick={() => {
              setOpen(true);
              addItems(data);
            }}
          >
            ADD
          </Button>
        </>
      );
    }
  };

  const gridData = () => {
    return menuData?.filter((menu) => {
      return menu.type === getCurrentTab()[0]?.name;
    });
  };

  return (
    <Box>
      <Box marginBottom={"1.5rem"} />
      {gridData()?.map((data) => {
        return (
          <Grid2
            container
            display={"flex"}
            flexDirection={"row"}
            key={data.subMenuId}
            marginBottom={"2rem"}
          >
            <Grid2 size={10} display={"flex"} flexDirection={"column"}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                marginRight={5}
              >
                <Box marginTop={isMobile ? "5px" : "0px"}>{data.name}</Box>
                <Box marginTop={"5px"}>{data.price}</Box>
              </Box>
              {!isMobile && <Box>{data.description}</Box>}
            </Grid2>
            <Grid2 size={2}>{addOrRemoveItem(data)}</Grid2>
          </Grid2>
        );
      })}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Item Added!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SubMenuList;
