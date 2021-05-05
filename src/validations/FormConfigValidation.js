const FormConfigValidation = (values) => {
    const errors = {};
    if (!values.KodeCabang || values.KodeCabang=== undefined) {
        errors.KodeCabang = "Kode Cabang harus diisi";
      } 
    
      if (!values.Password || values.Password=== undefined) {
        errors.Password = "Password harus diisi";
      }
    
    return errors;
};

export default FormConfigValidation;
  