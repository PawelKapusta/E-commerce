import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ErrorScreen from "./screens/ErrorScreen";
import Header from "./components/Header";
import { responsiveFontSizes } from "@mui/material/styles";
import { ProductsContextProvider } from "./context/ProductsContext";
import { BasketContextProvider } from "./context/BasketContext";
import { SnackbarProvider } from "notistack";
import ProductsScreen from "./screens/ProductsScreen";
import ProductsDetailsScreen from "./screens/ProductDetailsScreen";
import BasketScreen from "./screens/BasketScreen";
import PaymentScreen from "./screens/PaymentScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Footer from "./components/Footer";

const theme = createTheme({
  palette: {
    primary: {
      light: "#fffd61",
      main: "#ffca28",
      dark: "#c79a00",
      contrastText: "#000",
    },
    secondary: {
      light: "#d7ffd9",
      main: "#a5d6a7",
      dark: "#75a478",
      contrastText: "#000",
    },
    text: {
      primary: "#000",
      secondary: "#fff",
    },
  },
});

const AppContextProvider = ({ children }) => (
  <ProductsContextProvider>
    <BasketContextProvider>
      <SnackbarProvider maxSnack={5} variant="success" autoHideDuration={800}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </SnackbarProvider>
    </BasketContextProvider>
  </ProductsContextProvider>
);

const App = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  return (
    <BrowserRouter>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header />
            <Routes>
              <Route exact path="/" element={<HomeScreen />} />
              <Route exact path="/products" element={<ProductsScreen />} />
              <Route exact path="/products/:id" element={<ProductsDetailsScreen />} />
              <Route exact path="/basket" element={<BasketScreen />} />
              <Route path="/basket/payment" element={<PaymentScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="*" element={<ErrorScreen />} />
            </Routes>
          </Box>
        </ThemeProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
};

export default App;
