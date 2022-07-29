import React from "react";

import PropTypes from "prop-types";

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

import { useFormAll } from "../../hooks/useFormAll";

import { Validator } from "../../helpers/Validator";
import { ModeColor } from "../../helpers/ModeColor";
import { Toast } from "../../helpers/Toast";

import { sendEmail } from "../../actions/auth";

import { DividerWithText } from "../../utils/DividerWithText";
import { NavLink } from "../../utils/Navlink";
import { Breakpoints } from "../../helpers/Breakpoints";

const initialStates = {
  email: "jacksonescuques@gmail.com",
};

export const ReviewUser = ({ locale, es, en }) => {
  // dispatch
  const dispatch = useDispatch();
  // guardar states
  const { values, handleInputChange } = useFormAll(initialStates);

  const aL = locale === "en" ? en.auth.aL : es.auth.aL;
  const aK = locale === "en" ? en.auth.aK : es.auth.aK;
  // validar
  const { emailE, field, ErrorLorR } = Validator(values, "", aL, aK);

  // mode Color
  const { textError, bgTextError, modelC } = ModeColor();

  // valores
  const { email } = values;
  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const err = locale === "en" ? en.error : es.error;
    if (ErrorLorR) {
      return Toast(locale === "en" ? en.check : es.check, "error", 5000);
    } else {
      dispatch(sendEmail(email, err));
      Toast(
        `${locale === "en" ? en.auth.aS : es.auth.aS} ${email} ${
          locale === "en" ? en.auth.aT : es.auth.aT
        }`,
        "success",
        5000
      );
    }
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
          <Heading w={"full"} size={"md"} textTransform={"uppercase"}>
            {locale === "en" ? en.auth.aH : es.auth.aH}
          </Heading>
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

ReviewUser.propTypes = {
  locale: PropTypes.string,
  es: PropTypes.object,
  en: PropTypes.object,
};
