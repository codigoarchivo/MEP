import React, { useEffect } from "react";

import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

import { useDispatch } from "react-redux";

import Layout from "../components/layout/layout";

import { listDataProduct, serchProductList } from "../actions/product";

import { db } from "../firebase/config";

import Home from "../components/home/Home";

import { listDataCategory } from "../actions/category";

import Toast from "../helpers/Toast";

const HomeL = ({ product, category }) => {
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(serchProductList(product));
    dispatch(listDataProduct(product));
    dispatch(listDataCategory(category));
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
    const q = query(collection(db, "serchs"), limit(25), orderBy("na", "desc"));

    const elC = await getDocs(qC);
    const el = await getDocs(q);

    const product = el.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const category = elC.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      props: {
        product,
        category,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
}

export default HomeL;
