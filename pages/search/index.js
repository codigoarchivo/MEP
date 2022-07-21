import React, { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Center,
  Container,
  Heading,
  Spinner,
  Stack,
  VStack,
  Wrap,
} from "@chakra-ui/react";

import { SerchScreen } from "../../components/search/SerchScreen";

import ShopLayout from "../../components/layout/ShopLayout";

import { serchProductList } from "../../actions/product";

import { Toast } from "../../helpers/Toast";

import { Paginator } from "../../utils/Paginator";

import { dbProducts } from "../../data/dbProducts";

import { SerchCategory } from "../../components/search/SerchCategory";

import { SerchRange } from "../../components/search/SerchRange";

import { Breakpoints } from "../../helpers/Breakpoints";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

const Search = ({ product }) => {
  // useDispatch
  const dispatch = useDispatch();
  // selector
  const { listSerch } = useSelector(({ product }) => product);
  // useRouter
  const { locale, query } = useRouter();
  // data
  const [dataAll, setDataAll] = useState([]);
  // Breakpoints
  const { displayOff4 } = Breakpoints();

  useEffect(() => {
    if (Object.entries(query).length === 0) {
      dispatch(serchProductList(product));
    } else {
      dispatch(serchProductList(dataAll));
    }
  }, [dispatch, product, dataAll, query]);

  useMemo(() => {
    const serchProductSelector = async () => {
      let newData = [];

      if (!!query.q) {
        newData = await dbProducts(query.q, "dbProFive");
      }

      if (!!query.n) {
        newData = await dbProducts(query.n, "dbProSeven");
      }

      if (!!query.min && !!query.max) {
        newData = await dbProducts(
          "",
          "dbProSix",
          Number(query.min),
          Number(query.max)
        );
      }

      setDataAll(newData);
    };
    serchProductSelector();
  }, [query]);

  return (
    <ShopLayout title={locale === "en" ? en.search.sI : es.search.sI}>
      <Container maxW="container.xs">
        <Stack flexDirection={"row"} p={{ base: 0, sm: 5 }}>
          <VStack
            as={"aside"}
            display={displayOff4}
            w={{ base: "0%", lg: "25%" }}
            h={"full"}
            spacing={"10"}
            mt={2}
            mr={20}
          >
            {/* Rangos de precio */}
            <SerchRange locale={locale} en={en} es={es} product={product} />

            {/* Todas las categorias */}
            <SerchCategory locale={locale} en={en} es={es} />
          </VStack>
          {!listSerch[0] ? (
            <VStack spacing={0}>
              <Center py={"10"} w={"full"}>
                <Heading size={"sm"} textTransform={"uppercase"}>
                  {locale === "en" ? en.search.sC : es.search.sC}
                </Heading>
              </Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.300"
                color="brand.500"
                size="xl"
              />
            </VStack>
          ) : (
            <Wrap
              justify={{ base: "center", lg: "start" }}
              w={{ base: "100%", lg: "75%" }}
              align="start"
            >
              {!product[0] && (
                <Center py={"48"} w={"full"}>
                  <Heading size={"sm"} textTransform={"uppercase"}>
                    {locale === "en" ? en.search.sC : es.search.sC}
                  </Heading>
                </Center>
              )}
              {listSerch.map((data) => (
                <SerchScreen key={data.id} {...data} />
              ))}
            </Wrap>
          )}
        </Stack>
        <Box>
          {listSerch.length > 0 && (
            <Paginator
              window={"serchs"}
              word={"cre"}
              list={listSerch}
              firstVisible={listSerch[0].cre}
              lastVisible={listSerch[listSerch.length - 1].cre}
              newList={serchProductList}
              nLimit={2}
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

Search.propTypes = {
  product: PropTypes.array,
};

export async function getStaticProps() {
  try {
    const product = await dbProducts("", "dbProOne");

    if (!product) {
      return {
        // notFound: true, // Devolverá la página 404
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
      revalidate: 86400, // 60 * 60 * 24 revalidate every 24 hours
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
}

export default Search;
