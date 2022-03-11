export const getDataId = (list, id) => {
  const idData = list.find((x) => x.id === id);
  return { idData };
};
