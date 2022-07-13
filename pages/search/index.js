import React, { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Center,
  Container,
  Heading,
  Stack,
  VStack,
  Wrap,
} from "@chakra-ui/react";

import SerchScreen from "../../components/search/SerchScreen";

import ShopLayout from "../../components/layout/ShopLayout";

import { serchProductList } from "../../actions/product";

import Toast from "../../helpers/Toast";

import Paginator from "../../utils/Paginator";

import { dbProducts } from "../../data/dbProducts";

import SerchCategory from "../../components/search/SerchCategory";

import SerchRange from "../../components/search/SerchRange";

import Breakpoints from "../../helpers/Breakpoints";

import en from "../../translations/en";
import es from "../../translations/es";

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
    // verifica si hay producto  y si el rango esta vacio
    if (Object.entries(query).length === 0) {
      dispatch(serchProductList(product));
    } else {
      dispatch(serchProductList(dataAll));
    }
  }, [dispatch, product, dataAll, query]);

  useMemo(() => {
    const serchProductSelector = async () => {
      let newData = [];

      if (query.q) {
        newData = await dbProducts(query.q, "dbProFive");
      }

      if (query.n) {
        newData = await dbProducts(query.n, "dbProSeven");
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
            <SerchRange
              locale={locale}
              en={en}
              es={es}
              product={product}
              setDataAll={setDataAll}
            />

            {/* Todas las categorias */}
            <SerchCategory
              locale={locale}
              en={en}
              es={es}
              setDataAll={setDataAll}
            />
          </VStack>
          {!listSerch[0] ? (
            <Center py={"48"} w={"full"}>
              <Heading size={"sm"} textTransform={"uppercase"}>
                {locale === "en" ? en.search.sC : es.search.sC}
              </Heading>
            </Center>
          ) : (
            <Wrap
              justify={{ base: "center", lg: "start" }}
              w={{ base: "100%", lg: "75%" }}
              align="start"
            >
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
              word={"na"}
              list={listSerch}
              firstVisible={listSerch[0].na}
              lastVisible={listSerch[listSerch.length - 1].na}
              newList={serchProductList}
              nLimit={2}
              orHome={"asc"}
              orPrevious={"asc"}
              orNext={"asc"}
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

    return {
      props: {
        product,
      },
      revalidate: 86400, // 60 * 60 * 24 revalidate every 24 hours
    };
  } catch (error) {
    Toast(locale === "en" ? en.error : es.error, 5000);
    return {
      props: {},
    };
  }
}

export default Search;
