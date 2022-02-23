import React from "react";

const DialogCategory = ({
  VStack,
  points3,
  repeat1,
  handleSubmit,
  mNombre,
  nombre,
  fiel,
  Grid,
  GridItem,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Button,
  Input,
  AlertDialogFooter,
  cancelRef,
  handleInputChange,
  onClose,
}) => {
  return (
    <>
      <VStack justifyContent="center" w="full">
        <Grid
          as={"form"}
          templateRows={`repeat(5, 1fr)`}
          templateColumns={repeat1}
          alignItems={"center"}
          columnGap={points3}
          rowGap={2}
          w={"full"}
          onSubmit={handleSubmit}
        >
          <GridItem colSpan={2}>
            <FormControl isInvalid={mNombre}>
              <FormLabel htmlFor="nombre">Nombre</FormLabel>
              <Input
                name="nombre"
                id="nombre"
                onChange={handleInputChange}
                value={nombre}
                type={"text"}
                placeholder="Nombre"
              />
              <FormErrorMessage>{mNombre && fiel}</FormErrorMessage>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <AlertDialogFooter>
              <Button variant={"secondary"} ref={cancelRef} onClick={onClose}>
                Close
              </Button>
              <Button variant={"primary"} type="submit" ml={3}>
                Enviar
              </Button>
            </AlertDialogFooter>
          </GridItem>
        </Grid>
      </VStack>
    </>
  );
};

export default DialogCategory;
