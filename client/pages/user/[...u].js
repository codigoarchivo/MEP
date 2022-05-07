export const getStaticPaths = () => {
  return {
    paths: [
      { params: { u: ["you"] } },
      { params: { u: ["selling"] } },
      { params: { u: ["agreement"] } },
    ],
    fallback: false,
  };
};
