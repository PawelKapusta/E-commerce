import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Logo from "../assets/Logo.svg";

const headersData = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: <ShoppingBasketIcon />,
    href: "/basket",
  },
  {
    label: "Login",
    href: "/login",
  },
  {
    label: "Register",
    href: "/register",
  },
];

const Header = () => {
  const displayDesktop = () => {
    return (
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <img src={Logo} alt="logo" width="60" height="60" />
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const getMenuButtons = () => {
    return headersData.map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar
        sx={{
          position: "relative",
          color: "black",
          backgroundColor: theme =>
            theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
        }}
      >
        {displayDesktop()}
      </AppBar>
    </header>
  );
};

export default Header;
