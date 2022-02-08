const Validator = (values) => {
  const { name, lastName, email, password, rePassword } = values;

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

  return {
    nameE,
    lastNameE,
    emailE,
    coPasswordE,
    coRePasswordE,
    passwordL,
    field,
  };
};

export default Validator;
