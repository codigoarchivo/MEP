export const getStaticPaths = () => {
  return {
    paths: [
      { params: { slug: ["cart"] } },
      { params: { slug: ["details"] } },
      { params: { slug: ["checkout"] } },
      { params: { slug: ["checkout","rate"] } },
    ],
    fallback: false,
  };
};
