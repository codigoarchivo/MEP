import React from "react";

import { useDispatch } from "react-redux";

import Swal from "sweetalert2";

import { QuestionIcon } from "@chakra-ui/icons";

import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  FormHelperText,
  Button,
  GridItem,
  Grid,
  Tooltip,
  chakra,
  toast,
} from "@chakra-ui/react";

import useForm from "../../hooks/useForm";

import Validator from "../../helpers/Validator";
import ModeColor from "../../helpers/ModeColor";
import Breakpoints from "../../helpers/Breakpoints";

import { sendEmail } from "../../actions/auth";

const initialStates = {
  email: "jacksonescuques@gmail.com",
};

const RetrieveUser = () => {
  // dispatch
  const dispatch = useDispatch();
  // guardar states
  const { values, handleInputChange } = useForm(initialStates);
  // validar
  const { emailE, field, ErrorLorR, fiel } = Validator(values);
  // mode Color
  const { textError, bgTextError } = ModeColor();
  // Breakpoints
  const { points2, repeat1, points3 } = Breakpoints();
  // valores
  const { email } = values;

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ErrorLorR) {
      return Swal.fire("Error", fiel, "error");
    } else {
      dispatch(sendEmail(email));
      toast({
        description: "Usuario Creado.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <chakra.form onSubmit={handleSubmit} boxShadow="2xl">
        <Grid
          templateRows={`repeat(2, 1fr)`}
          templateColumns={repeat1}
          alignItems={"center"}
          columnGap={points3}
          rowGap={2}
          p={5}
          w={"full"}
        >
          <GridItem colSpan={2}>
            <Heading as="h1" size={"md"} textTransform={"uppercase"}>
              Agregar un email
            </Heading>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl isInvalid>
              {!emailE && (
                <FormHelperText>
                  Enter the email you'd like to receive the newsletter on.
                </FormHelperText>
              )}
              <FormLabel htmlFor="email">
                Email{" "}
                <Tooltip
                  color={textError}
                  bg={bgTextError}
                  label={emailE ? emailE : field}
                  aria-label="A tooltip"
                >
                  <QuestionIcon />
                </Tooltip>
              </FormLabel>
              <Input
                name="email"
                id="email"
                onChange={handleInputChange}
                value={email}
                type={"email"}
                placeholder="Agrega un correo"
                autoComplete="new-email"
              />
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <Button
              mt={10}
              w={"100%"}
              type="submit"
              variant={"primary"}
              textTransform={"uppercase"}
            >
              Reguperar
            </Button>
          </GridItem>
        </Grid>
      </chakra.form>
    </>
  );
};

export default RetrieveUser;
