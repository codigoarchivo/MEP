import { Heading, Stack, Text } from "@chakra-ui/react";

const BlogEdgar = () => {
  return (
    <Stack pt={20} spacing={10}>
      <Heading
        fontWeight={600}
        fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
        color={"brand.900"}
      >
        Edgars{" "}
        <Text as={"span"} color={"brand.500"}>
          Pendulum
        </Text>
      </Heading>
      <Text
        fontSize={{ base: "md", sm: "lg" }}
        textAlign="justify"
        color={"gray.500"}
        style={{ textIndent: "2em" }}
      >
        <strong>HOLA!</strong> Bienvenidos a este espacio creado para
        acompañarte a un viaje a tu interior en el que descubrirás tu potencial
        energético. Me presento, soy <u>Edgars</u> mi mision está diseñado para
        ser utilizado en el proceso de investigación, liberación y
        transformación de las energías creados por cada persona y que se
        asientan sobre los cimientos de las leyes que gobiernan toda la creación
        en la vida terrestre. Aquellos principios universales son los 7
        principios herméticos, bien conocidos por disciplinas espirituales.
        Gracias al nivel de conciencia de humanidad y su evolución en el manejo
        de sus energías, nos han detectado que hay una ley que nos protege y nos
        eleva a un nivel superior de evolución, esa ley es el amor
        incondicional. Este principio utiliza todos los demás como patrones
        experienciales de comprensión de las creaciones en este plano. Este
        método tiene el propósito superior de concienciar a quienes lo practican
        y conectarse con él. A través de la comprensión, las personas asumen la
        responsabilidad de sus creaciones, entendiendo el patrón energético que
        deben cambiar. Mediante el uso del péndulo como vehículo de conexión con
        la divinidad, es posible conectarse con la información necesaria para su
        comprensión y consecuente liberación y transformación de modelos y
        patrones energéticos inadecuados para su momento presente y trae a su
        conciencia información necesaria para su avance y desarrollo. Aspectos
        de tu memoria emocional con los que estás sintonizado y que podrían
        estar generando bloqueos en diferentes áreas de tu vida. Este método
        reprograma y transforma la genealogía del alma, la familia y el karma
        individual en memorias ancestrales actuales del cuerpo mental,
        emocional, físico y espiritual en todas las dimensiones del ser.
      </Text>
    </Stack>
  );
};

export default BlogEdgar;
