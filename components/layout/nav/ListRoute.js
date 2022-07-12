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

import en from "../../../translations/en";
import es from "../../../translations/es";

const ListRoute = () => {
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // dispatch
  const { locale } = useRouter();

  const dataRoute = [
    {
      icon: <Home />,
      ref: "/",
      as: "/",
      nam: locale === "en" ? en.major.mA : es.major.mA,
    },
    {
      icon: <Perfil />,
      ref: "/user",
      as: "/user",
      nam: locale === "en" ? en.major.mD : es.major.mD,
    },
    {
      icon: <ListEspera />,
      ref: "/blog",
      as: "/blog",
      nam: locale === "en" ? en.major.mE : es.major.mE,
    },
    {
      icon: <VentasClient />,
      ref: `/admin?q=${a?.uid}`,
      as: `/admin?q=${a?.uid}`,
      nam: locale === "en" ? en.major.mH : es.major.mH,
      rol: a.rol === "owner" ? "block" : "none",
    },
    {
      icon: <Product />,
      ref: `/product/[uid]`,
      as: `/product/${a?.uid}`,
      nam: locale === "en" ? en.major.mG : es.major.mG,
    },
    {
      icon: <Category />,
      ref: "/admin/category",
      as: "/admin/category",
      nam: locale === "en" ? en.major.mF : es.major.mF,
      rol: a.rol === "owner" ? "block" : "none",
    },
    {
      icon: <ShopAll />,
      ref: "/search",
      as: "/search",
      nam: locale === "en" ? en.major.mI : es.major.mI,
    },
  ];

  return {
    dataRoute,
  };
};

export default ListRoute;
