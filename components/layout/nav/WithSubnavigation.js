import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  chakra,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  Avatar,
  MenuItem,
  MenuList,
  MenuDivider,
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
  useColorMode,
  Heading,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  AddIcon,
  SearchIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import MenuCategoria from "../../../utils/MenuCategoria";
import { useRouter } from "next/router";
import en from "../../../translations/en";
import es from "../../../translations/es";
import useFormAll from "../../../hooks/useFormAll";
import NavbarCart from "./NavbarCart";
import {
  CartIcon,
  Category,
  Global,
  Home,
  ListEspera,
  Logout,
  Perfil,
  Product,
  ShopAll,
  VentasClient,
} from "../../../helpers/IconNew";
import Breakpoints from "../../../helpers/Breakpoints";
import NavLink from "../../../utils/Navlink";
import { logout } from "../../../actions/auth";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const dispatch = useDispatch();
  const { points11 } = Breakpoints();
  // toogle color
  const { toggleColorMode, colorMode } = useColorMode();
  // useSelector
  const { activeSelect: a = {} } = useSelector(({ auth }) => auth);
  // dispatch
  const { push, locale, locales, asPath } = useRouter();

  const handleLogout = () => {
    const err = locale === "en" ? en.error : es.error;
    dispatch(logout(err));
  };

  return (
    <Box>
      <Flex
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Box
            position={"relative"}
            alignItems={"center"}
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
          >
            <Image
              src={"/img/logo.png"}
              alt="Picture of the author"
              width={130}
              height={100}
            />
          </Box>

          <Flex display={{ base: "none", md: "flex" }} ml={{ base: 0, lg: 10 }}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
          alignItems={"center"}
          ml={3}
        >
          <Menu >
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"secondary"}
              px={0}
              cursor={"pointer"}
              minW={0}
            >
              <CartIcon boxSize={points11} />
            </MenuButton>
            <MenuList>
              <NavbarCart />
            </MenuList>
          </Menu>
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"secondary"}
            href={"#"}
            size={"sm"}
            px={0}
          >
            Sign In
          </Button>
          <Button
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            href={"#"}
            variant={"primary"}
            size={"sm"}
          >
            Sign Up
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"sm"}
                src={
                  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                }
              />
            </MenuButton>
            <MenuList>
              <MenuItem as={"div"}>
                <HStack spacing={6}>
                  <Heading size={"md"}>{a?.displayName}</Heading>
                  <Button
                    onClick={toggleColorMode}
                    size="xs"
                    px={0}
                    variant={"secondary"}
                  >
                    {colorMode === "light" ? (
                      <MoonIcon boxSize={6} />
                    ) : (
                      <SunIcon boxSize={6} />
                    )}
                  </Button>
                </HStack>
              </MenuItem>
              <MenuDivider />
              {[
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
                  icon: <Category />,
                  ref: "/admin/category",
                  as: "/admin/category",
                  nam: locale === "en" ? en.major.mF : es.major.mF,
                },
                {
                  icon: <VentasClient />,
                  ref: "/admin",
                  as: "/admin",
                  nam: locale === "en" ? en.major.mH : es.major.mH,
                },
                {
                  icon: <Product />,
                  ref: `/product/[uid]`,
                  as: `/product/${a?.uid}`,
                  nam: locale === "en" ? en.major.mG : es.major.mG,
                },
                {
                  icon: <ShopAll />,
                  ref: "/search",
                  as: "/search",
                  nam: locale === "en" ? en.major.mI : es.major.mI,
                },
              ].map(({ icon, ref, as, nam, click }, key) => (
                <MenuItem as={"div"} key={key}>
                  <NavLink
                    leftIcon={icon}
                    fontWeight={"normal"}
                    variant={"secondary"}
                    href={ref}
                    as={as}
                    name={nam}
                  />
                </MenuItem>
              ))}

              <MenuItem as={"div"}>
                <Button
                  variant={"secondary"}
                  fontWeight={"normal"}
                  leftIcon={<Logout />}
                  onClick={handleLogout}
                >
                  {locale === "en" ? en.logout : es.logout}
                </Button>
              </MenuItem>

              <MenuItem as={"div"}>
                <HStack w={"full"} alignItems={"center"} py={5}>
                  <Heading textTransform={"uppercase"} size="sm">
                    <Box w={6} h={6} as={Global} />{" "}
                    {locale === "en" ? en.language : es.language}
                  </Heading>

                  {locales.map((lo, i) => (
                    <chakra.li key={i} sx={{ listStyle: "none" }}>
                      <NavLink
                        size={"sm"}
                        variant={"primary"}
                        href={asPath}
                        locale={lo}
                        name={lo}
                        px={0}
                        w={0}
                      />
                    </chakra.li>
                  ))}
                </HStack>
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}
const initialStates = {
  q: "",
};
const DesktopNav = () => {
  // dispatch
  const { push, locale, locales, asPath } = useRouter();

  const { values, reset, handleInputChange } = useFormAll(initialStates);

  const handleSerchProduct = (e) => {
    e.preventDefault();
    const q = values.q;
    push({
      pathname: "/search",
      query: { q },
    });
    reset();
  };

  return (
    <Stack
      direction={"row"}
      spacing={4}
      alignItems={"center"}
      justifyContent={"space-around"}
    >
      <MenuCategoria
        categories={locale === "en" ? en.categories : es.categories}
      />
      <chakra.form onSubmit={handleSerchProduct} pl={{ base: 0, lg: 20 }}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" display={"block"} />
          </InputLeftElement>

          <Input
            type={"search"}
            placeholder={locale === "en" ? en.searchs : es.searchs}
            value={values.q}
            name={"q"}
            onChange={handleInputChange}
          />
        </InputGroup>
      </chakra.form>
      {/* {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))} */}
    </Stack>
  );
};

// const DesktopSubNav = ({ label, href, subLabel }) => {
//   return (
//     <Link
//       href={href}
//       role={"group"}
//       display={"block"}
//       p={2}
//       rounded={"md"}
//       _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
//     >
//       <Stack direction={"row"} align={"center"}>
//         <Box>
//           <Text
//             transition={"all .3s ease"}
//             _groupHover={{ color: "pink.400" }}
//             fontWeight={500}
//           >
//             {label}
//           </Text>
//           <Text fontSize={"sm"}>{subLabel}</Text>
//         </Box>
//         <Flex
//           transition={"all .3s ease"}
//           transform={"translateX(-10px)"}
//           opacity={0}
//           _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
//           justify={"flex-end"}
//           align={"center"}
//           flex={1}
//         >
//           <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
//         </Flex>
//       </Stack>
//     </Link>
//   );
// };

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Inspiration",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  {
    label: "Learn Design",
    href: "#",
  },
  {
    label: "Hire Designers",
    href: "#",
  },
];
