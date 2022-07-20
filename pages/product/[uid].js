import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import { useRouter } from "next/router";

import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
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
} from "@chakra-ui/react";

import { doc, setDoc } from "firebase/firestore";

import { db } from "../../firebase/config";

import ProductScrenn from "../../components/product/ProductScreen";

import ShopLayout from "../../components/layout/ShopLayout";

import { listDataProduct } from "../../actions/product";

import Breakpoints from "../../helpers/Breakpoints";

import Toast from "../../helpers/Toast";

import Paginator from "../../utils/Paginator";

import { dbProducts } from "../../data/dbProducts";

import en from "../../translations/en";
import es from "../../translations/es";
import useFormAll from "../../hooks/useFormAll";

const initialStates = {
  q: "",
};

const List = ({ product = [] }) => {
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // selector
  const { list = [] } = useSelector(({ product }) => product);
  // router
  const { push, locale } = useRouter();
  // breakpoints
  const { bordes } = Breakpoints();
  // dispatch
  const dispatch = useDispatch();

  const err = locale === "en" ? en.error : es.error;
  useEffect(() => {
    if(product) {
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
      await setDoc(doc(db, "cifras", a?.uid), { pr: values.q });
      Toast(locale === "en" ? en.save : es.save, "success", 5000);
    } catch (error) {
      Toast(locale === "en" ? en.error : es.error, "error", 5000);
    }
    reset();
  };

  return (
    <ShopLayout title={locale === "en" ? en.major.mG : es.major.mG}>
      <Container maxW={"container.lg"} my={10}>
        <Box p={5}>
          {!list[0] && (
            <Center border={bordes} py={30}>
              <Heading size={"sm"} textTransform={"uppercase"}>
                {locale === "en" ? en.product.pA : es.product.pA}
              </Heading>
            </Center>
          )}
          <HStack justifyContent={"space-between"}>
            <Text
              py={5}
              display={a.rol === "owner" || a.rol === "user" ? "block" : "none"}
            >
              <Button
                textTransform={"capitalize"}
                onClick={handleClient}
                variant={"primary"}
              >
                {locale === "en" ? en.product.pB : es.product.pB}
              </Button>{" "}
              - {locale === "en" ? en.product.pC : es.product.pC}
            </Text>
            <chakra.form
              w={"15%"}
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
          </HStack>

          <TableContainer w={"full"} border={bordes}>
            <Table variant="striped" colorScheme="brand">
              <TableCaption>
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

export async function getServerSideProps({ params, locale }) {
  const uid = await params.uid.toString();
  try {
    const product = await dbProducts(uid, "dbProTwo");

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

export default List;
