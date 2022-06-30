import Image from "next/image";

import {
  Box,
  Container,
  Heading,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import BlogTags from "./BlogTags";

const BlogEnergy = ({ bAa, bBb, bCc, bDd, bEe, bFf, bHh, bIi }) => {

  const myLoader = ({ src, width, quality }) => {
    return `https://firebasestorage.googleapis.com/v0/b/epmp-199ff.appspot.com/o/fotosStaticas%2${src}?alt=media&token=28a889c0-ef17-46c8-8880-98643a43b838&w=${width}&q=${
      quality || 75
    }`;
  };
  
  return (
    <Container maxW={"7xl"} p="12">
      <Heading
        fontWeight={600}
        lineHeight={"110%"}
        color={"brand.900"}
        fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
      >
        {bAa}{" "}
        <Text as={"span"} color={"brand.500"}>
          {bBb}
        </Text>
      </Heading>
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center"
        >
          <Box
            width={{ base: "100%", sm: "85%" }}
            zIndex="2"
            marginLeft={{ base: "0", sm: "5%" }}
            marginTop="5%"
            textAlign="center"
          >
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              <Image
                loader={myLoader}
                src={"Fenergia.jpg"}
                alt="energia"
                width={"200px"}
                height={"300px"}
              />
            </Link>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                "radial(brand.500 1px, transparent 1px)",
                "radial(brand.500 1px, transparent 1px)"
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: "3", sm: "0" }}
        >
          <BlogTags tags={[bCc, bDd, bEe, bFf]} />
          <Heading marginTop="1">
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              {bHh}
            </Link>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue("gray.700", "gray.200")}
            fontSize="lg"
          >
            {bIi}
          </Text>
        </Box>
      </Box>
    </Container>
  );
};

export default BlogEnergy;
