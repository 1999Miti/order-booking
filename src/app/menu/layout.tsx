"use client";
import { IGlobalContext, IMenuData } from "@/common/types";
import { Container } from "@mui/material";
import { createContext } from "react";

export const GlobalContext = createContext<IGlobalContext | null>(null);

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cartItems: IMenuData[] = [];
  const addItems = (data: IMenuData) => {
    cartItems.push(data);
  };
  return (
    <GlobalContext.Provider value={{ cartItems, addItems }}>
      <Container fixed>
        <h2>What you would like to eat today ?</h2>
        {children}
      </Container>
    </GlobalContext.Provider>
  );
}
