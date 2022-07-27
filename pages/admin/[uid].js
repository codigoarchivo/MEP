import React, { useEffect } from "react";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { Box, Container, Heading, Stack, VStack } from "@chakra-ui/react";

import ShopLayout from "../../components/layout/ShopLayout";

import { Breakpoints } from "../../helpers/Breakpoints";

import { Toast } from "../../helpers/Toast";

import { cheListAll } from "../../actions/checkout";

import { Paginator } from "../../utils/Paginator";

import { useRouter } from "next/router";

import { SaleScreenAll } from "../../components/admin/SaleScreenAll";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export async function getServerSideProps(Context) {
  const d = Context.query.uid.toString();
  try {
    const q = query(
      collection(db, "sales"),
      where("own", "==", d),
      where("cre", "!=", false),
      orderBy("cre", "desc"),
      limit(1)
    );

    const { docs } = await getDocs(q);

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

const Sale = ({ data }) => {
  // dispatch
  const dispatch = useDispatch();
  // useRouter
  const { locale, query } = useRouter();
  // useSelector
  const { history = [] } = useSelector(({ history }) => history);
  // Breakpoints
  const { bordes, full } = Breakpoints();

  useEffect(() => {
    if (!!data[0]) {
      dispatch(cheListAll(data));
    }
  }, [dispatch, data]);

  return (
    <ShopLayout title={locale === "en" ? en.historySale.sB : es.historySale.sB}>
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
              {!!history[0]
                ? locale === "en"
                  ? en.historySale.sB
                  : es.historySale.sB
                : locale === "en"
                ? en.historySale.sC
                : es.historySale.sC}
            </Heading>

            {history.map((item, key) => (
              <SaleScreenAll
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
          {history.length > 0 && (
            <Paginator
              window={"sales"}
              word={"cre"}
              list={history}
              firstVisible={history[0].cre}
              lastVisible={history[history.length - 1].cre}
              newList={cheListAll}
              nLimit={1}
              orHome={"desc"}
              orPrevious={"desc"}
              orNext={"desc"}
              uid={query.uid.toString()}
              ini={"own"}
            />
          )}
        </Box>
      </Container>
    </ShopLayout>
  );
};

Sale.propTypes = {
  data: PropTypes.array,
};

export default Sale;
