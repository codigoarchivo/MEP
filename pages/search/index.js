import React, { useEffect, useMemo, useRef, useState } from "react";

import PropTypes from "prop-types";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Center,
  Container,
  Heading,
  List,
  ListIcon,
  ListItem,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  VStack,
  Wrap,
} from "@chakra-ui/react";

import SerchScreen from "../../components/search/SerchScreen";

import ShopLayout from "../../components/layout/ShopLayout";

import { listProductSerchClose, serchProductList } from "../../actions/product";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";

import Toast from "../../helpers/Toast";

import Breakpoints from "../../helpers/Breakpoints";

import NavLink from "../../utils/Navlink";
import Paginator from "../../utils/Paginator";
import { dbProducts } from "../../data/dbProducts";

const Search = ({ product }) => {
  // selector
  const { listSerch } = useSelector(({ product }) => product);
  // selector
  const { list } = useSelector(({ category }) => category);
  // selector
  const [listP, setListP] = useState([]);
  // Breakpoints
  const { bordes } = Breakpoints();
  // dispatch
  const dispatch = useDispatch();
  // dispatch
  const router = useRouter();
  // useRef
  const max = useRef(0);
  // useRef
  const min = useRef(0);

  // useState
  useEffect(() => {
    if (product) {
      dispatch(serchProductList(product));
    }
  }, [dispatch, product]);

  useEffect(() => {
    if (product) {
      setListP(product);
    }
  }, [setListP, product]);

  max.current = listP.reduce(
    (n, m) => Math.max(Number(n), m.pr),
    -Number.POSITIVE_INFINITY
  );

  min.current = listP.reduce(
    (n, m) => Math.min(Number(n), m.pr),
    Number.POSITIVE_INFINITY
  );

  // useState
  const [listPrice, setListPrice] = useState([0, 0]);

  useEffect(() => setListPrice([min.current, max.current]), [min, max]);

  const handleChangeEnd = async (r) => {
    router.push({
      pathname: "/search",
      query: { r },
    });

    setListPrice(r);

    const newData = await dbProducts(r, "dbProSix");

    if (newData.length === 0) {
      return Toast(
        "No hay resultados, reinicia con boton Shop All",
        "info",
        5000
      );
    }

    dispatch(serchProductList(newData));
  };

  const handleOnclick = async (id) => {
    const newData = await dbProducts(id, "dbProSeven");

    if (newData.length === 0) {
      return Toast(
        "No hay resultados, reinicia con boton Shop All",
        "info",
        5000
      );
    }

    dispatch(serchProductList(newData));
  };

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
              <Stack
                w={"full"}
                spacing={"10"}
                border={bordes}
                rounded="md"
                p={5}
              >
                <Box borderBottom={bordes} py={5} w={"full"}>
                  <Heading
                    size={"md"}
                    textTransform={"uppercase"}
                    fontWeight={"normal"}
                  >
                    Buscar Rango precios
                  </Heading>
                </Box>

                <RangeSlider
                  defaultValue={[min.current, max.current]}
                  min={min.current}
                  max={max.current}
                  step={5}
                  onChangeEnd={(val) => handleChangeEnd(val)}
                >
                  <RangeSliderTrack bg="brand.800">
                    <RangeSliderFilledTrack bg="brand.700" />
                  </RangeSliderTrack>
                  <RangeSliderThumb boxSize={6} index={0}>
                    <Box color="brand.700" as={ChevronLeftIcon} />
                  </RangeSliderThumb>
                  <RangeSliderThumb boxSize={6} index={1}>
                    <Box color="brand.700" as={ChevronRightIcon} />
                  </RangeSliderThumb>
                </RangeSlider>

                <StatGroup w={"full"}>
                  <Stat>
                    <StatLabel>Min</StatLabel>
                    <StatNumber fontWeight={"normal"}>
                      $ {listPrice[0] === Infinity ? 0 : listPrice[0]}
                    </StatNumber>
                  </Stat>

                  <Stat>
                    <StatLabel>Max</StatLabel>
                    <StatNumber fontWeight={"normal"}>
                      $ {listPrice[1] === -Infinity ? 0 : listPrice[1]}
                    </StatNumber>
                  </Stat>
                </StatGroup>
              </Stack>
              <Stack
                w={"full"}
                spacing={"10"}
                border={bordes}
                rounded="md"
                p={5}
              >
                <Box borderBottom={bordes} py={5} w={"full"}>
                  <Heading
                    size={"md"}
                    textTransform={"uppercase"}
                    fontWeight={"normal"}
                  >
                    Todas las categorias
                  </Heading>
                </Box>
                <List spacing={3}>
                  {list.map((item) => (
                    <ListItem
                      key={item.id}
                      onClick={() => handleOnclick(item.id)}
                    >
                      <ListIcon as={CheckCircleIcon} color="brand.700" />
                      <NavLink
                        href={{
                          pathname: "/search",
                          query: { n: item.id, c: item.na },
                        }}
                        name={item.na}
                        variant={"secondary"}
                        fontWeight={"normal"}
                      />
                    </ListItem>
                  ))}
                </List>
              </Stack>
            </VStack>
            {!listSerch[0] ? (
              <Center py={"48"} w={"full"}>
                <Heading size={"sm"} textTransform={"uppercase"}>
                  Al parecer no encontramos lo que buscas, reinicia con boton
                  Shop All
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
  list: PropTypes.array,
  listSerch: PropTypes.array,
  serchProductList: PropTypes.func,
  listProductSerchClose: PropTypes.func,
};

export async function getStaticProps() {
  try {
    const product = await dbProducts("", "dbProOne");

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
