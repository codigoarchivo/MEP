import React from "react";

import { useRouter } from "next/router";

import PropTypes from "prop-types";

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
  Center,
} from "@chakra-ui/react";

import { useFormAll } from "../../hooks/useFormAll";

import { Validator } from "../../helpers/Validator";
import { ModeColor } from "../../helpers/ModeColor";

import { handleVerifyEmail, resetPassword } from "../../actions/auth";
import { Breakpoints } from "../../helpers/Breakpoints";
import { Toast } from "../../helpers/Toast";
import { DividerWithText } from "../../utils/DividerWithText";
import { NavLink } from "../../utils/Navlink";

const initialStates = {
  password: "",
};

const data = {
  pass: false,
};

export const ResetPassword = ({ locale, es, en }) => {
  // dispatch
  const dispatch = useDispatch();
  // useRouter
  const { query } = useRouter();
  // guardar states
  const { values, handlePassword, handleInputChange, reset } = useFormAll(
    initialStates,
    data
  );

  const aM = locale === "en" ? en.auth.aM : es.auth.aM;
  const aK = locale === "en" ? en.auth.aK : es.auth.aK;

  // validar
  const { field, passwordV } = Validator(values, aM, "", aK);
  // mode Color
  const { textError, bgTextError, modelC } = ModeColor();
  // valores
  const { password, pass } = values;

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const err = locale === "en" ? en.error : es.error;
    const success = locale === "en" ? en.auth.aU : es.auth.aU;
    if (passwordV) {
      return Toast(locale === "en" ? en.check : es.check, "error", 5000);
    } else {
      dispatch(resetPassword(password, query.oobCode.toString(), err, success));
      reset();
    }
  };

  // handleVerify
  const handleVerify = (e) => {
    e.preventDefault();
    const err = locale === "en" ? en.error : es.error;
    const success = locale === "en" ? en.auth.aX : es.auth.aX;
    dispatch(handleVerifyEmail(query.oobCode.toString(), err, success));
  };

  // Breakpoints
  const { bordes } = Breakpoints();

  return (
    <>
      <chakra.form
        onSubmit={query.mode === "verifyEmail" ? handleVerify : handleSubmit}
        boxShadow="2xl"
        p={5}
        border={bordes}
        w={{ base: "100%", sm: "70%", md: "60%", lg: "70%" }}
        h={"min-content"}
        mt={3}
      >
        <VStack
          py={5}
          display={query.mode === "verifyEmail" ? "block" : "none"}
          spacing={5}
        >
          <Heading w={"full"} size={"md"} textTransform={"uppercase"}>
            {locale === "en" ? en.verify.vG : es.verify.vG}
          </Heading>
          <Button w={"full"} type="submit" variant={"primary"} h="1.75rem">
            verifyEmail
          </Button>
          <DividerWithText w={"full"} />
          <Center>
            <NavLink
              href={"/auth"}
              variant={"tertiary"}
              name={locale === "en" ? en.major.mA : es.major.mA}
            />
          </Center>
        </VStack>

        <VStack
          spacing={10}
          display={query.mode === "verifyEmail" ? "none" : "block"}
        >
          <Heading w={"full"} size={"md"} textTransform={"uppercase"}>
            {locale === "en" ? en.auth.aV : es.auth.aV}
          </Heading>
          <FormControl>
            <FormLabel color={modelC} htmlFor="password">
              {locale === "en" ? en.password : es.password}{" "}
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
                placeholder={locale === "en" ? en.password : es.password}
                autoComplete="new-password"
              />
              <InputRightElement width="4.5rem">
                <Button
                  onClick={handlePassword}
                  variant={"tertiary"}
                  h="1.75rem"
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
            {locale === "en" ? en.auth.aJ : es.auth.aJ}
          </Button>
          <DividerWithText>
            {locale === "en" ? en.auth.aE : es.auth.aE}
          </DividerWithText>
          <Center>
            <NavLink
              href={"/auth"}
              variant={"tertiary"}
              name={locale === "en" ? en.auth.aA : es.auth.aA}
            />
          </Center>
        </VStack>
      </chakra.form>
    </>
  );
};

ResetPassword.propTypes = {
  locale: PropTypes.string,
  es: PropTypes.object,
  en: PropTypes.object,
};
