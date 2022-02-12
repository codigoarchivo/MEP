import React from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  CloseButton,
} from "@chakra-ui/react";

import Breakpoints from "../../../helpers/Breakpoints";

export const DialogSerchNavbar = ({
  isSerch,
  setIsSerch,
  InputGroup,
  InputLeftElement,
  Input,
  SearchIcon,
  bgInput,
}) => {
  // Breakpoints
  const { displayOn2 } = Breakpoints();
  // cerrar
  const onSerch = () => setIsSerch(false);
  // ref
  const cancelRef = React.useRef();

  return (
    <>
      <AlertDialog
        display={displayOn2}
        isOpen={isSerch}
        leastDestructiveRef={cancelRef}
        onClose={onSerch}
      >
        <AlertDialogOverlay display={displayOn2}>
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
                  bg={bgInput}
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
