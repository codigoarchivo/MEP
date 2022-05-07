import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import Layout from "../../components/layout/Layout";

import {
  Button,
  Container,
  Flex,
  Heading,
  List,
  VStack,
} from "@chakra-ui/react";

import { Step, Steps, useSteps } from "chakra-ui-steps";

import { StepsContent } from "../../helpers/StepsContent";

const Sell = () => {
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  // useSteps
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  // StepsContent
  const { stepsData } = StepsContent();

  const [activo, setActivo] = useState(false);

  const [activoP, setActivoP] = useState(false);

  useEffect(() => {
    const { uid, email, rol } = activeSelect;
    setActivo(uid && email && rol ? false : true);
  }, [setActivo]);

  useEffect(() => {
    stepsData.map((step, i) => {
      if (i === 1) {
        setActivoP(step.flag1.e1 || step.flag2.e2 ? true : false);
      }
    });
  }, [setActivoP, stepsData]);

  return (
    <Layout>
      <Container maxW={"container.sm"} py={20}>
        <VStack w={"full"} spacing={10}>
          <Heading
            w={"full"}
            size={"md"}
            fontWeight={"normal"}
            textTransform={"uppercase"}
          >
            Pasos para poder vender en nuestro sitio
          </Heading>
          <Flex flexDir="column" width="100%">
            <Steps activeStep={activeStep} colorScheme={"brand"}>
              {stepsData.map(({ label, icon, contenido }, i) => (
                <Step label={label} key={label} icon={icon}>
                  <List spacing={3} w={"full"} my={10}>
                    {contenido}
                  </List>
                </Step>
              ))}
            </Steps>
            {activeStep === stepsData.length ? (
              <Flex px={4} py={4} width="100%" flexDirection="column">
                <Heading fontSize="xl" textAlign="center">
                  Woohoo! All steps completed!
                </Heading>
                <Button mx="auto" mt={6} size="sm" onClick={reset}>
                  Reset
                </Button>
              </Flex>
            ) : (
              <Flex width="100%" justify="flex-end">
                <Button
                  size="sm"
                  mr={4}
                  variant="secondary"
                  onClick={prevStep}
                  isDisabled={activeStep === 0}
                >
                  Prev
                </Button>
                <Button
                  size="sm"
                  variant={"primary"}
                  onClick={nextStep}
                  isDisabled={activo}
                >
                  {activeStep === stepsData.length - 1 ? "Finish" : "Next"}
                </Button>
              </Flex>
            )}
          </Flex>
        </VStack>
      </Container>
    </Layout>
  );
};

export default Sell;
