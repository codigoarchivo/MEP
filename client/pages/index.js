import React, { useEffect } from "react";

import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

import { useDispatch } from "react-redux";

import Layout from "../components/layout/layout";

import { listDataProduct, serchProductList } from "../actions/product";

import { db } from "../firebase/config";

import Home from "../components/home/Home";

import { listDataCategory } from "../actions/category";

import Toast from "../helpers/Toast";

const HomeL = ({ data, dataC }) => {
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(serchProductList(data));
    dispatch(listDataProduct(data));
    dispatch(listDataCategory(dataC));
  }, [dispatch]);

  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export async function getStaticProps() {
  try {
    const qC = query(
      collection(db, "categories"),
      limit(25),
      orderBy("na", "asc")
    );
    const q = query(collection(db, "serchs"), limit(25), orderBy("na", "asc"));

    const elC = await getDocs(qC);
    const el = await getDocs(q);

    const data = el.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const dataC = elC.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      props: {
        data,
        dataC,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
  }
}

export default HomeL;
