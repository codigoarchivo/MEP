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

import { serchProductList } from "../../actions/product";

import { dbProducts } from "../../data/dbProducts";

import { Breakpoints } from "../../helpers/Breakpoints";

import { SerchRange } from "./SerchRange";
import { SerchCategory } from "./SerchCategory";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

const SearchBase = ({ product }) => {
  // useDispatch
  const dispatch = useDispatch();
  // selector
  const { listSerch } = useSelector(({ serch }) => serch);
  // selector
  const { listData } = useSelector(({ list }) => list);
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
        newData = listData.filter(
          ({ na }) => na.es === query.q || na.en === query.q
        );
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
  }, [query, listData]);

  return (
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
              {locale === "en-US" ? en.search.sC : es.search.sC}
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
          <Center
            display={!!product[0] ? "none" : "block"}
            py={"48"}
            w={"full"}
          >
            <Heading size={"sm"} textTransform={"uppercase"}>
              {locale === "en-US" ? en.search.sC : es.search.sC}
            </Heading>
          </Center>

          {listSerch.map((data) => (
            <SerchScreen key={data.id} {...data} />
          ))}
        </Wrap>
      )}
    </Stack>
  );
};

SearchBase.propTypes = {
  product: PropTypes.array,
};

export default SearchBase;
