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
    50: "#b3b2b0",
    100: "#1b2232",
    200: "#c1c2c343",
    300: "#94979e43",
    400: "#1b22320d",
    500: "#fff",
    600: "#1b223234",
    700: "#E5E4E2",
    800: "#E5E4E2",
    900: "#1b2232",
  },
};
const inputStyles = {
  variants: {
    filled: (props) => ({
      field: {
        backgroundColor: mode("brand.400", "brand.300")(props),
        borderColor: mode("brand.900", "brand.800")(props),
        boxShadow: "inset 0 2px 4px 0 rgba(0,0,0,0.06)",
        _placeholder: {
          opacity: 1,
          color: mode("brand.800", "brand.900")(props),
        },
        _hover: {
          backgroundColor: mode("brand.600", "brand.200")(props),
          borderColor: mode("brand.600", "brand.200")(props),
        },
        _focus: {
          backgroundColor: mode("brand.600", "brand.200")(props),
          borderColor: mode("brand.600", "brand.200")(props),
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
      backgroundColor: mode("brand.900", "brand.500")(props),
      color: mode("brand.500", "brand.900")(props),
      _hover: {
        backgroundColor: mode("brand.600", "brand.200")(props),
        color: mode("brand.900", "brand.800")(props),
      },
      _focus: {
        ring: 2,
        ringColor: mode("brand.600", "brand.200")(props),
      },
      _active: {
        backgroundColor: mode("brand.800", "brand.900")(props),
        color: mode("brand.900", "brand.500")(props),
      },
    }),
    secondary: (props) => ({
      rounded: "none",
      backgroundColor: "transparent",
      color: mode("brand.500", "brand.900")(props),
      _hover: {
        color: mode("brand.50", "brand.300")(props),
      },
      _focus: {
        ring: 2,
        ringColor: "transparent",
      },
    }),
    tertiary: (props) => ({
      backgroundColor: "transparent",
      color: mode("brand.900", "brand.500")(props),
      _hover: {
        color: mode("brand.50", "brand.50")(props),
      },
      _focus: {
        ring: 2,
        ringColor: "transparent",
      },
    }),
    outline: (props) => ({
      backgroundColor: "transparent",
      color: mode("brand.900", "brand.500")(props),
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
        color: mode("brand.900", "brand.500")(props),
        bg: mode("brand.800", "brand.900")(props), // TODO cambiar de
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
      Textarea: {
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
