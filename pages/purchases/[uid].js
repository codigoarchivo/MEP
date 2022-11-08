import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { Box, Container, Heading, Stack, VStack } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import ShopLayout from "../../components/layout/ShopLayout";

import { Breakpoints } from "../../helpers/Breakpoints";

import { cheListAllBuy } from "../../actions/checkout";

import { CheckoutScreenAll } from "../../components/checkout/CheckoutScreenAll";

import { PaginatorProcess } from "../../utils/PaginatorProcess";

import { dbbuy } from "../../data/dbCheck";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export async function getServerSideProps(context) {
  const uid = await context.query.uid.toString();

  const product = await dbbuy(uid, 5);

  return {
    props: {
      product,
    },
  };
}

const BuyData = ({ product = [] }) => {
  // useRouter
  const { locale, push, query: que } = useRouter();
  // useSelector
  const { buy: databuy = [] } = useSelector(({ buy }) => buy);
  // useDispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { bordes, full, fondo } = Breakpoints();

  useEffect(() => {
    if (!!product[0]) {
      dispatch(cheListAllBuy(product));
    }
  }, [dispatch, product]);

  return (
    <ShopLayout title={"buys"}>
      <Container maxW={"container.lg"} px={{ base: 2, md: 4 }}>
        <Stack flexDirection={"row"} my={{ base: 0, md: 20 }} w={full}>
          <VStack
            backgroundColor={fondo}
            rounded={"lg"}
            boxShadow={"dark-lg"}
            p={{ base: 3, md: 10 }}
            w={full}
            spacing={5}
          >
            <Heading w={full} as="h2" size="lg" fontWeight="semibold">
              {locale === "en-US" ? en.historyBuy.sA : es.historyBuy.sA}
            </Heading>
            <VStack w={full} p={{ base: 2, md: 5 }} border={bordes}>
              <Heading
                w={full}
                size={"md"}
                textTransform={"uppercase"}
                px={2}
                fontWeight={"black"}
                mb={10}
              >
                {!!databuy[0]
                  ? locale === "en-US"
                    ? en.historyBuy.sB
                    : es.historyBuy.sB
                  : locale === "en-US"
                  ? en.historyBuy.sC
                  : es.historyBuy.sC}
              </Heading>
              {databuy.map((item, key) => (
                <CheckoutScreenAll
                  key={key}
                  {...item}
                  count={(key += 1)}
                  name={locale === "en-US" ? en.name : es.name}
                  quantity={locale === "en-US" ? en.quantity : es.quantity}
                  tax={locale === "en-US" ? en.tax : es.tax}
                  unit={locale === "en-US" ? en.unit : es.unit}
                  price={locale === "en-US" ? en.price : es.price}
                  paid={locale === "en-US" ? en.paid : es.paid}
                  pro={locale === "en-US" ? en.process : es.process}
                  sF={locale === "en-US" ? en.historyBuy.sF : es.historyBuy.sF}
                  push={push}
                  locale={locale}
                />
              ))}
            </VStack>
          </VStack>
        </Stack>
        <Box>
          {databuy.length > 0 && (
            <PaginatorProcess
              win={"users"}
              direct={"buys"}
              u={que.uid.toString()}
              word={"cre"}
              list={databuy}
              firstVisible={databuy[0].cre}
              lastVisible={databuy[databuy.length - 1].cre}
              newList={cheListAllBuy}
              nLimit={1}
              orHome={"desc"}
              orPrevious={"desc"}
              orNext={"desc"}
            />
          )}
        </Box>
      </Container>
    </ShopLayout>
  );
};

BuyData.propTypes = {
  product: PropTypes.array,
};

export default BuyData;
