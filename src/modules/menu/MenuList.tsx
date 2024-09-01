"use client";
import { menuData } from "@/common/data";
import useResize from "@/common/hooks/useResize";
import { Box, ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const MenuList = () => {
  const { width } = useResize();
  const router = useRouter();
  const isMobile = width && width < 800;
  return (
    <Box>
      <ImageList
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        {menuData.map((menu) => (
          <ImageListItem
            key={menu.id}
            sx={{ alignItems: "center" }}
            onClick={() => router.push(`/menu/${menu.id}`)}
          >
            <Image
              width={160}
              height={150}
              alt={menu.title}
              src={menu.img}
              priority
            />
            <h4>{menu.title}</h4>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default MenuList;
