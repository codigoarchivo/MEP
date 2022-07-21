import { useColorModeValue } from "@chakra-ui/react";

export const ModeColor = () => {
  const textError = useColorModeValue("red.600", "red.300");
  const bgText = useColorModeValue("gray.800", "white");
  const bgTextError = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("brand.600", "whiteAlpha.50");
  const bg2 = useColorModeValue("blackAlpha.700", "whiteAlpha.50");
  const bg3 = useColorModeValue("white", "gray.800");
  const bg4 = useColorModeValue("yellow.100", "brand.600");
  const bg5 = useColorModeValue("gray.50", "gray.900");

  const brand = { borderColor: "brand.800" };

  return {
    bg,
    bg2,
    bg3,
    bg4,
    bg5,
    textError,
    bgTextError,
    bgText,
    brand,
  };
};
