import React from "react";

import PropTypes from "prop-types";

import ShopLayout from "../../components/layout/ShopLayout";

import { Container, Stack } from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import CheckVerify from "../../components/checkout/CheckVerify";

import { dbUser, dbUserByUID } from "../../data/dbUser";

import Toast from "../../helpers/Toast";

const Verification = ({ data }) => {
  // Breakpoints
  const { content5, bordes, full } = Breakpoints();

  return (
    <ShopLayout title={"Verificar"}>
      <Container maxW={"container.xl"}>
        <Stack
          flexDirection={"column"}
          justifyContent={"space-around"}
          spacing={0}
          w={full}
          py={10}
        >
          <CheckVerify
            // boides
            bordes={bordes}
            // idThree es id del la compra del data
            idThree={data.id}
            // toda la informacion del data, que se guardo en el uid del comprador
            product={data.product}
          />
        </Stack>
      </Container>
    </ShopLayout>
  );
};

Verification.propTypes = {
  data: PropTypes.object.isRequired,
};

export async function getStaticPaths() {
  const product = await dbUser("", "dbUserOne");
  return {
    paths: product.map(({ id }) => ({
      params: {
        id: id.toString(),
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const id = await params.id.toString();

  try {
    const data = await dbUserByUID(id, "dbuserTwoID");

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
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
}

export default Verification;