import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { Container, Stack } from "@chakra-ui/react";

import ShopLayout from "../../../components/layout/ShopLayout";

import Breakpoints from "../../../helpers/Breakpoints";

import SaleVerify from "../../../components/sale/SaleVerify";

import Toast from "../../../helpers/Toast";

import { dbUserByUID } from "../../../data/dbUser";

import { cheListAllActive } from "../../../actions/sales";


const Orders = ({ productbuy }) => {
  // useSelector
  const { active } = useSelector(({ sale }) => sale);
  // Breakpoints
  const { content5, bordes } = Breakpoints();

  const dispatch = useDispatch();

  useEffect(() => {
    if (productbuy) {
      dispatch(cheListAllActive(productbuy));
    } 
  }, [dispatch, productbuy]);

  return (
    <ShopLayout>
      <Container maxW={"container.xl"} py={10}>
        <Stack flexDirection={"column"} spacing={0}>
          <SaleVerify
            bordes={bordes}
            // toda la informacion del producto, que se guardo en el uid del comprador
            product={active?.product}
            // la referencia del pago
            referencia={active}
            // id del proceso de pago
            idThree={active?.id}
            // toda la informacion del comprador, que se guardo para que se refleje en el checkout
            uidBuy={active?.uidBuy}
            // toda la informacion del vendedor, que se guardo para que se refleje en el checkout
            uidSale={active?.product?.uid}
          />
        </Stack>
      </Container>
    </ShopLayout>
  );
};

Orders.propTypes = {
  productbuy: PropTypes.object,
};

export async function getServerSideProps({ query }) {
  const id = await query.id.toString();
  try {
    // compra del producto path: /buys
    const productbuy = await dbUserByUID(id, "dbuserThreeID");

    if (!productbuy) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        productbuy,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return { props: {} };
  }
}
export default Orders;
