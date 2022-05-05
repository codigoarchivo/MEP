import React from "react";
import { Container, Heading } from "@chakra-ui/react";
import Layout from "../../components/layout/Layout";


const About = () => {
  return (
    <Layout>
      <Container maxW={"container.xs"}>
          <Heading>About</Heading>
      </Container>
    </Layout>
  );
};

export default About;
