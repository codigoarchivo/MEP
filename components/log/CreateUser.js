import React from "react";

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
  chakra,
  Center,
  VStack,
} from "@chakra-ui/react";

import Validator from "../../helpers/Validator";
import ModeColor from "../../helpers/ModeColor";
import NavLink from "../../utils/Navlink";
import Toast from "../../helpers/Toast";

import { startRegisterWithNameEmailPassword } from "../../actions/auth";

import DividerWithText from "../../utils/DividerWithText";
import useFormAll from "../../hooks/useFormAll";

const initialStates = {
  name: "jackson Quintero",
  email: "jackson@gmail.com",
  password: "123456",
  rePassword: "123456",
};
const data = {
  pass: false,
  rPass: false,
};
const CreateUser = ({ locale, es, en }) => {
  // selector
  const { loading } = useSelector(({ ui }) => ui);

  // dispatch
  const dispatch = useDispatch();

  // useFormAll
  const {
    values,
    handleInputChange,
    handlePassword,
    handleRePassword,
  } = useFormAll(initialStates, data);

  const aM = locale === "en" ? en.auth.aM : es.auth.aM;
  const aL = locale === "en" ? en.auth.aL : es.auth.aL;
  const aK = locale === "en" ? en.auth.aK : es.auth.aK;
  const aN = locale === "en" ? en.auth.aN : es.auth.aN;
  const aO = locale === "en" ? en.auth.aO : es.auth.aO;
  const aP = locale === "en" ? en.auth.aP : es.auth.aP;
  const aQ = locale === "en" ? en.auth.aQ : es.auth.aQ;

  // validar
  const {
    nameE,
    emailE,
    coPasswordE,
    coRePasswordE,
    field,
    ErrorLorR,
  } = Validator(values, aM, aL, aK, aN, aO, aP, aQ);

  // mode Color
  const { textError, bgTextError } = ModeColor();

  // valores
  const { name, email, password, rePassword, pass, rPass } = values;

  const err = locale === "en" ? en.error : es.error;
  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (ErrorLorR) {
      return Toast(locale === "en" ? en.check : es.check, "error", 5000);
    } else {
      dispatch(startRegisterWithNameEmailPassword(email, password, name, err));
    }
  };

  return (
    <>
      <chakra.form
        onSubmit={handleSubmit}
        boxShadow="2xl"
        p={{ base: 2, sm: 5 }}
        w={{ base: "100%", sm: "70%", md: "60%", lg: "70%" }}
        backgroundColor={"#fff"}
        h={"min-content"}
      >
        <VStack spacing={{ base: 3, sm: 5 }}>
          <Heading w={"full"} as="h1" size={"md"} textTransform={"uppercase"}>
            {locale === "en" ? en.auth.aH : es.auth.aH}
          </Heading>
          <FormControl>
            <FormLabel htmlFor="name">
              {locale === "en" ? en.name : es.name}{" "}
              <Tooltip
                color={textError}
                bg={bgTextError}
                label={nameE ? nameE : field}
                aria-label="A tooltip"
              >
                <QuestionIcon />
              </Tooltip>
            </FormLabel>

            <Input
              name="name"
              id="name"
              onChange={handleInputChange}
              value={name}
              type={"text"}
              placeholder={locale === "en" ? en.name : es.name}
            />
          </FormControl>
          <FormControl>
            {!emailE && (
              <FormHelperText mt={0}>
                {locale === "en" ? en.auth.aI : es.auth.aI}
              </FormHelperText>
            )}
            <FormLabel htmlFor="email">
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
            <FormLabel htmlFor="password">
              {locale === "en" ? en.password : es.password}{" "}
              <Tooltip
                color={textError}
                bg={bgTextError}
                label={coPasswordE ? coPasswordE : field}
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
                  variant={"secondary"}
                  h="1.75rem"
                  onClick={handlePassword}
                >
                  {pass ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="rePassword">
              {locale === "en" ? en.auth.aR : es.auth.aR}{" "}
              <Tooltip
                color={textError}
                bg={bgTextError}
                label={coRePasswordE ? coRePasswordE : field}
                aria-label="A tooltip"
              >
                <QuestionIcon />
              </Tooltip>
            </FormLabel>
            <InputGroup size="md">
              <Input
                name="rePassword"
                id="rePassword"
                onChange={handleInputChange}
                value={rePassword}
                pr="4.5rem"
                type={rPass ? "text" : "password"}
                placeholder={locale === "en" ? en.auth.aR : es.auth.aR}
                autoComplete="new-rePassword"
              />
              <InputRightElement width="4.5rem">
                <Button
                  variant={"secondary"}
                  h="1.75rem"
                  onClick={handleRePassword}
                >
                  {rPass ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            isLoading={loading}
            w={"full"}
            type="submit"
            variant={"primary"}
            textTransform={"uppercase"}
          >
            {locale === "en" ? en.auth.aH : es.auth.aH}
          </Button>
          <DividerWithText>
            {locale === "en" ? en.auth.aE : es.auth.aE}
          </DividerWithText>
          <Center>
            <NavLink
              href={"/auth"}
              variant={"secondary"}
              name={locale === "en" ? en.auth.aA : es.auth.aA}
            />
          </Center>
        </VStack>
      </chakra.form>
    </>
  );
};

export default CreateUser;
