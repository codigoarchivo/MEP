import React from "react";

import ShopLayout from "../components/layout/ShopLayout";

import { Container, Heading } from "@chakra-ui/react";


const Blog = () => {
  return (
    <ShopLayout>
      <Container maxW={"container.xs"}>
          <Heading>Blog</Heading>
      </Container>
    </ShopLayout>
  );
};

export default Blog;
