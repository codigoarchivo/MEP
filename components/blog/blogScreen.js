import React from "react";

import Image from "next/image";

import {
  chakra,
  VStack,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  Box,
  Container,
  SimpleGrid,
  Icon,
  HStack,
  createIcon,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Link,
  Tag,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

import { CheckIcon } from "@chakra-ui/icons";

import Breakpoints from "../../helpers/Breakpoints";

import { seAside, seOutstanding, seWork } from "../../data/SeStatic";
import { BsPerson, CategoryAll, ShopAll } from "../../helpers/IconNew";
import ModeColor from "../../helpers/ModeColor";

const BlogScreen = () => {
  const { content5, bordes } = Breakpoints();

  const { bg3, bgText, bg4, bg5 } = ModeColor();

  const Arrow = createIcon({
    displayName: "Arrow",
    viewBox: "0 0 72 24",
    path: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
        fill="currentColor"
      />
    ),
  });

  const BlogTags = (props) => {
    return (
      <HStack spacing={2} marginTop={props.marginTop}>
        {props.tags.map((tag) => {
          return (
            <Tag
              size={"md"}
              variant="solid"
              colorScheme="brand"
              color={"brand.900"}
              key={tag}
            >
              {tag}
            </Tag>
          );
        })}
      </HStack>
    );
  };

  const myLoader = ({ src, width, quality }) => {
    return `https://firebasestorage.googleapis.com/v0/b/epmp-199ff.appspot.com/o/fotosStaticas%2${src}?alt=media&token=28a889c0-ef17-46c8-8880-98643a43b838&w=${width}&q=${
      quality || 75
    }`;
  };

  function StatsCard(props) {
    const { title, stat, icon } = props;
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={"5"}
        shadow={"xl"}
        border={"1px solid"}
        borderColor={useColorModeValue("gray.800", "gray.500")}
        rounded={"lg"}
      >
        <Flex justifyContent={"space-between"}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={"auto"}
            color={useColorModeValue("gray.800", "gray.200")}
            alignContent={"center"}
          >
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }

  return (
    <Stack flexDirection={content5} spacing={0}>
      <VStack w={"80%"} boxShadow={"lg"} border={bordes} p={5} mr={5}>
        <Stack
          w={"full"}
          minH={"50vh"}
          direction={{ base: "column", md: "row" }}
        >
          <Flex flex={1} align={"center"} justify={"center"}>
            <Stack spacing={6} w={"full"} maxW={"lg"}>
              <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                <Text
                  color={"brand.900"}
                  as={"span"}
                  position={"relative"}
                  _after={{
                    content: "''",
                    width: "full",
                    height: useBreakpointValue({ base: "20%", md: "30%" }),
                    position: "absolute",
                    bottom: 1,
                    left: 0,
                    bg: "brand.500",
                    zIndex: -1,
                  }}
                >
                  Cómo Nosotros
                </Text>
                <br />{" "}
                <Text color={"brand.500"} as={"span"}>
                  Trabajamos
                </Text>{" "}
              </Heading>
              <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
                Relaja tu mente, inspira hondo, cuenta hasta tres. Estás
                fluyendo. El universo te rodea y te abraza. Acabas de entrar en
                el universo etéreo y espiritual. Nosotros trabajamos mediante
                las medidas de bioseguridad y no presencial mediante medios,
                online no le quitamos para nada su tiempo.
              </Text>
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={4}
                position={"relative"}
              >
                <Button rounded={"full"} variant={"primary"}>
                  Create una cuenta
                </Button>
                <Box right={20}>
                  <Icon
                    as={Arrow}
                    color={useColorModeValue("gray.800", "gray.300")}
                    w={"100px"}
                    position={"absolute"}
                    left={"150px"}
                    top={"30px"}
                  />
                  <Text
                    fontSize={"lg"}
                    fontFamily={"Caveat"}
                    position={"absolute"}
                    left={"170px"}
                    top={"-10px"}
                    transform={"rotate(10deg)"}
                  >
                    Starting at $15/mo
                  </Text>
                </Box>
              </Stack>
            </Stack>
          </Flex>
          <Flex flex={1} position={"relative"}>
            <Image
              loader={myLoader}
              src={"Fhero1.jpg"}
              alt="Hero"
              layout="fill"
              objectFit="contain"
            />
          </Flex>
        </Stack>

        {/* bienvenida */}
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
            acompañarte a un viaje a tu interior en el que descubrirás tu
            potencial energético. Me presento, soy <u>Edgars</u> mi mision está
            diseñado para ser utilizado en el proceso de investigación,
            liberación y transformación de las energías creados por cada persona
            y que se asientan sobre los cimientos de las leyes que gobiernan
            toda la creación en la vida terrestre. Aquellos principios
            universales son los 7 principios herméticos, bien conocidos por
            disciplinas espirituales. Gracias al nivel de conciencia de
            humanidad y su evolución en el manejo de sus energías, nos han
            detectado que hay una ley que nos protege y nos eleva a un nivel
            superior de evolución, esa ley es el amor incondicional. Este
            principio utiliza todos los demás como patrones experienciales de
            comprensión de las creaciones en este plano. Este método tiene el
            propósito superior de concienciar a quienes lo practican y
            conectarse con él. A través de la comprensión, las personas asumen
            la responsabilidad de sus creaciones, entendiendo el patrón
            energético que deben cambiar. Mediante el uso del péndulo como
            vehículo de conexión con la divinidad, es posible conectarse con la
            información necesaria para su comprensión y consecuente liberación y
            transformación de modelos y patrones energéticos inadecuados para su
            momento presente y trae a su conciencia información necesaria para
            su avance y desarrollo. Aspectos de tu memoria emocional con los que
            estás sintonizado y que podrían estar generando bloqueos en
            diferentes áreas de tu vida. Este método reprograma y transforma la
            genealogía del alma, la familia y el karma individual en memorias
            ancestrales actuales del cuerpo mental, emocional, físico y
            espiritual en todas las dimensiones del ser.
          </Text>
        </Stack>
        <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
          <chakra.h1
            textAlign={"center"}
            fontSize={"4xl"}
            py={10}
            fontWeight={"bold"}
          >
            Our company is expanding, you could be too.
          </chakra.h1>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <StatsCard
              title={"Users"}
              stat={"5,000"}
              icon={<BsPerson h={12} w={12} />}
            />
            <StatsCard
              title={"Ventas"}
              stat={"1,000"}
              icon={<ShopAll h={12} w={12} />}
            />
            <StatsCard
              title={"Categorias"}
              stat={"7"}
              icon={<CategoryAll h={12} w={12} />}
            />
          </SimpleGrid>
        </Box>
        <Stack pt={30} w={"full"}>
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <Heading
              fontWeight={600}
              lineHeight={"110%"}
              color={"brand.900"}
              fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            >
              Servicios{" "}
              <Text as={"span"} color={"brand.500"}>
                Destacados
              </Text>
            </Heading>
          </Stack>
          <Stack py={6} flexDirection={content5} spacing={0}>
            {seOutstanding.map((item, index) => (
              <Box
                key={index}
                maxW={"330px"}
                w={"full"}
                bg={bg3}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
              >
                <Stack
                  textAlign={"center"}
                  p={6}
                  color={bgText}
                  align={"center"}
                >
                  <Text
                    fontSize={"sm"}
                    fontWeight={500}
                    bg={bg4}
                    p={2}
                    px={3}
                    color={"brand.900"}
                    rounded={"full"}
                  >
                    {item.title}
                  </Text>
                  <Stack direction={"row"} align={"center"} justify={"center"}>
                    <Text fontSize={"3xl"}>$</Text>
                    <Text fontSize={"6xl"} fontWeight={800}>
                      {item.price}
                    </Text>
                  </Stack>
                </Stack>

                <Box bg={bg5} px={6} py={10}>
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={CheckIcon} color="brand.500" />
                      {item.dato1}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} color="brand.500" />
                      {item.dato2}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} color="brand.500" />
                      {item.dato3}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} color="brand.500" />
                      {item.dato4}
                    </ListItem>
                  </List>

                  <Button
                    mt={10}
                    w={"full"}
                    variant={"primary"}
                    rounded={"xl"}
                    boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
                  >
                    Start your trial
                  </Button>
                </Box>
              </Box>
            ))}
          </Stack>
        </Stack>
        {/* trabajo */}
        <Box p={4} pt={20}>
          <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
            <Heading
              fontWeight={600}
              lineHeight={"110%"}
              color={"brand.900"}
              fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            >
              Algunas de nuestras{" "}
              <Text as={"span"} color={"brand.500"}>
                Categoria
              </Text>
            </Heading>
          </Stack>

          <Container maxW={"6xl"} mt={20}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
              {seWork.map((feature) => (
                <HStack key={feature.title} align={"top"}>
                  <Box color={"brand.500"} px={2}>
                    <Icon as={CheckIcon} />
                  </Box>
                  <VStack align={"start"}>
                    <Text fontWeight={600}>{feature.title}</Text>
                    <Text color={"gray.600"}>{feature.text}</Text>
                  </VStack>
                </HStack>
              ))}
            </SimpleGrid>
          </Container>
        </Box>
        {/* categorias */}

        <Container maxW={"7xl"} p="12">
          <Heading
            fontWeight={600}
            lineHeight={"110%"}
            color={"brand.900"}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          >
            ¿Qué necesitamos{" "}
            <Text as={"span"} color={"brand.500"}>
              de usted?
            </Text>
          </Heading>
          <Box
            marginTop={{ base: "1", sm: "5" }}
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flex="1"
              marginRight="3"
              position="relative"
              alignItems="center"
            >
              <Box
                width={{ base: "100%", sm: "85%" }}
                zIndex="2"
                marginLeft={{ base: "0", sm: "5%" }}
                marginTop="5%"
                textAlign="center"
              >
                <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                  <Image
                    loader={myLoader}
                    src={"Fenergia.jpg"}
                    alt="energia"
                    width={"200px"}
                    height={"300px"}
                  />
                </Link>
              </Box>
              <Box zIndex="1" width="100%" position="absolute" height="100%">
                <Box
                  bgGradient={useColorModeValue(
                    "radial(brand.500 1px, transparent 1px)",
                    "radial(brand.500 1px, transparent 1px)"
                  )}
                  backgroundSize="20px 20px"
                  opacity="0.4"
                  height="100%"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              flex="1"
              flexDirection="column"
              justifyContent="center"
              marginTop={{ base: "3", sm: "0" }}
            >
              <BlogTags tags={["Engineering", "Product"]} />
              <Heading marginTop="1">
                <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                  Buenas energias
                </Link>
              </Heading>
              <Text
                as="p"
                marginTop="2"
                color={useColorModeValue("gray.700", "gray.200")}
                fontSize="lg"
              >
                Muchos creen en la afirmación de que todo es energía. La leemos
                en todas partes, pero se nos dificulta vernos a nosotros mismos
                como una central energética con sus centros de producción,
                limpieza e irradiación. Para poder sentir esas energías solo lo
                que necesito de usted es información necesaria como una
                fotografía y el nombre y yo canalizare su investigación, luego
                le enviamos su análisis enviado de manera online, presencial,
                escrito en carta, o red social
              </Text>
            </Box>
          </Box>
        </Container>
      </VStack>
      <Stack
        w={"20%"}
        boxShadow={"lg"}
        height={"min-content"}
        as={"aside"}
        border={bordes}
        p={5}
        position={"relative"}
      >
        {seAside.map((item, key) => (
          <VStack key={key} w={"full"} p={1} display={"inline-block"}>
            <Heading size={"md"}>{item.title}</Heading>
            <Text>{item.text}</Text>
          </VStack>
        ))}
      </Stack>
    </Stack>
  );
};

export default BlogScreen;
