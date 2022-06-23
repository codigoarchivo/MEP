const Calculate = (data) => {
  // ordenar de mayor a menor y obtener el promedio de las calificaciones de los productos de la lista
  data.sort(function (a, b) {
    return b.rat - a.rat;
  });

  // calculo ranking de los productos de la lista de productos
  let b = [];
  let e = 103;
  let i = 102;
  let c = 5.1;
  while (b.length < 51) {
    b.push({
      inp: (e -= 2),
      ini: (i -= 2),
      ran: (c -= 0.1).toFixed(1),
    });
  }

  // sumar y acumular los valores de los ratings de los productos de la lista de productos
  let global = [];
  data.forEach(function (a) {
    // filtra el ranking indiviadual  example 3.5
    const data = b.filter((i) => i.inp === a.rat || i.ini === a.rat)[0].ran;

    if (!this[a.rat]) {
      this[a.rat] = {
        est: a.rat, // porcentaje individual
        nam: 0,
        per: 0,
      };
      global.push(this[a.rat]);
    }
    // porcentaje individual
    this[a.rat].nam = data;
    // acumular personas iguales example 5
    this[a.rat].per += 1;
  }, Object.create(null));

  global.map((a) => ({
    ...a,
    rat: (a["rat"] = (a.per * 100) / global.reduce((n, m) => (n += m.per), 0)), // porcentaje de cada uno de los elementos de la lista de ratings y guardarlos en una lista de porcentajes de acuerdo a la cantidad de ratings que tenga cada uno de los elementos de la lista de ratings
  }));

  // creado ranking global examnple: 3.4
  const globalRanking = Number(
    (
      global.reduce((n, m) => (n += Number(m.nam)), 0) /
      global.reduce((n, m) => (n += m.per), 0)
    ).toFixed(1)
  );

  // creado porcentaje  global example: 68
  const globalPorcentaje = Number(
    (
      global.reduce((n, m) => (n += m.est), 0) /
      global.reduce((n, m) => (n += m.per), 0)
    ).toFixed(0)
  );

  return {
    global,
    globalRanking,
    globalPorcentaje,
  };
};
export default Calculate;
