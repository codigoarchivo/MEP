export const Validator = (
  values,
  aM = "",
  aL = "",
  aK = "",
  aN = "",
  aO = "",
  aP = "",
  aQ = ""
) => {
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
  const mImage = Number(values?.imgsize) < 5242880;
  const mImageCero = values?.im === "";
  const mDescripcion = values?.ds === "";
  const mCantidad = Number(values?.cn) === 0;
  const mCategory = values?.ct === "";
  const mTipos = values?.ti === "";

  const nameE = nameV && aO;

  let emailE;
  if (emailV) {
    emailE = emailV && aL;
  } else {
    emailE = emailVa && aN;
  }

  let passwordE;
  if (passwordV) {
    passwordE = passwordV && aM;
  } else {
    passwordE = minPasswordV && aP;
  }

  let rePasswordE;
  if (rePasswordV) {
    rePasswordE = rePasswordV && aM;
  } else {
    rePasswordE = minRePasswordV && aP;
  }

  const samePasswordE = !samePasswordV && aQ;

  const coPasswordE = passwordE ? passwordE : samePasswordE;

  const coRePasswordE = rePasswordE ? rePasswordE : samePasswordE;

  const field = aK;
  // login
  const passwordL = passwordV && aM;

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

  return {
    nameE,
    emailE,
    coPasswordE,
    coRePasswordE,
    passwordL,
    field,
    mImage,
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
