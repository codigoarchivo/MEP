import { useColorModeValue } from "@chakra-ui/react";

const ModeColor = () => {
  const textError = useColorModeValue("red.600", "red.300");
  const bgTextError = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("blackAlpha.700", "whiteAlpha.50");

  return {
    bg2,
    textError,
    bgTextError,
  };
};

export default ModeColor;
