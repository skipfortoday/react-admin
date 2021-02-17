const UserValidation = (values) => {
  const errors = {};

  if (!values.Nama || values.Nama === "") {
    errors.Nama = "Nama harus diisi";
  }

  if (!values.Alamat || values.Alamat=== "") {
    errors.Alamat = "Alamat harus diisi";
  }

  if (!values.TglLahir || values.TglLahir=== "") {
    errors.TglLahir = "Tanggal Lahir harus diisi";
  }

  if (!values.HP|| values.HP=== "") {
    errors.HP = "Nomor HP harus diisi";
  }
  if (!values.KodeCabang || values.KodeCabang=== "") {
    errors.KodeCabang = "Kode harus diisi";
  } 

  if (!values.TglMasuk || values.TglMasuk=== "") {
    errors.TglMasuk = "Tanggal Masuk harus diisi";
  }


  if (!values.UserID || values.UserID === "") {
    errors.UserID = "UserID harus diisi"; 
  } 


  if (!values.Pass || values.Pass === "") {
    errors.Pass = "Password harus diisi";
  } 

  if (!values.GroupID || values.GroupID === "") {
    errors.GroupID = "Group ID harus diisi";
  }



  return errors;
};

export default UserValidation;
