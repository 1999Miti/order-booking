"use client";
import { IGlobalContext, IMenuData } from "@/common/types";
import { Container } from "@mui/material";
import { createContext, useState } from "react";

export const GlobalContext = createContext<IGlobalContext | null>(null);

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cartItems, setCartItems] = useState<IMenuData[]>([]);
  const addItem = (data: IMenuData) => {
    setCartItems([...cartItems, data]);
  };
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
    <GlobalContext.Provider
      value={{ cartItems, addItem, removeItem, setCartItems }}
    >
      <Container fixed>
        <h2>What you would like to eat today ?</h2>
        {children}
      </Container>
    </GlobalContext.Provider>
  );
}
