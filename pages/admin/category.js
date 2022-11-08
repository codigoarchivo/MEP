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

import { CategoryScreen } from "../../components/category/CategoryScreen";

import ShopLayout from "../../components/layout/ShopLayout";

import { listDataCategory } from "../../actions/category";

import { Paginator } from "../../utils/Paginator";

import { dbcategoryAll } from "../../data/dbCategory";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export async function getServerSideProps() {
  const data = await dbcategoryAll(25);

  return {
    props: {
      data,
    },
  };
}

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
  const { center, bordes, fondo } = Breakpoints();

  useEffect(() => {
    if (a?.rol === "user") {
      push("/");
    }
  });

  const err = locale === "en-US" ? en.error : es.error;
  useEffect(() => {
    if (!!data[0]) {
      dispatch(listDataCategory(data, err));
    }
  }, [dispatch, data, err]);

  // add
  const handleAdd = () => {
    push({
      pathname: "/admin/set/[id]",
      query: { id: "new", pid: "Add" },
    });
  };

  return (
    <ShopLayout title={locale === "en-US" ? en.categories : es.categories}>
      {a?.rol === "owner" ? (
        <Container maxW={"container.sm"} my={10} px={{ base: 2, md: 4 }}>
          <Box
            p={{ base: 0, md: 5 }}
            backgroundColor={fondo}
            rounded={"lg"}
            boxShadow={"dark-lg"}
          >
            {!list[0] && (
              <Center border={bordes} py={30}>
                <Heading size={"sm"} textTransform={"uppercase"}>
                  {locale === "en-US" ? en.category.cA : es.category.cA}
                </Heading>
              </Center>
            )}
            <TableContainer w={"full"} border={bordes}>
              <Table colorScheme="brand">
                <TableCaption>
                  {locale === "en-US" ? en.category.cB : es.category.cB}
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>
                      {locale === "en-US" ? en.categories : es.categories}
                    </Th>
                    <Th isNumeric textAlign={center}>
                      <Button
                        onClick={handleAdd}
                        variant={"primary"}
                        size="sm"
                        rounded={"sm"}
                        textTransform="uppercase"
                        fontSize={"x-small"}
                      >
                        {locale === "en-US" ? en.add : es.add}
                      </Button>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {list.map((data, key) => (
                    <CategoryScreen
                      key={key}
                      {...data}
                      edi={locale === "en-US" ? en.edit : es.edit}
                      del={locale === "en-US" ? en.delete : es.delete}
                      cC={locale === "en-US" ? en.category.cC : es.category.cC}
                      push={push}
                      locale={locale}
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

export default Category;
