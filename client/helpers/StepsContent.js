import React from "react";

import { CheckCircleIcon } from "@chakra-ui/icons";

import { Button, Checkbox, ListIcon, ListItem, Stack } from "@chakra-ui/react";

import { Perfil } from "./IconNew";

export const stepsData = [
  {
    label: "Login",
    icon: Perfil,
    contenido: (
      <ListItem w={"full"} py={20}>
        <ListIcon as={CheckCircleIcon} color="brand.700" />
        Tiene que estar registrado en nuestro sitio web
      </ListItem>
    ),
  },
  {
    label: "Verification",
    icon: Perfil,
    contenido: (
      <ListItem w={"full"} py={20}>
        <ListIcon as={CheckCircleIcon} color="brand.700" />
        Comunicarte con nosotros para que te asignemos un boton
      </ListItem>
    ),
  },
  {
    label: "Pay",
    icon: Perfil,
    contenido: (
      <ListItem w={"full"} py={20}>
        <ListIcon as={CheckCircleIcon} color="brand.700" />
        Puedes vender tu producto o servicio
      </ListItem>
    ),
  },
  {
    label: "Pay",
    icon: Perfil,
    contenido: (
      <ListItem w={"full"} py={20}>
        <Stack spacing={[1, 5]} direction={["column", "row"]}>
          <Checkbox
            fontWeight={"bold"}
            defaultChecked
            colorScheme={"brand"}
            value="naruto"
          >
            Aceptas todos los acuerdos de venta{" "}
            <Button variant={"secondary"} textTransform={"uppercase"}>
              Saber mas
            </Button>
          </Checkbox>
        </Stack>
      </ListItem>
    ),
  },
];
