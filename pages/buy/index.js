import React, { useEffect } from "react";

import { collection, getDocs, limit, where } from "firebase/firestore";

import { db } from "../../firebase/config";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { Box, Container, Heading, Stack, VStack } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";

import ShopLayout from "../../components/layout/ShopLayout";

import { Breakpoints } from "../../helpers/Breakpoints";

import { cheListAllBuy, cheListAllClearBu } from "../../actions/checkout";

import { CheckoutScreenAll } from "../../components/checkout/CheckoutScreenAll";

import { Paginator } from "../../utils/Paginator";

import { Toast } from "../../helpers/Toast";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

const Buy = ({ product = [] }) => {
  // useRouter
  const { locale, push } = useRouter();
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
              {locale === "en" ? en.historyBuy.sA : es.historyBuy.sA}
            </Heading>
            <VStack w={full} p={{ base: 1, md: 5 }} border={bordes}>
              <Heading
                w={full}
                size={"md"}
                textTransform={"uppercase"}
                px={2}
                fontWeight={"black"}
                mb={10}
              >
                {!!buy[0]
                  ? locale === "en"
                    ? en.historyBuy.sB
                    : es.historyBuy.sB
                  : locale === "en"
                  ? en.historyBuy.sC
                  : es.historyBuy.sC}
              </Heading>
              {buy.map((item, key) => (
                <CheckoutScreenAll
                  key={key}
                  {...item}
                  count={(key += 1)}
                  name={locale === "en" ? en.name : es.name}
                  quantity={locale === "en" ? en.quantity : es.quantity}
                  tax={locale === "en" ? en.tax : es.tax}
                  unit={locale === "en" ? en.unit : es.unit}
                  price={locale === "en" ? en.price : es.price}
                  paid={locale === "en" ? en.paid : es.paid}
                  pro={locale === "en" ? en.process : es.process}
                  sF={locale === "en" ? en.historyBuy.sF : es.historyBuy.sF}
                  push={push}
                  locale={locale}
                />
              ))}
            </VStack>
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

Buy.propTypes = {
  product: PropTypes.array,
};

export async function getServerSideProps({ query }) {
  const u = await query.u.toString();
  try {
    const q = query(collection(db, "buys"), where("buy", "==", u), limit(2));

    const { docs } = await getDocs(q);

    const product = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

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

export default Buy;
