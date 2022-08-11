import React from "react";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "../../../firebase/config";

import PropTypes from "prop-types";

import { useRouter } from "next/router";

import { Container } from "@chakra-ui/react";

import { CategoryData } from "../../../components/category/CategoryData";

import ShopLayout from "../../../components/layout/ShopLayout";

import { en } from "../../../translations/en";
import { es } from "../../../translations/es";

export async function getStaticPaths({ locales }) {
  const { docs } = await getDocs(collection(db, "categories"));

  const category = docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const paths = [];

  for (const locale of locales) {
    category.map((item) => {
      paths.push({ params: { id: item.id }, locale });
    });
  }

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const id = await params.id.toString();
  try {
    const docSnap = await getDoc(doc(db, "categories", id));

    const category = {
      id: docSnap.id,
      ...docSnap.data(),
    };

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
      revalidate: 60 * 60 * 24,
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
}

const ConfigCategory = ({ category }) => {
  // router
  const { locale, back, query } = useRouter();
  return (
    <ShopLayout title={locale === "en-US" ? en.major.mF : es.major.mF}>
      <Container
        maxW={"container.sm"}
        px={{ base: 2, md: 4 }}
        py={{ base: 0, md: 20 }}
      >
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

export default ConfigCategory;
