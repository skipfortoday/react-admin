const SelectValidation = (values) => {
    const errors = {};
  
    if (!values.Nama || values.Nama === "") {
      errors.Nama = "Nama harus diisi";
    }
  
    if (!values.TglAkhir|| values.TglAkhir=== "") {
      errors.TglAkhir = "harus diisi";
    }
  
    if (!values.TglAwal|| values.TglAwal=== "") {
      errors.TglAwal = "harus diisi";
    }
  
    return errors;
  };
  
  export default SelectValidation;
  