import React from "react";

import { useRouter } from "next/router";

import { Container, Stack } from "@chakra-ui/react";

import Breakpoints from "../../../helpers/Breakpoints";

import CheckVerify from "../../../components/checkout/CheckVerify";

import ShopLayout from "../../../components/layout/ShopLayout";

import { dbUser } from "../../../data/dbUser";

import Toast from "../../../helpers/Toast";

const Verify = ({ product }) => {
  const { content5, bordes, full } = Breakpoints();
  // dispatch
  const router = useRouter();

  const { id, uid, to, na, cn, pr, in: ind, verify } = router.query;
  console.log(product);
  // const product = {
  //   id,
  //   uid,
  //   to,
  //   na,
  //   cn,
  //   pr,
  //   in: ind,
  // };
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
          {/* <CheckVerify
            bordes={bordes}
            // idThree es id del la compra del producto
            idThree={verify}
            // toda la informacion del producto, que se guardo en el uid del comprador
            product={product}
          /> */}
        </Stack>
      </Container>
    </ShopLayout>
  );
};

export async function getServerSideProps({ params }) {
  const verify = await params.verify;
  const uid = await params.uid;

  console.log(verify, uid);
  try {
    const product = await dbUser(uid, "dbUserThree", verify);

    if (!product) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        product,
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
