const Breakpoints = () => {
  const displayOn1 = { base: "block", sm: "none" };
  const displayOn2 = { base: "block", md: "none" };
  const displayOff1 = { base: "none", sm: "block" };
  const displayOff2 = { base: "none", md: "block" };

  const points1 = { base: 2, md: 1 };
  const points2 = { base: 10, md: 5 };
  const points3 = { base: 0, md: 5 };
  const points4 = { base: 1, md: 2 };
  const points5 = { base: 1, md: 4 };
  const points6 = { base: 1, md: 1, lg: 2 };
  const points7 = { base: 1, md: 3, lg: 4 };
  const points8 = { md: 1, lg: 2 };
  const points9 = { base: 1, md: 4, lg: 6 };
  const points10 = { base: 1, md: 4, lg: 2 };


  const auto1 = { base: "auto", md: "90vh" };

  const repeat1 = { base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" };
  const repeat2 = { base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" , lg: "repeat(6, 1fr)" };
  const repeat3 = { base: "repeat(5, 1fr)", md: "repeat(4, 1fr)" , lg: "repeat(3, 1fr)" };

  const content1 = { base: "start", lg: "center" };

  return {
    displayOn1,
    displayOn2,
    displayOff1,
    displayOff2,
    points1,
    points2,
    points3,
    points4,
    points5,
    points6,
    points7,
    points8,
    points9,
    points10,
    auto1,
    repeat1,
    repeat2,
    repeat3,
    content1,
  };
};

export default Breakpoints;
