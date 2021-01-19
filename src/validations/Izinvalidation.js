const IzinValidation = (values) => {
    const errors = {};
  
    if (!values.Nama || values.Nama === "") {
      errors.Nama = "Nama harus diisi";
    }
  
    if (!values.TanggalScan || values.TanggalScan === "") {
      errors.TanggalScan = "Tanggal harus diisi";
    }
  
    if (!values.Status || values.Status=== "") {
      errors.Status = "Status izin harus diisi";
    }
  
    if (!values.Keterangan || values.Keterangan === "") {
      errors.Keterangan = "Keterangan izin harus diisi";
    }
  
    return errors;
  };
  
  export default IzinValidation;
  