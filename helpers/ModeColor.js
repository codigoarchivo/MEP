import { useColorModeValue } from "@chakra-ui/react";

export const ModeColor = () => {
  const textError = useColorModeValue("red.600", "red.300");
  const bgText = useColorModeValue("gray.800", "white");
  const bgTextError = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("blackAlpha.700", "whiteAlpha.50");
  const bg3 = useColorModeValue("white", "gray.800");
  const bg4 = useColorModeValue("yellow.100", "brand.600");
  const bg5 = useColorModeValue("brand.600", "brand.200");
  const bg6 = useColorModeValue("brand.200", "brand.600");
  const bg7 = useColorModeValue("brand.200", "brand.300");
  const bg = useColorModeValue("brand.400", "brand.300");
  const modelA = useColorModeValue("brand.900", "brand.800");
  const modelB = useColorModeValue("brand.800", "brand.900");
  const modelC = useColorModeValue("brand.800", "brand.800");
  const modelD = useColorModeValue("brand.900", "brand.900");
  const modelE = useColorModeValue("brand.500", "brand.900");
  const modelF = useColorModeValue("brand.900", "brand.500");

  return {
    bg,
    bg2,
    bg3,
    bg4,
    bg5,
    bg6,
    bg7,
    textError,
    bgTextError,
    bgText,
    modelA,
    modelB,
    modelC,
    modelD,
    modelE,
    modelF,
  };
};
