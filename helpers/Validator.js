const Validator = (values) => {
  // Register
  const nameV = values?.name === "";
  const naV = values?.na === "";
  const emailV = values?.email === "";
  const emailVa = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
    values?.email
  );
  const passwordV = values?.password === "";
  const rePasswordV = values?.rePassword === "";
  const minPasswordV = values?.password?.length < 6;
  const minRePasswordV = values?.rePassword?.length < 6;
  const samePasswordV = values?.password !== values?.rePassword;

  const mNombre = values?.na === "";
  const mTipo = values?.ps === "";
  const mPrecio = values?.pr === 0;
  const mPorcentaje = values?.pj === 0;
  const mDetalles = values?.dt === "";
  const mImage = Number(values?.imgsize) > 50000;
  const mImageCero = values?.im === "";
  const mDescripcion = values?.ds === "";
  const mCantidad = Number(values?.cn) === 0;
  const mCategory = values?.ct === "";
  const mTipos = values?.ti === "";

  const nameE = nameV && "Nombre is required.";

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

  let ErrorLorR;
  if (
    nameV ||
    emailV ||
    emailVa ||
    passwordV ||
    rePasswordV ||
    minPasswordV ||
    minRePasswordV ||
    samePasswordV
  ) {
    ErrorLorR = true;
  }

  let ErrorRorL;
  if (emailV || passwordV) {
    ErrorRorL = true;
  }

  let ErrorRetur;
  if (
    mNombre ||
    mPrecio ||
    mImage ||
    mDetalles ||
    mDescripcion ||
    mCantidad ||
    mCategory ||
    mTipos ||
    mImageCero ||
    mTipo ||
    mPorcentaje
  ) {
    ErrorRetur = true;
  }
  // CategoryData

  let ErrorCatData;
  if (naV) {
    ErrorCatData = true;
  }

  const fiel = "Revisa si algun campo esta vacio";
  const estado = "El estado de la operación es Desactivado";
  const esImg = "Imagen no tiene que ser mayor a 5mb";

  return {
    fiel,
    estado,
    nameE,
    emailE,
    coPasswordE,
    coRePasswordE,
    passwordL,
    field,
    mImage,
    esImg,
    mNombre,
    mPrecio,
    mDetalles,
    mDescripcion,
    mCantidad,
    mCategory,
    mTipos,
    ErrorRetur,
    ErrorLorR,
    ErrorRorL,
    passwordV,
    ErrorCatData,
  };
};

export default Validator;
