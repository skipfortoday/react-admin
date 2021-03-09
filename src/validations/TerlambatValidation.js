const TerlambatValidation = (values) => {
    const errors = {};
  
    if (!values.Shift || values.Shift === "") {
      errors.Shift = "Shift harus diisi";
    }
  
    if (!values.MaxJamDatang|| values.MaxJamDatang=== "") {
      errors.MaxJamDatang = "Max Jam Dtg harus diisi";
    }
  
    if (!values.RpPotonganTerlambat|| values.RpPotonganTerlambat=== "") {
      errors.RpPotonganTerlambat = "Potongan harus diisi";
    }
  
    return errors;
  };
  
  export default TerlambatValidation;
  