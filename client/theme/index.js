import { extendTheme, withDefaultVariant } from "@chakra-ui/react";

const colors = {
  brand: {
    900: "#00020f",
    800: "#ffc301",
    700: "#ffd60a",
    600: "#e1e1e1",
    500: "#fff",
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
    colors,
    components: { ...inputStyles },
  },
  withDefaultVariant({
    variant: "filled",
    components: ["Input", "Select"],
  })
);
