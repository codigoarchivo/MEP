import { useEffect } from "react";

import { formatDuration, getUnixTime, intervalToDuration } from "date-fns";

const ContadorRegresivo = ({ lim }) => {
  useEffect(() => {
    // cree el intervalo
    const interval = setInterval(() => {
      // obtengo el tiempo
      const units = [
        "years",
        "months",
        "weeks",
        "days",
        "hours",
        "minutes",
        "seconds",
      ];

      // selecciono el tiempo
      const unit = units.find((u) => lim[u] > 0);

      // obtengo dinamicamente el tiempo
      const value = lim[unit];

      //  Tiempo Agotado
      if (getUnixTime(new Date()) >= value) {
        // muestro el mensaje
        document.getElementById("resLimit").innerHTML = "Tiempo agotado";
        // Limpiar
        clearInterval(interval);
        return;
      }

      // creo intervalo  de duración
      const duration = intervalToDuration({
        start: new Date(),
        end: value * 1000,
      });

      // formato la duracion del tiempo
      const del = formatDuration(duration, {
        delimiter: ", ",
      });

      // muestra el tiempo
      document.getElementById("resLimit").innerHTML = del;
    }, 1000);
    // limpiar el intervalo
    return () => {
      clearInterval(interval);
    };
  }, [lim]);

  return null;
};

export default ContadorRegresivo;
