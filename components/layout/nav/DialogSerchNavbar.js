import React, { useRef } from "react";

import Proptypes from "prop-types";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  CloseButton,
  chakra,
  Icon,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import { useFormAll } from "../../../hooks/useFormAll";
import { ModeColor } from "../../../helpers/ModeColor";

const initialStates = {
  q: "",
};

export const DialogSerchNavbar = ({
  setModality,
  displayOn2,
  isSerch,
  setIsSerch,
  InputGroup,
  InputLeftElement,
  Input,
  SearchIcon,
  serch,
}) => {
  // cerrar
  const onSerch = () => setIsSerch(false);
  // ref
  const cancelRef = useRef();
  // dispatch
  const router = useRouter();

  const { values, reset, handleInputChange } = useFormAll(initialStates);

  const handleSerchProduct = (e) => {
    e.preventDefault();
    const q = values.q;
    router.push({
      pathname: "/search",
      query: { q },
    });
    reset();
    onSerch();
  };

  const { modelC } = ModeColor();

  return (
    <>
      <Icon
        onClick={() => setModality(true)}
        boxSize={4}
        display={displayOn2}
        cursor={"pointer"}
        color={modelC}
      >
        <SearchIcon mx={0} />
      </Icon>

      <AlertDialog
        isOpen={isSerch}
        leastDestructiveRef={cancelRef}
        onClose={onSerch}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              <CloseButton size="md" color={modelC} onClick={onSerch} />
            </AlertDialogHeader>

            <AlertDialogBody>
              <chakra.form onSubmit={handleSerchProduct}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color={modelC} />
                  </InputLeftElement>
                  <Input
                    type={"search"}
                    placeholder={serch}
                    value={values.q}
                    name={"q"}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </chakra.form>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

DialogSerchNavbar.proptypes = {
  isSerch: Proptypes.func.isRequired,
  setIsSerch: Proptypes.func.isRequired,
  InputGroup: Proptypes.object.isRequired,
  InputLeftElement: Proptypes.object.isRequired,
  Input: Proptypes.object.isRequired,
  SearchIcon: Proptypes.object.isRequired,
  serch: Proptypes.string.isRequired,
};
