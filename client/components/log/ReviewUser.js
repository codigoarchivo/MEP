import React from "react";

import { useDispatch } from "react-redux";

import { QuestionIcon } from "@chakra-ui/icons";

import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  FormHelperText,
  Button,
  Tooltip,
  chakra,
  VStack,
  Center,
} from "@chakra-ui/react";

import useForm from "../../hooks/useForm";

import Validator from "../../helpers/Validator";
import ModeColor from "../../helpers/ModeColor";

import { sendEmail } from "../../actions/auth";
import DividerWithText from "../utils/DividerWithText";
import NavLink from "../../helpers/Navlink";
import Toast from "../../helpers/Toast";

const initialStates = {
  email: "jacksonescuques@gmail.com",
};

const ReviewUser = () => {
  // dispatch
  const dispatch = useDispatch();
  // guardar states
  const { values, handleInputChange } = useForm(initialStates);
  // validar
  const { emailE, field, ErrorLorR, fiel } = Validator(values);
  // mode Color
  const { textError, bgTextError } = ModeColor();
  // valores
  const { email } = values;

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ErrorLorR) {
      return Toast(fiel, "error", 5000);
    } else {
      dispatch(sendEmail(email));
      Toast(
        "An email is sent to ${email} for password reset instructions.",
        "success",
        5000
      );
    }
  };

  return (
    <>
      <chakra.form onSubmit={handleSubmit} boxShadow="2xl" p={5}>
        <VStack spacing={5}>
          <Heading w={"full"} size={"md"} textTransform={"uppercase"}>
            Forgot password
          </Heading>
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
          <Button
            w={"100%"}
            type="submit"
            variant={"primary"}
            textTransform={"uppercase"}
          >
            Reguperar
          </Button>
          <DividerWithText>OR</DividerWithText>
          <Center>
            <NavLink href={"/account"} variant={"secondary"} name={"Login"} />
          </Center>
        </VStack>
      </chakra.form>
    </>
  );
};

export default ReviewUser;
