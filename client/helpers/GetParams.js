const GetParams = () => {
  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regexS = "[\\?&]" + name + "=([^&#]*)";
    let regex = new RegExp(regexS);
    let results = regex.exec(window.location.href);
    if (results == null) return "";
    else return decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  // Get the one-time code from the query parameter.
  let actionCode = getParameterByName("oobCode");

  return { actionCode };
};

export default GetParams;
