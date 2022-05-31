import React from "react";

import { useRouter } from "next/router";

import { Container, Stack } from "@chakra-ui/react";

import { doc, getDoc } from "firebase/firestore";

import ShopLayout from "../../../components/layout/ShopLayout";

import { db } from "../../../firebase/config";

import Breakpoints from "../../../helpers/Breakpoints";

import SaleVerify from "../../../components/sale/SaleVerify";

const Verify = ({ dataUser = {}, dataUser2 = {}, dataUser3 = {} }) => {
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
            product={dataUser3.sale.product}
            // la referenciadel pago
            referencia={dataUser3.sale}
            // toda la informacion del comprador, que se guardo para que se refleje en el checkout
            buy={dataUser}
            // toda la informacion del vendedor, que se guardo para que se refleje en el checkout
            sale={dataUser2}
          />
        </Stack>
      </Container>
    </ShopLayout>
  );
};

export async function getServerSideProps(context) {
  const dA = process.env.NEXT_PUBLIC_ROL_A;
  const { uidBuy = "", uid = "", verify = "" } = await context.query;
  try {
    const docRef = doc(db, "users", uidBuy.toString());

    const docSnap = await getDoc(docRef);

    const dataUser = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    let dataUser2 = {};
    if (dA !== uid) {
      const docRef2 = doc(db, "users", uid.toString());

      const docSnap2 = await getDoc(docRef2);

      dataUser2 = {
        id: docSnap.id,
        ...docSnap2.data(),
      };
    }

    const docRef3 = doc(db, "users", uid.toString(), "sales", verify);

    const docSnap3 = await getDoc(docRef3);

    const dataUser3 = {
      id: docSnap.id,
      ...docSnap3.data(),
    };

    return {
      props: {
        dataUser: JSON.parse(JSON.stringify(dataUser)),
        dataUser2: JSON.parse(JSON.stringify(dataUser2)),
        dataUser3: JSON.parse(JSON.stringify(dataUser3)),
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
