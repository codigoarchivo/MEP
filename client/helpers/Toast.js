import { useToast } from "@chakra-ui/react";

const Toast = (desc, stat) => {
  const toast = useToast();
  return toast({
    description: desc,
    status: stat,
    duration: 5000,
    isClosable: true,
    position: "top-right",
  });
};

export default Toast;
