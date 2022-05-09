export const getStaticPaths = () => {
  return {
    paths: [
      { params: { u: ["you"] } },
      { params: { u: ["selling"] } },
      { params: { u: ["agreement"] } },
      { params: { u: ["list"] } },
      { params: { u: ["ajustar"] } },
    ],
    fallback: false,
  };
};
