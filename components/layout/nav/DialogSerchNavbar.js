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

const initialStates = {
  q: "",
};

export const DialogSerchNavbar = ({
  setModality,
  displayOn2,
  isSerch,
  setIsSerch,
  InputGroup,
  InputRightElement,
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

  return (
    <>
      <Icon
        onClick={() => setModality(true)}
        boxSize={4}
        display={displayOn2}
        cursor={"pointer"}
      >
        <SearchIcon mx={0} />
      </Icon>

      <AlertDialog
        isOpen={isSerch}
        leastDestructiveRef={cancelRef}
        onClose={onSerch}
      >
        <AlertDialogOverlay>
          <AlertDialogContent backgroundColor={"#E5E4E2"} p={2}>
            <AlertDialogHeader>
              <CloseButton size="md" onClick={onSerch} />
            </AlertDialogHeader>

            <AlertDialogBody>
              <chakra.form onSubmit={handleSerchProduct}>
                <InputGroup>
                  <InputRightElement pointerEvents="none">
                    <SearchIcon />
                  </InputRightElement>
                  <Input
                    type={"search"}
                    rounded={"full"}
                    border={"none"}
                    boxShadow="lg"
                    // placeholder={serch}
                    _placeholder={{ color: "inherit" }}
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
  InputRightElement: Proptypes.object.isRequired,
  Input: Proptypes.object.isRequired,
  SearchIcon: Proptypes.object.isRequired,
  serch: Proptypes.string.isRequired,
};
