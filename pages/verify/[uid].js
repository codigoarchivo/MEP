import React from "react";

import PropTypes from "prop-types";

import ShopLayout from "../../components/layout/ShopLayout";

import { Container, Stack } from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import CheckVerify from "../../components/checkout/CheckVerify";

import { dbUserByUID } from "../../data/dbUser";

import Toast from "../../helpers/Toast";

const Verify = ({ data: { product }, verify, uid }) => {
  const { content5, bordes, full } = Breakpoints();

  return (
    <ShopLayout title={"Verificar"}>
      <Container maxW={"container.xl"}>
        <Stack
          flexDirection={"column"}
          spacing={0}
          w={full}
          justifyContent={"space-around"}
          py={10}
        >
          <CheckVerify
            // uid del comprador
            uid={uid}
            // boides
            bordes={bordes}
            // idThree es id del la compra del data
            idThree={verify}
            // toda la informacion del data, que se guardo en el uid del comprador
            product={product}
          />
        </Stack>
      </Container>
    </ShopLayout>
  );
};

Verify.propTypes = {
  data: PropTypes.object.isRequired,
  verify: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
};

export async function getServerSideProps({ query }) {
  const v = await query.v.toString();
  const uid = await query.uid.toString();

  try {
    const data = await dbUserByUID(uid, "dbuserTwoID", v);

    if (!data) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      props: {
        data,
        verify: v,
        uid,
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
