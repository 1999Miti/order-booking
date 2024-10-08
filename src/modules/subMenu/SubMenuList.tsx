"use client";

import { Box, Button, Grid2 } from "@mui/material";

import {
  StyledButton,
  StyledInput,
} from "@src/common/components/StyledComponents";
import useResize from "@src/common/hooks/useResize";
import { IGlobalContext, IMenuData } from "@src/common/types";
import { GlobalContext, SubMenuContext } from "@src/common/utils";
import { useContext } from "react";

const SubMenuList = () => {
  const { width } = useResize();
  const isMobile = width && width < 800;
  const { addItem, cartItems, removeItem } = useContext(
    GlobalContext
  ) as IGlobalContext;
  const { tabValue, tabs, menuData } = useContext(SubMenuContext);

  const getCurrentTab = () => {
    return tabs.filter((tab) => tab.id === tabValue);
  };

  const getExistingItems = (data: IMenuData) => {
    const existingItems = cartItems.filter(
      (item: IMenuData) => item.subMenuId === data.subMenuId
    );
    return existingItems;
  };

  const getPrice = (data: IMenuData) => {
    return getExistingItems(data).length > 0
      ? `${parseInt(data.price) * getExistingItems(data).length} ₹`
      : data.price;
  };

  const gridData = () => {
    return menuData?.filter((menu: IMenuData) => {
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
            <Grid2
              size={isMobile ? 9 : 10}
              display={"flex"}
              flexDirection={"column"}
            >
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
            <Grid2
              size={isMobile ? 12 : 2}
              marginLeft={isMobile ? 25 : 0}
              marginTop={isMobile ? 2 : 0}
            >
              {getExistingItems(data)?.length > 0 ? (
                <Grid2 display={"flex"} flexDirection={"row"}>
                  <StyledButton onClick={() => removeItem(data)}>
                    -
                  </StyledButton>
                  <StyledInput value={getExistingItems(data).length} />
                  <StyledButton onClick={() => addItem(data)}>+</StyledButton>
                </Grid2>
              ) : (
                <Button
                  size="medium"
                  variant="contained"
                  color="secondary"
                  sx={{
                    minWidth: "5rem",
                    marginLeft: isMobile ? 6 : 4,
                  }}
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
