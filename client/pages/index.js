import React from "react";

import { useRouter } from "next/router";

import { Button } from "@chakra-ui/react";

const Home = () => {
  // router
  const router = useRouter();
  return (
    <>
      <Button
        type="button"
        onClick={() =>
          router.push({
            pathname: "/account/[p]",
            query: { p: "create-user" },
          })
        }
      >
        enviar
      </Button>
    </>
  );
};

export default Home;
