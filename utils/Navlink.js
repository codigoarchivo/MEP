import React, { forwardRef } from "react";

import PropTypes from "prop-types";

import { Button } from "@chakra-ui/react";

import NextLink from "next/link";

export const NavLink = ({
  rightIcon,
  leftIcon,
  href,
  name,
  variant,
  size,
  border,
  w,
  px,
  fontWeight,
  as,
  disabled,
  textTransform,
  backgroundColor,
  color,
  display,
  boxShadow,
  rounded,
  locale,
  fontSize,
  styles,
}) => {

  const MyButton = forwardRef(({ onClick, href }, ref) => {
    return (
      <Button
        href={href}
        onClick={onClick}
        ref={ref}
        as={"a"}
        style={{ ...styles }}
        fontSize={fontSize}
        rightIcon={rightIcon}
        leftIcon={leftIcon}
        cursor={"pointer"}
        size={size}
        border={border}
        variant={variant}
        w={w}
        px={px}
        fontWeight={fontWeight}
        disabled={disabled}
        textTransform={textTransform}
        backgroundColor={backgroundColor}
        color={color}
        display={display}
        shadow={boxShadow}
        rounded={rounded}
      >
        {name}
      </Button>
    );
  });
  
  return (
    <NextLink href={href} as={as} locale={locale} passHref>
      <MyButton />
    </NextLink>
  );
};

NavLink.propTypes = {
  styles: PropTypes.object,
  rightIcon: PropTypes.string,
  leftIcon: PropTypes.object,
  variant: PropTypes.string,
  size: PropTypes.string,
  border: PropTypes.string,
  click: PropTypes.string,
  as: PropTypes.string,
  disabled: PropTypes.string,
  textTransform: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  display: PropTypes.string,
  boxShadow: PropTypes.string,
  rounded: PropTypes.string,
  locale: PropTypes.string,
};
