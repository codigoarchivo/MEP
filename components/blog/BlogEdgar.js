import { Heading, Stack, Text } from "@chakra-ui/react";

import PropTypes from "prop-types";

import { ModeColor } from "../../helpers/ModeColor";

export const BlogEdgar = ({ data }) => {
  const { modelF } = ModeColor();
  return (
    <Stack pt={20} spacing={10}>
      <Heading
        fontWeight={600}
        fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
      >
        Edgars{" "}
        <Text as={"span"} color={modelF}>
          Pendulum
        </Text>
      </Heading>
      <Text
        fontSize={{ base: "md", sm: "lg" }}
        textAlign="justify"
        style={{ textIndent: "2em" }}
      >
        {data}
      </Text>
    </Stack>
  );
};

BlogEdgar.propTypes = {
  data: PropTypes.string,
};
