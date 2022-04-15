import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";

import {
  collection,
  query,
  orderBy,
  limit,
  endBefore,
  startAfter,
  onSnapshot,
  limitToLast,
  getDocs,
} from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
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

import Layout from "../../components/layout/layout";

import { db } from "../../firebase/config";

import {
  listDataProduct,
  listProductSerchClose,
  serchProductList,
} from "../../actions/product";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RepeatIcon,
} from "@chakra-ui/icons";

import {
  useModality,
  useModality2,
  useModality3,
} from "../../hooks/useModality";

import Toast from "../../helpers/Toast";
import Breakpoints from "../../helpers/Breakpoints";

const serchList = ({ data }) => {
  // Breakpoints
  const { bordes } = Breakpoints();
  // dispatch
  const dispatch = useDispatch();
  // dispatch
  const router = useRouter();
  // selector
  const { listSerch } = useSelector(({ product }) => product);
  // modality
  const { modality, setModality } = useModality(true);
  // modality
  const { modality2, setModality2 } = useModality2();
  // modality
  const { modality3, setModality3 } = useModality3(true);
  // useRef
  const max = useRef(0);
  // useRef
  const min = useRef(0);

  max.current = data.reduce(
    (n, m) => Math.max(n, Number(m.pr)),
    -Number.POSITIVE_INFINITY
  );
  min.current = data.reduce(
    (n, m) => Math.min(n, Number(m.pr)),
    Number.POSITIVE_INFINITY
  );

  // useState
  const [listPrice, setListPrice] = useState([min.current, max.current]);

  useEffect(() => {
    const c = router.query.c;
    const q = router.query.q?.toLowerCase();
    const r = router.query.r;

    const filtro = data
      .filter((item) => {
        return c ? item.ct.includes(c) : item.na.toLowerCase().includes(q);
      })
      .slice(0, 25);

    const filtroR = data
      .filter((item) => {
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
          dispatch(listProductSerchClose(r ? filtroR : filtro))
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
          dispatch(listProductSerchClose(r ? filtroR : filtro))
        );
      }
    }

    dispatch(serchProductList(r ? filtroR : filtro));
  }, [router.query, listPrice]);

  const home = () => {
    const firstVisible = listSerch[0].na;

    const q = query(
      collection(db, "serchs"),
      orderBy("na", "asc"),
      endBefore(firstVisible),
      limit(2)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 2);

      if (data.length === 0) {
        return setModality(true);
      } else {
        handleModality();
        dispatch(listDataProduct(data));
      }
    });
  };

  const previous = () => {
    const firstVisible = listSerch[0].na;

    const q = query(
      collection(db, "serchs"),
      orderBy("na", "asc"),
      endBefore(firstVisible),
      limitToLast(2)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 2);

      if (data.length !== 0) {
        setModality3(true);
        dispatch(listDataProduct(data));
      }
    });
  };

  const next = () => {
    const lastVisible = listSerch[listSerch.length - 1].na;

    const q = query(
      collection(db, "serchs"),
      orderBy("na", "asc"),
      startAfter(lastVisible),
      limit(2)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 2);
      if (data.length === 0) {
        return setModality2(true);
      } else {
        handleModality();
        dispatch(listDataProduct(data));
      }
    });
  };

  const handleModality = () => {
    setModality(false);
    setModality2(false);
    setModality3(false);
  };

  const handleChangeEnd = (r) => {
    router.push({
      pathname: "/search",
      query: { r },
    });
    setListPrice(r);
  };

  return (
    <>
      <Layout>
        <Container maxW="container.xs">
          {!listSerch[0] && (
            <Center py={40}>
              <Heading size={"sm"} textTransform={"uppercase"}>
                Al parecer no encontramos lo que buscas, reinicia con boton Shop
                All
              </Heading>
            </Center>
          )}
          <Stack flexDirection={"row"}>
            <VStack
              as={"aside"}
              w={"30%"}
              h={"full"}
              border={bordes}
              rounded="md"
              spacing={"10"}
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
                aria-label={["min", "max"]}
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
                    $ {listPrice[0]}
                  </StatNumber>
                </Stat>

                <Stat>
                  <StatLabel>Max</StatLabel>
                  <StatNumber fontWeight={"normal"}>
                    $ {listPrice[1]}
                  </StatNumber>
                </Stat>
              </StatGroup>
            </VStack>
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
          </Stack>

          <HStack spacing={10} justifyContent={"center"}>
            <Button
              onClick={home}
              disabled={modality}
              variant={"primary"}
              cursor="pointer"
              rounded="3xl"
              background={"transparent"}
              p={1}
            >
              <RepeatIcon />
            </Button>
            <Button
              onClick={previous}
              disabled={modality3}
              variant={"primary"}
              cursor="pointer"
              rounded="3xl"
              background={"transparent"}
              p={1}
            >
              <ChevronLeftIcon w={6} h={6} />
            </Button>
            <Button
              onClick={next}
              disabled={modality2}
              variant={"primary"}
              cursor="pointer"
              rounded="3xl"
              background={"transparent"}
              p={1}
            >
              <ChevronRightIcon w={6} h={6} />
            </Button>
          </HStack>
        </Container>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  try {
    const q = query(collection(db, "serchs"), orderBy("na", "asc"));

    const el = await getDocs(q);

    const data = el.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
  }
}

export default serchList;
