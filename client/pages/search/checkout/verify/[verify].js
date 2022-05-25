import React from "react";

import { Container, Stack } from "@chakra-ui/react";

import { doc, getDoc } from "firebase/firestore";

import Breakpoints from "../../../../helpers/Breakpoints";

import { db } from "../../../../firebase/config";

import CheckVerify from "../../../../components/checkout/CheckVerify";

import ShopLayout from "../../../../components/layout/ShopLayout";

const Verify = ({ dataUser }) => {
  const { content5, bordes, full } = Breakpoints();
  return (
    <ShopLayout>
      <Container maxW={"container.lg"}>
        <Stack
          flexDirection={content5}
          spacing={0}
          w={full}
          justifyContent={"space-around"}
          py={10}
        >
          <CheckVerify
            bordes={bordes}
            // idThree es id del la compra del producto
            idThree={dataUser.id}
            // toda la informacion del producto, que se guardo en el uid del comprador
            product={dataUser.product}
            // toda la informacion del comprador, que se guardo para que se refleje en el checkout
            buy={dataUser.buy}
            // toda la informacion del vendedor, que se guardo para que se refleje en el checkout
            sale={dataUser.sale}
            // información del pago del producto
            info={dataUser.info}
          />
        </Stack>
      </Container>
    </ShopLayout>
  );
};

export async function getServerSideProps(context) {
  const { verify = "", n = "" } = await context.query;
  try {
    const docRef = doc(db, "users", n, "buys", verify);

    const docSnap = await getDoc(docRef);

    const dataUser = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return {
      props: {
        dataUser: JSON.parse(JSON.stringify(dataUser)),
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
