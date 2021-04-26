const IzinValidation = (values) => {
    const errors = {};
    
    if (!values.Nama || values.Nama === "") {
      errors.Nama = "Nama harus diisi";
    }
  
    if (!values.TanggalScan || values.TanggalScan === "") {
      errors.TanggalScan = "Tanggal harus diisi";
    }

    if (!values.TanggalScanSampai || values.TanggalScanSampai === "") {
      errors.TanggalScanSampai = "Tanggal harus diisi";
    }

    if(values.TanggalScanSampai < values.TanggalScan){
      errors.TanggalScanSampai = "Tanggal Akhir harus >= Tanggal Awal";
    }
  
    if (!values.Status || values.Status=== "") {
      errors.Status = "Status izin harus diisi";
    }
  
    if ((!values.Keterangan || values.Keterangan === "") && (!values.Status || values.Status.value!== "LENGKAPI")) {
      errors.Keterangan = "Keterangan izin harus diisi";
    }
  
    return errors;
  };
  
  export default IzinValidation;
  