import React, { useContext } from "react";
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import QuantityPick from "../components/QuantityPick";
import { BasketContext } from "../context/BasketContext";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const BasketItem = ({ item }) => {
  const { product, quantity } = item;
  const { addItem, removeItem } = useContext(BasketContext);

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        gap: 5,
        marginTop: 3,
        marginBottom: 3,
      }}
    >
      <CardMedia component="img" sx={{ maxWidth: 140, maxHeight: 150 }} image={product.ImageUrl} />

      <Grid container justifyContent="space-between">
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Grid>
            <Typography component="div" variant="subtitle1">
              {product.Name}
            </Typography>

            <Typography component="div" variant="h6">
              {product.Name}
            </Typography>
          </Grid>

          <Grid>
            <Typography>{product.Price * quantity} zł</Typography>
            <Typography variant="caption">
              {quantity} x {product.Price}
            </Typography>
          </Grid>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <QuantityPick
            quantity={quantity}
            addItem={() => addItem(product)}
            removeItem={() => removeItem(product.ID)}
          />
          <Button
            variant="contained"
            color="secondary"
            endIcon={<DeleteIcon />}
            onClick={() => removeItem(product.ID, true)}
          >
            Remove
          </Button>
        </Box>
      </Grid>
    </Card>
  );
};

export default BasketItem;
