import Proptypes from "prop-types";

import { HStack, Tag } from "@chakra-ui/react";

import { ModeColor } from "../../helpers/ModeColor";

export const BlogTags = (props) => {
  const { modelC } = ModeColor();
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag, key) => {
        return (
          <Tag
            key={key}
            bg={modelC}
            color={"brand.900"}
            size={"md"}
            fontSize={{ base: "8px", md: "16px" }}
          >
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

BlogTags.propTypes = {
  props: Proptypes.object,
};
