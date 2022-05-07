export const getStaticPaths = () => {
  return {
    paths: [
      { params: { c: ["cart"] } },
      { params: { c: ["details"] } },
      { params: { c: ["checkout"] } },
      { params: { c: ["checkout","rate"] } },
    ],
    fallback: false,
  };
};
