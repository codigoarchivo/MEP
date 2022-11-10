import PropTypes from "prop-types";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Button, chakra, useBreakpointValue } from "@chakra-ui/react";
import Carousel from "nuka-carousel";
import { SerchScreen } from "../search/SerchScreen";

export const ScreenCarousel = ({ latestCartSelect }) => {
  // use Carousel
  const variant = useBreakpointValue({ base: 1, sm: 2, md: 2, lg: 3, xl: 4 });
  return (
    <Carousel
      easing="easeInOutElastic"
      wrapAround={true}
      slidesToScroll={3}
      slidesToShow={variant}
      cellSpacing={0}
      slideWidth={0.75}
      cellAlign={"center"}
      defaultControlsConfig={{
        nextButtonText: (
          <Button
            as={"div"}
            variant={"primary"}
            rounded={"full"}
            w={11}
            fontSize={"2xl"}
          >
            <ChevronRightIcon />
          </Button>
        ),
        prevButtonText: (
          <Button
            as={"div"}
            variant={"primary"}
            rounded={"full"}
            w={11}
            fontSize={"2xl"}
          >
            <ChevronLeftIcon />
          </Button>
        ),
        pagingDotsStyle: {
          fill: "transparent",
        },
        nextButtonStyle: {
          backgroundColor: "transparent",
        },
        prevButtonStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      {latestCartSelect.map((data) => (
        <chakra.ul key={data.id}>
          <SerchScreen {...data} />
        </chakra.ul>
      ))}
    </Carousel>
  );
};

ScreenCarousel.propTypes = {
  latestCartSelect: PropTypes.array.isRequired,
};
