import { useEffect, useState } from "react";

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
  const [carga, setCarga] = useState(false);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setCarga(a?.emailVerified === false ? true : false);
    }, 60000);

    return () => clearTimeout(timer);
  }, [setCarga, a?.emailVerified]);

  return (
    <Modal isCentered isOpen={a?.emailVerified !== undefined ? carga : false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{a?.displayName}</ModalHeader>
        <ModalBody>
          <Text>{`${locale === "en" ? en.auth.aY : es.auth.aY} ${a?.email} ${
            locale === "en" ? en.auth.aZ : es.auth.aZ
          }`}</Text>
        </ModalBody>
        <ModalFooter>
          <Text>{locale === "en" ? en.auth.aAa : es.auth.aAa}</Text>{" "}
          <Button ml={3} size={["sx", "sm", "md"]} p={2} onClick={handleLogout}>
            {locale === "en" ? en.clickHere : es.clickHere}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
