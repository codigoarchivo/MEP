import React, { useState } from "react";

import Image from "next/image";

import {
  AspectRatio,
  ScaleFade,
  Td,
  Text,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import Breakpoints from "../../helpers/Breakpoints";

import { useModality } from "../../hooks/useModality";

import {
  CheckCircleIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  NotAllowedIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";

import { DashboardDialogModal } from "./DashboardDialogModal";

const initialStates = {
  nombre: "",
  precio: "",
  image: "",
  uid: "",
  descripcion: "",
  category: "",
};

const DashboardScrenn = (props) => {
  const { isOpen, onToggle } = useDisclosure();
  // breakpoints
  const { displayOff3, points18 } = Breakpoints();
  // modality
  const { modality, setModality } = useModality();
  // dataId
  const [dataId, setDataId] = useState(initialStates);

  // edit
  const handleEdit = (props) => {
    setDataId({ ...dataId, ...props, word: "edit" });
    setModality(true);
  };

  return (
    <>
      <Tr>
        <Td>
          <DashboardDialogModal
            word={dataId.word}
            modality={modality}
            setModality={setModality}
          />
          <AspectRatio ratio={1} w={70} h={70}>
            <Image
              src={`/img/${props.image}.jpg`}
              alt="Picture of the author"
              layout="fill"
              objectFit="contain"
            />
          </AspectRatio>
        </Td>
        <Td>
          <Text>{props.nombre}</Text>
        </Td>
        <Td display={displayOff3}>
          <Text>{props.precio}$</Text>
        </Td>
        <Td display={displayOff3}>
          <Text>{props.category}</Text>
        </Td>
        <Td
          position={"relative"}
          onMouseEnter={() => onToggle()}
          onMouseLeave={() => onToggle()}
        >
          <PlusSquareIcon
            w={points18}
            h={points18}
            position={"absolute"}
            top={"35%"}
            left={"40%"}
            opacity={isOpen ? 0 : 1}
            zIndex={isOpen ? 0 : 100}
          />
          <ScaleFade initialScale={0.12} in={isOpen}>
            <VStack opacity={isOpen ? 1 : 0} zIndex={isOpen ? 100 : 0}>
              {isOpen ? (
                <CheckCircleIcon cursor={"pointer"} color={"green.500"} />
              ) : (
                <NotAllowedIcon cursor={"pointer"} color={"red.500"} />
              )}
              <ExternalLinkIcon
                zIndex={isOpen ? 100 : 0}
                cursor={"pointer"}
                color={"blue.500"}
              />
              <EditIcon
                cursor={"pointer"}
                color={"blue.500"}
                onClick={() => handleEdit(props)}
              />
              <DeleteIcon cursor={"pointer"} color={"red.500"} />
            </VStack>
          </ScaleFade>
        </Td>
      </Tr>
    </>
  );
};

export default DashboardScrenn;
