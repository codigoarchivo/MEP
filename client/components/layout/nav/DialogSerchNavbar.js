import React, { useRef } from "react";

import Proptypes from "prop-types";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  CloseButton,
} from "@chakra-ui/react";

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
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" />}
                />
                <Input
                  type={"search"}
                  placeholder="Buscar En cualquier parte"
                />
              </InputGroup>
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
