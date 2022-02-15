export const getStaticPaths = () => {
  return {
    paths: [
      { params: { slug: ["cart"] } },
      { params: { slug: ["details"] } },
      { params: { slug: ["details", "cart"] } },
      { params: { slug: ["cart", "checkout"] } },
    ],
    fallback: false,
  };
};