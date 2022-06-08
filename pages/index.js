import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import ShopLayout from "../components/layout/ShopLayout";

import { listDataProduct } from "../actions/product";

import Home from "../components/home/Home";

import { listDataCategory } from "../actions/category";

import Toast from "../helpers/Toast";

import { dbProducts } from "../data/dbProducts";

import { dbCategory } from "../data/dbCategory";

const HomeL = ({ product, category }) => {
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDataProduct(product));
    dispatch(listDataCategory(category));
  }, [dispatch, product, category]);

  return (
    <ShopLayout>
      <Home />
    </ShopLayout>
  );
};

export async function getStaticProps() {
  try {
    const product = await dbProducts("", "dbProOne");
    const category = await dbCategory();

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
