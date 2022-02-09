import { useColorModeValue } from "@chakra-ui/react";

const ModeColor = () => {
  const bg = useColorModeValue("brand.700", "whiteAlpha.50");
  const textError = useColorModeValue("red.600", "red.300");
  const bgTextError = useColorModeValue("white", "gray.800");
  const bgInput = useColorModeValue("brand.600", "whiteAlpha.50");

  return {
    bg,
    textError,
    bgTextError,
    bgInput,
  };
};

export default ModeColor;
