import { createStandaloneToast } from "@chakra-ui/react";

const Toast = (desc, stat, dura) => {
  const toast = createStandaloneToast();

  if ((desc, stat, dura)) {
    return toast({
      description: desc,
      status: stat,
      duration: dura,
      isClosable: true,
      position: "top-right",
      containerStyle: {
        minWidth: 250,
        fontSize: 12,
        textTransform: "uppercase",
      },
    });
  }
};

export default Toast;
