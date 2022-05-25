import React from "react";

import {
  Button,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Textarea,
  chakra,
  HStack,
  Heading,
  Container,
  VStack,
} from "@chakra-ui/react";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../../../firebase/config";

import Toast from "../../../helpers/Toast";

import ShopLayout from "../../../components/layout/ShopLayout";

import useFormChange from "../../../hooks/useFormChange";

import ModeColor from "../../../helpers/ModeColor";

import Breakpoints from "../../../helpers/Breakpoints";

import { useRouter } from "next/router";

import { userAdicional } from "../../../actions/user";

import { useDispatch } from "react-redux";

const initialStates = {
  na: "",
  te: "",
  co: "",
  dt: "",
};

const informacion = ({ data }) => {
  // router
  const router = useRouter();
  // dispatch
  const dispatch = useDispatch();
  // Breakpoints
  const { repeat1, points3, bordes } = Breakpoints();
  // mode Color
  const { bg, brand } = ModeColor();

  // useForm
  const { values, handleInputChange } = useFormChange(initialStates, data);
  // values
  const { na, te, co, dt, id, rol } = values;
  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (na === "" || te === "" || co === "" || dt === "") {
      return Toast(
        "Si vas a comprar tiene llenar todos los campos",
        "error",
        5000
      );
    }

    dispatch(userAdicional({ na, te, co, dt, id, rol }));
    onClose();
  };

  // cerrar
  const onClose = () => {
    router.push("/search/cart");
  };
  return (
    <ShopLayout>
      <Container maxW="sm">
        <VStack
          alignContent={"center"}
          h={"full"}
          border={bordes}
          spacing={0}
          my={10}
        >
          <Heading
            pt={5}
            size={"xs"}
            textTransform={"uppercase"}
            fontWeight={"normal"}
          >
            informacion Personal para el vendedor
          </Heading>
          <chakra.form onSubmit={handleSubmit} w={"full"} p={3}>
            <Grid
              templateRows={`repeat(5, 1fr)`}
              templateColumns={repeat1}
              alignItems={"center"}
              columnGap={points3}
            >
              <GridItem colSpan={2}>
                <FormLabel htmlFor="na">Nombre</FormLabel>
                <Input
                  name="na"
                  id="na"
                  onChange={handleInputChange}
                  value={na}
                  type={"text"}
                  placeholder="Nombre"
                />
              </GridItem>

              <GridItem colSpan={2}>
                <FormLabel htmlFor="co">Correo</FormLabel>
                <Input
                  name="co"
                  id="co"
                  onChange={handleInputChange}
                  value={co}
                  type={"text"}
                  placeholder="Nombre"
                />
              </GridItem>

              <GridItem colSpan={2}>
                <FormLabel htmlFor="te">Telefono</FormLabel>
                <Input
                  name="te"
                  id="te"
                  onChange={handleInputChange}
                  value={te}
                  type={"tel"}
                  placeholder="numero de telefono (+569) 99999999"
                />
              </GridItem>

              <GridItem colSpan={2}>
                <FormLabel htmlFor="dt">Informacion Adicional</FormLabel>
                <Textarea
                  bg={bg}
                  _focus={brand}
                  variant="filled"
                  name="dt"
                  id="dt"
                  value={dt}
                  onChange={handleInputChange}
                  placeholder="Detalles"
                  size="xs"
                />
              </GridItem>

              <GridItem colSpan={2}>
                <HStack w={"full"} justifyContent="flex-end" spacing={10}>
                  <Button variant={"secondary"} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant={"primary"} type="submit" ml={3}>
                    Guardar
                  </Button>
                </HStack>
              </GridItem>
            </Grid>
          </chakra.form>
        </VStack>
      </Container>
    </ShopLayout>
  );
};

export async function getServerSideProps(context) {
  try {
    const { info } = context.query;

    const docRef = doc(db, "users", info.toString());

    const docSnap = await getDoc(docRef);
  
    const data = {
      id: docSnap.id,
      ...docSnap.data(),
    };

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    Toast("Al parecer hay un error", "error", 5000);
    return { props: {} };
  }
}

export default informacion;
