"use client";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  PaletteMode,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import {
  IMenuData,
  ISlots
} from "@src/common/types";
import { GlobalContext } from "@src/common/utils";
import { useCallback, useMemo, useState } from "react";

export default function MenuLayout(props: Readonly<ISlots>) {
  const { children, settings } = props;
  const [theme, setTheme] = useState<string>("light");
  const themeData = createTheme({
    palette: {
      mode: theme as PaletteMode,
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          sx: {
            "& .MuiButtonBase-root": {
              color: "red !important",
            },
          },
        },
      },
    },
  });
  const [cartItems, setCartItems] = useState<IMenuData[]>([]);

  const addItem = useCallback(
    (data: IMenuData) => {
      setCartItems([...cartItems, data]);
    },
    [cartItems]
  );

  const removeItem = (data: IMenuData) => {
    setCartItems((prevData) => {
      const index = prevData.indexOf(data);
      if (index !== -1) {
        const newCartItems = [...prevData];
        newCartItems.splice(index, 1);
        return newCartItems;
      }
      return prevData;
    });
  };
  return (
    <ThemeProvider theme={themeData}>
      <GlobalContext.Provider
        value={useMemo(
          () => ({
            cartItems,
            addItem,
            removeItem,
            setCartItems,
            theme,
            setTheme,
          }),
          [addItem, cartItems, theme]
        )}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Order Online
            </Typography>
            <Box>{settings}</Box>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <h2>What you would like to eat today ?</h2>
          {children}
        </Container>
      </GlobalContext.Provider>
    </ThemeProvider>
  );
}
