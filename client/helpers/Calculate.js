const Calculate = (data) => {
  let listRat = [];
  data.forEach(function (a) {
    if (!this[a.nam]) {
      this[a.nam] = {
        nam: a.nam,
        rat: 0,
      };
      listRat.push(this[a.nam]);
    }
    this[a.nam].rat += 1;
  }, Object.create(null));

  return {
    listRat,
  };
};

export default Calculate;
