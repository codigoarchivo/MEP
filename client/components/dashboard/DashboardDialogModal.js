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

export const DashboardDialogModal = ({ modality, setModality }) => {
  // cerrar
  const onSerch = () => setModality(false);
  // ref
  const cancelRef = useRef(false);

  return (
    <>
      <AlertDialog
        isOpen={modality}
        leastDestructiveRef={cancelRef}
        onClose={onSerch}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              <CloseButton size="md" onClick={onSerch} />
            </AlertDialogHeader>

            <AlertDialogBody>data</AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

DashboardDialogModal.proptypes = {
  modality: Proptypes.func.isRequired,
  setModality: Proptypes.func.isRequired,
};
