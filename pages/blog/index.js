import React from "react";

import { collection, getDocs } from "firebase/firestore";

import ShopLayout from "../../components/layout/ShopLayout";

import { db } from "../../firebase/config";

import { Container } from "@chakra-ui/react";

import BlogScreen from "../../components/blog/blogScreen";

import Toast from "../../helpers/Toast";

const Blog = (data) => {
  return (
    <ShopLayout title={"Blog"}>
      <Container maxW={"container.xs"}>
        <BlogScreen {...data} />
      </Container>
    </ShopLayout>
  );
};

export async function getStaticProps() {
  try {
    const categories = await getDocs(collection(db, "categories"));
    const buys = await getDocs(collection(db, "buys"));
    const product = await getDocs(collection(db, "serchs"));

    return {
      props: {
        product: product.size.toString(),
        buys: buys.size.toString(),
        categories: categories.size.toString(),
      },
      revalidate: 86400, // 60 * 60 * 24 revalidate every 24 hours
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return {
      props: {},
    };
  }
}

export default Blog;
