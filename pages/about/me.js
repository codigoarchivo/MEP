import { Container, VStack } from "@chakra-ui/react";

import PropTypes from "prop-types";

import { ScreenAbout } from "../../components/about/ScreenAbout";

import ShopLayout from "../../components/layout/ShopLayout";

import { BlogEdgar } from "../../components/about/BlogEdgar";

import { dbComents } from "../../data/dbAbout";

export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, max-age=86400, must-revalidate"
  );

  const coments = await dbComents();

  return {
    props: {
      coments,
    },
  };
}

const About = ({ coments }) => {
  return (
    <ShopLayout>
      <Container maxW={"container.xl"} py={32}>
        <VStack spacing={20}>
          <BlogEdgar />

          <ScreenAbout coments={coments} />
        </VStack>
      </Container>
    </ShopLayout>
  );
};

About.propTypes = {
  coments: PropTypes.array,
};

export default About;
