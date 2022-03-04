import React from "react";

import CategoryDialogModal from "../../components/category/CategoryData";
import Layout from "../../components/layout/layout";

import { store } from "../../data/store";

import { useModality } from "../../hooks/useModality";

const configDashboard = ({ dataId }) => {
  // modality
  const { modality, setModality } = useModality();
  return (
    <Layout>
      <CategoryDialogModal
        word={dataId.word}
        modality={() => modality(true)}
        setModality={setModality}
        data={dataId}
      />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const data = store.find((x) => x.id === context.query.pid.toString());
  const dataId = {
    ...data,
    word: context.query.word.toString(),
    category: "category",
  };
  return { props: { dataId } };
}
export default configDashboard;
