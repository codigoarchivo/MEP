import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import ShopLayout from "../../components/layout/ShopLayout";

import { Container, Stack } from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import CheckVerify from "../../components/checkout/CheckVerify";

import { dbUser, dbUserByUID } from "../../data/dbUser";

import Toast from "../../helpers/Toast";

import { cheVerify } from "../../actions/checkout";

const Verification = ({ data }) => {
  // useDispatch
  const dispatch = useDispatch();
  // useSelector
  const { daVery } = useSelector(({ checkout }) => checkout);
  // Breakpoints
  const { content5, bordes, full } = Breakpoints();

  useEffect(() => {
    if (data) {
      dispatch(cheVerify(data));
    }
  }, [dispatch, data]);

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
            idThree={daVery.id}
            // toda la informacion del data, que se guardo en el uid del comprador
            product={daVery.product}
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
