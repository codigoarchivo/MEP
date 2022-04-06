import React from "react";

import { useDispatch } from "react-redux";

import { QuestionIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
  Tooltip,
  chakra,
  VStack,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import useForm from "../../hooks/useForm";
import useFormShow from "../../hooks/useFormShow";

import Validator from "../../helpers/Validator";
import ModeColor from "../../helpers/ModeColor";

import { resetPassword } from "../../actions/auth";

const initialStates = {
  password: "",
};

const ResetPassword = () => {
  // toast
  const toast = useToast();
  // dispatch
  const dispatch = useDispatch();
  // vista de la contraseña
  const { show, handleClick } = useFormShow();
  // guardar states
  const { values, handleInputChange } = useForm(initialStates);
  // validar
  const { field, passwordV, fiel } = Validator(values);
  // mode Color
  const { textError, bgTextError } = ModeColor();
  // valores
  const { password } = values;
  
  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordV) {
      return toast({
        description: fiel,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      dispatch(resetPassword(password, getParameterByName("oobCode")));
      toast({
        description: "Password has been changed, you can login now.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <>
      <chakra.form onSubmit={handleSubmit} boxShadow="2xl" p={5}>
        <VStack spacing={10}>
          <Heading w={"full"} size={"md"} textTransform={"uppercase"}>
            New password
          </Heading>
          <FormControl isInvalid>
            <FormLabel htmlFor="password">
              Contraseña{" "}
              <Tooltip
                color={textError}
                bg={bgTextError}
                label={passwordV ? passwordV : field}
                aria-label="A tooltip"
              >
                <QuestionIcon />
              </Tooltip>
            </FormLabel>
            <InputGroup size="md">
              <Input
                name="password"
                id="password"
                onChange={handleInputChange}
                value={password}
                pr="4.5rem"
                type={show.password ? "text" : "password"}
                placeholder="new password"
                autoComplete="new-password"
              />
              <InputRightElement width="4.5rem">
                <Button variant={"secondary"} h="1.75rem" onClick={handleClick}>
                  {show.password ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            w={"100%"}
            type="submit"
            variant={"primary"}
            textTransform={"uppercase"}
          >
            recover
          </Button>
        </VStack>
      </chakra.form>
    </>
  );
};

export default ResetPassword;
