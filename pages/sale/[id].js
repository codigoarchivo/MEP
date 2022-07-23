import React from "react";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "../../firebase/config";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { Container, Stack } from "@chakra-ui/react";

import ShopLayout from "../../components/layout/ShopLayout";

import { Breakpoints } from "../../helpers/Breakpoints";

import { Toast } from "../../helpers/Toast";

import { SaleVerify } from "../../components/sale/SaleVerify";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

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
            // id del proceso de pago
            idThree={sale.id}
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

export async function getStaticPaths() {
  const { docs } = await getDocs(collection(db, "sales"));

  const sales = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    paths: sales.map(
      ({ id }) => (
        {
          params: {
            id,
          },
          locale: "en",
        },
        {
          params: {
            id,
          },
          locale: "es",
        }
      )
    ),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const id = await params.id.toString();
  try {
    const docSnap = await getDoc(doc(db, "sales", id));

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

export default Sales;
