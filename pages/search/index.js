import React, { useEffect } from "react";

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

import en from "../../translations/en";
import es from "../../translations/es";

const Search = ({ product }) => {
  // selector
  const { listSerch } = useSelector(({ product }) => product);
  // dispatch
  const dispatch = useDispatch();
  // useRouter
  const { locale } = useRouter();

  // useState
  useEffect(() => {
    if (product) {
      dispatch(serchProductList(product));
    }
  }, [dispatch, product]);

  return (
    <>
      <ShopLayout title={"Shop All"}>
        <Container maxW="container.xs">
          <Stack flexDirection={"row"}>
            <VStack
              as={"aside"}
              w={"25%"}
              h={"full"}
              spacing={"10"}
              mt={2}
              mr={2}
            >
              {/* Rangos de precio */}
              <SerchRange
                product={listSerch}
                dato={locale === "en" ? en.search.sA : es.search.sA}
              />

              {/* Todas las categorias */}
              <SerchCategory
                dato={locale === "en" ? en.search.sB : es.search.sB}
              />
            </VStack>
            {!listSerch[0] ? (
              <Center py={"48"} w={"full"}>
                <Heading size={"sm"} textTransform={"uppercase"}>
                  {locale === "es"
                    ? "Al parecer no encontramos lo que buscas, reinicia con boton Shop All"
                    : "It seems that we did not find what you are looking for, restart with the Shop All button"}
                </Heading>
              </Center>
            ) : (
              <Wrap
                w={"70%"}
                spacing={"50px"}
                display={"flex"}
                justifyContent={"space-around"}
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
    </>
  );
};

Search.propTypes = {
  product: PropTypes.array,
};

export async function getServerSideProps({ query }) {
  const r = query.r;
  const q = query.q;

  try {
    let product = "";
    if ((r !== undefined, q === "range")) {
      product = await dbProducts("", "dbProSix", r);
    }
    product = await dbProducts("", "dbProOne");

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

export default Search;
