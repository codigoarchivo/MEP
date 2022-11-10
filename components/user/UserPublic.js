import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Avatar, Box, Heading, VStack } from "@chakra-ui/react";
import { Breakpoints } from "../../helpers/Breakpoints";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export const UserPublic = () => {
  // useRouter
  const { locale } = useRouter();
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // Breakpoints
  const { porcent4, fondo } = Breakpoints();

  const { photoURL, displayName } = a;
  return (
    <VStack
      spacing={12}
      h={"full"}
      mb={{ base: 5, md: 0 }}
      w={porcent4}
      backgroundColor={fondo}
      rounded={"lg"}
      boxShadow={"dark-lg"}
      py={10}
      mr={{ base: 0, md: 10 }}
    >
      <Box p={{ base: 0, md: 5 }}>
        {displayName !== undefined || photoURL !== undefined ? (
          <Avatar size="2xl" name={displayName} src={photoURL} />
        ) : (
          <Avatar size="2xl" />
        )}
      </Box>
      <VStack>
        <Heading size={"md"}>
          {locale === "en-US" ? en.user.uC : es.user.uC}
        </Heading>
        <Heading textTransform={"capitalize"} size={"sm"} fontWeight={"normal"}>
          {displayName}
        </Heading>
      </VStack>
    </VStack>
  );
};
