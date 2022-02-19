const Validator = (values) => {
  const { name, lastName, email, password, rePassword } = values;
  const {
    nombre,
    precio,
    image,
    detalles,
    descripcion,
    cantidad,
    category,
  } = values;

  // Register
  const nameV = name === "";
  const lastNameV = lastName === "";
  const emailV = email === "";
  const emailVa = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  const passwordV = password === "";
  const rePasswordV = rePassword === "";
  const minPasswordV = password?.length < 6;
  const minRePasswordV = rePassword?.length < 6;
  const samePasswordV = password === rePassword;

  const nameE = nameV && "Nombre is required.";

  const lastNameE = lastNameV && "Apellido es requerido.";

  let emailE;
  if (emailV) {
    emailE = emailV && "Email is required.";
  } else {
    emailE = emailVa && "Verifique su correo.";
  }

  let passwordE;
  if (passwordV) {
    passwordE = passwordV && "Password is required.";
  } else {
    passwordE = minPasswordV && "Password requiere al menos 6 caracteres.";
  }

  let rePasswordE;
  if (rePasswordV) {
    rePasswordE = rePasswordV && "Password is required.";
  } else {
    rePasswordE = minRePasswordV && "Password requiere al menos 6 caracteres.";
  }

  const samePasswordE =
    !samePasswordV && "Los caracteres deben se ser iguales.";

  const coPasswordE = passwordE ? passwordE : samePasswordE;

  const coRePasswordE = rePasswordE ? rePasswordE : samePasswordE;

  const field = "Campo Correcto";

  // login
  const passwordL = passwordV && "Password is required.";

  // DashboardDialogModal
  const mNombre = nombre === "";
  const mPrecio = precio === "";
  const mImage = image === "";
  const mDetalles = detalles === "";
  const mDescripcion = descripcion === "";
  const mCantidad = Number(cantidad) === 0;
  const mCategory = category === "";

  let ErrorRetur;
  if (
    mNombre ||
    mPrecio ||
    mImage ||
    mDetalles ||
    mDescripcion ||
    mCantidad ||
    mCategory
  ) {
    ErrorRetur = null;
  }

  const fiel = "Campo no debe estar Vacio";

  return {
    nameE,
    lastNameE,
    emailE,
    coPasswordE,
    coRePasswordE,
    passwordL,
    field,
    mNombre,
    mPrecio,
    mImage,
    mDetalles,
    mDescripcion,
    mCantidad,
    mCategory,
    fiel,
    ErrorRetur,
  };
};

export default Validator;
