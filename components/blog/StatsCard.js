import Proptypes from "prop-types";

import { Box, Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

import { Breakpoints } from "../../helpers/Breakpoints";

import { ModeColor } from "../../helpers/ModeColor";

export const StatsCard = (props) => {
  const { bordes } = Breakpoints();

  const { modelE } = ModeColor();

  const { title, stat, icon } = props;

  return (
    <Stat
      px={{ base: 2, md: 3 }}
      py={"5"}
      shadow={"xl"}
      border={bordes}
      rounded={"lg"}
      bg={'brand.900'}
      color={'brand.500'}
    >
      <Flex w={"full"} justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box my={"auto"} alignContent={"center"}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
};

StatsCard.proptypes = {
  props: Proptypes.object,
};
