import React, { useState } from "react";

import Image from "next/image";

import { CheckCircleIcon } from "@chakra-ui/icons";

import {
  AspectRatio,
  Button,
  Checkbox,
  Heading,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useBoolean,
  VStack,
} from "@chakra-ui/react";

import { CreateProduct, Eligir, Perfil } from "../../helpers/IconNew";

import Breakpoints from "../../helpers/Breakpoints";

import UserData from "./UserData";

import { useRouter } from "next/router";

// Breakpoints
const { bordes, content5 } = Breakpoints();

export default function StepsContent() {
  // router
  const router = useRouter();
  // useBoolean
  const [flag1, setFlag1] = useBoolean();
  // useBoolean
  const [flag2, setFlag2] = useBoolean();
  // useState
  const [items, setItems] = useState(true);

  const handleAgreement = () => {
    router.push("/user/agreement");
  };

  const stepsData = [
    {
      items,
      label: "Login",
      icon: Perfil,
      content: (
        <>
          <ListItem w={"full"} pt={20}>
            <ListIcon as={CheckCircleIcon} color="brand.700" />
            Tiene que estar registrado en nuestro sitio web
          </ListItem>
          <ListItem w={"full"}>
            <ListIcon as={CheckCircleIcon} color="brand.700" />
            Si tienes una cuenta en nuestro sitio web puedes{" "}
            <Button variant={"primary"} size={"xs"}>
              ingresar
            </Button>
          </ListItem>
          <ListItem w={"full"}>
            <ListIcon as={CheckCircleIcon} color="brand.700" />
            Si no tienes una cuenta puedes{" "}
            <Button variant={"primary"} size={"xs"}>
              crear una cuenta
            </Button>
          </ListItem>
          <ListItem w={"full"}>
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              <Checkbox
                fontWeight={"bold"}
                colorScheme={"brand"}
                onChange={() => setItems(!items)}
              >
                Aceptas todos los acuerdos de venta{" "}
                <Button
                  variant={"secondary"}
                  textTransform={"uppercase"}
                  onClick={handleAgreement}
                >
                  Saber mas
                </Button>
              </Checkbox>
            </Stack>
          </ListItem>
          <ListItem w={"full"} pb={20}>
            <ListIcon as={CheckCircleIcon} color="brand.700" />
            Si no cumples con los requisitos no podras pasar a la siguiente
            etapa
          </ListItem>
        </>
      ),
    },
    {
      flag1,
      flag2,
      label: "Tipo",
      icon: Eligir,
      content: (
        <Stack flexDirection={content5} spacing={0}>
          <VStack
            border={bordes}
            w={"full"}
            p={5}
            mx={5}
            textAlign={"center"}
            cursor={"pointer"}
            onClick={
              flag2.toString() !== "true" ? setFlag1.toggle : setFlag2.toggle
            }
            backgroundColor={flag1.toString() === "true" ? "#d0d0d0" : ""}
          >
            <AspectRatio w="100px" position={"relative"}>
              <Image
                src={"/img/productos.png"}
                alt="Picture of the author"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </AspectRatio>
            <Heading size={"sm"} textTransform={"uppercase"}>
              Crea un producto
            </Heading>
            <Text>
              Crea una sola publicación para vender uno o más productos.
            </Text>
          </VStack>
          <VStack
            border={bordes}
            w={"full"}
            p={5}
            mx={5}
            textAlign={"center"}
            cursor={"pointer"}
            onClick={
              flag1.toString() !== "true" ? setFlag2.toggle : setFlag1.toggle
            }
            backgroundColor={flag2.toString() === "true" ? "#d0d0d0" : ""}
          >
            <AspectRatio w="100px" position={"relative"}>
              <Image
                src={"/img/servicios.png"}
                alt="Picture of the author"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </AspectRatio>
            <Heading size={"sm"} textTransform={"uppercase"}>
              Crea un servicio
            </Heading>
            <Text>
              Crea una sola publicación para vender uno o más servicios.
            </Text>
          </VStack>
        </Stack>
      ),
    },
    {
      label: "Create",
      icon: CreateProduct,
      content: (
        <UserData
          word={{
            b: "Add",
            d: `Create a new ${
              flag1.toString() === "true" ? "Producto" : "Servicio"
            }`,
            w1: (flag1.toString() === "true" && "Producto") || "",
            w2: (flag2.toString() === "true" && "Servicio") || "",
          }}
        />
      ),
    },
  ];

  return {
    stepsData,
  };
}
