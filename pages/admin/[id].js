import React from "react";

import PropTypes from "prop-types";

import { useRouter } from "next/router";

import { Container } from "@chakra-ui/react";

import CategoryData from "../../components/category/CategoryData";

import ShopLayout from "../../components/layout/ShopLayout";

import { dbCategory, dbCategoryById } from "../../data/dbCategory";

import en from "../../translations/en";
import es from "../../translations/es";

const ConfigCategory = ({ category }) => {
  // router
  const { locale, back, query } = useRouter();
  return (
    <ShopLayout title={locale === "en" ? en.major.mF : es.major.mF}>
      <Container maxW={"container.sm"} py={20}>
        <CategoryData
          category={category}
          pid={query.pid}
          back={back}
          locale={locale}
          es={es}
          en={en}
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
    paths: category.map(
      ({ id }) => (
        {
          params: {
            id,
          },
          locale: "en",
        },
        {
          params: {
            id,
          },
          locale: "es",
        }
      )
    ),
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const id = await params.id.toString();
  try {
    const category = await dbCategoryById(id);

    if (!category) {
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
