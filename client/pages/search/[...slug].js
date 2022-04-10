export const getStaticPaths = () => {
  return {
    paths: [
      { params: { slug: ["cart"] } },
      { params: { slug: ["details"] } },
      { params: { slug: ["category"] } },
      { params: { slug: ["cart", "checkout"] } },
    ],
    fallback: false,
  };
};
