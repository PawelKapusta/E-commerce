import React, { useState } from "react";
import http from "../api/axios";

const defaultValue = {
  items: [],
  addItem: () => {},
  removeItem: () => {},
  getQuantity: () => {},
};

export const BasketContext = React.createContext(defaultValue);

export const createOrder = async data => {
  return await http.post("/orders", data);
};

export const BasketContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState(0);
  const addItem = newProduct => {
    if (items.map(({ product }) => product).includes(newProduct)) {
      setItems(prev =>
        prev.map(({ product, quantity }) => {
          return product.ID === newProduct.ID
            ? { product, quantity: quantity + 1 }
            : { product, quantity };
        }),
      );
    } else {
      setItems(prev => [...prev, { product: newProduct, quantity: 1 }]);
    }
  };

  const removeItem = (productId, all) => {
    setItems(prev =>
      prev
        .map(({ product, quantity }) => {
          if (product.ID === productId) {
            return all ? { product, quantity: 0 } : { product, quantity: quantity - 1 };
          }
          return { product, quantity };
        })
        .filter(({ quantity }) => !!quantity),
    );
  };

  return (
    <BasketContext.Provider
      value={{
        items,
        addItem,
        removeItem,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
