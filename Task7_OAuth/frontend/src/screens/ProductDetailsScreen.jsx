import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext, fetchProductById } from "../context/ProductsContext";
import { Button, Container, Grid, Typography } from "@mui/material";
import { BasketContext } from "../context/BasketContext";
import { useSnackbar } from "notistack";

const ProductsDetailsScreen = () => {
  const [product, setProduct] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { getById } = useContext(ProductsContext);
  const { addItem } = useContext(BasketContext);

  useEffect(() => {
    if (id) {
      const byId = getById(Number(id));
      if (byId) {
        setProduct(byId);
      } else {
        fetchProductById(Number(id)).then(res => setProduct(res?.data));
      }
    }
  }, [id]);

  const handleAddItem = () => {
    if (product) {
      addItem(product);
      enqueueSnackbar("Successfully added to basket!", { variant: "success" });
    }
  };

  return (
    <Container>
      {product ? (
        <Grid container spacing={12} justifyContent="space-between" marginTop={3}>
          <Grid item xs={6}>
            <Grid container justifyContent="center">
              <img
                src={`${product.ImageUrl}`}
                alt={product.Name + " photo"}
                loading="lazy"
                style={{ width: "600px" }}
              />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Typography component="div" variant="h5" gutterBottom marginBottom={2}>
              {product.Name}
            </Typography>
            <Typography component="div" fontSize={20} gutterBottom marginBottom={6}>
              Max quantity: {product.Quantity}
            </Typography>
            <Typography marginBottom={10} variant="body1">
              {product.Description}
            </Typography>
            <Button
              variant="contained"
              sx={{ background: "linear-gradient(to right, #ff0099, #493240)" }}
              fullWidth
              disableElevation
              onClick={handleAddItem}
            >
              Add to cart
            </Button>
          </Grid>
        </Grid>
      ) : (
        <>Something goes wrong!</>
      )}
    </Container>
  );
};

export default ProductsDetailsScreen;
