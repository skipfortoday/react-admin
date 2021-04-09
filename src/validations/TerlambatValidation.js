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

    if(!values.GroupID || values.GroupID.value === ""){
      errors.GroupID = "Group Jabatan Harus Diisi";
    }
  
    return errors;
  };
  
  export default TerlambatValidation;
  