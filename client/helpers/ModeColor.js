import { useColorModeValue } from "@chakra-ui/react";

const ModeColor = () => {
  const textError = useColorModeValue("red.600", "red.300");
  const bgTextError = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("brand.600", "whiteAlpha.50");
  const bg2 = useColorModeValue("blackAlpha.700", "whiteAlpha.50");

  const brand = { borderColor: "brand.800" };

  return {
    bg,
    bg2,
    textError,
    bgTextError,
    brand,
  };
};

export default ModeColor;
