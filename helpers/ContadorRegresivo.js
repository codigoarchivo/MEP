import { useEffect } from "react";

import { formatDuration, getUnixTime, intervalToDuration } from "date-fns";

export const ContadorRegresivo = ({ lim, count }) => {
  useEffect(() => {
    // cree el intervalo
    const interval = setInterval(() => {
      //  Tiempo Agotado
      if (getUnixTime(new Date()) >= lim) {
        // muestro el mensaje
        document.getElementById(`resLimit_${count}`).innerHTML =
          "Tiempo agotado";
        // Limpiar
        clearInterval(interval);
        return;
      } else {
        // creo intervalo  de duración regresivo
        const duration = intervalToDuration({
          start: new Date(),
          end: new Date(lim * 1000),
        });

        // formato la duracion del tiempo separado por comas
        const del = formatDuration(duration, {
          delimiter: ", ",
        });

        // muestra el tiempo en el pantalla
        document.getElementById(`resLimit_${count}`).innerHTML = del;
      }
    }, 1000);
    // limpiar el intervalo
    return () => {
      clearInterval(interval);
    };
  });

  return null;
};
