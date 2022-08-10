import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import {
  Category,
  Home,
  ListEspera,
  Perfil,
  Product,
  ShopAll,
  VentasClient,
} from "../../../helpers/IconNew";

import { en } from "../../../translations/en";
import { es } from "../../../translations/es";

export const ListRoute = () => {
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // dispatch
  const { locale } = useRouter();

  const dataRoute = [
    {
      icon: <Home />,
      ref: "/",
      as: "/",
      nam: locale === "en-US" ? en.major.mA : es.major.mA,
    },
    {
      icon: <Perfil />,
      ref: "/user",
      as: "/user",
      nam: locale === "en-US" ? en.major.mD : es.major.mD,
      rol: a.rol === "owner" || a.rol === "user" ? "block" : "none",
    },
    {
      icon: <ListEspera />,
      ref: "/blog",
      as: "/blog",
      nam: locale === "en-US" ? en.major.mE : es.major.mE,
    },
    {
      icon: <VentasClient />,
      ref: `/admin/[uid]`,
      as: `/admin/${a.uid ? a.uid : "0"}`,
      nam: locale === "en-US" ? en.major.mH : es.major.mH,
      rol: a.rol === "owner" ? "block" : "none",
    },
    {
      icon: <Product />,
      ref: `/product/[uid]`,
      as: `/product/${a.uid ? a.uid : "0"}`,
      nam: locale === "en-US" ? en.major.mG : es.major.mG,
    },
    {
      icon: <Category />,
      ref: "/admin/category",
      as: "/admin/category",
      nam: locale === "en-US" ? en.major.mF : es.major.mF,
      rol: a.rol === "owner" ? "block" : "none",
    },
    {
      icon: <ShopAll />,
      ref: "/search",
      as: "/search",
      nam: locale === "en-US" ? en.major.mI : es.major.mI,
    },
  ];

  return {
    dataRoute,
  };
};
