import React from "react";

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

  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

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
            <Steps activeStep={activeStep}>
              {stepsData.map(({ label, icon, contenido }) => (
                <Step label={label} key={label} icon={icon}>
                  <List spacing={3} w={"full"}>
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
                <Button size="sm" onClick={nextStep}>
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
