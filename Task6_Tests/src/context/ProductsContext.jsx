import React, { useState } from "react";
import http from "../api/axios";

const defaultState = {
  products: [],
  setProducts: () => {},
  getById: () => undefined,
};

export const ProductsContext = React.createContext(defaultState);

export const fetchProducts = async () => {
  return await http.get(`/products`);
};

export const fetchProductById = id => http.get(`/products/${id}`);

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const providerValue = {
    products,
    setProducts,
    getById: id => products.find(p => p.id === id),
  };

  return <ProductsContext.Provider value={providerValue}>{children}</ProductsContext.Provider>;
};
