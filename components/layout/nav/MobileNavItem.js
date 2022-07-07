import { Stack, useDisclosure } from "@chakra-ui/react";

import NavLink from "../../../utils/Navlink";

const MobileNavItem = ({ icon, ref, as, nam, rol }) => {
  // const { onToggle } = useDisclosure();
  return (
    <Stack spacing={4} display={rol & rol}>
      <NavLink
        leftIcon={icon}
        fontWeight={"normal"}
        variant={"secondary"}
        href={ref}
        as={as}
        name={nam}
      />
    </Stack>
  );
};

export default MobileNavItem;
