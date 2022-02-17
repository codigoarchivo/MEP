const Breakpoints = () => {
  const displayOn1 = { base: "block", sm: "none" };
  const displayOn2 = { base: "block", md: "none" };
  const displayOff1 = { base: "none", sm: "block" };
  const displayOff2 = { base: "none", md: "block" };
  const displayOff3 = { base: "none", md: "table-cell" };

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
  const points11 = { base: 6, md: 8 };
  const points12 = { base: 10, md: 16 };
  const points13 = { base: 8, md: 10 };
  const points14 = { base: 3, sm: 5 };
  const points15 = { base: 5, md: 3 };
  const points16 = { base: 3, lg: 12 };
  const points17 = { base: 5, sm: 0 };
  const points18 = { base: 4, sm: 6 };
  const points19 = { base: 1, sm: 3 };

  const auto1 = { base: "auto", md: "90vh" };

  const repeat1 = { base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" };
  const repeat2 = {
    base: "repeat(1, 1fr)",
    md: "repeat(4, 1fr)",
    lg: "repeat(6, 1fr)",
  };
  const repeat3 = {
    base: "repeat(5, 1fr)",
    md: "repeat(4, 1fr)",
    lg: "repeat(3, 1fr)",
  };
  const repeat4 = { base: "repeat(11, 1fr)", md: "repeat(13, 1fr)" };

  const content1 = { base: "start", lg: "center" };
  const content2 = { base: "start", lg: "end" };
  const content3 = { base: "column", sm: "row" };
  const content4 = { base: "row", sm: "column" };

  return {
    displayOn1,
    displayOn2,
    displayOff1,
    displayOff2,
    displayOff3,
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
    points11,
    points12,
    points13,
    points14,
    points15,
    points16,
    points17,
    points18,
    points19,
    auto1,
    repeat1,
    repeat2,
    repeat3,
    repeat4,
    content1,
    content2,
    content3,
    content4,
  };
};

export default Breakpoints;
