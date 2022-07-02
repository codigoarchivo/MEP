import React, { useEffect } from "react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";

import ShopLayout from "../../components/layout/ShopLayout";

import Breakpoints from "../../helpers/Breakpoints";

import {
  activeProductList,
  closeActive,
  saveSaleRevert,
} from "../../actions/product";

import CheckoutScreen from "../../components/checkout/CheckoutScreen";

import { dbUserData } from "../../data/dbUser";

import Toast from "../../helpers/Toast";

import es from "../../translations/es";
import en from "../../translations/en";

const Checkout = ({ product = [] }) => {
  // useSelector
  const { activeSelectCheck: check = [] } = useSelector(
    ({ process }) => process
  );
  // dispatch
  const { push, locale } = useRouter();
  // useDispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes, full, content5 } = Breakpoints();

  useEffect(() => {
    if (product) {
      dispatch(activeProductList(product));
    }
  }, [dispatch, product]);

  useEffect(() => {
    // path: /cart
    dispatch(closeActive());
  }, [dispatch]);

  const handleRevert = async () => {
    // revertir
    const data = await check.map((item) => {
      return {
        idP: item.id,
        process: item.process,
        cnr: item.product.cnr,
        cn: item.product.cn,
        id: item.product.id,
      };
    });
    const err = locale === "en" ? en.error : es.error;
    dispatch(saveSaleRevert(data, err));

    push("/");
  };

  return (
    <ShopLayout title={locale === "en" ? en.historyBuy.sL : es.historyBuy.sL}>
      <Container maxW={"container.lg"}>
        <Stack flexDirection={"row"} my={20} w={full}>
          <VStack w={full} spacing={5}>
            <Heading w={full} as="h2" size="lg" fontWeight="semibold">
              {locale === "en" ? en.historyBuy.sD : es.historyBuy.sD}
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
                      {!!check[0]
                        ? locale === "en"
                          ? en.historyBuy.sB
                          : es.historyBuy.sB
                        : locale === "en"
                        ? en.historyBuy.sC
                        : es.historyBuy.sC}
                    </Heading>
                    {check.map((item, key) => (
                      <CheckoutScreen
                        key={key}
                        {...item}
                        count={(key += 1)}
                        sE={
                          locale === "en" ? en.historyBuy.sE : es.historyBuy.sE
                        }
                        sF={
                          locale === "en" ? en.historyBuy.sF : es.historyBuy.sF
                        }
                        sH={
                          locale === "en" ? en.historyBuy.sH : es.historyBuy.sH
                        }
                        sJ={
                          locale === "en" ? en.historyBuy.sJ : es.historyBuy.sJ
                        }
                        paid={locale === "en" ? en.paid : es.paid}
                        pro={locale === "en" ? en.process : es.process}
                        locale={locale}
                        push={push}
                      />
                    ))}
                  </VStack>
                  <Box w={"full"}>
                    {!!check[0] && (
                      <>
                        <HStack>
                          <Text>
                            {locale === "en"
                              ? en.historyBuy.sK
                              : es.historyBuy.sK}{" "}
                          </Text>
                          <Button
                            onClick={handleRevert}
                            textTransform={"uppercase"}
                            variant={"secondary"}
                          >
                            {locale === "en" ? en.clickHere : es.clickHere}
                          </Button>{" "}
                        </HStack>
                      </>
                    )}
                  </Box>
                </VStack>
              </Box>
            </Stack>
          </VStack>
        </Stack>
      </Container>
    </ShopLayout>
  );
};

Checkout.propTypes = {
  product: PropTypes.array,
};

export async function getServerSideProps({ query }) {
  const q = await query.q.toString();
  try {
    const product = await dbUserData(q, "dbUserTwo");

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
