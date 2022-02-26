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

const colors = {
  brand: {
    50: "#5965",
    100: "#ffc301",
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
  variants: {
    filled: (props) => ({
      field: {
        backgroundColor: mode("brand.600", "whiteAlpha.50")(props),
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
        ringColor: "brand.800",
      },
      backgroundColor: mode("brand.800", "whiteAlpha.50")(props),
      color: mode("brand.900", "brand.600")(props),
      _hover: {
        backgroundColor: mode("brand.700", "brand.700")(props),
        color: "brand.900",
      },
      _active: {
        backgroundColor: mode("brand.900", "brand.800")(props),
        color: mode("brand.700", "brand.600")(props),
      },
    }),
    secondary: (props) => ({
      backgroundColor: "transparent",
      color: mode("brand.900", "brand.600")(props),
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
    global: {
      html: {},
      body: {},
      a: {
        _hover: {
          textDecoration: "none",
        },
      },
    },
  },
};

export const theme = extendTheme(
  {
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
    },
  },
  withDefaultVariant({
    variant: "filled",
    components: ["Input", "NumberInput", "PinInput", "Select", "Textarea"],
  }),
  withDefaultColorScheme({ colorScheme: "brand" })
);
