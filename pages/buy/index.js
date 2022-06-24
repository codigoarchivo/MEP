import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { Box, Container, Heading, Stack, VStack } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";

import ShopLayout from "../../components/layout/ShopLayout";

import Breakpoints from "../../helpers/Breakpoints";

import { cheListAllBuy, cheListAllClearBu } from "../../actions/checkout";

import CheckoutScreenAll from "../../components/checkout/CheckoutScreenAll";

import { dbUserData } from "../../data/dbUser";

import Paginator from "../../utils/Paginator";

import Toast from "../../helpers/Toast";

const Checkout = ({ product = [] }) => {
  // useSelector
  const { buy = [] } = useSelector(({ checkout }) => checkout);
  // useDispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes, full, content5 } = Breakpoints();

  useEffect(() => {
    if (product) {
      dispatch(cheListAllBuy(product));
    } else {
      dispatch(cheListAllClearBu());
    }
  }, [dispatch, product]);

  return (
    <ShopLayout title={"buys"}>
      <Container maxW={"container.lg"}>
        <Stack flexDirection={"row"} my={20} w={full}>
          <VStack w={full} spacing={5}>
            <Heading w={full} as="h2" size="lg" fontWeight="semibold">
              Envia el dinero a la cuenta de la tienda
            </Heading>
            <Stack w={full} flexDirection={content5} spacing={0}>
              <Box w={full} mx={2}>
                <VStack spacing={5} border={bordes} p={10} boxShadow={"lg"}>
                  <VStack w={full} py={5}>
                    <Heading
                      w={full}
                      size={"md"}
                      textTransform={"uppercase"}
                      px={2}
                      fontWeight={"black"}
                      mb={10}
                    >
                      {!!buy[0]
                        ? "Lista de compras"
                        : "No hay compras asociadas"}
                    </Heading>
                    {buy.map((item, key) => (
                      <CheckoutScreenAll
                        key={key}
                        {...item}
                        count={(key += 1)}
                      />
                    ))}
                  </VStack>
                </VStack>
              </Box>
            </Stack>
          </VStack>
        </Stack>
        <Box>
          {buy.length > 0 && (
            <Paginator
              window={"buys"}
              word={"cre"}
              list={buy}
              firstVisible={buy[0].cre}
              lastVisible={buy[buy.length - 1].cre}
              newList={cheListAllBuy}
              nLimit={2}
              orHome={"desc"}
              orPrevious={"desc"}
              orNext={"desc"}
              uid={undefined}
            />
          )}
        </Box>
      </Container>
    </ShopLayout>
  );
};

Checkout.propTypes = {
  product: PropTypes.array,
};

export async function getServerSideProps({ query }) {
  const u = await query.u.toString();
  try {
    const product = await dbUserData(u, "dbUserTwo");

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

export default Checkout;
