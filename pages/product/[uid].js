import React, { useEffect } from "react";

import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { db } from "../../firebase/config";

import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import { useRouter } from "next/router";

import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  chakra,
  Input,
  Stack,
  useBreakpoint,
} from "@chakra-ui/react";

import { ProductScrenn } from "../../components/product/ProductScreen";

import ShopLayout from "../../components/layout/ShopLayout";

import { listDataProduct } from "../../actions/product";

import { Breakpoints } from "../../helpers/Breakpoints";

import { Toast } from "../../helpers/Toast";
import { ModeColor } from "../../helpers/ModeColor";

import { Paginator } from "../../utils/Paginator";

import { useFormAll } from "../../hooks/useFormAll";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

const initialStates = {
  q: "",
};

export async function getServerSideProps({ params, locale }) {
  const uid = await params.uid.toString();
  try {
    const q = query(
      collection(db, "serchs"),
      where("uid", "==", uid),
      where("cre", "!=", false),
      orderBy("cre", "desc"),
      limit(2)
    );

    const { docs } = await getDocs(q);

    const product = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

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
    Toast(locale === "en" ? en.error : es.error, "error", 5000);
    return {
      props: {},
    };
  }
}

const List = ({ product = [] }) => {
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // selector
  const { list = [] } = useSelector(({ product }) => product);
  // router
  const { push, locale } = useRouter();
  // breakpoints
  const { bordes } = Breakpoints();
  // breakpoints
  const { modelC } = ModeColor();
  // dispatch
  const dispatch = useDispatch();

  const err = locale === "en" ? en.error : es.error;
  useEffect(() => {
    if (!!product[0]) {
      dispatch(listDataProduct(product, err));
    }
  }, [dispatch, product, err]);

  // add
  const handleAdd = () => {
    push({
      pathname: "/set/[id]",
      query: { id: "1", set: "add" },
    });
  };

  const { values, reset, handleInputChange } = useFormAll(initialStates);

  const handleClient = () => {
    if (!a?.uid) {
      return push("/auth");
    }

    push({
      pathname: "/info/[uid]",
      query: { uid: a?.uid ? a?.uid : "0" },
    });
  };

  const handleSerchProduct = async (e) => {
    e.preventDefault();
    try {
      const dA = process.env.NEXT_PUBLIC_ROL_A;

      if (dA === a.uid) {
        await setDoc(doc(db, "cifras", "onwer"), { pr: values.q });
        Toast(locale === "en" ? en.save : es.save, "success", 5000);
      }
      
    } catch (error) {
      Toast(locale === "en" ? en.error : es.error, "error", 5000);
    }
    reset();
  };

  return (
    <ShopLayout title={locale === "en" ? en.major.mG : es.major.mG}>
      <Container maxW={"container.lg"} px={{ base: 2, md: 4 }} my={10}>
        <Box p={{ base: 0, md: 5 }}>
          {!list[0] && (
            <Center border={bordes} py={30}>
              <Heading size={"sm"} textTransform={"uppercase"}>
                {locale === "en" ? en.product.pA : es.product.pA}
              </Heading>
            </Center>
          )}
          <Stack
            flexDirection={{ base: "column-reverse", md: "row" }}
            justifyContent={{ base: "center", md: "space-between" }}
            alignItems={"center"}
          >
            <Text
              py={5}
              display={a.rol === "owner" || a.rol === "user" ? "block" : "none"}
            >
              <Button
                textTransform={"capitalize"}
                onClick={handleClient}
                variant={"primary"}
                size={useBreakpoint()}
                p={2}
              >
                {locale === "en" ? en.product.pB : es.product.pB}
              </Button>{" "}
              - {locale === "en" ? en.product.pC : es.product.pC}
            </Text>
            <chakra.form
              w={{ base: "100%", sm: "50%", md: "15%" }}
              onSubmit={handleSerchProduct}
              display={a.rol === "owner" ? "block" : "none"}
            >
              <Input
                type={"search"}
                placeholder={"%"}
                value={values.q}
                name={"q"}
                onChange={handleInputChange}
              />
            </chakra.form>
          </Stack>

          <TableContainer w={"full"} border={bordes}>
            <Table colorScheme="brand">
              <TableCaption color={modelC}>
                {locale === "en" ? en.public : es.public}
              </TableCaption>
              <Thead>
                <Tr>
                  <Th isNumeric></Th>
                  <Th isNumeric>
                    <Button
                      onClick={handleAdd}
                      variant={"primary"}
                      size="sm"
                      rounded={"sm"}
                      textTransform="uppercase"
                      fontSize={"x-small"}
                    >
                      {locale === "en" ? en.add : es.add}
                    </Button>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {list.map((data, key) => (
                  <ProductScrenn key={key} {...data} />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          {list.length > 0 && (
            <Paginator
              window={"serchs"}
              word={"cre"}
              list={list}
              firstVisible={list[0].cre}
              lastVisible={list[list.length - 1].cre}
              newList={listDataProduct}
              nLimit={2}
              orHome={"desc"}
              orPrevious={"desc"}
              orNext={"desc"}
              uid={a.uid}
            />
          )}
        </Box>
      </Container>
    </ShopLayout>
  );
};

List.propTypes = {
  product: PropTypes.array,
};

export default List;
