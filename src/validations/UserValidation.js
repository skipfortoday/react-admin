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
//console.log(values);
  if (!values.KodeCabang || values.KodeCabang=== undefined) {
    errors.KodeCabang = "Kode Cabang harus diisi";
  } 

  if (!values.NamaCabang || values.NamaCabang=== undefined) {
    errors.NamaCabang = "Nama Cabang harus diisi";
  } 

  if (!values.TglMasuk || values.TglMasuk=== "") {
    errors.TglMasuk = "Tanggal Masuk harus diisi";
  }


  // if (!values.UserID || values.UserID === "") {
  //   errors.UserID = "UserID harus diisi"; 
  // } 


  if (!values.Pass || values.Pass === "") {
    errors.Pass = "Password harus diisi";
  } 

  if (!values.GroupID || values.GroupID.value === undefined) {
    errors.GroupID = "Group ID harus diisi";
  }

  if (!values.RoleID || values.RoleID.value === undefined) {
    errors.RoleID = "Role ID harus diisi";
  }

  if (!values.Posisi || values.Posisi === "") {
    errors.Posisi = "Posisi harus diisi";
  }

  return errors;
};

export default UserValidation;
