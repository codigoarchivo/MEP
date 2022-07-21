import React, { useEffect } from "react";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

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
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { Breakpoints } from "../../helpers/Breakpoints";

import { CategoryScrenn } from "../../components/category/CategoryScreen";

import { dbCategory } from "../../data/dbCategory";

import ShopLayout from "../../components/layout/ShopLayout";

import { activeCategory, listDataCategory } from "../../actions/category";

import { Paginator } from "../../utils/Paginator";

import { Toast } from "../../helpers/Toast";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

const Category = ({ data = [] }) => {
  // selector
  const { list = [] } = useSelector(({ category }) => category);
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // router
  const { locale, push } = useRouter();
  // breakpoints
  const { center, bordes } = Breakpoints();

  if (a?.rol === "user") {
    push("/");
  }

  const err = locale === "en" ? en.error : es.error;
  useEffect(() => {
    if (data) {
      dispatch(listDataCategory(data, err));
    }
  }, [dispatch, data, err]);

  // add
  const handleAdd = () => {
    dispatch(
      activeCategory({
        word: "Add",
      })
    );

    push({
      pathname: "/admin/set/[id]",
      query: { id: "new", pid: "Add" },
    });
  };

  return (
    <ShopLayout title={locale === "en" ? en.categories : es.categories}>
      {a?.rol === "owner" ? (
        <Container maxW={"container.sm"} my={10}>
          <Box p={5}>
            {!list[0] && (
              <Center border={bordes} py={30}>
                <Heading size={"sm"} textTransform={"uppercase"}>
                  {locale === "en" ? en.category.cA : es.category.cA}
                </Heading>
              </Center>
            )}
            <TableContainer w={"full"} border={bordes}>
              <Table variant="striped" colorScheme="brand">
                <TableCaption>
                  {locale === "en" ? en.category.cB : es.category.cB}
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>{locale === "en" ? en.categories : es.categories}</Th>
                    <Th isNumeric textAlign={center}>
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
                    <CategoryScrenn
                      key={key}
                      {...data}
                      edi={locale === "en" ? en.edit : es.edit}
                      del={locale === "en" ? en.delete : es.delete}
                      cC={locale === "en" ? en.category.cC : es.category.cC}
                      push={push}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Box>
            {list.length > 0 && (
              <Paginator
                window={"categories"}
                word={"cre"}
                list={list}
                firstVisible={list[0].cre}
                lastVisible={list[list.length - 1].cre}
                newList={listDataCategory}
                nLimit={2}
                orHome={"desc"}
                orPrevious={"desc"}
                orNext={"desc"}
              />
            )}
          </Box>
        </Container>
      ) : (
        ""
      )}
    </ShopLayout>
  );
};

Category.propTypes = {
  data: PropTypes.array,
};

export async function getServerSideProps() {
  try {
    const data = await dbCategory("", "dbCatTwo");

    if (!data) {
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
        data,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
  }
}

export default Category;
