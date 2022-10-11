import { Container, VStack } from "@chakra-ui/react";

import { ScreenAbout } from "../../components/about/ScreenAbout";

import ShopLayout from "../../components/layout/ShopLayout";

import { BlogEdgar } from "../../components/about/BlogEdgar";

const About = () => {
  return (
    <ShopLayout>
      <Container maxW={"container.xl"} py={32}>
        <VStack spacing={20}>
          <BlogEdgar />

          <ScreenAbout />
        </VStack>
      </Container>
    </ShopLayout>
  );
};

export default About;
