const AbsensiManualValidation = (values) => {
    const errors = {};
  
    if (!values.Shift || values.Shift === "") {
      errors.Shift = "Shift harus diisi";
    }
  
    if (!values.Keterangan|| values.Keterangan=== "") {
      errors.Keterangan = "Keterangan Di isi";
    }
  
    return errors;
  };
  
  export default AbsensiManualValidation;
  