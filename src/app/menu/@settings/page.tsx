"use client";

import React, { useContext, useEffect } from "react";

import { MaterialUISwitch } from "@src/common/components/StyledComponents";
import { IGlobalContext } from "@src/common/types";
import { GlobalContext } from "@src/common/utils";

const SettingsPage = () => {
  const { setTheme } = useContext(GlobalContext) as IGlobalContext;
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    if (checked === false) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [checked, setTheme]);

  return (
    <MaterialUISwitch
      color="secondary"
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

export default SettingsPage;
