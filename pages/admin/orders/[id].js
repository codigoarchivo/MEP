import React from "react";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../../../firebase/config";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { Container, Stack } from "@chakra-ui/react";

import ShopLayout from "../../../components/layout/ShopLayout";

import { Breakpoints } from "../../../helpers/Breakpoints";

import { SaleVerifyAll } from "../../../components/admin/SaleVerifyAll";

import { dbAdminById } from "../../../data/dbAdmin";

import { en } from "../../../translations/en";
import { es } from "../../../translations/es";

export async function getStaticPaths({ locales }) {
  const { docs } = await getDocs(collection(db, "sales"));

  const sales = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const paths = [];

  for (const locale of locales) {
    sales.map((item) => {
      paths.push({ params: { id: item.id }, locale });
    });
  }

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const id = await params.id.toString();

  const active = await dbAdminById(id);

  if (!active) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      active,
    },
  };
}

const Orders = ({ active }) => {
  // dispatch
  const { push, locale, back } = useRouter();
  // Breakpoints
  const { bordes } = Breakpoints();

  return (
    <ShopLayout
      title={locale === "en-US" ? en.historySale.sD : es.historySale.sD}
    >
      <Container
        maxW={"container.xl"}
        px={{ base: 2, md: 4 }}
        py={{ base: 0, md: 10 }}
      >
        <Stack flexDirection={"column"} spacing={0}>
          <SaleVerifyAll
            bordes={bordes}
            // toda la informacion del producto
            product={active.product}
            // toda la imformación en general
            referencia={active}
            // id del proceso
            idThree={active.id}
            // uid del comprador
            buy={active.buy}
            // uid que esta producto se utiliza para comparar con el uid owner
            sal={active.product.uid}
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

Orders.propTypes = {
  active: PropTypes.object,
};

export default Orders;
