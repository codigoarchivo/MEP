import { useRef } from "react";

import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  chakra,
} from "@chakra-ui/react";

import { testimonialsAdd } from "../../actions/user";
import { ModeColor } from "../../helpers/ModeColor";
import { useFormAll } from "../../hooks/useFormAll";
import { Toast } from "../../helpers/Toast";

import { es } from "../../translations/es";
import { en } from "../../translations/en";

const initialStates = { profession: "", coment: "" };

export const AddTestimonials = () => {
  const { activeSelect } = useSelector(({ auth }) => auth);

  const { testimonials } = useSelector(({ message }) => message);

  const { replace, locale } = useRouter();

  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  const finalRef = useRef(null);

  // ModeColor
  const { bg, bg5, bg6, modelA } = ModeColor();

  const { values, reset, handleInputChange } = useFormAll(initialStates);

  const { coment, profession } = values;

  const { photoURL, displayName, uid } = activeSelect;

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([photoURL, displayName, uid].includes(undefined)) {
      replace("/auth/login");
      return Toast(
        locale === "en-US" ? en.about.aB : es.about.aB,
        "error",
        3000
      );
    }

    if ([coment, profession].includes("")) {
      return Toast(locale === "en-US" ? en.fields : es.fields, "error", 3000);
    }

    const err = locale === "en-US" ? en.error : es.error;

    dispatch(
      testimonialsAdd(
        {
          coment,
          profession,
          photo: photoURL,
          name: displayName,
        },
        uid,
        err
      )
    );

    Toast(locale === "en-US" ? en.about.aA : es.about.aA, "success", 3000);
    reset();
    onClose();
  };

  return (
    <>
      <Button mt={10} onClick={onOpen}>
        Add Testimonials
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Testimonials</ModalHeader>
          <ModalCloseButton />
          <chakra.form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Profesion</FormLabel>
                <Input
                  value={profession}
                  onChange={handleInputChange}
                  name="profession"
                  ref={initialRef}
                  placeholder="Profesion"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Comentario</FormLabel>
                <Textarea
                  value={coment}
                  onChange={handleInputChange}
                  name="coment"
                  _hover={{ backgroundColor: bg5, borderColor: bg6 }}
                  p={{ base: 1, md: 3 }}
                  bg={bg}
                  variant={"filled"}
                  _focus={{ border: modelA }}
                  borderColor={bg6}
                  rounded="none"
                  placeholder="Agregar un  comentario"
                  size="sm"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </chakra.form>
        </ModalContent>
      </Modal>
    </>
  );
};
