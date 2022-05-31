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
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import useFormChange from "../../../hooks/useFormChange";

export const DialogSerchNavbar = ({
  isSerch,
  setIsSerch,
  InputGroup,
  InputLeftElement,
  Input,
  SearchIcon,
}) => {
  // cerrar
  const onSerch = () => setIsSerch(false);
  // ref
  const cancelRef = useRef();
  // dispatch
  const router = useRouter();

  const { values, reset, handleInputChange } = useFormChange({ q: "" });

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

  return (
    <>
      <AlertDialog
        isOpen={isSerch}
        leastDestructiveRef={cancelRef}
        onClose={onSerch}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              <CloseButton size="md" onClick={onSerch} />
            </AlertDialogHeader>

            <AlertDialogBody>
              <chakra.form onSubmit={handleSerchProduct}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type={"search"}
                    placeholder="Buscar"
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
  word: Proptypes.string.isRequired,
};
