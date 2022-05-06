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

import { stepsData } from "../../helpers/StepsContent";

const Sell = () => {
  // selector
  const { activeSelect } = useSelector(({ auth }) => auth);
  // useSteps
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    const { uid, email, rol } = activeSelect;
    setActivo(uid && email && rol ? false : true);
  }, [setActivo]);

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
              {stepsData.map(({ label, icon, contenido }) => (
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
                  isDisabled={activeStep === 0}
                  mr={4}
                  onClick={prevStep}
                  size="sm"
                  variant="ghost"
                >
                  Prev
                </Button>
                <Button size="sm" onClick={nextStep} isDisabled={activo}>
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
