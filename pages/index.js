import React, { useEffect } from "react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import ShopLayout from "../components/layout/ShopLayout";

import { productListIndex } from "../actions/product";

import { Home } from "../components/home/Home";

import { categoryListConfig } from "../actions/category";

import { dbcategoryAll } from "../data/dbCategory";

import { dbSerchAll } from "../data/dbSerch";

import { en } from "../translations/en";
import { es } from "../translations/es";

export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, max-age=86400, must-revalidate"
  );

  const product = await dbSerchAll(50);

  const category = await dbcategoryAll(25);

  if (!product || !category) {
    return {
      redirect: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      product,
      category,
    },
  };
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
    <ShopLayout title={locale === "en-US" ? en.major.mA : es.major.mA}>
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
