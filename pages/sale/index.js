import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { Box, Container, Heading, Stack, VStack } from "@chakra-ui/react";

import SaleScreenAll from "../../components/sale/SaleScreenAll";

import ShopLayout from "../../components/layout/ShopLayout";

import Breakpoints from "../../helpers/Breakpoints";

import Toast from "../../helpers/Toast";

import { cheListAllClear, cheListAllSale } from "../../actions/checkout";

import { dbUserData } from "../../data/dbUser";

import Paginator from "../../utils/Paginator";

const Sale = ({ data }) => {
  // dispatch
  const dispatch = useDispatch();
  // useSelector
  const { sale = [] } = useSelector(({ checkout }) => checkout);
  // useSelector
  const { t } = useSelector(({ translate }) => translate);
  // // Breakpoints
  const { bordes, full, content5 } = Breakpoints();

  useEffect(() => {
    if (data) {
      dispatch(cheListAllSale(data));
    } else {
      dispatch(cheListAllClear());
    }
  }, [dispatch, data]);

  return (
    <ShopLayout title={"Sale"}>
      <Container maxW={"container.lg"}>
        <Stack flexDirection={"row"} my={20} w={full}>
          <VStack w={full} spacing={5}>
            <Heading w={full} as="h2" size="lg" fontWeight="semibold">
              {t.historySale.sA}
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
                {!!sale[0] ? t.historySale.sB : t.historySale.sC}
              </Heading>

              {sale.map((item, key) => (
                <SaleScreenAll item={item} key={key} />
              ))}
            </VStack>
          </VStack>
        </Stack>

        <Box>
          {sale.length > 0 && (
            <Paginator
              window={"sales"}
              word={"cre"}
              list={sale}
              firstVisible={sale[0].cre}
              lastVisible={sale[sale.length - 1].cre}
              newList={cheListAllSale}
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

export async function getServerSideProps({ query }) {
  const dA = query.u.toString();
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
