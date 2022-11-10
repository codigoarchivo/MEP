import { useRouter } from "next/router";

import { Box, Heading, Stack } from "@chakra-ui/react";

import { Breakpoints } from "../../helpers/Breakpoints";
import { ModeColor } from "../../helpers/ModeColor";

import { NavLink } from "../../utils/Navlink";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export const CreateNewAcount = () => {
  // useRouter
  const { locale } = useRouter();
  // Breakpoints
  const { displayOff1, fondo } = Breakpoints();

  const { modelF } = ModeColor();
  return (
    <Stack
      p={5}
      w={"full"}
      flexDirection={"row"}
      backgroundColor={fondo}
      alignItems={"center"}
      spacing={0}
      rounded={"lg"}
      boxShadow={"lg"}
    >
      <Heading
        color={modelF}
        display={displayOff1}
        textTransform={"capitalize"}
        w={"full"}
        mr={5}
        size={"sm"}
      >
        {locale === "en-US" ? en.home.hC : es.home.hC}
      </Heading>
      <Box>
        <NavLink
          size={"sm"}
          variant={"primary"}
          name={locale === "en-US" ? en.create : es.create}
          href={"/auth/create"}
          rounded={"lg"}
        />
      </Box>
    </Stack>
  );
};
