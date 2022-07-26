import React from "react";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../../../firebase/config";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { Container, Stack } from "@chakra-ui/react";

import ShopLayout from "../../../components/layout/ShopLayout";

import { Breakpoints } from "../../../helpers/Breakpoints";

import { Toast } from "../../../helpers/Toast";

import { SaleVerify } from "../../../components/sale/SaleVerify";

import { en } from "../../../translations/en";
import { es } from "../../../translations/es";

export async function getServerSideProps(context) {
  const id = await context.query.id.toString();
  const uid = await context.query.uid.toString();
  try {
    const docSnap = await getDoc(doc(db, "users", uid, "sales", id));
    
    const sale = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    if (!sale) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        sale,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
}

const Sales = ({ sale }) => {
  // dispatch
  const { push, locale, back } = useRouter();
  // Breakpoints
  const { bordes } = Breakpoints();

  return (
    <ShopLayout title={"sales"}>
      <Container maxW={"container.xl"} py={10}>
        <Stack flexDirection={"column"} spacing={0}>
          <SaleVerify
            bordes={bordes}
            // toda la informacion del producto, que se guardo en el uid del comprador
            product={sale.product}
            // la referencia del pago
            referencia={sale}
            // toda la informacion del comprador, que se guardo para que se refleje en el checkout
            buy={sale.buy}
            push={push}
            locale={locale}
            back={back}
            es={es}
            en={en}
          />
        </Stack>
      </Container>
    </ShopLayout>
  );
};

Sales.propTypes = {
  sale: PropTypes.object,
};

export default Sales;
