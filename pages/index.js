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

import { logout } from "../actions/auth";

export async function getServerSideProps(ctx) {
  ctx.res.setHeader("Cache-Control", "public, max-age=86400, must-revalidate");

  const [product, category] = await Promise.all([
    dbSerchAll(50),
    dbcategoryAll(15),
  ]);

  if (product.length === 0 && category.length === 0) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  if (!product || !category) {
    const err = ctx.locale === "en-US" ? en.error : es.error;
    logout(err);

    return {
      redirect: {
        destination: "/auth",
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
      <Home listData={listData} latestCartSelect={latestCartSelect} />
    </ShopLayout>
  );
};

HomeL.propTypes = {
  product: PropTypes.array.isRequired,
  category: PropTypes.array.isRequired,
};

export default HomeL;
