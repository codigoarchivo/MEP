import React from "react";
import Link from "next/link";
import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";

export const PageNotFound = () => {
  return (
    <>
      <VStack alignItems={"flex-start"} spacing={5}>
        <Heading size={"2xl"}>Oooops...</Heading>
        <Heading size={"lg"}>That page cannot be found.</Heading>
        <HStack>
          <Text fontSize="lg">Go back to the </Text>
          <Button size="sm" colorScheme="green" mt="24px">
            <Link href="/">
              <a>Home</a>
            </Link>
          </Button>
        </HStack>
      </VStack>
    </>
  );
};
