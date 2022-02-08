import {
  extendTheme,
  withDefaultVariant,
  theme as base,
} from "@chakra-ui/react";

const stylesFonts = {
  fonts: {
    heading: `Montserrat ${base.fonts?.heading}`,
    body: `Roboto ${base.fonts?.body}`,
  },
};

const colors = {
  brand: {
    50: "#5965",
    100: "#443",
    200: "#8AC",
    300: "#112",
    400: "#676",
    500: "#fff",
    600: "#E9E9E9",
    700: "#ffd60a",
    800: "#ffc301",
    900: "#00020f",
  },
};

const inputStyles = {
  Input: {
    variants: {
      filled: {
        field: {
          _focus: {
            borderColor: "brand.800",
            boxShadow: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
          },
        },
      },
    },
    sizes: {
      md: {
        field: {
          borderRadius: "none",
        },
      },
    },
  },
};

export const theme = extendTheme(
  {
    ...stylesFonts,
    colors,
    components: { ...inputStyles },
  },
  withDefaultVariant({
    variant: "filled",
    components: ["Input", "Select"],
  })
);
