const AdminValidation = (values) => {
    const errors = {};
  
    if (!values.KodeCabang || values.KodeCabang === "") {
      errors.KodeCabang = "Kode Cabang harus diisi";
    }
  
    if (!values.NamaCabang || values.NamaCabang === "") {
      errors.NamaCabang = "Nama Cabang harus diisi";
    }
  
    if (!values.Alamat || values.Alamat === "") {
      errors.Alamat = "Alamat harus diisi";
    }
  
    if (!values.GeneralManagerID || values.GeneralManagerID === "") {
      errors.GeneralManagerID = "ID Manager harus diisi";
    }
  
    if (!values.hrdID || values.hrdID === "") {
      errors.hrdID = " ID HRD harus diisi";
    }
  
    return errors;
  };
  
  export default AdminValidation;
  