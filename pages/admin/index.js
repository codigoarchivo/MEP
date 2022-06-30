import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { Box, Container, Heading, Stack, Text, VStack } from "@chakra-ui/react";

import ShopLayout from "../../components/layout/ShopLayout";

import Breakpoints from "../../helpers/Breakpoints";

import Toast from "../../helpers/Toast";

import { cheListAll } from "../../actions/checkout";

import { dbUserData } from "../../data/dbUser";

import Paginator from "../../utils/Paginator";

import { useRouter } from "next/router";

import SaleScreenAll from "../../components/sale/SaleScreenAll";

import es from "../../translations/es";
import en from "../../translations/en";

const Sale = ({ data }) => {
  // dispatch
  const dispatch = useDispatch();
  // useRouter
  const { locale } = useRouter();
  // useSelector
  const { history = [] } = useSelector(({ checkout }) => checkout);
  // Breakpoints
  const { bordes, full, content5 } = Breakpoints();

  useEffect(() => {
    if (data) {
      dispatch(cheListAll(data));
    }
  }, [dispatch, data]);

  return (
    <ShopLayout title={"Sale"}>
      <Container maxW={"container.lg"}>
        <Stack flexDirection={"row"} my={20} w={full}>
          <VStack w={full} spacing={5}>
            <Heading w={full} as="h2" size="lg" fontWeight="semibold">
              {locale === "en" ? en.historySale.sA : es.historySale.sA}
            </Heading>
            <VStack w={full} p={5} border={bordes}>
              <Heading
                w={full}
                size={"md"}
                textTransform={"uppercase"}
                px={2}
                fontWeight={"black"}
                mb={10}
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
                <SaleScreenAll item={item} key={key} />
              ))}
            </VStack>

            <Text display={"inline"} w={full}>
              {locale === "en" ? en.admin.aA : es.admin.aA}
            </Text>
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

Sale.propTypes = {
  data: PropTypes.array,
};

export async function getServerSideProps() {
  const dA = process.env.NEXT_PUBLIC_ROL_A.toString();
  try {
    const data = await dbUserData(dA, "dbUserData");

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
export default Sale;
