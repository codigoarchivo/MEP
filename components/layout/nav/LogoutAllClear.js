import { useRouter } from "next/router";

import { useDispatch } from "react-redux";

import { Logout } from "../../../helpers/IconNew";

import { Button } from "@chakra-ui/react";

import { logout } from "../../../actions/auth";

import en from "../../../translations/en";
import es from "../../../translations/es";

const LogoutAllClear = () => {
  const dispatch = useDispatch();

  const { locale, push } = useRouter();

  const handleLogout = () => {
    const err = locale === "en" ? en.error : es.error;
    dispatch(logout(err));
    push("/");
  };

  return (
    <Button
      variant={"secondary"}
      fontWeight={"normal"}
      leftIcon={<Logout />}
      onClick={handleLogout}
    >
      {locale === "en" ? en.logout : es.logout}
    </Button>
  );
};

export default LogoutAllClear;
