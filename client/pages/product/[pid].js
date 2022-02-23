import React from "react";

import ProductDialogModal from "../../components/product/ProductDialogModal";

import { store } from "../../data/store";

import { useModality } from "../../hooks/useModality";

const configDashboard = ({ dataId }) => {
  // modality
  const { modality, setModality } = useModality();
  return (
    <ProductDialogModal
      word={dataId.word}
      modality={() => modality(true)}
      setModality={setModality}
      data={dataId}
    />
  );
};

export async function getServerSideProps(context) {
  const data = store.find((x) => x.id === context.query.pid.toString());
  const dataId = {
    ...data,
    word: context.query.word.toString(),
    product: "product",
  };
  return { props: { dataId } };
}
export default configDashboard;
