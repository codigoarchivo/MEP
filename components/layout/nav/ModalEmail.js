import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

import { logout } from "../../../actions/auth";

import { en } from "../../../translations/en";
import { es } from "../../../translations/es";

export const ModalEmail = () => {
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // useDispatch
  const dispatch = useDispatch();
  // useRouter
  const { locale } = useRouter();

  const handleLogout = () => {
    const err = locale === "en" ? en.error : es.error;
    dispatch(logout(err));
  };

  return (
    <Modal isCentered isOpen={a?.emailVerified === false ? true : false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{a?.displayName}</ModalHeader>
        <ModalBody>
          <Text>{`Revisa en tu correo ${a?.email} en el buzon o spam, para verificar tus datos haz click en el link`}</Text>
        </ModalBody>
        <ModalFooter>
          <Text>Si te equivocaste con el correo haz</Text>{" "}
          <Button ml={3} onClick={handleLogout}>
            click aqui
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
