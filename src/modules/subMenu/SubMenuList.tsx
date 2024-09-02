"use client";
import { SubMenuContext } from "@/app/menu/[id]/layout";
import { GlobalContext } from "@/app/menu/layout";
import {
  StyledButton,
  StyledInput,
} from "@/common/components/StyledComponents";
import useResize from "@/common/hooks/useResize";
import { IGlobalContext, IMenuData, ISubMenuData } from "@/common/types";
import { Box, Button, Grid2, SnackbarCloseReason } from "@mui/material";
import React, { useContext, useState } from "react";

const SubMenuList = () => {
  const { width } = useResize();
  const isMobile = width && width < 800;
  const { addItem, cartItems, removeItem } = useContext(
    GlobalContext
  ) as IGlobalContext;
  const { tabValue, tabs, menuData } = useContext(
    SubMenuContext
  ) as ISubMenuData;

  const getCurrentTab = () => {
    return tabs.filter((tab) => tab.id === tabValue);
  };

  const getExistingItems = (data: IMenuData) => {
    const existingItems = cartItems.filter(
      (item) => item.subMenuId === data.subMenuId
    );
    return existingItems;
  };

  const getPrice = (data: IMenuData) => {
    return getExistingItems(data).length > 0
      ? parseInt(data.price) * getExistingItems(data).length
      : data.price;
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
                <Box marginTop={"5px"}>{getPrice(data)}</Box>
              </Box>
              {!isMobile && <Box>{data.description}</Box>}
            </Grid2>
            <Grid2 size={2}>
              {getExistingItems(data)?.length > 0 ? (
                <Grid2 container>
                  <Grid2 display={"flex"} flexDirection={"row"}>
                    <StyledButton onClick={() => removeItem(data)}>
                      -
                    </StyledButton>
                    <StyledInput value={getExistingItems(data).length} />
                    <StyledButton onClick={() => addItem(data)}>+</StyledButton>
                  </Grid2>
                </Grid2>
              ) : (
                <Button
                  size="medium"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    addItem(data);
                  }}
                >
                  ADD
                </Button>
              )}
            </Grid2>
          </Grid2>
        );
      })}
    </Box>
  );
};

export default SubMenuList;
