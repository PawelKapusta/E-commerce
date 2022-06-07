import React, { useContext } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import { BasketContext, createOrder } from "../context/BasketContext";
import BasketItem from "../components/BasketItem";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const BasketScreen = () => {
  const { items } = useContext(BasketContext);
  const navigate = useNavigate();

  const handleBuyButton = async () => {
    await createOrder({ OrderPrice: 1000, PaymentMethod: "Klarna" });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h3" marginTop={10} marginBottom={3}>
        Basket
      </Typography>

      {items.length === 0 ? (
        <Typography variant="h5" marginTop={10} marginBottom={3} marginLeft={25} color="secondary">
          No items here!
        </Typography>
      ) : (
        items?.map((item, index) => (
          <Box key={item.product.ID}>
            <BasketItem key={item.product.ID} item={item} />
            {index < items.length - 1 && <Divider />}
          </Box>
        ))
      )}
      {items.length !== 0 ? (
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIosIcon />}
          onClick={() => handleBuyButton()}
        >
          Buy items
        </Button>
      ) : (
        ""
      )}
    </Container>
  );
};

export default BasketScreen;
