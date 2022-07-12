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

import Breakpoints from "../../helpers/Breakpoints";

import en from "../../translations/en";
import es from "../../translations/es";

const Search = ({ product }) => {
  // selector
  const { listSerch } = useSelector(({ product }) => product);
  // dispatch
  const dispatch = useDispatch();
  // useRouter
  const { locale, push } = useRouter();

  // useState
  const err = locale === "en" ? en.error : es.error;

  useEffect(() => {
    if (product) {
      dispatch(serchProductList(product, err));
    }
  }, []);

  const { displayOff4 } = Breakpoints();

  return (
    <>
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
                push={push}
                product={listSerch}
              />

              {/* Todas las categorias */}
              <SerchCategory locale={locale} en={en} es={es} />
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
    </>
  );
};

Search.propTypes = {
  product: PropTypes.array,
};

export async function getStaticProps() {
  try {
    // let product = "";
    // if ((r !== undefined, q === "range")) {
    //   product = await dbProducts("", "dbProSix", r);
    // }
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
