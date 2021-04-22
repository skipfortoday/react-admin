const LoginValidation = (values) => {
    const errors = {};
  
    if (!values.AdminID|| values.AdminID === "") {
      errors.AdminID = "Isi Username";
    }
  
    if (!values.Password || values.Password === "") {
      errors.Password = "Isi Pass";
    }

  
    return errors;
  };
  
  export default LoginValidation;
  