import React, { useEffect } from "react";

import { collection, query, limit, getDocs, orderBy } from "firebase/firestore";

import { useDispatch, useSelector } from "react-redux";

import {
  Center,
  Container,
  Spinner,
  Wrap,
} from "@chakra-ui/react";

import SerchScreen from "../../components/search/SerchScreen";

import Layout from "../../components/layout/layout";

import { db } from "../../firebase/config";

import { listDataProduct } from "../../actions/product";

const serchList = ({ data }) => {
  // dispatch
  const dispatch = useDispatch();
  // selector
  const { list } = useSelector(({ product }) => product);
  
  useEffect(() => {
    dispatch(listDataProduct(data));
  }, [dispatch, data]);

  return (
    <>
      <Layout>
        <Container maxW="container.lg">
          {!list[0] && (
            <Center py={30}>
              <Spinner size="xl" color="brand.800" />
            </Center>
          )}

          <Wrap spacing='30px'>
            {list.map((data) => (
              <SerchScreen key={data.id} {...data} />
            ))}
          </Wrap>
        </Container>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const q = query(collection(db, "serchs"), orderBy("na", "asc"), limit(2));

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
}

export default serchList;
