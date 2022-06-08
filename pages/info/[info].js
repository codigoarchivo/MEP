import React from "react";

import {
  Grid,
  chakra,
  Heading,
  Container,
  VStack,
} from "@chakra-ui/react";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase/config";

import Toast from "../../helpers/Toast";

import ShopLayout from "../../components/layout/ShopLayout";

import useFormAll from "../../hooks/useFormAll";

import ModeColor from "../../helpers/ModeColor";

import Breakpoints from "../../helpers/Breakpoints";

import { useRouter } from "next/router";

import { DataUserAdicional } from "../../actions/user";

import { useDispatch, useSelector } from "react-redux";

import GridItemForm from "../../utils/GridItemForm";
import GridItemFormTextarea from "../../utils/GridItemFormTextarea";
import GridValueClose from "../../utils/GridValueClose";

const initialStates = {
  na: "",
  te: "",
  co: "",
  dt: "",
};

const Informacion = ({ data }) => {
  // selector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // dispatch
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  // Breakpoints
  const { repeat1, points3, bordes } = Breakpoints();
  // mode Color
  const { bg, brand } = ModeColor();
  // useForm
  const { values, handleInputChange } = useFormAll(initialStates, data);
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

    router.push({
      pathname: "/product/[product]",
      query: { product: a?.uid.toString() },
    });
  };

  // cerrar
  const onCloseSelling = () => {
    router.push({
      pathname: "/product/[product]",
      query: { product: a?.uid.toString() },
    });
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
              <GridItemForm
                points={2}
                name={"Nombre"}
                na={"na"}
                val={na}
                type={"text"}
                place={"Nombre"}
                handle={handleInputChange}
              />
              <GridItemForm
                points={2}
                name={"Correo"}
                na={"co"}
                val={co}
                type={"text"}
                place={"Correo"}
                handle={handleInputChange}
              />
              <GridItemForm
                points={2}
                name={"Telefono"}
                na={"te"}
                val={te}
                type={"tel"}
                place={"000-000-0000"}
                handle={handleInputChange}
              />

              <GridItemFormTextarea
                points={2}
                name={"Informacion Adicional"}
                na={"dt"}
                val={dt}
                place={"Detalles"}
                handle={handleInputChange}
                bg={bg}
                brand={brand}
              />
              <GridValueClose onClose={onCloseSelling} set={"Guardar"} />
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
