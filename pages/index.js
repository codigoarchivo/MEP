import React, { useEffect } from "react";

import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

import { db } from "../firebase/config";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import ShopLayout from "../components/layout/ShopLayout";

import { productListIndex } from "../actions/product";

import { Home } from "../components/home/Home";

import { categoryListConfig } from "../actions/category";

import { Toast } from "../helpers/Toast";

import { en } from "../translations/en";
import { es } from "../translations/es";

export async function getServerSideProps(context) {
  try {
    context.res.setHeader(
      "Cache-Control",
      "public, max-age=120, must-revalidate"
    );

    const d = await getDocs(
      query(collection(db, "categories"), orderBy("cre", "desc"), limit(25))
    );

    const category = d.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const { docs } = await getDocs(
      query(collection(db, "serchs"), orderBy("cre", "desc"), limit(25))
    );

    const product = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (!product || !category) {
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

const HomeL = ({ product = [], category = [] }) => {
  // useRouter
  const { locale } = useRouter();
  // selector
  const { latestCartSelect = [] } = useSelector(({ latest }) => latest);
  // selector
  const { listData = [] } = useSelector(({ list }) => list);
  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!product[0]) {
      dispatch(productListIndex(product));
    }
  }, [dispatch, product]);

  useEffect(() => {
    if (!!category[0]) {
      dispatch(categoryListConfig(category));
    }
  }, [dispatch, category]);

  return (
    <ShopLayout title={locale === "en" ? en.major.mA : es.major.mA}>
      <Home
        listData={listData}
        latestCartSelect={latestCartSelect}
        locale={locale}
        en={en}
        es={es}
      />
    </ShopLayout>
  );
};

HomeL.propTypes = {
  product: PropTypes.array.isRequired,
  category: PropTypes.array.isRequired,
};

export default HomeL;
