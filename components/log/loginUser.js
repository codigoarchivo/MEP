import React from "react";

import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";

import { QuestionIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Button,
  Tooltip,
  Text,
  Flex,
  chakra,
  VStack,
  HStack,
  CloseButton,
} from "@chakra-ui/react";

import { useFormAll } from "../../hooks/useFormAll";

import { Validator } from "../../helpers/Validator";
import { ModeColor } from "../../helpers/ModeColor";
import { GoogleIcon } from "../../helpers/IconNew";
import { Toast } from "../../helpers/Toast";
import { NavLink } from "../../utils/Navlink";

import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";

import { DividerWithText } from "../../utils/DividerWithText";

import { Breakpoints } from "../../helpers/Breakpoints";

const initialStates = {
  email: "jackson@gmail.com",
  password: "123456",
};
const data = {
  pass: false,
};
export const LoginUser = ({ handleReview, locale, es, en, back, push }) => {
  // selector
  const { loading } = useSelector(({ ui }) => ui);
  // dispatch
  const dispatch = useDispatch();
  // useFormAll
  const { values, handleInputChange, handlePassword } = useFormAll(
    initialStates,
    data
  );
  const aM = locale === "en" ? en.auth.aM : es.auth.aM;
  const aL = locale === "en" ? en.auth.aL : es.auth.aL;
  const aK = locale === "en" ? en.auth.aK : es.auth.aK;
  const aN = locale === "en" ? en.auth.aN : es.auth.aN;
  // validar
  const { emailE, passwordL, field, ErrorRorL } = Validator(
    values,
    aM,
    aL,
    aK,
    aN
  );
  // mode Color
  const { textError, bgTextError, modelC } = ModeColor();
  // valores
  const { email, password, pass } = values;

  let err = locale === "en" ? en.error : es.error;
  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (ErrorRorL) {
      return Toast(locale === "en" ? en.check : es.check, "error", 5000);
    } else {
      dispatch(startLoginEmailPassword(email, password, err));
    }
  };
  // handleGooglelogin
  const handleGooglelogin = () => {
    dispatch(startGoogleLogin(err));
  };

  const { bordes } = Breakpoints();
  return (
    <>
      <chakra.form
        onSubmit={handleSubmit}
        boxShadow="2xl"
        p={{ base: 2, sm: 5 }}
        w={{ base: "100%", sm: "70%", md: "60%", lg: "70%" }}
        h={"min-content"}
        border={bordes}
      >
        <VStack spacing={5}>
          <HStack w={"full"} justifyContent="space-between">
            <Heading size={"md"} textTransform={"uppercase"}>
              {locale === "en" ? en.auth.aA : es.auth.aA}
            </Heading>
            <CloseButton size="sm" onClick={() => back()} />
          </HStack>
          <FormControl>
            {!emailE && (
              <FormHelperText color={modelC}>
                {locale === "en" ? en.auth.aI : es.auth.aI}
              </FormHelperText>
            )}
            <FormLabel htmlFor="email" color={modelC}>
              {locale === "en" ? en.mail : es.mail}{" "}
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
              placeholder={locale === "en" ? en.mail : es.mail}
              autoComplete="new-email"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password" color={modelC}>
              {locale === "en" ? en.password : es.password}{" "}
              <Tooltip
                color={textError}
                bg={bgTextError}
                label={passwordL ? passwordL : field}
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
                  variant={"tertiary"}
                  h="1.75rem"
                  onClick={handlePassword}
                >
                  {pass ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            w={"full"}
            variant="outline"
            textTransform={"uppercase"}
            rightIcon={<GoogleIcon />}
            onClick={handleGooglelogin}
            size={"sm"}
            fontSize={{ base: 10, sm: 14 }}
          >
            {locale === "en" ? en.auth.aC : es.auth.aC}
          </Button>
          <Button
            isLoading={loading}
            w={"full"}
            type="submit"
            variant={"primary"}
            textTransform={"uppercase"}
          >
            {locale === "en" ? en.auth.aD : es.auth.aD}
          </Button>
          <Flex w={"full"} alignItems={"center"} justifyContent={"center"}>
            <Text>{locale === "en" ? en.auth.aF : es.auth.aF}</Text>
            <NavLink
              href={"/auth/create"}
              variant={"tertiary"}
              name={locale === "en" ? en.auth.aH : es.auth.aH}
            />
          </Flex>
          <DividerWithText>
            {locale === "en" ? en.auth.aE : es.auth.aE}
          </DividerWithText>
          <Flex w={"full"} alignItems={"center"} justifyContent={"center"}>
            <Text>{locale === "en" ? en.auth.aG : es.auth.aG}</Text>
            <Button variant={"tertiary"} onClick={handleReview}>
              {locale === "en" ? en.auth.aD : es.auth.aD}
            </Button>
          </Flex>
        </VStack>
      </chakra.form>
    </>
  );
};

LoginUser.propTypes = {
  handleReview: PropTypes.func,
  locale: PropTypes.string,
  back: PropTypes.func,
  push: PropTypes.func,
  es: PropTypes.object,
  en: PropTypes.object,
};
