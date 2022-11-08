import React, { useEffect, useMemo } from "react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import {
  Button,
  Container,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";

import ShopLayout from "../../components/layout/ShopLayout";

import { Breakpoints } from "../../helpers/Breakpoints";

import {
  activeProductList,
  closeCartActive,
  saveSaleRevert,
} from "../../actions/product";

import { CheckoutScreen } from "../../components/checkout/CheckoutScreen";

import { dbbuyCheck } from "../../data/dbCheck";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export async function getServerSideProps(Context) {
  const uid = await Context.query.q.toString();

  const product = await dbbuyCheck(uid);

  return {
    props: {
      product,
    },
  };
}

const Checkout = ({ product = [] }) => {
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // useSelector
  const { activeSelectCheck: check = [] } = useSelector(
    ({ process }) => process
  );
  // dispatch
  const { push, locale } = useRouter();
  // useDispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes, full, content3, points25, fondo } = Breakpoints();

  useEffect(() => {
    // path: /cart
    dispatch(closeCartActive());
  }, [dispatch]);

  useEffect(() => {
    if (!!product[0]) {
      dispatch(activeProductList(product));
    }
  }, [dispatch, product]);

  const data = useMemo(
    () =>
      check.map((item) => {
        return {
          idP: item.id,
          process: item.process,
          cnr: item.product.cnr,
          cn: item.product.cn,
          id: item.product.id,
        };
      }),
    [check]
  );

  const handleRevert = (e) => {
    e.preventDefault();
    // revertir
    const err = locale === "en-US" ? en.error : es.error;
    const u = a.uid;
    dispatch(saveSaleRevert(data, err, u));
  };

  return (
    <ShopLayout
      title={locale === "en-US" ? en.historyBuy.sL : es.historyBuy.sL}
    >
      <Container maxW={"container.lg"} px={{ base: 2, md: 4 }}>
        <Stack
          boxShadow={"dark-lg"}
          rounded={"lg"}
          bg={fondo}
          flexDirection={"column"}
          my={{ base: 0, md: 20 }}
          w={full}
          p={{ base: 3, md: 10 }}
        >
          <Heading
            overflowY={"hidden"}
            w={full}
            as="h2"
            size="lg"
            fontWeight="semibold"
            fontSize={points25}
            mb={5}
          >
            {locale === "en-US" ? en.historyBuy.sD : es.historyBuy.sD}
          </Heading>
          <VStack w={full} p={{ base: 0, md: 5 }} border={bordes}>
            <Heading
              w={full}
              size={"md"}
              textTransform={"uppercase"}
              px={2}
              fontWeight={"black"}
              mb={{ base: 0, md: 10 }}
            >
              {!!check[0]
                ? locale === "en-US"
                  ? en.historyBuy.sB
                  : es.historyBuy.sB
                : locale === "en-US"
                ? en.historyBuy.sC
                : es.historyBuy.sC}
            </Heading>
            {check.map((item, key) => (
              <CheckoutScreen
                key={key}
                {...item}
                count={(key += 1)}
                sE={locale === "en-US" ? en.historyBuy.sE : es.historyBuy.sE}
                sF={locale === "en-US" ? en.historyBuy.sF : es.historyBuy.sF}
                sH={locale === "en-US" ? en.historyBuy.sH : es.historyBuy.sH}
                sJ={locale === "en-US" ? en.historyBuy.sJ : es.historyBuy.sJ}
                paid={locale === "en-US" ? en.paid : es.paid}
                pro={locale === "en-US" ? en.process : es.process}
                locale={locale}
                push={push}
              />
            ))}
            {!!check[0] && (
              <Stack
                as={"form"}
                onSubmit={handleRevert}
                w={"full"}
                p={{ base: 2, md: 5 }}
                flexDirection={content3}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Text overflowY={"hidden"}>
                  {locale === "en-US" ? en.historyBuy.sK : es.historyBuy.sK}{" "}
                </Text>
                <Button
                  textTransform={"uppercase"}
                  variant={"primary"}
                  type="submit"
                >
                  {locale === "en-US" ? en.clickHere : es.clickHere}
                </Button>{" "}
              </Stack>
            )}
          </VStack>
        </Stack>
      </Container>
    </ShopLayout>
  );
};

Checkout.propTypes = {
  product: PropTypes.array,
};

export default Checkout;
