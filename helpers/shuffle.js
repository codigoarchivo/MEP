export const shuffle = (array) => {
  let r = array
    .filter((i) => i.rat?.est >= 75)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  return r.length === 3 ? r : array.sort(() => 0.5 - Math.random()).slice(0, 3);
};
