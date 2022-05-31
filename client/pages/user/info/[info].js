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

import { DataUserAdicional } from "../../../actions/user";

import { useDispatch } from "react-redux";

const initialStates = {
  na: "",
  te: "",
  co: "",
  dt: "",
};

const Informacion = ({ data }) => {
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // Breakpoints
  const { repeat1, points3, bordes } = Breakpoints();
  // mode Color
  const { bg, brand } = ModeColor();
  // useForm
  const { values, handleInputChange } = useFormChange(initialStates, data);
  // values
  const { na, te, co, dt, id, rol } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (na === "" || te === "" || co === "" || dt === "") {
      return Toast(
        "Si vas a vender tiene llenar todos los campos",
        "error",
        5000
      );
    }

    dispatch(DataUserAdicional({ na, te, co, dt, id, rol }));
    onCloseSelling();
  };

  // cerrar
  const onCloseSelling = () => {
    router.push("/user/selling");
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
            informacion Personal para el cliente
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
                  placeholder="Nombre"
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
                  <Button variant={"secondary"} onClick={onCloseSelling}>
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
  const { info } = await context.query;
  try {
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

export default Informacion;
