export const getStaticPaths = () => {
  return {
    paths: [
      { params: { slug: ["cart"] } },
      { params: { slug: ["details"] } },
      { params: { slug: ["checkout"] } },
      { params: { slug: ["cart", "checkout"] } },
    ],
    fallback: false,
  };
};
