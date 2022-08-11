import React from "react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

import ShopLayout from "../../components/layout/ShopLayout";

import { Container, Stack } from "@chakra-ui/react";

import { Breakpoints } from "../../helpers/Breakpoints";

import { CheckVerify } from "../../components/checkout/CheckVerify";

import { dbcheckById } from "../../data/dbCheck";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export async function getServerSideProps(context) {
  const uid = await context.query.uid.toString();
  const id = await context.query.id.toString();

  const data = await dbcheckById(uid, id);

  if (!data) {
    return {
      redirect: {
        notFound: true,
      },
    };
  }

  return {
    props: {
      data,
    },
  };
}

const Verification = ({ data }) => {
  // router
  const { push, locale, back } = useRouter();
  // Breakpoints
  const { bordes } = Breakpoints();
  return (
    <ShopLayout title={locale === "en-US" ? en.verify.vG : es.verify.vG}>
      <Container maxW={"container.xl"} py={{ base: 0, md: 10 }}>
        <Stack flexDirection={"column"} spacing={10}>
          <CheckVerify
            // boides
            bordes={bordes}
            // idThree es id del la compra del data
            idThree={data.id}
            // toda la informacion del data, que se guardo en el uid del comprador
            product={data.product}
            locale={locale}
            push={push}
            back={back}
            en={en}
            es={es}
          />
        </Stack>
      </Container>
    </ShopLayout>
  );
};

Verification.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Verification;
