import {
  extendTheme,
  withDefaultVariant,
  theme as base,
  withDefaultColorScheme,
} from "@chakra-ui/react";

import { mode } from "@chakra-ui/theme-tools";

const stylesFonts = {
  fonts: {
    heading: `Montserrat ${base.fonts?.heading}`,
    body: `Roboto ${base.fonts?.body}`,
  },
};
// 2. Add your color mode config
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const colors = {
  brand: {
    50: "#5965",
    100: "#ffc301",
    200: "#8AC",
    300: "#112",
    400: "#676",
    500: "#fff",
    600: "#1b2232",
    700: "#ffc301",
    800: "#D4AF37",
    900: "#1b2232",
  },
};
const inputStyles = {
  variants: {
    filled: (props) => ({
      field: {
        backgroundColor: mode("brand.900", "brand.800")(props),
        _focus: {
          borderColor: "brand.800",
          boxShadow: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
        },
      },
    }),
  },
  sizes: {
    md: {
      field: {
        borderRadius: "none",
      },
    },
  },
};
const buttonStyles = {
  variants: {
    primary: (props) => ({
      rounded: "none",
      textDecoration: "none",
      _focus: {
        ring: 2,
        ringColor: mode("brand.800", "brand.800")(props),
      },
      backgroundColor: mode("brand.800", "transparent")(props),
      borderColor: mode("brand.800", "brand.800")(props),
      color: mode("brand.900", "brand.800")(props),
      _hover: {
        backgroundColor: mode("brand.700", "brand.700")(props),
        color: "brand.900",
      },
      _active: {
        backgroundColor: mode("brand.800", "brand.900")(props),
        color: mode("brand.900", "brand.800")(props),
      },
    }),
    secondary: (props) => ({
      backgroundColor: "transparent",
      color: mode("brand.900", "brand.900")(props),
      _hover: {
        color: "brand.700",
      },
      _focus: {
        ring: 2,
        ringColor: "transparent",
      },
    }),
    tertiary: (props) => ({
      backgroundColor: "transparent",
      color: mode("brand.800", "brand.800")(props),
      _hover: {
        color: "brand.700",
      },
      _focus: {
        ring: 2,
        ringColor: "transparent",
      },
    }),
    outline: (props) => ({
      backgroundColor: "transparent",
      color: mode("brand.800", "brand.600")(props),
      _hover: {
        backgroundColor: "brand.800",
        color: "brand.900",
      },
      _focus: {
        ring: 2,
        ringColor: "transparent",
      },
    }),
  },
};

const globalStyles = {
  styles: {
    global: (props) => ({
      body: {
        color: mode("brand.900", "brand.800")(props),
        bg: mode("brand.500", "brand.900")(props),
      },
      html: {},
      svg: { display: "inline" },

      ul: {
        listStyle: "none",
      },
      a: {
        _hover: {
          textDecoration: "none",
        },
      },
      "*::placeholder": {
        color: mode("brand.800", "brand.800")(props),
      },
      "*, *::before, &::after": {
        borderColor: mode("brand.800", "brand.800")(props),
        wordWrap: "break-word",
      },
    }),
  },
};

const brandRing = {
  borderRadius: "none",
  _focus: {
    ring: 2,
    ringColor: "brand.500",
  },
  _hover: {
    backgroundColor: "brand.600",
    color: "brand.900",
  },
};

export const theme = extendTheme(
  {
    config,
    ...globalStyles,
    ...stylesFonts,
    colors,
    components: {
      Button: {
        ...buttonStyles,
      },
      NumberInput: {
        ...inputStyles,
      },
      NumberInput: {
        ...inputStyles,
      },
      Input: {
        ...inputStyles,
      },
      Select: {
        ...inputStyles,
      },
      Checkbox: {
        baseStyle: {
          control: {
            ...brandRing,
          },
        },
      },
    },
  },
  withDefaultVariant({
    variant: "filled",
    components: [
      "Input",
      "NumberInput",
      "PinInput",
      "Select",
      "Textarea",
      "Checkbox",
    ],
  }),
  withDefaultColorScheme({
    colorScheme: "brand",
    components: ["Checkbox"],
  })
);
