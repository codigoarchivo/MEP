import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  collection,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

import { useRouter } from "next/router";

import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RepeatIcon,
} from "@chakra-ui/icons";

import UserScreen from "../../components/user/UserScreen";

import Layout from "../../components/layout/layout";

import { db } from "../../firebase/config";

import { listDataProduct } from "../../actions/product";

import Breakpoints from "../../helpers/Breakpoints";

import {
  useModality,
  useModality2,
  useModality3,
} from "../../hooks/useModality";

import { listDataUser } from "../../actions/user";

import Toast from "../../helpers/Toast";

const list = ({ data }) => {
  // router
  const router = useRouter();
  // breakpoints
  const { bordes } = Breakpoints();
  // selector
  const { list } = useSelector(({ user }) => user);
  // selector
  const {
    activeSelect: { rol, uid, isloggedIn },
  } = useSelector(({ auth }) => auth);
  // modality
  const { modality, setModality } = useModality(true);
  // modality
  const { modality2, setModality2 } = useModality2();
  // modality
  const { modality3, setModality3 } = useModality3(true);
  // dispatch
  const dispatch = useDispatch();

  if (rol === "" && !isloggedIn && uid === "") {
    router.push("/");
  }

  useEffect(() => {
    router.push({
      pathname: "/user/list",
      query: { uid },
    });
  }, []);

  useEffect(() => {
    dispatch(listDataUser(data));
  }, [dispatch, data]);

  // add
  const handleAdd = () => {
    router.push("/user/selling");
  };

  const home = () => {
    const firstVisible = list[0].na;

    const q = query(
      collection(db, "serchs"),
      orderBy("na", "asc"),
      endBefore(firstVisible),
      limit(2)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 2);

      if (data.length === 0) {
        return setModality(true);
      } else {
        handleModality();
        dispatch(listDataProduct(data));
      }
    });
  };

  const previous = () => {
    const firstVisible = list[0].na;

    const q = query(
      collection(db, "serchs"),
      orderBy("na", "asc"),
      endBefore(firstVisible),
      limitToLast(2)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 2);

      if (data.length !== 0) {
        setModality3(true);
        dispatch(listDataProduct(data));
      }
    });
  };

  const next = () => {
    const lastVisible = list[list.length - 1].na;

    const q = query(
      collection(db, "serchs"),
      orderBy("na", "asc"),
      startAfter(lastVisible),
      limit(2)
    );

    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 2);
      if (data.length === 0) {
        return setModality2(true);
      } else {
        handleModality();
        dispatch(listDataProduct(data));
      }
    });
  };

  const handleModality = () => {
    setModality(false);
    setModality2(false);
    setModality3(false);
  };

  return (
    <Layout>
      {isloggedIn === true && rol === "owner" ? (
        <Container maxW={"container.lg"} my={10}>
          <Box p={5}>
            {!list[0] && (
              <Center border={bordes} py={30}>
                <Heading size={"sm"} textTransform={"uppercase"}>
                  Agrega una producto
                </Heading>
              </Center>
            )}
            <TableContainer w={"full"} border={bordes}>
              <Table>
                <TableCaption>Tus publicaciones en nuestro sitio</TableCaption>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>Nombre</Th>
                    <Th>Precio</Th>
                    <Th>Categoria</Th>
                    <Th isNumeric>
                      <Button
                        onClick={handleAdd}
                        variant={"primary"}
                        size="sm"
                        rounded={"sm"}
                        textTransform="uppercase"
                        fontSize={"x-small"}
                      >
                        Agregar
                      </Button>
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {list.map((data) => (
                    <UserScreen key={data.id} {...data} />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <HStack spacing={10} justifyContent={"center"} mt={10}>
            <Button
              onClick={home}
              disabled={modality}
              variant={"primary"}
              cursor="pointer"
              rounded="3xl"
              background={"transparent"}
              p={1}
            >
              <RepeatIcon />
            </Button>
            <Button
              onClick={previous}
              disabled={modality3}
              variant={"primary"}
              cursor="pointer"
              rounded="3xl"
              background={"transparent"}
              p={1}
            >
              <ChevronLeftIcon w={6} h={6} />
            </Button>
            <Button
              onClick={next}
              disabled={modality2}
              variant={"primary"}
              cursor="pointer"
              rounded="3xl"
              background={"transparent"}
              p={1}
            >
              <ChevronRightIcon w={6} h={6} />
            </Button>
          </HStack>
        </Container>
      ) : (
        ""
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { uid } = await context.query;
  try {
    const ref = collection(db, "serchs");
    const q = query(ref, where("uid", "==", uid.toString()), limit(25));
    const el = await getDocs(q);

    const data = el.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

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

export default list;
