import Image from "next/image";

import { useRouter } from "next/router";

import {
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

import { Breakpoints } from "../../helpers/Breakpoints";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export const ScreenHero = () => {
  // useRouter
  const { locale } = useRouter();

  const valImgW = useBreakpointValue({ base: 250, md: 400, lg: 450 });

  const valImgH = useBreakpointValue({ base: 300, md: 450, lg: 550 });
  // Breakpoints
  const {
    content5,
    bordes,
    displayOff1,
    all1,
    points25,
    fondo,
  } = Breakpoints();
  return (
    <>
      <Stack
        flexDirection={content5}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={10}
      >
        <VStack
          w={all1}
          border={bordes}
          rounded={"lg"}
          p={{ base: 6, md: 8 }}
          boxShadow={"dark-lg"}
          mb={{ base: 5, md: 0 }}
          backgroundColor={fondo}
        >
          <Heading w={"full"} fontSize={points25} wordBreak={"break-word"}>
            {locale === "en-US" ? en.home.hA : es.home.hA}
          </Heading>
          <Text
            fontSize={["sx", "sm", "md", "lg", "xl"]}
            wordBreak={"break-word"}
          >
            {locale === "en-US" ? en.home.hB : es.home.hB}
          </Text>
        </VStack>
        <Image
          src={"/img/primary.png"}
          alt="Picture of the author"
          layout="fixed"
          width={valImgW}
          height={valImgH}
          priority={true}
        />
      </Stack>
    </>
  );
};
