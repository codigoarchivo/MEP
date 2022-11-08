import React, { useEffect } from "react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { Box, Container, Heading, Stack, VStack } from "@chakra-ui/react";

import ShopLayout from "../../components/layout/ShopLayout";

import { Breakpoints } from "../../helpers/Breakpoints";

import { cheListAllClear, cheListAllSale } from "../../actions/checkout";

import { PaginatorProcess } from "../../utils/PaginatorProcess";

import { SaleScreen } from "../../components/sale/SaleScreen";

import { dbsale } from "../../data/dbCheck";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export async function getServerSideProps(Context) {
  const q = await Context.query.uid.toString();

  const data = await dbsale(q, 5);

  return {
    props: {
      data,
    },
  };
}

const SaleData = ({ data }) => {
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // useSelector
  const { sale = [] } = useSelector(({ sale }) => sale);
  // useRouter
  const { locale, push, query: que } = useRouter();
  // dispatch
  const dispatch = useDispatch();
  // Breakponts
  const { bordes, full, fondo } = Breakpoints();

  useEffect(() => {
    if (a.rol === "owner") {
      push("/");
    }
  });

  useEffect(() => {
    if (!!data[0]) {
      dispatch(cheListAllSale(data));
    } else {
      dispatch(cheListAllClear());
    }
  }, [dispatch, data]);

  return (
    <ShopLayout
      title={locale === "en-US" ? en.historySale.sA : es.historySale.sA}
    >
      <Container maxW={"container.lg"} px={{ base: 2, md: 4 }}>
        <Stack
          backgroundColor={fondo}
          rounded={"lg"}
          boxShadow={"dark-lg"}
          flexDirection={"column"}
          p={{ base: 3, md: 10 }}
          my={{ base: 10, md: 20 }}
          w={full}
        >
          <Heading w={full} as="h2" size="lg" fontWeight="semibold">
            {locale === "en-US" ? en.historySale.sA : es.historySale.sA}
          </Heading>
          <VStack w={full} p={{ base: 2, md: 5 }} border={bordes}>
            <Heading
              w={full}
              size={"md"}
              textTransform={"uppercase"}
              px={2}
              fontWeight={"black"}
              mb={{ base: 0, md: 10 }}
            >
              {!!sale[0]
                ? locale === "en-US"
                  ? en.historySale.sB
                  : es.historySale.sB
                : locale === "en-US"
                ? en.historySale.sC
                : es.historySale.sC}
            </Heading>

            {sale.map((item, key) => (
              <SaleScreen
                item={item}
                key={key}
                locale={locale}
                paid={locale === "en-US" ? en.paid : es.paid}
              />
            ))}
          </VStack>
        </Stack>

        <Box>
          {sale.length > 0 && (
            <PaginatorProcess
              win={"users"}
              direct={"sales"}
              u={que.uid.toString()}
              word={"cre"}
              list={sale}
              firstVisible={sale[0].cre}
              lastVisible={sale[sale.length - 1].cre}
              newList={cheListAllSale}
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

SaleData.propTypes = {
  data: PropTypes.array,
};

export default SaleData;
