import Proptypes from "prop-types";

import { Stack } from "@chakra-ui/react";

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

MobileNavItem.propTypes = {
  icon: Proptypes.string,
  ref: Proptypes.string,
  as: Proptypes.string,
  nam: Proptypes.string,
  rol: Proptypes.string,
};

export default MobileNavItem;
