import React, { useState } from "react";

import Image from "next/image";

import { CheckCircleIcon } from "@chakra-ui/icons";

import {
  AspectRatio,
  Button,
  Checkbox,
  Heading,
  HStack,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useBoolean,
  VStack,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import {
  CreateProduct,
  Eligir,
  ListEspera,
  Perfil,
} from "../../helpers/IconNew";

import Breakpoints from "../../helpers/Breakpoints";

import UserData from "./UserData";

// Breakpoints
const { bordes, content5, full } = Breakpoints();

export default function StepsContent() {
  // router
  const router = useRouter();
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  // useBoolean
  const [flag1, setFlag1] = useBoolean();
  // useBoolean
  const [flag2, setFlag2] = useBoolean();
  // useState
  const [items, setItems] = useState(true);

  const handleInfo = () => {
    router.push({
      pathname: "/user/info/[info]",
      query: { info: activeSelect?.uid },
    });
  };

  const w1 = (flag1.toString() === "true" && "Producto") || "";
  const w2 = (flag2.toString() === "true" && "Servicio") || "";
  const w = w1 ? w1 : w2;

  const data = {
    pid: "Add",
    d: `Create a new ${w}`,
    ti: w,
  };

  const stepsData = [
    {
      setFlag1,
      setFlag2,
      setItems,
      items,
      label: "Login",
      icon: Perfil,
      content: (
        <>
          <ListItem w={full} pt={10} pb={5}>
            <ListIcon as={CheckCircleIcon} color="brand.700" />
            Si tienes una cuenta en nuestro sitio web puedes{" "}
            <Button variant={"primary"} size={"xs"}>
              ingresar
            </Button>
          </ListItem>
          <ListItem w={full} pb={5}>
            <ListIcon as={CheckCircleIcon} color="brand.700" />
            Si no tienes una cuenta puedes{" "}
            <Button variant={"primary"} size={"xs"}>
              crear una cuenta
            </Button>
          </ListItem>
          <ListItem w={full} pb={5}>
            <ListIcon as={CheckCircleIcon} color="brand.700" />
            Agrega la información para que tu cliente{" "}
            <Button variant={"primary"} size={"xs"} onClick={handleInfo}>
              La pueda ver
            </Button>
          </ListItem>
          <ListItem w={full} pb={5}>
            <Stack spacing={[1, 5]} direction={["column", "row"]}>
              <Checkbox
                fontWeight={"bold"}
                colorScheme={"brand"}
                onChange={() => setItems(false)}
              >
                Aceptas todos los acuerdos de venta{" "}
                <Button variant={"secondary"} textTransform={"uppercase"}>
                  Saber mas
                </Button>
              </Checkbox>
            </Stack>
          </ListItem>
          <ListItem w={full} pb={10}>
            <ListIcon as={CheckCircleIcon} color="brand.700" />
            Si no cumples con los requisitos no podras pasar a la siguiente
            etapa
          </ListItem>
        </>
      ),
    },
    {
      setFlag1,
      setFlag2,
      setItems,
      flag1,
      flag2,
      label: "Tipo",
      icon: Eligir,
      content: (
        <Stack flexDirection={content5} spacing={0}>
          <VStack
            border={bordes}
            w={full}
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
            w={full}
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
      setFlag1,
      setFlag2,
      setItems,
      label: "Create",
      icon: CreateProduct,
      content: <UserData {...data} />,
    },
    {
      setFlag1,
      setFlag2,
      setItems,
      label: "Información",
      icon: ListEspera,
      content: (
        <Stack w={full} spacing={5}>
          <Heading size={"sm"}>Por favor guarda toda esta información para informar cualquier duda</Heading>
          <HStack>
            <Heading size={"sm"}>Nombre:</Heading>
            <Text>Edgar Marcano</Text>
          </HStack>
          <HStack>
            <Heading size={"sm"}>Correo:</Heading>
            <Text>ehms1975@gmail.com</Text>
          </HStack>
          <HStack w={full}>
            <Heading size={"sm"}>Telefono:</Heading>
            <Text>+1 973 510 8452</Text>
          </HStack>
        </Stack>
      ),
    },
  ];

  return {
    stepsData,
  };
}
