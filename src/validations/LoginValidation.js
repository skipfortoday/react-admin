const LoginValidation = (values) => {
    const errors = {};
  
    if (!values.UserID|| values.UserID === "") {
      errors.UserID = "Isi Username";
    }
  
    if (!values.Pass || values.Pass === "") {
      errors.Pass = "Isi Pass";
    }

  
    return errors;
  };
  
  export default LoginValidation;
  