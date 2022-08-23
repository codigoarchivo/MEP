import { useRouter } from "next/router";

import { SearchIcon } from "@chakra-ui/icons";

import {
  Stack,
  chakra,
  InputLeftElement,
  Input,
  InputGroup,
} from "@chakra-ui/react";

import { useFormAll } from "../../../hooks/useFormAll";

import { MenuCategoria } from "../../../utils/MenuCategoria";

import { en } from "../../../translations/en";
import { es } from "../../../translations/es";

const initialStates = {
  q: "",
};
export const DesktopNav = () => {
  // dispatch
  const { push, locale } = useRouter();

  const { values, reset, handleInputChange } = useFormAll(initialStates);

  const handleSerchProduct = (e) => {
    e.preventDefault();
    const q = values.q;
    push({
      pathname: "/search",
      query: { q },
    });
    reset();
  };

  return (
    <Stack
      direction={"row"}
      spacing={4}
      alignItems={"center"}
      justifyContent={"space-around"}
    >
      {/* Category */}
      <MenuCategoria />
      <chakra.form onSubmit={handleSerchProduct} pl={{ base: 0, lg: 20 }}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon display={"block"} />
          </InputLeftElement>
          <Input
            _placeholder={{ color: "inherit" }}
            type={"search"}
            placeholder={locale === "en-US" ? en.searchs : es.searchs}
            value={values.q}
            name={"q"}
            onChange={handleInputChange}
          />
        </InputGroup>
      </chakra.form>
    </Stack>
  );
};
