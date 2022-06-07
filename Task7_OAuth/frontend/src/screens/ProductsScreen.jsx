import React, { useContext, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { ProductsContext, fetchProducts } from "../context/ProductsContext";

const ProductsScreen = () => {
  const { products, setProducts } = useContext(ProductsContext);

  useEffect(() => {
    fetchProducts().then(res => setProducts(res?.data));
  }, []);

  return (
    <Container>
      <Grid container spacing={2} marginTop={10}>
        {products?.map(product => (
          <Grid key={product.ID} item lg={3} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsScreen;
