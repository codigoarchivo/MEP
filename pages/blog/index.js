import React from "react";

import PropTypes from "prop-types";

import ShopLayout from "../../components/layout/ShopLayout";

import { Container } from "@chakra-ui/react";

import { BlogScreen } from "../../components/blog/blogScreen";

import { dbBlogAll } from "../../data/dbSerch";

export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, max-age=86400, must-revalidate"
  );

  const { product, buys, categories } = await dbBlogAll();

  if (!product || !categories || !buys) {
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
      buys,
      categories,
    },
  };
}

const Blog = (data) => {
  return (
    <ShopLayout title={"Blog"}>
      <Container maxW={"container.xs"} px={{ base: 2, md: 4 }}>
        <BlogScreen {...data} />
      </Container>
    </ShopLayout>
  );
};

Blog.propTypes = {
  categories: PropTypes.string,
  buys: PropTypes.string,
  product: PropTypes.string,
};

export default Blog;
