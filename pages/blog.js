import React from "react";

import ShopLayout from "../components/layout/ShopLayout";

import { Container } from "@chakra-ui/react";

import BlogScreen from "../components/blog/blogScreen";

const Blog = () => {
  return (
    <ShopLayout>
      <Container maxW={"container.xs"}>
        <BlogScreen />
      </Container>
    </ShopLayout>
  );
};

export default Blog;
