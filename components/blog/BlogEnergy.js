import Image from "next/image";

import PropTypes from "prop-types";

import {
  Box,
  Container,
  Heading,
  Link,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import { BlogTags } from "./BlogTags";

import { ModeColor } from "../../helpers/ModeColor";

export const BlogEnergy = ({
  bAa,
  bBb,
  bCc,
  bDd,
  bEe,
  bFf,
  bHh,
  bIi,
  points,
}) => {
  const { modelF } = ModeColor();

  return (
    <Container maxW={"7xl"} p={{ base: 0, sm: "12" }}>
      <Heading fontWeight={600} lineHeight={"110%"} fontSize={points}>
        {bAa}{" "}
        <Text as={"span"} color={modelF}>
          {bBb}
        </Text>
      </Heading>
      <Box
        marginTop={{ base: "1", sm: "5" }}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center"
          style={{ marginBottom: useBreakpointValue({ base: "20px", md: 0 }) }}
        >
          <Box
            width={{ base: "100%", sm: "85%" }}
            zIndex="2"
            marginLeft={{ base: "0", sm: "5%" }}
            marginTop="5%"
            textAlign="center"
          >
            <Image
              src={"/img/pendulo.png"}
              alt="energia"
              width={"200px"}
              height={"300px"}
            />
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                "radial(brand.900 1px, transparent 1px)",
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
        >
          <BlogTags tags={[bCc, bDd, bEe, bFf]} />
          <Heading marginTop="1">{bHh}</Heading>
          <Text as="p" marginTop="2" fontSize="lg">
            {bIi}
          </Text>
        </Box>
      </Box>
    </Container>
  );
};

BlogEnergy.propTypes = {
  bAa: PropTypes.string,
  bBb: PropTypes.string,
  bCc: PropTypes.string,
  bDd: PropTypes.string,
  bEe: PropTypes.string,
  bFf: PropTypes.string,
  bHh: PropTypes.string,
  bIi: PropTypes.string,
  points: PropTypes.object,
};
