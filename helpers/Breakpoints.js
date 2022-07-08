const Breakpoints = () => {
  const displayOn1 = { base: "block", sm: "none" };
  const displayOn2 = { base: "block", md: "none" };
  const displayOff1 = { base: "none", sm: "block" };
  const displayOff2 = { base: "none", md: "block" };
  const displayOff3 = { base: "none", md: "table-cell" };
  const displayOff4 = { base: "none", lg: "block" };

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
  const points15 = { base: 5, md: 4 };
  const points16 = { base: 3, lg: 12 };
  const points17 = { base: 5, sm: 0 };
  const points18 = { base: 4, sm: 6 };
  const points19 = { base: 1, sm: 3 };
  const points20 = { base: 12, md: 16 };
  const points21 = { base: 0, sm: 10 };
  const points22 = { base: 10, sm: 0 };
  const points23 = { base: 5, md: 20 };
  const points24 = { base: 5, md: 10 };
  const points25 = { base: 24, md: 40, lg: 56 };

  const auto1 = { base: "auto", md: "90vh" };

  const all1 = ["sx", "sm", "md", "lg", "xl"];

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
  const content5 = { base: "column", md: "row" };
  const content6 = { base: "row", md: "column" };
  const content7 = { base: "column", lg: "row" };

  const porcent1 = { base: "full", sm: "75%", md: "50%", lg: "40%" };
  const porcent2 = { base: "40%", md: "15%", lg: "35%" };
  const porcent3 = { base: "100%", md: "60%" };
  const porcent4 = { base: "100%", md: "40%" };

  const center = "center";
  const full = "full";
  const bordes = "1px solid #d0d0d0";

  const calc = "calc(100vh - 50px)";

  return {
    displayOn1,
    displayOn2,
    displayOff1,
    displayOff2,
    displayOff3,
    displayOff4,
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
    points20,
    points21,
    points22,
    points23,
    points24,
    points25,
    auto1,
    repeat1,
    repeat2,
    repeat3,
    repeat4,
    content1,
    content2,
    content3,
    content4,
    porcent1,
    porcent2,
    porcent3,
    porcent4,
    content5,
    content6,
    content7,
    center,
    full,
    bordes,
    calc,
    all1,
  };
};

export default Breakpoints;
