import React from "react";

import {
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";

import PropTypes from "prop-types";

import { formatDistanceToNow } from "date-fns";

import localEs from "date-fns/locale/es";
import localEn from "date-fns/locale/en-US";

import { Breakpoints } from "../../helpers/Breakpoints";

import { NavLink } from "../../utils/Navlink";

import { Salemodal } from "./Salemodal";

import { SalemodalReciewe } from "./SalemodalReciewe";

import { en } from "../../translations/en";
import { es } from "../../translations/es";

export const SaleScreen = ({ item = {}, locale, paid }) => {
  // Breakpoints
  const { bordes, full, content3 } = Breakpoints();

  const { pj, cn, pr, to, in: inc, na } = item.product;

  const poin = useBreakpointValue({ base: "0", md: "15px" });
  const poinB = useBreakpointValue({ base: "15px", md: "0" });
  return (
    <HStack
      w={full}
      justifyContent={"space-between"}
      flexDirection={content3}
      alignItems={{ base: "start", sm: "flex-end" }}
      borderBottom={bordes}
      spacing={0}
    >
      <VStack w={full} spacing={0} overflow={"auto"}>
        {[
          {
            all: locale === "en" ? en.name : es.name,
            dat: locale === "en" ? na.en : na.es,
          },
          {
            all: locale === "en" ? en.quantity : es.quantity,
            dat: "N°" + cn,
          },
          {
            all: locale === "en" ? en.price : es.price,
            dat: "$" + pj,
          },
          {
            all: locale === "en" ? en.tax : es.tax,
            dat: "$" + inc,
          },
          {
            all: locale === "en" ? en.unit : es.unit,
            dat: "$" + pr,
          },
          {
            all: "Total",
            dat: "$" + to,
          },
          {
            all: paid,
            dat: formatDistanceToNow(item.cre, {
              locale: locale === "en" ? localEn : localEs,
            }),
          },
        ].map(({ all, dat }, key) => (
          <HStack w={"full"} key={key}>
            <Heading as="h3" size="sm">
              {all}:
            </Heading>
            <Text size={"sm"}>{dat}</Text>
          </HStack>
        ))}
      </VStack>

      <Stack
        spacing={0}
        w={full}
        py={2}
        justifyContent={"flex-end"}
        flexDirection={{ base: "column-reverse", md: "row" }}
      >
        <Salemodal
          imgs={item.imp}
          receipt={locale === "en" ? en.receipt : es.receipt}
          close={locale === "en" ? en.close : es.close}
          picture={locale === "en" ? en.picture : es.picture}
          textTransform={"uppercase"}
        />
        <SalemodalReciewe
          styles={{ marginLeft: poin, marginBottom: poinB }}
          bordes={bordes}
          es={es}
          en={en}
          locale={locale}
          item={item}
          receipt={locale === "en" ? en.receiptOne : es.receiptOne}
          close={locale === "en" ? en.close : es.close}
          textTransform={"uppercase"}
        />
        <NavLink
          styles={{ marginLeft: poin, marginBottom: poinB }}
          w={{ base: "full", md: "min-content" }}
          href={`/info/[uid]`}
          as={`/info/${item.buy}`}
          name={locale === "en" ? en.buyer : es.buyer}
          variant={"primary"}
          size={"xs"}
          fontSize={"small"}
          textTransform={"uppercase"}
        />
      </Stack>
    </HStack>
  );
};

SaleScreen.propTypes = {
  item: PropTypes.object,
  locale: PropTypes.string,
  paid: PropTypes.string,
};
