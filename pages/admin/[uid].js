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

import { dbAdminAll } from "../../data/dbAdmin";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export async function getServerSideProps(context) {
  const uid = await context.query.uid.toString();

  const data = await dbAdminAll(uid, 5);

  return {
    props: {
      data,
    },
  };
}

const Sale = ({ data }) => {
  // dispatch
  const dispatch = useDispatch();
  // useRouter
  const { locale, replace, asPath, query } = useRouter();
  // useSelector
  const { history = [] } = useSelector(({ history }) => history);
  // Breakpoints
  const { bordes, full, fondo } = Breakpoints();

  // selector
  const { activeSelect: a } = useSelector(({ auth }) => auth);

  const valid = [a.uid, a.email].includes(undefined);

  useEffect(() => {
    valid ? replace(`/auth?d=${asPath}`) : "";
  }, [replace, valid]);

  useEffect(() => {
    if (!!data[0]) {
      dispatch(cheListAll(data));
    }
  }, [dispatch, data]);

  return (
    <ShopLayout
      title={locale === "en-US" ? en.historySale.sB : es.historySale.sB}
    >
      <Container maxW={"container.lg"} px={{ base: 2, md: 4 }}>
        <Stack
          backgroundColor={fondo}
          rounded={"lg"}
          boxShadow={"dark-lg"}
          flexDirection={"column"}
          p={10}
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
              {!!history[0]
                ? locale === "en-US"
                  ? en.historySale.sB
                  : es.historySale.sB
                : locale === "en-US"
                ? en.historySale.sC
                : es.historySale.sC}
            </Heading>

            {history.map((item, key) => (
              <SaleScreenAll
                item={item}
                key={key}
                name={locale === "en-US" ? en.name : es.name}
                mail={locale === "en-US" ? en.mail : es.mail}
                creation={locale === "en-US" ? en.creation : es.creation}
                verify={
                  locale === "en-US" ? en.historyBuy.sE : es.historyBuy.sE
                }
                locale={locale}
                paid={locale === "en-US" ? en.paid : es.paid}
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
