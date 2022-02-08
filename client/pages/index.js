import React from "react";
import { useRouter } from "next/router";
import { Button } from "@chakra-ui/react";
const Home = () => {
  const router = useRouter();
  return (
    <>
      <Button
        type="button"
        onClick={() =>
          router.push({
            pathname: "/account",
            query: { v: "login" },
          })
        }
      >
        enviar
      </Button>
    </>
  );
};

export default Home;
