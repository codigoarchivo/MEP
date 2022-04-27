const Calculate = (data) => {
  let listRat = [];
  // sumar y acumular los valores de los ratings de los productos de la lista de productos
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

  // ordenar de mayor a menor y obtener el promedio de las calificaciones de los productos de la lista
  listRat.sort(function (a, b) {
    return b.rat - a.rat;
  });

  // porcentaje de cada uno de los elementos de la lista de ratings y guardarlos en una lista de porcentajes de acuerdo a la cantidad de ratings que tenga cada uno de los elementos de la lista de ratings
  listRat.forEach(function (a) {
    a["per"] = a.rat;
    a["est"] = a.nam;
    a.rat = Math.round((a.rat / data.length) * 100);
  });

  // calculo de la cantidad de productos que se encuentran en el rango de calificaciones de los productos de la lista de productos
  let a = [];
  let t = 110;
  let p = 5.5;
  while (a.length < 10) {
    a.push({ dt: (t -= 10), do: (p -= 0.5) });
  }
  // calculo ranking de los productos de la lista de productos
  let b = [];
  let i = 102;
  let c = 5.1;
  while (b.length < 50) {
    b.push({ ini: (i -= 2), ran: (c -= 0.1).toFixed(1) });
  }

  // obtener el rango de calificaciones de los productos de la lista de productos
  let listRang = 0;
  a.forEach(function (a) {
    listRat.forEach(function (b) {
      switch (Number(b.nam)) {
        case a.dt:
          b.nam = a.do;
          listRang += b.nam;
          break;
      }
    });
  });

  listRang = (listRang / listRat.length).toFixed(1);

  let listRang2 = 0;
  // obtener el ranking de los productos de la lista de productos
  b.forEach(function (a) {
    if (Number(listRang) === Number(a.ran)) {
      listRang2 = a.ini;
    }
  });

  return {
    listRat,
    listRang,
    listRang2,
  };
};

export default Calculate;
