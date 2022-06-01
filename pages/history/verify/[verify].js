import React from "react";

import { useRouter } from "next/router";

import { Container, Stack } from "@chakra-ui/react";

import { doc, getDoc } from "firebase/firestore";

import ShopLayout from "../../../components/layout/ShopLayout";

import { db } from "../../../firebase/config";

import Breakpoints from "../../../helpers/Breakpoints";

import SaleVerify from "../../../components/sale/SaleVerify";

const Verify = ({ dataUser = {}, dataUser2 = {} }) => {
  // Breakpoints
  const { content5, bordes } = Breakpoints();
  // dispatch
  const router = useRouter();

  return (
    <ShopLayout>
      <Container maxW={"container.lg"} py={10}>
        <Stack flexDirection={content5} spacing={0}>
          <SaleVerify
            bordes={bordes}
            // idThree es id del la compra del producto
            idThree={router.query.verify}
            // toda la informacion del producto, que se guardo en el uid del comprador
            product={dataUser2.sale.product}
            // la referenciadel pago
            referencia={dataUser2.sale}
            // toda la informacion del vendedor, que se guardo para que se refleje en el checkout
            sale={dataUser}
          />
        </Stack>
      </Container>
    </ShopLayout>
  );
};

export async function getServerSideProps(context) {
  const dA = process.env.NEXT_PUBLIC_ROL_A;
  const { uid = "", verify = "" } = await context.query;
  try {
    let dataUser = {};
    if (dA !== uid) {
      const docRef = doc(db, "users", uid.toString());

      const docSnap = await getDoc(docRef);

      dataUser = {
        id: docSnap.id,
        ...docSnap.data(),
      };
    }

    const docRef2 = doc(db, "users", uid.toString(), "sales", verify);

    const docSnap2 = await getDoc(docRef2);

    const dataUser2 = {
      id: docSnap2.id,
      ...docSnap2.data(),
    };

    return {
      props: {
        dataUser: JSON.parse(JSON.stringify(dataUser)),
        dataUser2: JSON.parse(JSON.stringify(dataUser2)),
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
}

export default Verify;
