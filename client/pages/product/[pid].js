import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import { Container, VStack } from "@chakra-ui/react";

import ProductDialogModal from "../../components/product/ProductDialogModal";

import { store } from "../../data/store";

import { dataActive } from "../../actions/product";

const initialStates = {
  id: "",
  nombre: "",
  precio: "",
  image: "",
  uid: "",
  descripcion: "",
  category: "",
  cantidad: "",
  detalles: "",
};

const configDashboard = ({ dataId }) => {
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (dataId.data === null) {
      dispatch(dataActive(initialStates));
    } else {
      dispatch(dataActive(dataId.data));
    }
  }, [dispatch]);

  return (
    <Container maxW={"container.sm"}>
      <VStack p={{ base: 0, sm: 10 }} mt={{ base: 10, sm: 0 }}>
        <ProductDialogModal dataId={dataId} />
      </VStack>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const dataR = store.find((x) => x.id === context.query.pid.toString());
  const dataId = {
    data: dataR ? dataR : null,
    word: context.query.word.toString(),
  };
  return { props: { dataId } };
}
export default configDashboard;
