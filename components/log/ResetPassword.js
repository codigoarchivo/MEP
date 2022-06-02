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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import useFormAll from "../../hooks/useFormAll";

import Validator from "../../helpers/Validator";
import ModeColor from "../../helpers/ModeColor";

import { resetPassword } from "../../actions/auth";

const initialStates = {
  password: "",
};

const data = {
  pass: false,
};

const ResetPassword = () => {
  // dispatch
  const dispatch = useDispatch();
  // guardar states
  const { values, handlePassword, handleInputChange, reset } = useFormAll(
    initialStates,
    data
  );
  // validar
  const { field, passwordV, fiel } = Validator(values);
  // mode Color
  const { textError, bgTextError } = ModeColor();
  // valores
  const { password, pass } = values;

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordV) {
      return Toast(fiel, "error", 5000);
    } else {
      dispatch(resetPassword(password, getParameterByName("oobCode")));
      Toast("Password has been changed, you can login now.", "success", 5000);
      reset();
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
                type={pass ? "text" : "password"}
                placeholder="new password"
                autoComplete="new-password"
              />
              <InputRightElement width="4.5rem">
                <Button
                  variant={"secondary"}
                  h="1.75rem"
                  onClick={handlePassword}
                >
                  {pass ? <ViewIcon /> : <ViewOffIcon />}
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
