import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { Container, Stack } from "@chakra-ui/react";

import ShopLayout from "../../../components/layout/ShopLayout";

import Breakpoints from "../../../helpers/Breakpoints";

import SaleVerify from "../../../components/sale/SaleVerify";

import Toast from "../../../helpers/Toast";

import { dbUserByUID } from "../../../data/dbUser";

import { cheListAllActive } from "../../../actions/checkout";

const Verify = ({ uidSale, productbuy, uidBuy }) => {
  // useSelector
  const { active } = useSelector(({ checkout }) => checkout);
  // Breakpoints
  const { content5, bordes } = Breakpoints();

  const dispatch = useDispatch();

  useEffect(() => {
    if (uidSale || productbuy || uidBuy) {
      dispatch(
        cheListAllActive({
          uidSale,
          productbuy,
          uidBuy,
        })
      );
    }
  }, [dispatch, uidSale, productbuy, uidBuy]);

  return (
    <ShopLayout>
      <Container maxW={"container.xl"} py={10}>
        <Stack flexDirection={"column"} spacing={0}>
          <SaleVerify
            bordes={bordes}
            // toda la informacion del producto, que se guardo en el uid del comprador
            product={active?.productbuy?.product}
            // la referenciadel pago
            referencia={active?.productbuy}
            // toda la informacion del vendedor, que se guardo para que se refleje en el checkout
            sale={!active?.uidSale ? active?.uidSale : null}
            // toda la informacion del comprador, que se guardo para que se refleje en el checkout
            uidBuy={active?.uidBuy}
            // id del proceso de pago
            idThree={active?.productbuy?.id}
            // id del producto
            idProduct={active?.productbuy?.product?.uid}
          />
        </Stack>
      </Container>
    </ShopLayout>
  );
};

Verify.propTypes = {
  uidSale: PropTypes.object,
  productbuy: PropTypes.object,
  uidBuy: PropTypes.object,
};

export async function getServerSideProps({ query }) {
  const dA = process.env.NEXT_PUBLIC_ROL_A.toString();
  const idp = await query.id.toString();
  const idb = await query.b.toString();
  let ids = await query.s.toString();

  try {
    let uidSale = {};
    if (dA !== ids) {
      uidSale = await dbUserByUID(ids, "dbUserOneID");
    }
    const uidBuy = await dbUserByUID(idb, "dbUserOneID");
    const productbuy = await dbUserByUID(ids, "dbuserThreeID", idp);

    if (!uidSale || !productbuy || !uidBuy) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        uidBuy,
        uidSale,
        productbuy,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return { props: {} };
  }
}
export default Verify;
