import React from "react";

import PropTypes from "prop-types";

import { useRouter } from "next/router";

import { Container } from "@chakra-ui/react";

import CategoryData from "../../components/category/CategoryData";

import ShopLayout from "../../components/layout/ShopLayout";

import { dbCategory, dbCategoryById } from "../../data/dbCategory";

const ConfigCategory = ({ category }) => {
  // router
  const router = useRouter();
  return (
    <ShopLayout title={router.query.pid}>
      <Container maxW={"container.sm"}>
        <CategoryData
          router={router}
          category={category}
          pid={router.query.pid}
        />
      </Container>
    </ShopLayout>
  );
};

ConfigCategory.propTypes = {
  category: PropTypes.object,
};

export async function getStaticPaths() {
  const category = await dbCategory("", "dbCatOne");
  return {
    paths: category.map(({ id }) => ({
      params: {
        id: id.toString(),
      },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const id = await params.id.toString();
  try {
    const category = await dbCategoryById(id);

    return {
      props: {
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

export default ConfigCategory;
