import React, { useEffect, useRef, useState } from "react";

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
  // Breakpoints
  const { bordes } = Breakpoints();
  // dispatch
  const dispatch = useDispatch();
  // dispatch
  const router = useRouter();
  // selector
  const { listSerch, list: listP } = useSelector(({ product }) => product);
  // selector
  const { list } = useSelector(({ category }) => category);
  // useRef
  const max = useRef(0);
  // useRef
  const min = useRef(0);

  useEffect(() => {
    if (product) {
      dispatch(serchProductList(product));
    }
  }, [dispatch, product]);

  if (listP.length > 0) {
    max.current = listP.reduce(
      (n, m) => Math.max(n, Number(m.pr)),
      -Number.POSITIVE_INFINITY
    );
    min.current = listP.reduce(
      (n, m) => Math.min(n, Number(m.pr)),
      Number.POSITIVE_INFINITY
    );
  }

  // useState
  const [listPrice, setListPrice] = useState([min.current, max.current]);

  useEffect(() => {
    const c = router.query.c;
    const q = router.query.q?.toLowerCase();
    const r = router.query.r;

    const filtro = listP
      ?.filter((item) => {
        return c ? item.ct.includes(c) : item.na?.toLowerCase().includes(q);
      })
      .slice(0, 25);

    const filtroR = listP
      ?.filter((item) => {
        return item.pr >= listPrice[0] && item.pr <= listPrice[1];
      })
      .slice(0, 25);

    if (c || q) {
      if (filtro.length === 0) {
        return (
          Toast(
            `${filtro.length} resultado, reinicia con boton Shop All`,
            "info",
            5000
          ),
          dispatch(listProductSerchClose(filtro))
        );
      }
    }

    if (r) {
      if (filtroR.length === 0) {
        return (
          Toast(
            `${filtroR.length} resultado, reinicia con boton Shop All`,
            "info",
            5000
          ),
          dispatch(listProductSerchClose(filtroR))
        );
      }
    }

    dispatch(serchProductList(r ? filtroR : filtro));
  }, [router.query, listPrice, dispatch, listP]);

  const handleChangeEnd = (r) => {
    router.push({
      pathname: "/search",
      query: { r },
    });
    setListPrice(r);
  };

  return (
    <>
      <ShopLayout>
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
                    <ListItem key={item.id}>
                      <ListIcon as={CheckCircleIcon} color="brand.700" />
                      <NavLink
                        href={{
                          pathname: "/search",
                          query: { c: item.id, n: item.na },
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
            {listP.length > 0 && (
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

export async function getStaticProps() {
  try {
    const product = await dbProducts();

    if (!product) {
      return {
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
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
}

export default Search;
