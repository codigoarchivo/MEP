import React, { useEffect } from "react";

import {
  query,
  collection,
  getDocs,
  limit,
  orderBy,
  where,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { Box, Container, Heading, Stack, VStack } from "@chakra-ui/react";

import ShopLayout from "../../components/layout/ShopLayout";

import { Breakpoints } from "../../helpers/Breakpoints";

import { Toast } from "../../helpers/Toast";

import { cheListAllClear, cheListAllSale } from "../../actions/checkout";

import { PaginatorProcess } from "../../utils/PaginatorProcess";

import { SaleScreen } from "../../components/sale/SaleScreen";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export async function getServerSideProps(Context) {
  const d = await Context.query.uid.toString();
  try {
    const { docs } = await getDocs(
      query(
        collection(db, "users", d, "sales"),
        orderBy("cre", "desc"),
        limit(1)
      )
    );

    const data = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

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
  const { bordes, full } = Breakpoints();

  if (a.rol === "owner") {
    push("/");
  }

  useEffect(() => {
    if (!!data[0]) {
      dispatch(cheListAllSale(data));
    } else {
      dispatch(cheListAllClear());
    }
  }, [dispatch, data]);

  return (
    <ShopLayout title={locale === "en" ? en.historySale.sA : es.historySale.sA}>
      <Container maxW={"container.lg"}>
        <Stack flexDirection={"column"} my={{ base: 10, md: 20 }} w={full}>
          <Heading w={full} as="h2" size="lg" fontWeight="semibold">
            {locale === "en" ? en.historySale.sA : es.historySale.sA}
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
                ? locale === "en"
                  ? en.historySale.sB
                  : es.historySale.sB
                : locale === "en"
                ? en.historySale.sC
                : es.historySale.sC}
            </Heading>

            {sale.map((item, key) => (
              <SaleScreen
                que={que.uid.toString()}
                item={item}
                key={key}
                name={locale === "en" ? en.name : es.name}
                mail={locale === "en" ? en.mail : es.mail}
                creation={locale === "en" ? en.creation : es.creation}
                verify={locale === "en" ? en.historyBuy.sE : es.historyBuy.sE}
                locale={locale}
                paid={locale === "en" ? en.paid : es.paid}
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
