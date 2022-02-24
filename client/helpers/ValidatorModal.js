import Swal from "sweetalert2";

export const ValidatorModal = ({
  imgenM,
  mNombre,
  mPrecio,
  mDescripcion,
  mCantidad,
  mCategory,
  mDetalles,
}) => {
  const fiel = "Revisa si alguno campo esta vacio";
  const fileE = "Imagen menos de 500kb";
  return (
    imgenM && Swal.fire("Error", fileE, "error"),
    mNombre && Swal.fire("Error", fiel, "error"),
    mPrecio && Swal.fire("Error", fiel, "error"),
    mDescripcion && Swal.fire("Error", fiel, "error"),
    mCantidad && Swal.fire("Error", fiel, "error"),
    mCategory && Swal.fire("Error", fiel, "error"),
    mDetalles && Swal.fire("Error", fiel, "error")
  );
};
